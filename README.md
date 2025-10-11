# Axion Scientifics E-commerce Platform

A comprehensive e-commerce platform built with Next.js 14, MongoDB, and Razorpay for Axion Scientifics - natural feed supplements for livestock.

## Features

### Public Features
- **Landing Page**: Company information, product portfolio, team, and FAQs
- **Products Listing**: Advanced filtering (category, species, market, tags, price range)
- **Product Detail**: Three buying options (Amazon, Flipkart, Axion)
- **Shopping Cart**: Add to cart, update quantities, checkout
- **Authentication**: Customer login and signup
- **About & Contact Pages**: Company information and contact form

### Customer Features
- **Dashboard**: Order overview and statistics
- **Order History**: View all orders with status tracking
- **Secure Checkout**: Razorpay payment integration

### Admin Features
- **Dashboard**: Overview of products, orders, revenue, and alerts
- **Catalogue Management**: Add, edit, delete products with external links
- **Inventory Management**: Promote products, manage stock, low stock alerts
- **Orders Management**: View and update order status
- **Flash Sales**: Create time-limited discount campaigns
- **Analytics**: Sales trends, category distribution, top products

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js
- **Payment**: Razorpay
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/axion-ecommerce
# or use MongoDB Atlas: mongodb+srv://<username>:<password>@cluster.mongodb.net/axion-ecommerce

# NextAuth
NEXTAUTH_SECRET=your-secret-key-here-generate-with-openssl-rand-base64-32
NEXTAUTH_URL=http://localhost:3000

# Razorpay
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-key-secret

# Admin
ADMIN_EMAIL=admin@axionscientifics.com
ADMIN_PASSWORD=admin123
```

### 3. Seed Database

Run the seed script to populate initial data (admin user, categories, sample products):

```bash
npx ts-node --compiler-options '{"module":"commonjs"}' scripts/seed.ts
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Login Credentials

**Admin:**
- Email: admin@axionscientifics.com
- Password: admin123

## Project Structure

```
├── app/                      # Next.js App Router
│   ├── (public)/            # Public pages (landing, products, about, contact)
│   ├── (auth)/              # Authentication pages (login, signup)
│   ├── customer/            # Customer dashboard and orders
│   ├── admin/               # Admin panel (catalogue, inventory, orders, etc.)
│   └── api/                 # API routes
├── components/              # Reusable components
│   ├── layout/              # Header, Footer
│   ├── products/            # ProductCard, ProductFilters
│   ├── admin/               # AdminSidebar
│   └── ui/                  # Button, Input, Card, Badge
├── contexts/                # React contexts (CartContext)
├── lib/                     # Utilities (mongodb, auth, razorpay, utils)
├── models/                  # Mongoose models
├── scripts/                 # Database seed script
└── types/                   # TypeScript type definitions
```

## Key Functionality

### Product Management
- **Catalogue**: Products not yet in inventory (can have Amazon/Flipkart links only)
- **Inventory**: Promoted products available for purchase on Axion
- **Three Buying Options**: 
  - Amazon (external link)
  - Flipkart (external link)
  - Buy Now (add to Axion cart)

### Flash Sales
- Time-limited discounts on products
- Countdown timers on product cards
- Max quantity limits with sold tracking

### Low Stock Alerts
- Configurable threshold per product
- Dashboard widget showing low stock products
- Visual alerts in inventory management

### Payment Flow
1. Customer adds items to cart
2. Proceeds to checkout with shipping details
3. Razorpay payment gateway integration
4. Order created and stock reduced
5. Payment verification
6. Order confirmation and email notification

## Database Models

- **User**: Customer and admin accounts
- **Product**: Products with buying options and inventory status
- **Category**: Product categories
- **Order**: Customer orders with items and shipping
- **FlashSale**: Time-limited discount campaigns

## API Routes

### Public
- `GET /api/products` - List products with filters
- `GET /api/products/[id]` - Product details
- `GET /api/categories` - List categories
- `POST /api/auth/signup` - User registration

### Authenticated
- `POST /api/orders/create` - Create order
- `POST /api/orders/verify` - Verify payment
- `GET /api/orders` - List user orders

### Admin
- `GET /api/admin/products/stats` - Product statistics
- `POST /api/admin/products/[id]/promote` - Promote to inventory
- `PATCH /api/admin/products/[id]` - Update product
- `DELETE /api/admin/products/[id]` - Delete product
- `PATCH /api/admin/orders/[id]` - Update order status
- `GET /api/admin/flash-sales` - List flash sales
- `POST /api/admin/flash-sales` - Create flash sale
- `DELETE /api/admin/flash-sales/[id]` - Delete flash sale

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Environment Variables for Production
- Update `NEXTAUTH_URL` to production URL
- Use MongoDB Atlas for database
- Use production Razorpay keys

## Future Enhancements

- Product reviews and ratings
- Wishlist functionality
- Email notifications (order confirmation, shipping updates)
- Advanced analytics with date range filters
- Bulk product upload via CSV
- Multi-language support
- Social media integration
- Blog/News section
- Customer support chat

## License

Proprietary - Axion Scientifics Pvt. Ltd.

## Support

For support, email info@axionscientifics.com


