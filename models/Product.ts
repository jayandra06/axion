import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBuyingOption {
  amazon?: {
    link: string;
    price: number;
  };
  flipkart?: {
    link: string;
    price: number;
  };
  axion: {
    price: number;
    stock: number;
  };
}

export interface IProduct extends Document {
  name: string;
  description: string;
  category: mongoose.Types.ObjectId;
  images: string[];
  buyingOptions: IBuyingOption;
  status: "catalogue" | "inventory";
  tags: string[];
  species: string[];
  market: "national" | "international";
  isActive: boolean;
  lowStockThreshold: number;
  ingredients?: string;
  benefits?: string[];
  dosage?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    buyingOptions: {
      amazon: {
        link: String,
        price: Number,
      },
      flipkart: {
        link: String,
        price: Number,
      },
      axion: {
        price: {
          type: Number,
          required: true,
        },
        stock: {
          type: Number,
          default: 0,
        },
      },
    },
    status: {
      type: String,
      enum: ["catalogue", "inventory"],
      default: "catalogue",
    },
    tags: {
      type: [String],
      default: [],
      enum: ["featured", "frequent", "seasonal", "special-offer", "new-arrival"],
    },
    species: {
      type: [String],
      default: [],
      enum: ["aqua", "poultry", "dairy", "swine", "equine", "sheep-goat"],
    },
    market: {
      type: String,
      enum: ["national", "international"],
      default: "national",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lowStockThreshold: {
      type: Number,
      default: 10,
    },
    ingredients: {
      type: String,
    },
    benefits: {
      type: [String],
      default: [],
    },
    dosage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Index for searching
ProductSchema.index({ name: "text", description: "text" });

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;


