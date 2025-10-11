import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

// Import models
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  phone: String,
  createdAt: { type: Date, default: Date.now },
});

const CategorySchema = new mongoose.Schema({
  name: String,
  slug: String,
  description: String,
});

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: mongoose.Schema.Types.ObjectId,
  images: [String],
  buyingOptions: {
    amazon: { link: String, price: Number },
    flipkart: { link: String, price: Number },
    axion: { price: Number, stock: Number },
  },
  status: String,
  tags: [String],
  species: [String],
  market: String,
  isActive: Boolean,
  lowStockThreshold: Number,
  benefits: [String],
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
const Category = mongoose.models.Category || mongoose.model("Category", CategorySchema);
const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

async function seed() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/axion-ecommerce";
    
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing data
    await User.deleteMany({});
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log("🗑️  Cleared existing data");

    // Create admin user
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await User.create({
      name: "Admin User",
      email: "admin@axionscientifics.com",
      password: hashedPassword,
      role: "admin",
      phone: "+91 9876543210",
    });
    console.log("👤 Created admin user");

    // Create categories
    const aquaCategory = await Category.create({
      name: "Aquaculture",
      slug: "aquaculture",
      description: "Products for fish and shrimp farming",
    });

    const poultryCategory = await Category.create({
      name: "Poultry",
      slug: "poultry",
      description: "Products for chicken, duck, and other birds",
    });

    const dairyCategory = await Category.create({
      name: "Dairy & Cattle",
      slug: "dairy-cattle",
      description: "Products for cows, buffaloes, and dairy animals",
    });

    console.log("📁 Created categories");

    // Create sample products
    const products = [
      {
        name: "Aqua Raksha",
        description:
          "Herbal formulation optimized for aquaculture species like fish and shrimp. Promotes water quality adaptation, disease resistance, and accelerated growth.",
        category: aquaCategory._id,
        images: [],
        buyingOptions: {
          amazon: {
            link: "https://amazon.in/aqua-raksha",
            price: 1200,
          },
          flipkart: {
            link: "https://flipkart.com/aqua-raksha",
            price: 1150,
          },
          axion: {
            price: 1000,
            stock: 50,
          },
        },
        status: "inventory",
        tags: ["featured", "frequent"],
        species: ["aqua"],
        market: "national",
        isActive: true,
        lowStockThreshold: 10,
        benefits: [
          "Promotes faster growth",
          "Enhances disease resistance",
          "Improves water quality adaptation",
        ],
      },
      {
        name: "Poultry Raksha",
        description:
          "Potent natural blend enhancing immunity, feed conversion, and weight gain in poultry farms.",
        category: poultryCategory._id,
        images: [],
        buyingOptions: {
          amazon: {
            link: "https://amazon.in/poultry-raksha",
            price: 950,
          },
          flipkart: {
            link: "https://flipkart.com/poultry-raksha",
            price: 900,
          },
          axion: {
            price: 800,
            stock: 75,
          },
        },
        status: "inventory",
        tags: ["featured", "special-offer"],
        species: ["poultry"],
        market: "national",
        isActive: true,
        lowStockThreshold: 15,
        benefits: [
          "Enhances immunity naturally",
          "Improves feed conversion",
          "Increases weight gain",
        ],
      },
      {
        name: "Pashu Raksha",
        description:
          "Specialized supplements supporting health, lactation, and immunity in milking and meat animals (cows, buffaloes, sheep, goats).",
        category: dairyCategory._id,
        images: [],
        buyingOptions: {
          axion: {
            price: 1500,
            stock: 40,
          },
        },
        status: "inventory",
        tags: ["featured"],
        species: ["dairy"],
        market: "national",
        isActive: true,
        lowStockThreshold: 10,
        benefits: [
          "Supports lactation",
          "Boosts immunity",
          "Improves overall health",
        ],
      },
      {
        name: "HerbiGuard Aqua",
        description:
          "Advanced aquafeed supplement for disease prevention and growth promotion in aquaculture globally.",
        category: aquaCategory._id,
        images: [],
        buyingOptions: {
          amazon: {
            link: "https://amazon.com/herbiguard-aqua",
            price: 2500,
          },
          axion: {
            price: 2200,
            stock: 30,
          },
        },
        status: "catalogue",
        tags: ["new-arrival"],
        species: ["aqua"],
        market: "international",
        isActive: true,
        lowStockThreshold: 5,
        benefits: [
          "Disease prevention",
          "Growth promotion",
          "International quality standards",
        ],
      },
      {
        name: "HerbiGuard Plume",
        description:
          "Targeted for robust poultry health and growth with enhanced disease resistance.",
        category: poultryCategory._id,
        images: [],
        buyingOptions: {
          flipkart: {
            link: "https://flipkart.com/herbiguard-plume",
            price: 1800,
          },
          axion: {
            price: 1600,
            stock: 25,
          },
        },
        status: "catalogue",
        tags: ["seasonal"],
        species: ["poultry"],
        market: "international",
        isActive: true,
        lowStockThreshold: 8,
        benefits: [
          "Enhanced disease resistance",
          "Robust health",
          "Accelerated growth",
        ],
      },
    ];

    await Product.insertMany(products);
    console.log("📦 Created sample products");

    console.log("\n✅ Database seeded successfully!");
    console.log("\n📝 Login credentials:");
    console.log("Email: admin@axionscientifics.com");
    console.log("Password: admin123");

    await mongoose.disconnect();
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seed();


