import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import FlashSale from "@/models/FlashSale";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const flashSales = await FlashSale.find({}).populate("productId").sort({ createdAt: -1 });

    return NextResponse.json({ flashSales });
  } catch (error: any) {
    console.error("Get flash sales error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const { productId, discountPercentage, startDate, endDate, maxQuantity } =
      await request.json();

    const flashSale = await FlashSale.create({
      productId,
      discountPercentage,
      startDate,
      endDate,
      maxQuantity,
      soldQuantity: 0,
      isActive: true,
    });

    return NextResponse.json({ message: "Flash sale created successfully", flashSale });
  } catch (error: any) {
    console.error("Create flash sale error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}


