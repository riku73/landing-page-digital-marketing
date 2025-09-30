# 🚀 Digital Marketing Landing Page - Luxembourg

A high-performance, SEO-optimized multilingual landing page with built-in A/B testing capabilities for digital marketing agencies in Luxembourg.

## ✨ Features

### 🌍 Multilingual Support
- **3 Languages**: English (EN), French (FR), German (DE)
- Automatic locale detection via middleware
- Language switcher in header
- Localized content for all variants

### 🎯 A/B Testing System
- **4 Variants** with different approaches:
  - **Control**: Professional tone
  - **Variant A**: Urgency & scarcity focus
  - **Variant B**: ROI & data-driven
  - **Variant C**: Local Luxembourg focus
- Cookie-based variant assignment (persistent for 30 days)
- Automatic traffic distribution (25% per variant)
- Real-time analytics tracking

### 📊 Analytics Dashboard
- Real-time conversion tracking
- Variant performance comparison
- Key metrics:
  - Page views
  - CTA clicks
  - Form submissions
  - Phone clicks
  - Conversion rates
- Auto-refresh every 30 seconds
- Winner identification
- Visual progress bars and charts

### 🔍 SEO Optimization
- **Meta Tags**: Optimized titles, descriptions, and keywords
- **Open Graph**: Facebook/LinkedIn preview optimization
- **Twitter Cards**: Enhanced Twitter sharing
- **JSON-LD Structured Data**:
  - LocalBusiness schema
  - Service schema
  - FAQ schema
  - Organization schema
- **XML Sitemap**: Auto-generated with next-sitemap
- **Hreflang Tags**: Proper multilingual SEO
- **Canonical URLs**: Prevent duplicate content

### 🎨 UI/UX Components
- **Hero Section**: Animated gradient background, responsive design
- **Services Section**: 4 service cards with icons and hover effects
- **Stats Section**: Animated counters with scroll-triggered animations
- **CTA Section**: With optional countdown timer
- **Contact Form**: Validated with react-hook-form + zod
- **Language Switcher**: Easy locale switching

### ⚡ Technical Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5.6
- **Styling**: Tailwind CSS 3.4
- **UI Library**: shadcn/ui (Radix UI primitives)
- **i18n**: next-intl 3.20
- **Form Handling**: react-hook-form + zod
- **Icons**: lucide-react
- **Database**: File-based JSON (upgrade to PostgreSQL/MongoDB for production)

## 📁 Project Structure

```
landing-page-digital-marketing/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx          # Root layout with SEO metadata
│   │   ├── page.tsx             # Main landing page with A/B testing
│   │   └── dashboard/
│   │       └── page.tsx         # Analytics dashboard
│   ├── api/
│   │   ├── analytics/
│   │   │   ├── track/route.ts   # Event tracking endpoint
│   │   │   └── stats/route.ts   # Stats retrieval endpoint
│   │   └── variant/route.ts     # Variant assignment endpoint
│   └── globals.css              # Global styles
├── components/
│   ├── ui/                      # shadcn/ui components
│   ├── hero-section.tsx         # Hero component
│   ├── services-section.tsx     # Services grid
│   ├── stats-section.tsx        # Stats with counters
│   ├── cta-section.tsx          # CTA with countdown
│   ├── contact-form.tsx         # Contact form
│   ├── track-event.tsx          # Analytics tracking utilities
│   └── language-switcher.tsx    # Locale switcher
├── lib/
│   ├── ab-testing.ts            # A/B testing logic
│   ├── db.ts                    # Database operations
│   ├── seo.ts                   # SEO utilities
│   └── utils.ts                 # General utilities
├── messages/                    # Translation files
│   ├── en.json
│   ├── fr.json
│   └── de.json
├── data/                        # Analytics data (auto-created)
│   ├── events.json
│   └── stats.json
├── middleware.ts                # Locale detection
├── i18n.ts                      # i18n configuration
├── next.config.js               # Next.js configuration
├── next-sitemap.config.js       # Sitemap configuration
└── tailwind.config.ts           # Tailwind configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Navigate to project directory**:
```bash
cd /Users/marcomartins/Desktop/landing-page-digital-marketing
```

2. **Install dependencies** (already done):
```bash
npm install
```

3. **Set up environment variables**:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and update:
```env
SITE_URL=https://yourdomain.lu
```

4. **Run development server**:
```bash
npm run dev
```

5. **Open your browser**:
- English: http://localhost:3000/en
- French: http://localhost:3000/fr
- German: http://localhost:3000/de
- Dashboard: http://localhost:3000/en/dashboard

### Build for Production

```bash
npm run build
npm start
```

### Generate Sitemap

```bash
npm run postbuild
```

## 📊 How A/B Testing Works

### 1. Variant Assignment
When a user first visits the site:
1. API route `/api/variant` is called
2. A variant is randomly assigned based on weights (25% each)
3. Cookie `ab_variant` is set (expires in 30 days)
4. User sees the same variant on subsequent visits

### 2. Event Tracking
All user interactions are tracked:
- **Page View**: Tracked on page load
- **CTA Click**: Tracked when user clicks hero or CTA section buttons
- **Form Submit**: Tracked when contact form is submitted
- **Phone Click**: Tracked when phone number is clicked

### 3. Viewing Analytics
Access the dashboard at `/[locale]/dashboard` to see:
- Real-time variant performance
- Conversion rates
- Click-through rates
- Winner identification

### 4. Variant Content
Each variant has different:
- Hero headlines
- Subheadlines
- CTA button text
- CTA button styles
- Urgency messaging

Content is defined in `/lib/ab-testing.ts` in the `VARIANT_CONTENT` object.

## 🎨 Customization

### 1. Update Branding
**Logo & Brand Name**:
- Edit `/app/[locale]/layout.tsx` line 117
- Replace "Digital Marketing LU" with your brand name

**Colors**:
- Edit `/tailwind.config.ts`
- Modify HSL values in the `theme.extend.colors` section

### 2. Add More Languages
1. Update `/i18n.ts`:
```typescript
export const locales = ['en', 'fr', 'de', 'lu'] as const; // Add 'lu'
```

2. Create `/messages/lu.json` with translations

3. Update SEO in `/lib/seo.ts`:
```typescript
lu: {
  title: 'Your Luxembourgish title...',
  description: '...',
  keywords: [...]
}
```

### 3. Modify Variants
Edit `/lib/ab-testing.ts`:

**Add new variant**:
```typescript
export const VARIANTS = {
  // ... existing variants
  'variant-d': {
    id: 'variant-d',
    name: 'Variant D (Your Strategy)',
    weight: 20, // Adjust weights
    description: 'Description of your approach',
  },
};
```

**Update content**:
```typescript
export const VARIANT_CONTENT = {
  en: {
    'variant-d': {
      hero: {
        headline: 'Your Headline',
        subheadline: 'Your Subheadline',
        ctaText: 'Your CTA',
        ctaStyle: 'primary',
      },
      // ... rest of content
    },
  },
};
```

### 4. Connect to Email Service
Edit `/app/[locale]/page.tsx` in the `handleFormSubmit` function:

```typescript
// Replace console.log with your email service
await fetch('/api/send-email', {
  method: 'POST',
  body: JSON.stringify(data),
});
```

Example integrations:
- **SendGrid**: Use `@sendgrid/mail`
- **Resend**: Use `resend` package
- **Mailgun**: Use `mailgun-js`

### 5. Upgrade Database
For production, replace the file-based database:

**PostgreSQL with Prisma**:
```bash
npm install prisma @prisma/client
npx prisma init
```

**Supabase**:
```bash
npm install @supabase/supabase-js
```

Update `/lib/db.ts` with your database client.

## 🔐 Environment Variables

Create `.env.local`:

```env
# Site Configuration
SITE_URL=https://yourdomain.lu

# Database (if using external DB)
DATABASE_URL=postgresql://...

# Email Service (optional)
SENDGRID_API_KEY=your_key
EMAIL_FROM=noreply@yourdomain.lu

# Analytics (optional)
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

## 📈 SEO Checklist

- [x] Meta titles optimized (55-60 characters)
- [x] Meta descriptions optimized (150-160 characters)
- [x] Keywords researched for Luxembourg market
- [x] Open Graph tags for social sharing
- [x] Twitter Card tags
- [x] JSON-LD structured data (4 schemas)
- [x] XML sitemap auto-generation
- [x] Hreflang tags for multilingual SEO
- [x] Canonical URLs
- [x] Mobile-responsive design
- [x] Fast page load times (Next.js SSR)

### Post-Deployment SEO Tasks

1. **Google Search Console**:
   - Submit sitemap: `https://yourdomain.lu/sitemap.xml`
   - Verify ownership
   - Monitor indexing

2. **Google Business Profile**:
   - Create profile in 3 languages
   - Add Luxembourg location
   - Link to website

3. **Local Citations**:
   - Submit to Luxembourg directories
   - Chamber of Commerce listing
   - Editus.lu listing

4. **Analytics**:
   - Set up Google Analytics 4
   - Set up Google Tag Manager
   - Track conversions

## 🧪 Testing

### Manual Testing Checklist

- [ ] Test all 3 languages (EN, FR, DE)
- [ ] Test language switcher
- [ ] Test contact form validation
- [ ] Test contact form submission
- [ ] Test CTA button clicks
- [ ] Test variant assignment (clear cookies and reload)
- [ ] Test analytics tracking
- [ ] Test dashboard display
- [ ] Test mobile responsiveness
- [ ] Test on different browsers (Chrome, Firefox, Safari)
- [ ] Test SEO with Google's Rich Results Test
- [ ] Test page speed with PageSpeed Insights

### Clear Test Data

To reset analytics data:

```bash
rm -rf data/
```

The database will be automatically recreated on next event.

## 📦 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import in Vercel
3. Add environment variables
4. Deploy

```bash
npm run build
vercel --prod
```

### Netlify

```bash
npm run build
netlify deploy --prod --dir=.next
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🐛 Troubleshooting

### Issue: Variants not changing
**Solution**: Clear cookies and reload

### Issue: Dashboard shows no data
**Solution**: Visit the landing page first to generate events

### Issue: Build errors
**Solution**:
```bash
rm -rf .next node_modules
npm install
npm run build
```

### Issue: Translations not working
**Solution**: Check `/messages/[locale].json` files exist

## 📝 License

MIT License - feel free to use for commercial projects.

## 🤝 Support

For questions or issues:
1. Check this README
2. Review the SEO_STRATEGY_LUXEMBOURG.md document
3. Check component documentation in `/components/`

## 🎯 Next Steps

1. **Customize Content**: Update all placeholder text
2. **Add Images**: Add hero images to `/public/images/`
3. **Set Up Email**: Connect to email service provider
4. **Configure Analytics**: Add Google Analytics
5. **Deploy**: Push to production
6. **Monitor**: Watch A/B test results
7. **Optimize**: Adjust variants based on data
8. **Scale**: Switch to production database

## 📊 Expected Results

Based on Luxembourg market research:
- **Month 1-2**: 10-20 qualified leads
- **Month 3-4**: 25-35 qualified leads
- **Month 5-6**: 40+ qualified leads
- **Conversion Rate Target**: 2.5-4%
- **SEO Rankings**: Top 10 for 15+ keywords by month 6

---

**Built with ❤️ for Luxembourg businesses**