# Deployment Guide - Axion Scientifics E-commerce Platform

This guide will help you deploy the Axion Scientifics platform to production.

## Pre-Deployment Checklist

Before deploying, ensure you have:
- [ ] MongoDB Atlas account (for production database)
- [ ] Razorpay production keys
- [ ] Domain name (optional but recommended)
- [ ] Vercel account (or other hosting provider)

## Option 1: Deploy to Vercel (Recommended)

Vercel is the easiest and fastest way to deploy Next.js applications.

### Step 1: Prepare Your Code

1. **Commit your code to Git**:
```bash
git init
git add .
git commit -m "Initial commit - Axion Scientifics Platform"
```

2. **Push to GitHub** (create a new repository first):
```bash
git remote add origin https://github.com/yourusername/axion-ecommerce.git
git branch -M main
git push -u origin main
```

### Step 2: Set Up MongoDB Atlas

1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster (free tier is sufficient to start)
4. Click "Connect" → "Connect your application"
5. Copy the connection string (looks like `mongodb+srv://...`)
6. Replace `<password>` with your database user password
7. Replace `<dbname>` with `axion-ecommerce`

### Step 3: Get Production Razorpay Keys

1. Log in to [razorpay.com](https://razorpay.com/)
2. Go to Settings → API Keys
3. Switch from "Test Mode" to "Live Mode"
4. Generate Live API Keys
5. Copy both Key ID and Key Secret

### Step 4: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com/)
2. Sign up with your GitHub account
3. Click "New Project"
4. Import your GitHub repository
5. Configure the project:
   - Framework Preset: **Next.js**
   - Root Directory: **.**
   - Build Command: `npm run build`
   - Output Directory: `.next`

### Step 5: Add Environment Variables

In Vercel project settings, add these environment variables:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/axion-ecommerce
NEXTAUTH_SECRET=<generate with: openssl rand -base64 32>
NEXTAUTH_URL=https://your-domain.vercel.app
RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxx
RAZORPAY_KEY_SECRET=your_live_secret_here
ADMIN_EMAIL=admin@axionscientifics.com
ADMIN_PASSWORD=your_secure_admin_password
```

### Step 6: Deploy

1. Click "Deploy"
2. Wait for deployment to complete (usually 2-3 minutes)
3. Your site will be live at `https://your-project.vercel.app`

### Step 7: Seed Production Database

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Link your project:
```bash
vercel link
```

4. Run seed script with production environment:
```bash
vercel env pull .env.production
npm run seed
```

Alternatively, you can seed via MongoDB Compass or manually create the admin user.

### Step 8: Custom Domain (Optional)

1. In Vercel project settings, go to "Domains"
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update `NEXTAUTH_URL` to your custom domain

## Option 2: Deploy to Other Platforms

### AWS (EC2/Elastic Beanstalk)

1. **Build the application**:
```bash
npm run build
```

2. **Set up Node.js environment** on your server

3. **Install dependencies**:
```bash
npm install --production
```

4. **Set environment variables** in your server

5. **Start the application**:
```bash
npm start
```

6. **Configure reverse proxy** (Nginx/Apache) to forward port 3000

### DigitalOcean App Platform

1. Connect your GitHub repository
2. Select "Next.js" as the framework
3. Add environment variables
4. Deploy

### Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t axion-ecommerce .
docker run -p 3000:3000 --env-file .env.local axion-ecommerce
```

## Post-Deployment Tasks

### 1. Test the Application

- [ ] Public pages load correctly
- [ ] Products page with filters works
- [ ] Login with admin credentials
- [ ] Admin dashboard displays correctly
- [ ] Create a test order
- [ ] Payment flow works (use test cards first)
- [ ] All admin features functional

### 2. Security Checklist

- [ ] Change default admin password
- [ ] Set up SSL certificate (automatic on Vercel)
- [ ] Configure CORS if needed
- [ ] Enable rate limiting on API routes
- [ ] Set up monitoring and logging

### 3. SEO Optimization

- [ ] Add meta descriptions to all pages
- [ ] Submit sitemap to Google Search Console
- [ ] Set up Google Analytics
- [ ] Configure Open Graph tags
- [ ] Add schema.org structured data

### 4. Performance Optimization

- [ ] Enable Vercel Analytics
- [ ] Configure CDN for images
- [ ] Set up caching headers
- [ ] Monitor database performance
- [ ] Set up database indexes

## Environment Variables Reference

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://...` |
| `NEXTAUTH_SECRET` | Secret for JWT tokens | Generate with openssl |
| `NEXTAUTH_URL` | Your application URL | `https://axion.com` |
| `RAZORPAY_KEY_ID` | Razorpay API Key ID | `rzp_live_xxx` |
| `RAZORPAY_KEY_SECRET` | Razorpay API Secret | `secret_xxx` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `ADMIN_EMAIL` | Admin user email | `admin@axionscientifics.com` |
| `ADMIN_PASSWORD` | Admin user password | Set during seed |

## Monitoring and Maintenance

### Set Up Monitoring

1. **Vercel Analytics**: Automatic if deployed on Vercel
2. **Sentry**: For error tracking
3. **LogRocket**: For session replay
4. **Google Analytics**: For user analytics

### Database Backups

1. **MongoDB Atlas**: Enable automated backups (available in paid tiers)
2. **Manual Backups**: Use `mongodump` command
3. **Schedule**: Daily backups recommended

### Update Process

1. Make changes locally
2. Test thoroughly
3. Commit to Git
4. Push to GitHub
5. Vercel auto-deploys (or trigger manually)

## Troubleshooting

### Build Fails

**Issue**: TypeScript errors during build

**Solution**: 
```bash
npm run build
```
Fix any errors shown, commit and deploy again.

### Database Connection Issues

**Issue**: Can't connect to MongoDB

**Solution**:
- Check MongoDB Atlas network access (whitelist all IPs: `0.0.0.0/0`)
- Verify connection string is correct
- Check database user has proper permissions

### Payment Not Working

**Issue**: Razorpay payment fails

**Solution**:
- Verify you're using live keys for production
- Check Razorpay dashboard for error logs
- Test with Razorpay test cards first
- Verify webhook signatures

### Session Issues

**Issue**: Can't stay logged in

**Solution**:
- Check `NEXTAUTH_URL` matches your domain exactly
- Verify `NEXTAUTH_SECRET` is set
- Clear browser cookies and try again

## Scaling Considerations

### As Your Traffic Grows

1. **Upgrade MongoDB**: Move from free tier to dedicated cluster
2. **CDN**: Use Vercel's Edge Network or Cloudflare
3. **Database Indexes**: Add indexes on frequently queried fields
4. **Caching**: Implement Redis for session/data caching
5. **Load Balancing**: Distribute traffic across multiple instances

### Performance Tips

- Use Next.js Image optimization
- Enable incremental static regeneration (ISR)
- Implement lazy loading for images
- Use service workers for offline support
- Optimize bundle size

## Cost Estimates (Monthly)

### Starter Setup (Free Tier)
- Vercel: Free (Hobby plan)
- MongoDB Atlas: Free (512MB)
- Razorpay: Commission per transaction
- **Total**: ~$0 + transaction fees

### Production Setup
- Vercel Pro: $20/month
- MongoDB Atlas M10: $57/month
- Razorpay: Transaction fees
- Domain: $10-15/year
- **Total**: ~$77-80/month

### High Traffic Setup
- Vercel Enterprise: Custom pricing
- MongoDB Atlas M30: $300+/month
- CDN: $50+/month
- **Total**: $350+/month

## Support

For deployment help:
- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- MongoDB Atlas Docs: [docs.atlas.mongodb.com](https://docs.atlas.mongodb.com/)
- Next.js Deployment: [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)

---

**Good luck with your deployment! 🚀**


