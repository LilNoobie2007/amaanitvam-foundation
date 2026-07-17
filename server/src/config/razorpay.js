import Razorpay from "razorpay";

let razorpayInstance = null;

try {
  if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
    razorpayInstance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  } else {
    console.warn("Razorpay initialization skipped: missing credentials in env.");
  }
} catch (error) {
  console.warn("Error initializing Razorpay:", error.message);
}

export default razorpayInstance;
