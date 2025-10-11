import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";
import { verifyRazorpaySignature } from "@/lib/razorpay";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { orderId, razorpayOrderId, razorpayPaymentId, razorpaySignature } =
      await request.json();

    await connectDB();

    // Verify signature
    const isValid = verifyRazorpaySignature(
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature
    );

    if (!isValid) {
      // Update order as failed
      await Order.findByIdAndUpdate(orderId, {
        paymentStatus: "failed",
      });
      return NextResponse.json({ message: "Invalid signature" }, { status: 400 });
    }

    // Update order as completed
    const order = await Order.findByIdAndUpdate(
      orderId,
      {
        paymentStatus: "completed",
        orderStatus: "processing",
        razorpayPaymentId,
        razorpaySignature,
      },
      { new: true }
    );

    return NextResponse.json({
      message: "Payment verified successfully",
      order,
    });
  } catch (error: any) {
    console.error("Verify payment error:", error);
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}


