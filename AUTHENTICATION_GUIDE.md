# Authentication System - Complete Guide

## 🔐 Two Separate Login Systems

### 1️⃣ **Customer Login** (Top Navigation)

**Access**: Click "Login" button in **top right corner** of the website

**Route**: `/login`

**Purpose**: For customers to shop and track orders

**Who Can Use**: 
- ✅ Regular customers
- ❌ Admins CANNOT use this (will be rejected)

**What Happens After Login**:
- Redirects to **Customer Dashboard** (`/customer/dashboard`)
- Can browse products, add to cart, checkout
- View order history

**Features**:
- Sign up option for new customers
- Warning message if admin tries to login here
- Clear "For customers only" disclaimer

---

### 2️⃣ **Admin Login** (Footer)

**Access**: Scroll to **footer** → Click **"🔐 Admin Portal"** (highlighted box)

**Route**: `/admin/login`

**Purpose**: For staff to manage the platform

**Who Can Use**:
- ✅ Admin accounts only
- ❌ Customers CANNOT use this (will be rejected)

**What Happens After Login**:
- Redirects to **Admin Dashboard** (`/admin/dashboard`)
- Full access to:
  - Catalogue Management
  - Inventory Management
  - Orders Management
  - Flash Sales
  - Analytics
  - Settings

**Features**:
- Dark themed login page
- Shield icon for security
- Warning message if customer tries to login here
- Clear "For administrators only" disclaimer

---

## 🎯 Login Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    WEBSITE HOMEPAGE                      │
└─────────────────────────────────────────────────────────┘
                            │
            ┌───────────────┴───────────────┐
            │                               │
            ▼                               ▼
    ┌───────────────┐              ┌──────────────────┐
    │  TOP NAV BAR  │              │     FOOTER       │
    │  "Login"      │              │  "Admin Portal"  │
    │  Button       │              │   Highlighted    │
    └───────┬───────┘              └────────┬─────────┘
            │                               │
            ▼                               ▼
    ┌──────────────────┐          ┌───────────────────┐
    │  /login          │          │  /admin/login     │
    │  Customer Login  │          │  Admin Login      │
    │                  │          │                   │
    │  ✅ Customer OK  │          │  ✅ Admin OK      │
    │  ❌ Admin DENIED │          │  ❌ Customer DENY │
    └──────┬───────────┘          └─────────┬─────────┘
           │                                 │
           ▼                                 ▼
    ┌──────────────────┐          ┌───────────────────┐
    │  /customer/      │          │  /admin/          │
    │  dashboard       │          │  dashboard        │
    │                  │          │                   │
    │  - View Orders   │          │  - Catalogue      │
    │  - Track Orders  │          │  - Inventory      │
    │  - Profile       │          │  - Orders         │
    │                  │          │  - Flash Sales    │
    │                  │          │  - Analytics      │
    │                  │          │  - Settings       │
    └──────────────────┘          └───────────────────┘
```

---

## 👥 Default Users

### Admin Account:
```
Email: admin@axionscientifics.com
Password: admin123
Role: admin
```

**Note**: Change this password in production!

### Customer Account:
- Create via `/signup` page
- Or login if already registered

---

## 🛡️ Security Features

### Route Protection:
- `/admin/*` routes → Middleware checks for admin role
- `/customer/*` routes → Middleware checks for customer/admin role
- `/admin/login` → Accessible without auth
- `/login` → Accessible without auth

### Role Validation:
- **Customer Login**: Verifies role is NOT admin
- **Admin Login**: Verifies role IS admin
- Wrong role → Shows error + signs out user

### Session Management:
- JWT tokens via NextAuth
- Secure HTTP-only cookies
- Auto-logout on role mismatch

---

## 📱 User Interface

### Customer Login (`/login`):
- **Clean white design**
- User icon
- Title: "Customer Login"
- Subtitle: "Login to shop and track your orders"
- Sign up link
- **Yellow warning box**: "Admin? Please use the Admin Login link in the footer"
- Disclaimer: "This login is for customers only"

### Admin Login (`/admin/login`):
- **Dark gradient design** (gray-900 to gray-800)
- Shield icon in green circle
- Title: "Admin Portal - Axion Scientifics"
- Subtitle: "Admin Login"
- Blue info box with credentials
- **Yellow warning box**: "Customer? Use the Login button in the top navigation bar"
- Disclaimer: "This login is for administrators only"
- Back to home link

### Footer Admin Link:
- **Dedicated section**: "Admin Access"
- **Highlighted box**: Green background with border
- **Large lock emoji**: 🔐
- **Two-line text**: 
  - "Admin Portal"
  - "Staff Login Only"
- **Disclaimer**: "For authorized personnel only"

---

## ✅ Testing the System

### Test Customer Login:
1. Click "Login" in top navigation
2. Create account at `/signup`
3. Login with customer credentials
4. Should redirect to `/customer/dashboard`
5. If admin tries: Shows error message

### Test Admin Login:
1. Scroll to footer
2. Click "🔐 Admin Portal" (highlighted box)
3. Login with: `admin@axionscientifics.com` / `admin123`
4. Should redirect to `/admin/dashboard`
5. If customer tries: Shows error message

### Test Cross-Login Prevention:
1. Admin logging into customer login → ❌ Rejected
2. Customer logging into admin login → ❌ Rejected

---

## 🎨 Visual Differences

| Feature | Customer Login | Admin Login |
|---------|---------------|-------------|
| **Background** | Light gray | Dark gradient |
| **Icon** | User icon | Shield icon |
| **Access From** | Top nav button | Footer box |
| **Color Theme** | White/Green | Dark/Green |
| **Who Can Use** | Customers only | Admins only |
| **Redirect To** | `/customer/dashboard` | `/admin/dashboard` |

---

## 🚀 Quick Reference

### For Customers:
- **Where**: Top right corner → "Login"
- **Create Account**: `/signup`
- **Features**: Shop, cart, orders

### For Admins:
- **Where**: Footer → "🔐 Admin Portal"
- **No Signup**: Contact main admin
- **Features**: Full platform management

---

**Authentication is now completely separated and secure!** ✅

