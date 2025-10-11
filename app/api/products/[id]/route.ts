import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import FlashSale from "@/models/FlashSale";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();

    const { id } = await params;
    const product = await Product.findById(id).populate("category");

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    // Check for flash sale
    const now = new Date();
    const flashSale = await FlashSale.findOne({
      productId: id,
      isActive: true,
      startDate: { $lte: now },
      endDate: { $gte: now },
    });

    const productObj: any = product.toObject();
    if (flashSale) {
      productObj.flashSale = {
        discount: flashSale.discountPercentage,
        endDate: flashSale.endDate,
        maxQuantity: flashSale.maxQuantity,
        soldQuantity: flashSale.soldQuantity,
      };
    }

    // Get related products
    const relatedProducts = await Product.find({
      category: product.category,
      _id: { $ne: id },
      isActive: true,
    })
      .limit(4)
      .populate("category");

    return NextResponse.json({
      product: productObj,
      relatedProducts,
    });
  } catch (error: any) {
    console.error("Product detail API error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

