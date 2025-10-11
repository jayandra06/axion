import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const productData = await request.json();

    const product = await Product.create(productData);

    return NextResponse.json({
      message: "Product created successfully",
      product,
    });
  } catch (error: any) {
    console.error("Create product error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

