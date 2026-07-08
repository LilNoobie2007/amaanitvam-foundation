import crypto from "crypto";
import mongoose from "mongoose";
import Donation from "../models/donation.js";
import Campaign from "../models/campaign.js";
import { getRazorpayInstance, getRazorpayKeyId } from "../config/razorpay.js";
import { sendDonationReceiptEmail, sendDonationAdminEmail } from "../services/emailService.js";
const buildReceiptId = () =>
  `don_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`.slice(0, 40);

const normalizeCampaignId = (value) => {
  const id = String(value ?? "").trim();
  if (!id || ["null", "undefined", "organization", "general", "direct"].includes(id.toLowerCase())) {
    return null;
  }
  return mongoose.Types.ObjectId.isValid(id) ? id : null;
};

const safeErrorMessage = (error) => error?.message || String(error || "Unknown error");

const buildDonationForEmail = (donation, campaign = null) => ({
  ...(donation.toObject?.() ?? donation),
  campaignTitleSnapshot:
    donation.campaignTitleSnapshot ||
    campaign?.title ||
    (donation.donationType === "campaign" ? "Fundraising Campaign" : "Amaanitvam Foundation"),
});

const sendDonationNotifications = async ({ donation, campaign = null }) => {
  const emailDonation = buildDonationForEmail(donation, campaign);

  let receiptResult = { success: false, skipped: true, reason: "not_attempted" };
  let adminEmailResult = { success: false, skipped: true, reason: "not_attempted" };

  try {
    receiptResult = await sendDonationReceiptEmail({ donation: emailDonation });
  } catch (error) {
    receiptResult = { success: false, error: safeErrorMessage(error) };
    console.error("Donation receipt email failed:", receiptResult.error);
  }

  try {
    adminEmailResult = await sendDonationAdminEmail({ donation: emailDonation });
  } catch (error) {
    adminEmailResult = { success: false, error: safeErrorMessage(error) };
    console.error("Donation admin email failed:", adminEmailResult.error);
  }


  return {
    receiptSent: !!receiptResult.success,
    adminEmailSent: !!adminEmailResult.success,
    donor: donation.email,
    receiptError: receiptResult.success ? null : receiptResult.error || receiptResult.reason || null,
    adminEmailError: adminEmailResult.success ? null : adminEmailResult.error || adminEmailResult.reason || null,
  };
};

export const getActiveCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({ status: "active" }).sort({ createdAt: -1 });
    res.json({ success: true, campaigns });
  } catch (error) {
    console.error("Active campaign fetch failed:", error);
    res.status(500).json({ success: false, message: "Failed to load active campaigns." });
  }
};

export const getPublicCampaigns = getActiveCampaigns;

export const createDonationOrder = async (req, res) => {
  try {
    const validated = req.validatedDonation || {};
    const name = validated.name || String(req.body?.name || "").trim();
    const email = validated.email || String(req.body?.email || "").trim().toLowerCase();
    const phone = validated.phone || String(req.body?.phone || "").trim();
    const amount = Number(validated.amount || req.body?.amount || 0);
    const campaignId = normalizeCampaignId(
      validated.campaignId ?? req.body?.campaignId ?? req.body?.campaign ?? req.body?.donationTarget
    );

    let campaign = null;
    if (campaignId) {
      campaign = await Campaign.findById(campaignId);
      if (!campaign) {
        return res.status(404).json({ success: false, message: "Selected campaign was not found." });
      }
      if (String(campaign.status).toLowerCase() !== "active") {
        return res.status(400).json({ success: false, message: "This campaign is not active for donations." });
      }
    }

    const razorpay = getRazorpayInstance();
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: buildReceiptId(),
      notes: {
        donor_name: name,
        donor_email: email,
        donor_phone: phone || "",
        donation_type: campaign ? "campaign" : "organization",
        campaign_id: campaign?._id?.toString() || "",
        campaign_title: campaign?.title || "Organization Donation",
      },
    });

    const donation = await Donation.create({
      name,
      email,
      phone,
      amount,
      currency: "INR",
      donationType: campaign ? "campaign" : "organization",
      campaign: campaign?._id || null,
      campaignTitleSnapshot: campaign?.title || "",
      campaignAmountAdded: false,
      razorpayOrderId: order.id,
      status: "created",
      submissionTimestamp: new Date(),
    });

    res.status(201).json({
      success: true,
      order: { id: order.id, amount: order.amount, currency: order.currency },
      key: getRazorpayKeyId(),
      donor: { name, email, phone },
      donationType: donation.donationType,
      donationId: donation._id,
      campaign: campaign
        ? {
            _id: campaign._id,
            title: campaign.title,
            goalAmount: campaign.goalAmount,
            raisedAmount: campaign.raisedAmount,
          }
        : null,
    });
  } catch (error) {
    console.error("Donation order creation failed:", error);
    res.status(500).json({ success: false, message: "Failed to create donation order. Please try again." });
  }
};

export const verifyDonationPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Missing payment verification details.",
      });
    }

    const donation = await Donation.findOne({ razorpayOrderId: razorpay_order_id });

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation record not found.",
      });
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      donation.status = "failed";
      await donation.save();

      return res.status(400).json({
        success: false,
        message: "Payment verification failed. Signature mismatch.",
      });
    }

    // Backfill campaign for old/retried payments where campaignId only arrives at verify time.
    if (!donation.campaign) {
      let campaignId = normalizeCampaignId(
        req.body?.campaignId ?? req.body?.campaign ?? req.body?.donationTarget
      );

      if (!campaignId) {
        try {
          const razorpay = getRazorpayInstance();
          const order = await razorpay.orders.fetch(razorpay_order_id);
          campaignId = normalizeCampaignId(order?.notes?.campaign_id);
        } catch (orderFetchError) {
          console.warn(
            "Could not fetch Razorpay order notes for campaign backfill:",
            orderFetchError?.message || orderFetchError
          );
        }
      }

      if (campaignId) {
        const campaign = await Campaign.findById(campaignId);
        if (campaign) {
          donation.campaign = campaign._id;
          donation.donationType = "campaign";
          donation.campaignTitleSnapshot = campaign.title;
        }
      }
    }

    const wasAlreadyPaid = donation.status === "paid";

    donation.razorpayPaymentId = razorpay_payment_id;
    donation.razorpaySignature = razorpay_signature;
    donation.status = "paid";

    let updatedCampaign = null;
    const shouldAddToCampaign = donation.campaign && !donation.campaignAmountAdded;

    if (shouldAddToCampaign) {
      updatedCampaign = await Campaign.findByIdAndUpdate(
        donation.campaign,
        { $inc: { raisedAmount: Number(donation.amount || 0) } },
        { returnDocument: "after" }
      );
      donation.campaignAmountAdded = true;
    } else if (donation.campaign) {
      updatedCampaign = await Campaign.findById(donation.campaign);
    }

    await donation.save();

    const notificationDonation = donation.toObject ? donation.toObject() : { ...donation };
    if (updatedCampaign?.title && !notificationDonation.campaignTitleSnapshot) {
      notificationDonation.campaignTitleSnapshot = updatedCampaign.title;
    }

    const donationLabel = notificationDonation.campaign
      ? `campaign donation (${notificationDonation.campaignTitleSnapshot || notificationDonation.campaign})`
      : "direct foundation donation";

    const queueEmailNotifications = () => {
      Promise.allSettled([
        sendDonationReceiptEmail({ donation: notificationDonation }),
        sendDonationAdminEmail({ donation: notificationDonation }),
      ]).then((results) => {
        const labels = ["donor receipt email", "admin donation email"];
        results.forEach((result, index) => {
          if (result.status === "rejected") {
            console.error(
              `Donation email failed for ${donationLabel} (${labels[index]}):`,
              result.reason?.message || result.reason
            );
          } else if (result.value && result.value.success === false) {
            console.error(
              `Donation email failed for ${donationLabel} (${labels[index]}):`,
              result.value.error || result.value.reason || result.value
            );
          }
        });
      });
    };

    // Keep payment verification fast. Emails run in background.
    if (typeof setImmediate === "function") {
      setImmediate(queueEmailNotifications);
    } else {
      setTimeout(queueEmailNotifications, 0);
    }

    return res.status(200).json({
      success: true,
      message: donation.campaign
        ? "Payment verified successfully. Campaign funds updated. Receipt email is being sent."
        : "Payment verified successfully. Thank you for your donation! Receipt email is being sent.",
      emailQueued: true,
      wasAlreadyPaid,
      donation: {
        id: donation._id,
        amount: donation.amount,
        donationType: donation.donationType,
        campaign: donation.campaign || null,
        campaignTitle: donation.campaignTitleSnapshot || "",
        campaignAmountAdded: donation.campaignAmountAdded,
      },
      campaign: updatedCampaign,
    });
  } catch (error) {
    console.error("Payment verification failed:", error);
    return res.status(500).json({
      success: false,
      message: "Payment verification encountered an error.",
    });
  }
};

