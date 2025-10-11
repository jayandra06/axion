import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import Settings from "@/models/Settings";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    let settings = await Settings.findOne();
    
    // Create default settings if none exist
    if (!settings) {
      settings = await Settings.create({
        razorpay: { keyId: "", keySecret: "", webhookSecret: "" },
        gst: { gstRate: "18", gstNumber: "", enableGst: false },
        general: {
          siteName: "Axion Scientifics",
          siteEmail: "info@axionscientifics.com",
          sitePhone: "+91 XXX XXX XXXX",
          lowStockThreshold: "10",
        },
      });
    }

    return NextResponse.json(settings);
  } catch (error: any) {
    console.error("Get settings error:", error);
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

    const data = await request.json();

    let settings = await Settings.findOne();
    
    if (settings) {
      // Update existing settings
      settings.razorpay = data.razorpay;
      settings.gst = data.gst;
      settings.general = data.general;
      await settings.save();
    } else {
      // Create new settings
      settings = await Settings.create(data);
    }

    return NextResponse.json({ message: "Settings saved successfully", settings });
  } catch (error: any) {
    console.error("Save settings error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

