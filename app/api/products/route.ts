import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import Category from "@/models/Category";
import FlashSale from "@/models/FlashSale";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const species = searchParams.get("species") || "";
    const market = searchParams.get("market") || "";
    const tags = searchParams.get("tags") || "";
    const minPrice = searchParams.get("minPrice") || "";
    const maxPrice = searchParams.get("maxPrice") || "";
    const status = searchParams.get("status") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");

    // Build query
    const query: any = { isActive: true };

    if (search) {
      query.$text = { $search: search };
    }

    if (category) {
      query.category = category;
    }

    if (species) {
      query.species = species;
    }

    if (market) {
      query.market = market;
    }

    if (tags) {
      query.tags = { $in: tags.split(",") };
    }

    if (minPrice || maxPrice) {
      query["buyingOptions.axion.price"] = {};
      if (minPrice) query["buyingOptions.axion.price"].$gte = parseFloat(minPrice);
      if (maxPrice) query["buyingOptions.axion.price"].$lte = parseFloat(maxPrice);
    }

    if (status) {
      query.status = status;
    }

    // Pagination
    const skip = (page - 1) * limit;

    // Execute query
    const products = await Product.find(query)
      .populate("category")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments(query);

    // Check for flash sales
    const now = new Date();
    const flashSales = await FlashSale.find({
      isActive: true,
      startDate: { $lte: now },
      endDate: { $gte: now },
    });

    const flashSaleMap = new Map();
    flashSales.forEach((sale) => {
      flashSaleMap.set(sale.productId.toString(), sale);
    });

    // Add flash sale info to products
    const productsWithSales = products.map((product) => {
      const productObj: any = product.toObject();
      const flashSale = flashSaleMap.get((product._id as any).toString());
      if (flashSale) {
        productObj.flashSale = {
          discount: flashSale.discountPercentage,
          endDate: flashSale.endDate,
          maxQuantity: flashSale.maxQuantity,
          soldQuantity: flashSale.soldQuantity,
        };
      }
      return productObj;
    });

    return NextResponse.json({
      products: productsWithSales,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error("Products API error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

