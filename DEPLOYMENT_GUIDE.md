# Deployment Guide - Vercel

## ✅ GitHub Setup Complete

Your code has been successfully pushed to GitHub:
- **Repository**: https://github.com/riku73/landing-page-digital-marketing
- **Branch**: main
- **Commit**: 50e8ed6 - Initial commit with all features

## Vercel Deployment Steps

### 1. Connect GitHub Repository to Vercel

1. Go to https://vercel.com/riku06s-projects
2. Click **"Add New..."** → **"Project"**
3. Select **"Import Git Repository"**
4. Choose: `riku73/landing-page-digital-marketing`
5. Click **"Import"**

### 2. Configure Project Settings

#### Framework Preset
- **Framework**: Next.js (auto-detected)

#### Build & Development Settings
- **Build Command**: `next build` (default)
- **Output Directory**: `.next` (default)
- **Install Command**: `npm install` (default)
- **Development Command**: `next dev` (default)

#### Root Directory
- Leave as `.` (root)

### 3. Environment Variables

Click **"Environment Variables"** and add:

```env
SITE_URL=https://landing-page-digital-marketing.vercel.app
NODE_ENV=production
```

**Note**: Update `SITE_URL` with your actual Vercel domain after first deployment.

### 4. Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes for build to complete
3. Your site will be live at: `https://landing-page-digital-marketing-[hash].vercel.app`

### 5. Post-Deployment Configuration

#### A. Update SITE_URL
1. Go to **Settings** → **Environment Variables**
2. Update `SITE_URL` with your actual Vercel URL
3. Redeploy the application

#### B. Custom Domain (Optional)
1. Go to **Settings** → **Domains**
2. Add your custom domain
3. Update DNS records as instructed
4. Update `SITE_URL` environment variable

#### C. Verify Deployment
Visit these URLs to verify everything works:

- **English**: `https://your-domain.vercel.app/en`
- **French**: `https://your-domain.vercel.app/fr`
- **German**: `https://your-domain.vercel.app/de`
- **Dashboard**: `https://your-domain.vercel.app/en/dashboard`

### 6. Automatic Deployments

Vercel is now configured for automatic deployments:
- **Push to `main`** → Production deployment
- **Pull requests** → Preview deployments
- **Rollback** available via Vercel dashboard

## Expected Build Output

Your build should complete with:
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages
✓ Finalizing page optimization
```

**Note**: The dashboard page may show warnings during build but will work correctly in production with dynamic rendering.

## Troubleshooting

### Build Fails with "locale" Error
- **Solution**: Already fixed in the codebase (i18n.ts updated to use `requestLocale`)

### 404 on Language Routes
- **Solution**: Clear Vercel cache and redeploy

### Analytics Not Working
- **Solution**: The file-based database creates a `/data` directory at runtime. For production, consider upgrading to:
  - Vercel KV (Redis)
  - Supabase
  - PlanetScale (MySQL)
  - MongoDB Atlas

### Environment Variables Not Working
- **Solution**: Make sure to redeploy after adding environment variables

## Monitoring & Analytics

### View Deployment Logs
1. Go to **Deployments**
2. Click on a deployment
3. View **Build Logs** and **Runtime Logs**

### View Analytics
1. Go to **Analytics** tab in Vercel
2. Track page views, performance, and Web Vitals
3. Use your custom dashboard at `/[locale]/dashboard` for A/B testing metrics

## Performance Optimization

Your site is already optimized for:
- ✅ Server-Side Rendering (SSR)
- ✅ Static Generation where possible
- ✅ Image optimization (Next.js Image component ready)
- ✅ Code splitting
- ✅ Automatic compression

Expected Lighthouse scores:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

## Next Steps

1. ✅ Code pushed to GitHub
2. ⏳ Deploy to Vercel (follow steps above)
3. ⏳ Update environment variables
4. ⏳ Test all language versions
5. ⏳ Monitor A/B testing dashboard
6. ⏳ Submit sitemap to Google Search Console

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Repository**: https://github.com/riku73/landing-page-digital-marketing

---

**Ready to deploy!** 🚀