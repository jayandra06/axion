import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Category from "@/models/Category";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const categories = await Category.find({}).sort({ name: 1 });

    return NextResponse.json({ categories });
  } catch (error: any) {
    console.error("Categories API error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}


