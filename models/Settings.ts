import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISettings extends Document {
  razorpay: {
    keyId: string;
    keySecret: string;
    webhookSecret: string;
  };
  gst: {
    gstRate: string;
    gstNumber: string;
    enableGst: boolean;
  };
  general: {
    siteName: string;
    siteEmail: string;
    sitePhone: string;
    lowStockThreshold: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const SettingsSchema: Schema = new Schema(
  {
    razorpay: {
      keyId: String,
      keySecret: String,
      webhookSecret: String,
    },
    gst: {
      gstRate: { type: String, default: "18" },
      gstNumber: String,
      enableGst: { type: Boolean, default: false },
    },
    general: {
      siteName: { type: String, default: "Axion Scientifics" },
      siteEmail: String,
      sitePhone: String,
      lowStockThreshold: { type: String, default: "10" },
    },
  },
  {
    timestamps: true,
  }
);

const Settings: Model<ISettings> =
  mongoose.models.Settings || mongoose.model<ISettings>("Settings", SettingsSchema);

export default Settings;

