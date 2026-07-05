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
    campaign: donation.campaignTitleSnapshot || donation.campaignTitle || donation.campaign || "Amaanitvam Foundation",
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
    `Amount Donated: ₹${formatAmount(d.amount)}`,
    `Transaction ID: ${d.paymentId}`,
    `Order ID: ${d.orderId}`,
    `Date: ${formatDate(d.date)}`,
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
  const amount = formatAmount(d.amount);
  const donorName = escapeHtml(d.name);
  const paymentId = escapeHtml(d.paymentId);
  const orderId = escapeHtml(d.orderId);
  const date = escapeHtml(formatDate(d.date));
  const websiteUrl = escapeHtml(config.websiteUrl);
  const impactUrl = escapeHtml(config.impactUrl);
  const brandEmail = escapeHtml(config.publicContactEmail);

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Donation Receipt</title>
</head>
<body style="margin:0;padding:0;background:#111111;font-family:Arial,Helvetica,sans-serif;color:#ffffff;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#111111;margin:0;padding:24px 0;">
    <tr>
      <td align="center" style="padding:0 12px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:650px;background:#151515;border:1px solid #242424;overflow:hidden;">
          <tr>
            <td align="center" style="background:#e45675;background-image:linear-gradient(135deg,#e45675,#dc4f70);padding:28px 20px;color:#ffffff;">
              <div style="font-size:26px;font-weight:800;line-height:1.25;">🙏 Thank You for Your Generosity!</div>
              <div style="font-size:16px;margin-top:8px;color:#ffe9ee;">Amaanitvam Foundation</div>
            </td>
          </tr>

          <tr>
            <td style="padding:30px 36px 18px 36px;background:#111111;color:#ffffff;">
              <div style="text-align:center;margin-bottom:28px;">
                <span style="display:inline-block;background:#19c385;color:#ffffff;border-radius:999px;padding:10px 24px;font-weight:700;font-size:14px;">✓ Payment Successful</span>
              </div>

              <p style="margin:0 0 18px 0;color:#ffffff;font-size:16px;line-height:1.6;"><b>Dear ${donorName},</b></p>
              <p style="margin:0 0 24px 0;color:#d7d7d7;font-size:15px;line-height:1.8;">
                Your donation has been received successfully. You're making a real difference in the lives of underprivileged children. Every rupee you contribute helps provide education, nutrition, and hope to those in need.
              </p>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#202020;border:1px solid #3a3a3a;border-radius:8px;margin:0 0 28px 0;">
                <tr>
                  <td style="padding:24px 26px;">
                    <div style="font-size:17px;font-weight:800;letter-spacing:1.5px;color:#ffffff;margin-bottom:26px;">🧾 DONATION RECEIPT</div>

                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="padding:0 0 20px 0;color:#bfbfbf;font-size:14px;">Amount Donated</td>
                        <td align="right" style="padding:0 0 20px 0;color:#e45675;font-size:26px;font-weight:800;">₹${amount}</td>
                      </tr>
                      <tr>
                        <td colspan="2" style="border-top:1px solid #3a3a3a;height:18px;line-height:18px;font-size:1px;">&nbsp;</td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;color:#bfbfbf;font-size:14px;">Transaction ID</td>
                        <td align="right" style="padding:6px 0;color:#ffffff;font-size:14px;font-weight:700;font-family:Courier New,monospace;word-break:break-all;">${paymentId}</td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;color:#bfbfbf;font-size:14px;">Order ID</td>
                        <td align="right" style="padding:6px 0;color:#ffffff;font-size:14px;font-weight:700;font-family:Courier New,monospace;word-break:break-all;">${orderId}</td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;color:#bfbfbf;font-size:14px;">Date</td>
                        <td align="right" style="padding:6px 0;color:#ffffff;font-size:14px;font-weight:700;">${date}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#1e2633;border-left:4px solid #2d8cff;border-radius:7px;margin:0 0 30px 0;">
                <tr>
                  <td style="padding:20px 22px;">
                    <div style="font-size:15px;color:#cbd8ff;font-weight:800;margin-bottom:8px;">📋 80G Tax Exemption Certificate</div>
                    <div style="font-size:14px;line-height:1.7;color:#dbe5ff;">
                      Your donation is eligible for tax deduction under Section 80G of the Income Tax Act. The official 80G certificate will be sent to you within 7 working days.
                    </div>
                  </td>
                </tr>
              </table>

              <div style="text-align:center;color:#cfcfcf;font-weight:700;font-size:15px;margin:0 0 22px 0;">Your contribution helps us:</div>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 30px 0;">
                <tr>
                  <td align="center" width="33.33%" style="color:#d7d7d7;font-size:13px;line-height:1.5;padding:0 4px;">
                    <div style="font-size:30px;margin-bottom:8px;">📚</div>
                    Provide Education
                  </td>
                  <td align="center" width="33.33%" style="color:#d7d7d7;font-size:13px;line-height:1.5;padding:0 4px;">
                    <div style="font-size:30px;margin-bottom:8px;">🍱</div>
                    Serve Nutritious Meals
                  </td>
                  <td align="center" width="33.33%" style="color:#d7d7d7;font-size:13px;line-height:1.5;padding:0 4px;">
                    <div style="font-size:30px;margin-bottom:8px;">🏥</div>
                    Healthcare Support
                  </td>
                </tr>
              </table>

              <div style="text-align:center;margin:0 0 28px 0;">
                <a href="${impactUrl}" target="_blank" style="display:inline-block;background:#e45675;color:#ffffff;text-decoration:none;border-radius:6px;padding:16px 34px;font-weight:800;font-size:14px;">See Your Impact →</a>
              </div>
            </td>
          </tr>

          <tr>
            <td align="center" style="background:#181818;padding:28px 30px 20px 30px;border-top:1px solid #202020;">
              <div style="font-size:18px;color:#ffffff;font-weight:800;margin-bottom:10px;">Amaanitvam Foundation</div>
              <div style="font-size:14px;color:#8f8f8f;margin-bottom:16px;">Empowering Children Through Education</div>
              <div style="font-size:13px;color:#cfcfcf;line-height:1.8;">
                📧 <a href="mailto:${brandEmail}" style="color:#cfcfcf;text-decoration:none;">${brandEmail}</a><br>
                🌐 <a href="${websiteUrl}" target="_blank" style="color:#cfcfcf;text-decoration:none;">www.amaanitvam.org</a>
              </div>
              <div style="font-size:13px;color:#8f8f8f;margin-top:18px;">Twitter &nbsp;&nbsp;&nbsp; Facebook &nbsp;&nbsp;&nbsp; Instagram</div>
              <div style="border-top:1px solid #2c2c2c;margin-top:24px;padding-top:18px;font-size:11px;color:#999999;line-height:1.6;">
                This is an automated email. For queries, please reply to this email or contact us at the address above.
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};

const adminDonationText = (donation) => {
  const d = normalizeDonation(donation);
  return [
    "New donation received",
    `Name: ${d.name}`,
    `Email: ${d.email}`,
    `Phone: ${d.phone}`,
    `Amount: ₹${formatAmount(d.amount)}`,
    `Transaction ID: ${d.paymentId}`,
    `Order ID: ${d.orderId}`,
    `Date: ${formatDate(d.date)}`,
  ].join("\n");
};

const adminDonationHtml = (donation) => {
  const d = normalizeDonation(donation);
  return baseHtml({
    title: "New Donation Received",
    body: infoTable([
      ["Name", d.name],
      ["Email", d.email],
      ["Phone", d.phone],
      ["Amount", `₹${formatAmount(d.amount)}`],
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
  const subject = `Thank You for Your Donation of ₹${formatAmount(d.amount)} - Amaanitvam Foundation`;

  const result = await sendMailSafely("donation receipt", {
    from: config.from,
    to: d.email,
    replyTo: config.adminEmail,
    subject,
    text: donationReceiptText(donation),
    html: donationReceiptHtml(donation),
  });

  if (result.success) console.log(`[email] donation receipt delivered to ${maskEmail(d.email)}`);
  return result;
};

export const sendDonationAdminEmail = async ({ donation } = {}) => {
  const d = normalizeDonation(donation);
  const config = getMailConfig();
  const subject = `New Donation Received - ₹${formatAmount(d.amount)}`;

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
