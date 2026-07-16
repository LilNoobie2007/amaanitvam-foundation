import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env") });

const { verifyEmailTransport, sendDonationReceiptEmail } = await import("../services/emailService.js");

const to = process.argv[2] || process.env.TEST_EMAIL || process.env.SMTP_USER || process.env.EMAIL_USER;

if (!to) {
  console.error("Usage: node scripts/checkDonationEmail.js your-email@example.com");
  process.exit(1);
}

try {
  await verifyEmailTransport();
  await sendDonationReceiptEmail({
    donation: {
      _id: "LOCAL-EMAIL-TEST",
      name: "Donation Email Test",
      email: to,
      phone: "9999999999",
      amount: 50,
      razorpayPaymentId: "pay_TEST123456789",
      razorpayOrderId: "order_TEST123456789",
      createdAt: new Date(),
      campaignTitleSnapshot: "Amaanitvam Foundation",
    },
  });
  console.log("Donation email test completed.");
} catch (error) {
  console.error("Donation email test failed:", error?.message || error);
  process.exit(1);
}
