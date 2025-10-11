import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import FlashSale from "@/models/FlashSale";

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const { id } = await params;
    const flashSale = await FlashSale.findByIdAndDelete(id);

    if (!flashSale) {
      return NextResponse.json({ message: "Flash sale not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Flash sale deleted successfully" });
  } catch (error: any) {
    console.error("Delete flash sale error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

