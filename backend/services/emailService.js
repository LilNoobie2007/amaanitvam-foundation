import nodemailer from "nodemailer";

const BRAND = {
  name: "Amaanitvam Foundation",
  email: "amaanitvamfoundation@gmail.com",
  website: "https://www.amaanitvam.org",
  impactUrl: "https://www.amaanitvam.org/",
};

const pickEnv = (...keys) => {
  for (const key of keys) {
    const value = process.env[key];
    if (value && String(value).trim()) return String(value).trim();
  }
  return "";
};

const isTruthy = (value) => ["1", "true", "yes", "on"].includes(String(value || "").toLowerCase());

const escapeHtml = (value = "") =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const stripHtml = (value = "") => String(value || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

const maskEmail = (email = "") => {
  const [name, domain] = String(email || "").split("@");
  if (!name || !domain) return String(email || "not-set");
  return `${name.slice(0, 2)}***@${domain}`;
};

const formatAmount = (amount) => {
  const numeric = Number(amount || 0);
  return numeric.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const formatDate = (value) => {
  const date = value ? new Date(value) : new Date();
  if (Number.isNaN(date.getTime())) return formatDate(new Date());

  return date.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const getMailConfig = () => {
  const host = pickEnv("SMTP_HOST", "EMAIL_HOST", "MAIL_HOST") || "smtp.gmail.com";
  const port = Number(pickEnv("SMTP_PORT", "EMAIL_PORT", "MAIL_PORT") || 465);
  const secureEnv = pickEnv("SMTP_SECURE", "EMAIL_SECURE", "MAIL_SECURE");
  const secure = secureEnv ? isTruthy(secureEnv) : port === 465;

  const user = pickEnv(
    "SMTP_USER",
    "SMTP_EMAIL",
    "EMAIL_USER",
    "EMAIL_USERNAME",
    "MAIL_USER",
    "GMAIL_USER"
  );

  const pass = pickEnv(
    "SMTP_PASS",
    "SMTP_PASSWORD",
    "EMAIL_PASS",
    "EMAIL_PASSWORD",
    "MAIL_PASS",
    "MAIL_PASSWORD",
    "GMAIL_APP_PASSWORD"
  );

  const fromName = pickEnv("MAIL_FROM_NAME", "SMTP_FROM_NAME", "EMAIL_FROM_NAME") || BRAND.name;
  const rawFrom = pickEnv("MAIL_FROM", "SMTP_FROM", "EMAIL_FROM");
  const from = rawFrom
    ? rawFrom.includes("<")
      ? rawFrom
      : `${fromName} <${rawFrom}>`
    : `${fromName} <${user || BRAND.email}>`;

  const adminEmail = pickEnv(
    "DONATION_ADMIN_EMAIL",
    "ADMIN_EMAIL",
    "MAIL_TO",
    "EMAIL_TO",
    "CONTACT_RECEIVER_EMAIL"
  ) || user || BRAND.email;

  return {
    host,
    port,
    secure,
    user,
    pass,
    from,
    adminEmail,
    websiteUrl: pickEnv("WEBSITE_URL", "FRONTEND_URL", "PUBLIC_SITE_URL") || BRAND.website,
    impactUrl: pickEnv("DONATION_IMPACT_URL", "WEBSITE_URL", "FRONTEND_URL", "PUBLIC_SITE_URL") || BRAND.impactUrl,
    publicContactEmail: pickEnv("PUBLIC_CONTACT_EMAIL", "COMPANY_EMAIL") || BRAND.email,
  };
};

let transporter = null;

const getTransporter = () => {
  const config = getMailConfig();

  if (!config.user || !config.pass) {
    throw new Error("SMTP credentials missing. Add SMTP_USER and SMTP_PASS in backend/.env and Render environment variables.");
  }

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: {
        user: config.user,
        pass: config.pass,
      },
    });
  }

  return transporter;
};

const sendMailSafely = async (label, mailOptions) => {
  if (isTruthy(pickEnv("EMAIL_DISABLED", "SMTP_DISABLED"))) {
    console.warn(`[email] ${label} skipped because email is disabled.`);
    return { success: false, skipped: true };
  }

  try {
    const info = await getTransporter().sendMail(mailOptions);
    console.log(`[email] ${label} sent: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(`[email] ${label} failed:`, error?.message || error);
    return { success: false, error: error?.message || String(error) };
  }
};

const unwrap = (input = {}, keys = []) => {
  if (!input || typeof input !== "object") return {};
  for (const key of keys) {
    if (input[key] && typeof input[key] === "object") return input[key];
  }
  return input;
};

const normalizeDonation = (input = {}) => {
  const donation = unwrap(input, ["donation", "data"]);

  const rawDonationType = String(donation.donationType || donation.type || "").trim().toLowerCase();
  const campaignObjectTitle = donation.campaign && typeof donation.campaign === "object"
    ? donation.campaign.title || donation.campaign.name || ""
    : "";

  const campaignTitle = String(
    donation.campaignTitleSnapshot ||
    donation.campaignTitle ||
    donation.campaignName ||
    campaignObjectTitle ||
    ""
  ).trim();

  const campaignId = donation.campaign && typeof donation.campaign === "object"
    ? donation.campaign._id?.toString?.() || donation.campaign.id || ""
    : donation.campaign?.toString?.() || "";

  const ignoredCampaignValues = new Set([
    "", "null", "undefined", "organization", "foundation", "general", "direct", "amaanitvam foundation"
  ]);

  const isCampaignDonation = rawDonationType === "campaign" ||
    Boolean(campaignTitle) ||
    Boolean(campaignId && !ignoredCampaignValues.has(String(campaignId).trim().toLowerCase()));

  const destinationName = isCampaignDonation
    ? (campaignTitle || "Selected Fundraising Campaign")
    : "Amaanitvam Foundation";

  const destinationType = isCampaignDonation
    ? "Active Fundraising Campaign"
    : "Direct Foundation Donation";

  const destinationLabel = isCampaignDonation
    ? `${destinationType} - ${destinationName}`
    : `${destinationType} - ${destinationName}`;

  return {
    id: donation._id?.toString?.() || donation.id || donation.donationId || "N/A",
    name: donation.name || donation.donorName || donation.fullName || "Donor",
    email: donation.email || donation.donorEmail || "",
    phone: donation.phone || donation.mobile || donation.contact || "N/A",
    amount: donation.amount || donation.donationAmount || 0,
    currency: donation.currency || "INR",
    paymentId: donation.razorpayPaymentId || donation.paymentId || donation.transactionId || "N/A",
    orderId: donation.razorpayOrderId || donation.orderId || "N/A",
    date: donation.updatedAt || donation.createdAt || donation.submissionTimestamp || donation.date || new Date(),
    donationType: isCampaignDonation ? "campaign" : "organization",
    campaign: isCampaignDonation ? destinationName : "",
    campaignTitle: isCampaignDonation ? destinationName : "",
    campaignId: isCampaignDonation ? campaignId : "",
    destinationName,
    destinationType,
    destinationLabel,
  };
};

const normalizeContact = (input = {}) => {
  const data = unwrap(input, ["contact", "data", "message", "enquiry"]);
  return {
    name: data.name || data.fullName || data.full_name || "Website User",
    email: data.email || data.emailAddress || "",
    phone: data.phone || data.mobile || data.phoneNumber || "N/A",
    subject: data.subject || data.inquiryType || data.type || "Website Contact Enquiry",
    message: data.message || data.description || data.query || data.comments || "N/A",
  };
};

const normalizeInternship = (input = {}) => {
  const data = unwrap(input, ["internship", "application", "applicant", "data"]);
  return {
    name: data.name || data.fullName || data.full_name || data.applicantName || "Applicant",
    email: data.email || data.emailAddress || "",
    phone: data.phone || data.mobile || data.phoneNumber || "N/A",
    domain: data.domain || data.department || data.internshipDomain || data.areaOfInterest || "Internship",
    college: data.college || data.collegeName || data.institute || "N/A",
    message: data.message || data.reason || data.coverLetter || data.comments || "N/A",
    id: data._id?.toString?.() || data.id || data.applicationId || "N/A",
  };
};

const normalizeVolunteer = (input = {}) => {
  const data = unwrap(input, ["volunteer", "application", "data"]);
  return {
    name: data.name || data.fullName || data.full_name || "Volunteer",
    email: data.email || data.emailAddress || "",
    phone: data.phone || data.mobile || data.phoneNumber || "N/A",
    interest: data.interest || data.areaOfInterest || data.program || "Volunteering",
    message: data.message || data.reason || data.comments || "N/A",
    id: data._id?.toString?.() || data.id || "N/A",
  };
};

const baseHtml = ({ title, subtitle = BRAND.name, body, accent = "#e45675" }) => `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,Helvetica,sans-serif;color:#222;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f4f4f4;padding:24px 0;">
    <tr>
      <td align="center" style="padding:0 12px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:640px;background:#ffffff;border-radius:10px;overflow:hidden;border:1px solid #e8e8e8;">
          <tr>
            <td style="background:${accent};padding:24px 28px;color:#ffffff;text-align:center;">
              <div style="font-size:24px;font-weight:800;line-height:1.3;">${escapeHtml(title)}</div>
              <div style="font-size:14px;margin-top:6px;">${escapeHtml(subtitle)}</div>
            </td>
          </tr>
          <tr>
            <td style="padding:28px;color:#222;font-size:15px;line-height:1.7;">${body}</td>
          </tr>
          <tr>
            <td style="background:#f7f7f7;padding:18px 28px;text-align:center;color:#777;font-size:12px;line-height:1.6;">
              <b>${escapeHtml(BRAND.name)}</b><br>
              <a href="mailto:${escapeHtml(getMailConfig().publicContactEmail)}" style="color:#777;text-decoration:none;">${escapeHtml(getMailConfig().publicContactEmail)}</a> &nbsp; | &nbsp;
              <a href="${escapeHtml(getMailConfig().websiteUrl)}" style="color:#777;text-decoration:none;">www.amaanitvam.org</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

const infoTable = (rows = []) => `
  <table cellpadding="8" cellspacing="0" width="100%" style="border-collapse:collapse;border:1px solid #e4e4e4;margin-top:14px;">
    ${rows.map(([key, value]) => `
      <tr>
        <td style="border:1px solid #e4e4e4;background:#fafafa;font-weight:700;width:34%;">${escapeHtml(key)}</td>
        <td style="border:1px solid #e4e4e4;">${escapeHtml(value)}</td>
      </tr>`).join("")}
  </table>`;

const donationReceiptText = (donation) => {
  const d = normalizeDonation(donation);
  return [
    `Thank you for your donation of ₹${formatAmount(d.amount)} - Amaanitvam Foundation`,
    "",
    `Dear ${d.name},`,
    "Your donation has been received successfully. You're making a real difference in the lives of underprivileged children.",
    "",
    "Donation Details:",
    `Amount Donated: ₹${formatAmount(d.amount)}`,
    `Donated To: ${d.destinationLabel}`,
    `Donation Category: ${d.destinationType}`,
    `Transaction ID: ${d.paymentId}`,
    `Order ID: ${d.orderId}`,
    `Date: ${formatDate(d.date)}`,
    "",
    d.donationType === "campaign"
      ? `Your contribution has been added to the active campaign: ${d.destinationName}.`
      : "Your contribution has been received directly by Amaanitvam Foundation for general foundation work.",
    "",
    "Your donation is eligible for tax deduction under Section 80G of the Income Tax Act. The official 80G certificate will be sent to you within 7 working days.",
    "",
    "Amaanitvam Foundation",
    BRAND.email,
    BRAND.website,
  ].join("\n");
};

const donationReceiptHtml = (donation) => {
  const d = normalizeDonation(donation);
  const config = getMailConfig();
  const destinationNote = d.donationType === "campaign"
    ? `Your contribution has been added to the active campaign: <strong>${escapeHtml(d.destinationName)}</strong>.`
    : "Your contribution has been received directly by Amaanitvam Foundation for general foundation work.";

  const body = `
    <p>Dear ${escapeHtml(d.name)},</p>
    <p>Your donation has been received successfully. You're making a real difference in the lives of underprivileged children.</p>

    <h3 style="margin:24px 0 12px;color:#7a1238;">Donation Receipt</h3>
    ${infoTable([
      ["Amount Donated", `₹${formatAmount(d.amount)}`],
      ["Donated To", d.destinationLabel],
      ["Donation Category", d.destinationType],
      ["Transaction ID", d.paymentId],
      ["Order ID", d.orderId],
      ["Date", formatDate(d.date)],
    ])}

    <p style="margin-top:18px;">${destinationNote}</p>

    <div style="margin-top:20px;padding:14px 16px;border-left:4px solid #7a1238;background:#fff6f9;">
      <strong>80G Tax Exemption Certificate</strong><br/>
      Your donation is eligible for tax deduction under Section 80G of the Income Tax Act. The official 80G certificate will be sent to you within 7 working days.
    </div>

    <p style="margin-top:22px;">Thank you for supporting Amaanitvam Foundation.</p>
    <p><a href="${escapeHtml(config.impactUrl)}">See Your Impact →</a></p>
  `;

  return baseHtml({
    title: "Donation Receipt",
    subtitle: "Thank You for Your Generosity!",
    body,
    accent: "#7a1238",
  });
};

const adminDonationText = (donation) => {
  const d = normalizeDonation(donation);
  return [
    "New donation received",
    `Name: ${d.name}`,
    `Email: ${d.email}`,
    `Phone: ${d.phone}`,
    `Amount: ₹${formatAmount(d.amount)}`,
    `Donated To: ${d.destinationLabel}`,
    `Donation Category: ${d.destinationType}`,
    `Transaction ID: ${d.paymentId}`,
    `Order ID: ${d.orderId}`,
    `Date: ${formatDate(d.date)}`,
  ].join("\n");
};

const adminDonationHtml = (donation) => {
  const d = normalizeDonation(donation);
  return baseHtml({
    title: d.donationType === "campaign" ? "New Campaign Donation Received" : "New Direct Donation Received",
    body: infoTable([
      ["Name", d.name],
      ["Email", d.email],
      ["Phone", d.phone],
      ["Amount", `₹${formatAmount(d.amount)}`],
      ["Donated To", d.destinationLabel],
      ["Donation Category", d.destinationType],
      ["Transaction ID", d.paymentId],
      ["Order ID", d.orderId],
      ["Date", formatDate(d.date)],
    ]),
  });
};

const genericAdminEmail = async ({ label, subject, rows, replyTo }) => {
  const config = getMailConfig();
  const table = infoTable(rows);
  return sendMailSafely(label, {
    from: config.from,
    to: config.adminEmail,
    replyTo: replyTo || config.adminEmail,
    subject,
    text: rows.map(([key, value]) => `${key}: ${value}`).join("\n"),
    html: baseHtml({ title: subject, body: table }),
  });
};

const genericUserEmail = async ({ label, to, subject, title, greetingName, message }) => {
  if (!to) {
    console.warn(`[email] ${label} skipped because recipient email is missing.`);
    return { success: false, skipped: true, reason: "missing_recipient_email" };
  }

  const config = getMailConfig();
  const body = `
    <p>Dear ${escapeHtml(greetingName || "User")},</p>
    <p>${escapeHtml(message)}</p>
    <p>Regards,<br><b>Amaanitvam Foundation</b></p>`;

  return sendMailSafely(label, {
    from: config.from,
    to,
    replyTo: config.adminEmail,
    subject,
    text: stripHtml(body),
    html: baseHtml({ title, body }),
  });
};

export const sendDonationReceiptEmail = async ({ donation } = {}) => {
  const d = normalizeDonation(donation);

  if (!d.email) {
    console.warn("[email] Donation receipt skipped because donor email is missing.");
    return { success: false, skipped: true, reason: "missing_donor_email" };
  }

  const config = getMailConfig();
  const subject = d.donationType === "campaign"
    ? `Thank You for Supporting ${d.destinationName} - ₹${formatAmount(d.amount)}`
    : `Thank You for Your Donation of ₹${formatAmount(d.amount)} - Amaanitvam Foundation`;

  const result = await sendMailSafely("donation receipt", {
    from: config.from,
    to: d.email,
    replyTo: config.adminEmail,
    subject,
    text: donationReceiptText(donation),
    html: donationReceiptHtml(donation),
  });

  if (result.success) console.log(`[email] donation receipt delivered to ${maskEmail(d.email)} for ${d.destinationLabel}`);
  return result;
};

export const sendDonationAdminEmail = async ({ donation } = {}) => {
  const d = normalizeDonation(donation);
  const config = getMailConfig();
  const subject = d.donationType === "campaign"
    ? `New Campaign Donation - ${d.destinationName} - ₹${formatAmount(d.amount)}`
    : `New Direct Foundation Donation - ₹${formatAmount(d.amount)}`;

  return sendMailSafely("admin donation notification", {
    from: config.from,
    to: config.adminEmail,
    replyTo: d.email || config.adminEmail,
    subject,
    text: adminDonationText(donation),
    html: adminDonationHtml(donation),
  });
};

export const sendAdminNotificationEmail = async (input = {}) => {
  const contact = normalizeContact(input);
  return genericAdminEmail({
    label: "contact admin notification",
    subject: `New Contact Form Submission - ${contact.subject}`,
    replyTo: contact.email,
    rows: [
      ["Name", contact.name],
      ["Email", contact.email],
      ["Phone", contact.phone],
      ["Subject", contact.subject],
      ["Message", contact.message],
    ],
  });
};

export const sendUserAutoReplyEmail = async (input = {}) => {
  const contact = normalizeContact(input);
  return genericUserEmail({
    label: "contact user auto reply",
    to: contact.email,
    subject: "We received your message - Amaanitvam Foundation",
    title: "Thank you for contacting us",
    greetingName: contact.name,
    message: "We have received your message successfully. Our team will get back to you soon.",
  });
};

export const sendInternshipConfirmationEmail = async (input = {}) => {
  const internship = normalizeInternship(input);
  return genericUserEmail({
    label: "internship confirmation",
    to: internship.email,
    subject: "Internship Application Received - Amaanitvam Foundation",
    title: "Internship Application Received",
    greetingName: internship.name,
    message: `Thank you for applying for the ${internship.domain} internship at Amaanitvam Foundation. Our team has received your application and will review it shortly.`,
  });
};

export const sendInternshipAdminEmail = async (input = {}) => {
  const internship = normalizeInternship(input);
  return genericAdminEmail({
    label: "internship admin notification",
    subject: `New Internship Application - ${internship.domain}`,
    replyTo: internship.email,
    rows: [
      ["Name", internship.name],
      ["Email", internship.email],
      ["Phone", internship.phone],
      ["Domain", internship.domain],
      ["College", internship.college],
      ["Application ID", internship.id],
      ["Message", internship.message],
    ],
  });
};

export const sendVolunteerConfirmationEmail = async (input = {}) => {
  const volunteer = normalizeVolunteer(input);
  return genericUserEmail({
    label: "volunteer confirmation",
    to: volunteer.email,
    subject: "Volunteer Application Received - Amaanitvam Foundation",
    title: "Volunteer Application Received",
    greetingName: volunteer.name,
    message: "Thank you for showing interest in volunteering with Amaanitvam Foundation. Our team has received your details and will contact you soon.",
  });
};

export const sendVolunteerAdminEmail = async (input = {}) => {
  const volunteer = normalizeVolunteer(input);
  return genericAdminEmail({
    label: "volunteer admin notification",
    subject: `New Volunteer Application - ${volunteer.interest}`,
    replyTo: volunteer.email,
    rows: [
      ["Name", volunteer.name],
      ["Email", volunteer.email],
      ["Phone", volunteer.phone],
      ["Interest", volunteer.interest],
      ["Application ID", volunteer.id],
      ["Message", volunteer.message],
    ],
  });
};

const genericEmailByFunctionName = (functionName) => async (input = {}) => {
  const config = getMailConfig();
  const data = unwrap(input, ["data", "payload", "application", "contact", "donation", "volunteer", "internship"]);
  const to = data.email || data.to || data.recipientEmail || input.email || input.to;
  const name = data.name || data.fullName || input.name || "User";
  const isAdminFunction = /Admin|Notification|Notify/i.test(functionName);
  const subject = data.subject || `${functionName.replace(/([A-Z])/g, " $1").trim()} - Amaanitvam Foundation`;
  const rows = Object.entries(data)
    .filter(([, value]) => value !== undefined && value !== null && typeof value !== "object")
    .slice(0, 20)
    .map(([key, value]) => [key, String(value)]);

  if (isAdminFunction) {
    return genericAdminEmail({
      label: functionName,
      subject,
      replyTo: to,
      rows: rows.length ? rows : [["Details", "New website submission received."]],
    });
  }

  return genericUserEmail({
    label: functionName,
    to,
    subject,
    title: subject,
    greetingName: name,
    message: "Your request has been received successfully. Our team will review it and contact you soon.",
  });
};

export const sendContactNotificationEmail = sendAdminNotificationEmail;
export const sendContactAutoReplyEmail = sendUserAutoReplyEmail;
export const sendContactAdminEmail = sendAdminNotificationEmail;
export const sendContactUserEmail = sendUserAutoReplyEmail;
export const sendApplicationConfirmationEmail = sendInternshipConfirmationEmail;
export const sendApplicationAdminEmail = sendInternshipAdminEmail;
export const sendVolunteerApplicationEmail = sendVolunteerConfirmationEmail;
export const sendVolunteerNotificationEmail = sendVolunteerAdminEmail;

export const verifyEmailTransport = async () => {
  await getTransporter().verify();
  console.log("[email] SMTP connection verified successfully.");
  return true;
};

export const verifyDonationEmailConfig = verifyEmailTransport;

export const sendTestEmail = async (to) => {
  const config = getMailConfig();
  return sendMailSafely("test email", {
    from: config.from,
    to,
    subject: "Amaanitvam Foundation Email Test",
    text: "Email service is working.",
    html: baseHtml({ title: "Email Test Successful", body: "<p>Email service is working.</p>" }),
  });
};

// Auto-added compatibility exports for existing controllers.
export const getRazorpayInstance = genericEmailByFunctionName("getRazorpayInstance");

export default {
  getRazorpayInstance,
  sendAdminNotificationEmail,
  sendApplicationAdminEmail,
  sendApplicationConfirmationEmail,
  sendContactAdminEmail,
  sendContactAutoReplyEmail,
  sendContactNotificationEmail,
  sendContactUserEmail,
  sendDonationAdminEmail,
  sendDonationReceiptEmail,
  sendInternshipAdminEmail,
  sendInternshipConfirmationEmail,
  sendTestEmail,
  sendUserAutoReplyEmail,
  sendVolunteerAdminEmail,
  sendVolunteerApplicationEmail,
  sendVolunteerConfirmationEmail,
  sendVolunteerNotificationEmail,
  verifyDonationEmailConfig,
  verifyEmailTransport,
};
