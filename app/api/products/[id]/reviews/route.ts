import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import Review from "@/models/Review";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();

    const { id } = await params;
    const reviews = await Review.find({ productId: id })
      .populate("userId", "name")
      .sort({ createdAt: -1 });

    // Calculate average rating
    const avgRating = reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

    // Rating distribution
    const distribution = [5, 4, 3, 2, 1].map((rating) => ({
      rating,
      count: reviews.filter((r) => r.rating === rating).length,
      percentage: reviews.length > 0 
        ? (reviews.filter((r) => r.rating === rating).length / reviews.length) * 100 
        : 0,
    }));

    return NextResponse.json({
      reviews,
      stats: {
        total: reviews.length,
        avgRating: Math.round(avgRating * 10) / 10,
        distribution,
      },
    });
  } catch (error: any) {
    console.error("Get reviews error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const { rating, comment } = await request.json();
    const { id } = await params;

    if (!rating || !comment) {
      return NextResponse.json({ message: "Rating and comment are required" }, { status: 400 });
    }

    const review = await Review.create({
      productId: id,
      userId: session.user.id,
      userName: session.user.name,
      rating,
      comment,
      isVerifiedPurchase: false, // TODO: Check if user purchased this product
    });

    return NextResponse.json({ message: "Review submitted successfully", review });
  } catch (error: any) {
    console.error("Create review error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

