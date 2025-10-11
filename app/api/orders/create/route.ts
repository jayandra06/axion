import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { createRazorpayOrder } from "@/lib/razorpay";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { items, totalAmount, shippingAddress } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ message: "No items in order" }, { status: 400 });
    }

    await connectDB();

    // Verify stock availability
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return NextResponse.json(
          { message: `Product ${item.productName} not found` },
          { status: 404 }
        );
      }
      if (product.buyingOptions.axion.stock < item.quantity) {
        return NextResponse.json(
          { message: `Insufficient stock for ${item.productName}` },
          { status: 400 }
        );
      }
    }

    // Create Razorpay order
    const razorpayOrder = await createRazorpayOrder(
      totalAmount,
      `order_${Date.now()}`
    );

    // Create order in database
    const order = await Order.create({
      userId: session.user.id,
      items,
      totalAmount,
      shippingAddress,
      razorpayOrderId: razorpayOrder.id,
      paymentStatus: "pending",
      orderStatus: "pending",
    });

    // Reduce stock
    for (const item of items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { "buyingOptions.axion.stock": -item.quantity },
      });
    }

    return NextResponse.json({
      order,
      razorpayOrder,
    });
  } catch (error: any) {
    console.error("Create order error:", error);
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}


