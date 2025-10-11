import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const total = await Product.countDocuments();
    const inventory = await Product.countDocuments({ status: "inventory" });
    const catalogue = await Product.countDocuments({ status: "catalogue" });

    // Low stock products (stock < threshold)
    const lowStockProducts = await Product.find({
      status: "inventory",
      $expr: { $lt: ["$buyingOptions.axion.stock", "$lowStockThreshold"] },
    });

    return NextResponse.json({
      total,
      inventory,
      catalogue,
      lowStock: lowStockProducts.length,
      lowStockProducts,
    });
  } catch (error: any) {
    console.error("Product stats error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}


