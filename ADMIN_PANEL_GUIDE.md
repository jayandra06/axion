# Admin Panel Guide - Axion Scientifics

## 🔐 Accessing the Admin Panel

1. **Go to Footer** → Click "🔐 Login as Admin"
2. **Login with**:
   - Email: `admin@axionscientifics.com`
   - Password: `admin123`
3. **You'll be redirected** to `/admin/dashboard`

## 📊 Admin Dashboard Sections

### 1. **Dashboard** (`/admin/dashboard`)
- Overview of key metrics
- Total products, orders, revenue
- Low stock alerts
- System status

### 2. **Catalogue Management** (`/admin/catalogue`)

**Purpose**: Add products with ecommerce links BEFORE promoting to inventory

**Features**:
- ✅ Add new products to catalogue
- ✅ Set product name, description, images
- ✅ Configure **Amazon** link + price
- ✅ Configure **Flipkart** link + price
- ✅ Set Axion price (for cart/checkout)
- ✅ Add product specs, ingredients, benefits, dosage
- ✅ Assign category, species, market, tags
- ✅ Edit/Delete catalogue products
- ✅ **NO stock management** (added during promotion)

**How to Add a Product**:
1. Click "Add Product to Catalogue"
2. Fill in:
   - Basic Info: Name, Description, Category
   - Images: Add multiple image URLs
   - **E-commerce Links**:
     - Axion Price (required) - for "Buy Now" button
     - Amazon Link + Price (optional) - for redirect button
     - Flipkart Link + Price (optional) - for redirect button
   - Classification: Species, Market, Tags
   - Additional Info: Ingredients, Benefits, Dosage
3. Click "Add to Catalogue"

**Important**: Products in catalogue are NOT available for purchase yet. They need to be promoted to inventory.

---

### 3. **Inventory Management** (`/admin/inventory`)

**Purpose**: Manage products that are actively sellable with stock

**Features**:
- ✅ View all inventory products
- ✅ **Promote products from catalogue** to inventory
- ✅ Set initial stock when promoting
- ✅ Update stock levels in real-time
- ✅ Low stock alerts (configurable threshold)
- ✅ Price management
- ✅ Stock status badges

**How to Promote Products**:
1. Click "Promote Products"
2. See all catalogue products
3. For each product:
   - View product details (name, prices, links)
   - Enter **Initial Stock Quantity** (e.g., 50 units)
   - Click "Promote to Inventory"
4. Product is now available for purchase!

**Stock Management**:
- Edit stock directly in the table
- See low stock warnings (red background)
- Set custom thresholds per product

---

### 4. **Orders Management** (`/admin/orders`)
- View all customer orders
- Update order status (pending → processing → shipped → delivered)
- Filter by status
- Search by order ID or customer name
- View payment status
- See shipping details

---

### 5. **Flash Sales** (`/admin/flash-sales`)
- Create time-limited discount campaigns
- Set discount percentage (%)
- Define start and end dates
- Set maximum quantity
- Track sold quantities
- Active/upcoming/expired status

---

### 6. **Analytics** (`/admin/analytics`)
- Total revenue and statistics
- Sales trend charts
- Category distribution (pie chart)
- Top selling products
- Orders by status
- Performance metrics

---

### 7. **Settings** (`/admin/settings`) ⚙️

**Purpose**: Configure payment gateway, taxes, and system settings

#### **Razorpay Payment Gateway**
- **Key ID**: Your Razorpay API Key ID
- **Key Secret**: Your Razorpay Secret Key
- **Webhook Secret**: For payment verification
- Get keys from: https://dashboard.razorpay.com/app/keys

#### **GST Tax Configuration**
- ✅ Enable/Disable GST on all products
- ✅ Set GST Rate (default: 18%)
- ✅ Enter GST Number (GSTIN)

#### **General Settings**
- Site Name
- Contact Email
- Contact Phone
- Default Low Stock Threshold

**Click "Save All Settings"** to apply changes.

---

## 🛒 Product Flow Explained

### **Step 1: Add to Catalogue**
```
Catalogue Management → Add Product
├── Product Details (name, description, images)
├── E-commerce Links:
│   ├── Amazon (link + price) → "Buy from Amazon" button
│   ├── Flipkart (link + price) → "Buy from Flipkart" button
│   └── Axion (price only) → "Buy Now" button (adds to cart)
├── Classification (species, market, tags)
└── Additional Info (ingredients, benefits)
```

**Status**: Product is in catalogue but NOT sellable yet.

### **Step 2: Promote to Inventory**
```
Inventory Management → Promote Products
├── Select catalogue product
├── Set Initial Stock (e.g., 50 units)
└── Click "Promote to Inventory"
```

**Status**: Product is now available for purchase on the website!

### **Step 3: Customer Purchase**
On the product page, customers see **THREE buying options**:

1. **Buy from Amazon** (button)
   - Redirects to Amazon product page
   - Uses Amazon link from catalogue

2. **Buy from Flipkart** (button)
   - Redirects to Flipkart product page
   - Uses Flipkart link from catalogue

3. **Buy Now** (button)
   - Adds product to Axion cart
   - Goes through checkout with Razorpay
   - Uses Axion price from catalogue
   - Reduces inventory stock

---

## 📝 Product Fields Explained

### **Required Fields** ⭐
- Product Name
- Description
- Category
- Axion Price (for cart purchases)

### **Optional Fields**
- Images (can add multiple)
- Amazon Link + Price
- Flipkart Link + Price
- Species (aqua, poultry, dairy, etc.)
- Market (national/international)
- Tags (featured, frequent, seasonal, etc.)
- Ingredients
- Benefits
- Dosage Instructions

### **Fields Added During Promotion**
- **Stock Quantity** (set when promoting to inventory)

---

## 💡 Best Practices

### **Adding Products**
1. Start with complete information in catalogue
2. Add all ecommerce links if available
3. Set competitive Axion prices
4. Choose appropriate tags for homepage sections

### **Managing Inventory**
1. Promote products with adequate stock levels
2. Monitor low stock alerts regularly
3. Update stock as you receive new inventory
4. Set realistic low stock thresholds

### **Orders**
1. Update order status promptly
2. Mark as "processing" after payment
3. Update to "shipped" with tracking
4. Complete as "delivered" after confirmation

### **Flash Sales**
1. Create campaigns in advance
2. Set reasonable discount percentages
3. Monitor max quantity vs. sold quantity
4. End sales on time

---

## 🔒 Security Notes

- Only admin users can access `/admin/*` routes
- Middleware protects all admin routes
- Separate admin login at `/admin/login`
- Settings are encrypted in database
- Payment credentials are never exposed to frontend

---

## 🚀 Quick Start Guide

### **Day 1: Setup**
1. ✅ Login to Admin Panel
2. ✅ Go to Settings → Configure Razorpay keys
3. ✅ Set GST settings if needed
4. ✅ Create product categories (Aqua, Poultry, Dairy)

### **Day 2: Add Products**
1. ✅ Go to Catalogue Management
2. ✅ Add products with all ecommerce links
3. ✅ Include images, descriptions, benefits

### **Day 3: Launch**
1. ✅ Go to Inventory Management
2. ✅ Promote products with stock
3. ✅ Products are now live!

### **Ongoing**
1. ✅ Monitor orders daily
2. ✅ Update stock levels
3. ✅ Create flash sales for promotions
4. ✅ Check analytics weekly

---

## 📞 Support

For issues or questions:
- Check browser console (F12) for errors
- Verify MongoDB connection
- Ensure Razorpay keys are correct
- Check that products are promoted to inventory

---

**Admin Panel Ready! 🎉**

All features are fully functional and production-ready.

