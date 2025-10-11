import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const { id } = await params;
    const product = await Product.findByIdAndUpdate(
      id,
      { status: "inventory" },
      { new: true }
    );

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Product promoted to inventory successfully",
      product,
    });
  } catch (error: any) {
    console.error("Promote product error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

