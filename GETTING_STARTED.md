# Getting Started with Axion Scientifics E-commerce Platform

This guide will help you set up and run the Axion Scientifics e-commerce platform on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - [Download here](https://www.mongodb.com/try/download/community) OR use MongoDB Atlas (cloud)
- **Git** (optional) - For version control

## Step-by-Step Setup

### 1. Install Dependencies

```bash
npm install
```

This will install all required packages including Next.js, MongoDB drivers, authentication libraries, and more.

### 2. Start MongoDB (if using local installation)

**On macOS/Linux:**
```bash
mongod
```

**On Windows:**
```bash
"C:\Program Files\MongoDB\Server\<version>\bin\mongod.exe"
```

**Or use MongoDB Atlas:**
- Sign up at [mongodb.com/atlas](https://www.mongodb.com/atlas)
- Create a free cluster
- Get your connection string

### 3. Configure Environment Variables

The `.env.local` file has been created for you. Update it with your details:

```env
# MongoDB - Use your MongoDB URI
MONGODB_URI=mongodb://localhost:27017/axion-ecommerce
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/axion-ecommerce

# NextAuth - Already configured, change for production
NEXTAUTH_SECRET=axion-secret-key-2025-production-ready
NEXTAUTH_URL=http://localhost:3000

# Razorpay - Get your keys from razorpay.com
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-secret-key

# Admin credentials
ADMIN_EMAIL=admin@axionscientifics.com
ADMIN_PASSWORD=admin123
```

**To get Razorpay keys:**
1. Sign up at [razorpay.com](https://razorpay.com/)
2. Go to Settings > API Keys
3. Generate Test Keys (for development)
4. Copy Key ID and Key Secret to `.env.local`

### 4. Seed the Database

Populate your database with initial data (admin user, categories, sample products):

```bash
npm run seed
```

You should see output like:
```
✅ Connected to MongoDB
🗑️  Cleared existing data
👤 Created admin user
📁 Created categories
📦 Created sample products
✅ Database seeded successfully!

📝 Login credentials:
Email: admin@axionscientifics.com
Password: admin123
```

### 5. Run the Development Server

```bash
npm run dev
```

The application will start at [http://localhost:3000](http://localhost:3000)

### 6. Access the Application

**Public Pages:**
- Homepage: [http://localhost:3000](http://localhost:3000)
- Products: [http://localhost:3000/products](http://localhost:3000/products)
- About: [http://localhost:3000/about](http://localhost:3000/about)
- Contact: [http://localhost:3000/contact](http://localhost:3000/contact)

**Admin Panel:**
1. Click "Login" in the top navigation
2. Use credentials: `admin@axionscientifics.com` / `admin123`
3. You'll be redirected to Admin Dashboard
4. Access admin features:
   - Dashboard: [http://localhost:3000/admin/dashboard](http://localhost:3000/admin/dashboard)
   - Catalogue: [http://localhost:3000/admin/catalogue](http://localhost:3000/admin/catalogue)
   - Inventory: [http://localhost:3000/admin/inventory](http://localhost:3000/admin/inventory)
   - Orders: [http://localhost:3000/admin/orders](http://localhost:3000/admin/orders)
   - Flash Sales: [http://localhost:3000/admin/flash-sales](http://localhost:3000/admin/flash-sales)
   - Analytics: [http://localhost:3000/admin/analytics](http://localhost:3000/admin/analytics)

**Customer Portal:**
1. Sign up as a new customer at [http://localhost:3000/signup](http://localhost:3000/signup)
2. Browse products and add to cart
3. Checkout and place orders (using Razorpay test mode)
4. View orders in Customer Dashboard

## Testing the Platform

### Test Shopping Flow

1. **Browse Products**: Go to Products page, use filters
2. **View Product Details**: Click on a product
3. **Add to Cart**: Click "Buy Now" button
4. **View Cart**: Click cart icon in header
5. **Checkout**: 
   - Create a customer account if not logged in
   - Fill shipping details
   - Complete payment using Razorpay test cards:
     - Card: 4111 1111 1111 1111
     - CVV: Any 3 digits
     - Expiry: Any future date

### Test Admin Features

1. **Manage Catalogue**: Add/edit products with external links
2. **Promote to Inventory**: Move products from catalogue to inventory
3. **Update Stock**: Change stock levels and set low stock thresholds
4. **Manage Orders**: View orders and update their status
5. **Create Flash Sales**: Add time-limited discounts
6. **View Analytics**: Check sales performance and statistics

## Troubleshooting

### MongoDB Connection Error

**Problem**: `Error: connect ECONNREFUSED 127.0.0.1:27017`

**Solution**:
- Make sure MongoDB is running
- Check if `MONGODB_URI` in `.env.local` is correct
- Try using MongoDB Atlas instead

### Port Already in Use

**Problem**: `Error: listen EADDRINUSE: address already in use :::3000`

**Solution**:
```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill
# Or run on a different port
PORT=3001 npm run dev
```

### Razorpay Integration Not Working

**Problem**: Payment fails or Razorpay doesn't load

**Solution**:
- Verify `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` in `.env.local`
- Make sure you're using Test Mode keys
- Check browser console for errors

### Seed Script Fails

**Problem**: Database seeding fails

**Solution**:
- Make sure MongoDB is running and accessible
- Delete existing database: In MongoDB shell, run `use axion-ecommerce` then `db.dropDatabase()`
- Run seed script again: `npm run seed`

## Next Steps

1. **Customize Branding**: Update colors in `tailwind.config.ts`
2. **Add Product Images**: Update products in admin panel with actual images
3. **Configure Email**: Set up email notifications for orders
4. **Production Setup**: 
   - Use MongoDB Atlas for production database
   - Get production Razorpay keys
   - Generate new `NEXTAUTH_SECRET`: `openssl rand -base64 32`
   - Deploy to Vercel or your hosting platform

## Project Structure Overview

```
├── app/                    # Next.js pages (App Router)
├── components/            # Reusable React components
├── contexts/              # React Context providers
├── lib/                   # Utility functions and configs
├── models/                # MongoDB/Mongoose models
├── public/                # Static files
├── scripts/               # Database seed and utility scripts
└── types/                 # TypeScript type definitions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run seed` - Seed database with initial data

## Support

For issues or questions:
- Check the main [README.md](README.md) for detailed documentation
- Review error messages in the terminal
- Check browser developer console (F12) for frontend errors

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Razorpay Documentation](https://razorpay.com/docs/)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

Happy coding! 🚀


