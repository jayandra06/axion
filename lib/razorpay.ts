import Razorpay from "razorpay";

if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  console.warn("⚠️  Razorpay credentials not found in environment variables");
}

export const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "",
});

export async function createRazorpayOrder(
  amount: number,
  receipt: string
): Promise<any> {
  const options = {
    amount: amount * 100, // amount in paise
    currency: "INR",
    receipt: receipt,
  };

  return await razorpayInstance.orders.create(options);
}

export function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  const crypto = require("crypto");
  const text = orderId + "|" + paymentId;
  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
    .update(text)
    .digest("hex");

  return generatedSignature === signature;
}

