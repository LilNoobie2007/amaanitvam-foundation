import crypto from "crypto";
import Donation from "../models/donation.js";
import { getRazorpayInstance, getRazorpayKeyId } from "../config/razorpay.js";
import { sendDonationReceiptEmail, sendDonationAdminEmail } from "../services/emailService.js";
import { sendWhatsAppNotification } from "../services/whatsappService.js";

// POST /api/donate/create-order
export const createDonationOrder = async (req, res) => {
    try {
        const { name, email, phone, amount } = req.validatedDonation;

        const razorpay = getRazorpayInstance();

        const order = await razorpay.orders.create({
            amount: Math.round(amount * 100), // Razorpay expects paise
            currency: "INR",
            receipt: `donation_${Date.now()}`,
            notes: {
                donor_name: name,
                donor_email: email,
                donor_phone: phone || ""
            }
        });

        const donation = new Donation({
            name,
            email,
            phone,
            amount,
            currency: "INR",
            razorpayOrderId: order.id,
            status: "created",
            submissionTimestamp: new Date()
        });

        await donation.save();

        res.status(201).json({
            success: true,
            order: {
                id: order.id,
                amount: order.amount,
                currency: order.currency
            },
            key: getRazorpayKeyId(),
            donor: { name, email, phone }
        });

    } catch (error) {
        console.error("Donation order creation failed:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create donation order. Please try again."
        });
    }
};

// POST /api/donate/verify
export const verifyDonationPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Missing payment verification details."
            });
        }

        // Verify signature using HMAC SHA256
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            // Mark as failed
            await Donation.findOneAndUpdate(
                { razorpayOrderId: razorpay_order_id },
                { status: "failed" }
            );

            return res.status(400).json({
                success: false,
                message: "Payment verification failed. Signature mismatch."
            });
        }

        // Payment verified — update donation record
        const donation = await Donation.findOneAndUpdate(
            { razorpayOrderId: razorpay_order_id },
            {
                razorpayPaymentId: razorpay_payment_id,
                razorpaySignature: razorpay_signature,
                status: "paid"
            },
            { returnDocument: 'after' }
        );

        if (!donation) {
            return res.status(404).json({
                success: false,
                message: "Donation record not found."
            });
        }

        // Respond immediately
        res.status(200).json({
            success: true,
            message: "Payment verified successfully. Thank you for your donation!"
        });

        // Send receipt and admin notification in the background
        Promise.all([
            sendDonationReceiptEmail({ donation }),
            sendDonationAdminEmail({ donation }),
            sendWhatsAppNotification({
                to: process.env.ADMIN_WHATSAPP_NUMBER || "919899923266",
                templateName: "new_donation_received",
                languageCode: "en",
                parameters: [donation.name, donation.amount.toString()]
            })
        ]).catch((emailErr) => {
            console.error("Background donation notification delivery failed:", emailErr);
        });

    } catch (error) {
        console.error("Payment verification failed:", error);
        res.status(500).json({
            success: false,
            message: "Payment verification encountered an error."
        });
    }
};
