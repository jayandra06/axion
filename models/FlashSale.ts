import mongoose, { Schema, Document, Model } from "mongoose";

export interface IFlashSale extends Document {
  productId: mongoose.Types.ObjectId;
  discountPercentage: number;
  startDate: Date;
  endDate: Date;
  maxQuantity: number;
  soldQuantity: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const FlashSaleSchema: Schema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    discountPercentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    maxQuantity: {
      type: Number,
      required: true,
      min: 1,
    },
    soldQuantity: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for active flash sales
FlashSaleSchema.index({ isActive: 1, startDate: 1, endDate: 1 });

const FlashSale: Model<IFlashSale> =
  mongoose.models.FlashSale || mongoose.model<IFlashSale>("FlashSale", FlashSaleSchema);

export default FlashSale;


