# Landing Page Components for Luxembourg Digital Marketing Agency

High-quality, conversion-optimized React components built with **shadcn/ui**, **Next.js 15**, and **Tailwind CSS**.

## Components Overview

### 1. Hero Section (`hero-section.tsx`)
**Location:** `/Users/marcomartins/Desktop/landing-page-digital-marketing/components/hero-section.tsx`

A conversion-optimized hero section with:
- Gradient backgrounds with animated overlays
- Smooth fade-in and slide-up animations
- Optional hero image with Next.js Image optimization
- Mobile-first responsive design (breakpoints: sm, md, lg)
- Trust indicators (client count, experience, location)
- shadcn/ui Button component integration
- Customizable CTA styling

**Props:**
- `headline` (string) - Main headline text
- `subheadline` (string) - Supporting text
- `ctaText` (string) - Button text
- `ctaStyle` (optional) - Button variant
- `onCtaClick` (optional) - Click handler
- `heroImage` (optional) - Image URL
- `heroImageAlt` (optional) - Image alt text
- `className` (optional) - Additional CSS classes

---

### 2. Services Section (`services-section.tsx`)
**Location:** `/Users/marcomartins/Desktop/landing-page-digital-marketing/components/services-section.tsx`

Grid layout showcasing services with:
- 4 default services: SEO, PPC, Social Media, Content Marketing
- shadcn/ui Card components
- lucide-react icons (Search, MousePointerClick, Share2, FileText)
- Hover animations (lift, border color, shadow)
- Gradient overlays on hover
- Staggered entrance animations
- Responsive grid (1 col mobile → 2 col tablet → 4 col desktop)

**Props:**
- `title` (string) - Section title
- `subtitle` (optional) - Section description
- `services` (optional) - Custom service array
- `className` (optional) - Additional CSS classes

**Service Interface:**
```typescript
interface Service {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}
```

---

### 3. CTA Section (`cta-section.tsx`)
**Location:** `/Users/marcomartins/Desktop/landing-page-digital-marketing/components/cta-section.tsx`

Prominent call-to-action banner with:
- Animated gradient background (blue to purple)
- Optional countdown timer for urgency
- Real-time clock updates (days, hours, minutes, seconds)
- shadcn/ui Button with custom styling
- Trust badges (no credit card, free consultation, cancel anytime)
- Animated background elements
- Mobile-responsive timer display

**Props:**
- `ctaText` (string) - Main CTA headline
- `ctaDescription` (optional) - Supporting text
- `buttonText` (string) - Button text
- `buttonVariant` (optional) - Button style
- `onButtonClick` (optional) - Click handler
- `urgency` (optional boolean) - Enable countdown
- `urgencyText` (optional) - Urgency message
- `urgencyEndDate` (optional) - Countdown end date (ISO string or Date)
- `className` (optional) - Additional CSS classes

---

### 4. Contact Form (`contact-form.tsx`)
**Location:** `/Users/marcomartins/Desktop/landing-page-digital-marketing/components/contact-form.tsx`

Fully validated contact form with:
- **react-hook-form** for form state management
- **zod** schema validation
- shadcn/ui Form components (Input, Textarea, Label, Form)
- Real-time field validation
- Success/error states with animations
- Loading indicators during submission
- lucide-react icons for each field
- i18n support via label props
- Privacy policy links

**Fields:**
- Name (min 2 characters)
- Email (valid email format)
- Phone (min 6 characters)
- Company (min 2 characters)
- Message (min 10 characters)

**Props:**
- `onSubmit` (optional) - Async submission handler
- `labels` (optional) - Custom labels for i18n
- `className` (optional) - Additional CSS classes

**Form Data Interface:**
```typescript
interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}
```

---

### 5. Stats Section (`stats-section.tsx`)
**Location:** `/Users/marcomartins/Desktop/landing-page-digital-marketing/components/stats-section.tsx`

Animated statistics display with:
- 4 default metrics (150+ clients, 250% ROI, 5+ years, 98% success)
- Animated counters with easing (easeOutExpo)
- Intersection Observer for viewport-triggered animations
- lucide-react icons (Users, TrendingUp, Calendar, Award)
- shadcn/ui Card components
- Hover effects with gradient overlays
- Responsive grid layout

**Features:**
- Counters animate only when scrolled into view
- Smooth easing function for natural number progression
- Customizable stat icons, values, and descriptions

**Props:**
- `title` (optional) - Section title
- `subtitle` (optional) - Section description
- `stats` (optional) - Custom stats array
- `className` (optional) - Additional CSS classes

**Stat Interface:**
```typescript
interface Stat {
  id: string;
  icon: React.ElementType;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description?: string;
}
```

---

### 6. Track Event (`track-event.tsx`)
**Location:** `/Users/marcomartins/Desktop/landing-page-digital-marketing/components/track-event.tsx`

Analytics tracking utility with:
- Client-side event tracking via fetch to `/api/analytics/track`
- TypeScript interfaces for type safety
- Pre-built tracking functions for common events
- React hooks for component lifecycle tracking
- Automatic metadata (timestamp, URL, referrer)

**Functions:**
- `trackEvent()` - Generic event tracking
- `trackPageView()` - Page view tracking
- `trackClick()` - Button/link clicks
- `trackFormSubmission()` - Form submissions
- `trackCTA()` - CTA interactions
- `trackScrollDepth()` - Scroll depth (25%, 50%, 75%, 100%)
- `trackVideoPlay()` - Video plays
- `trackDownload()` - File downloads

**Hooks:**
- `useTrackMount()` - Track component mount
- `useTrackUnmount()` - Track component unmount

**Example:**
```typescript
await trackCTA('Get Started', 'hero', { variant: 'primary' });
```

---

## Installation

All required dependencies are already installed:

```json
{
  "@hookform/resolvers": "^5.2.2",
  "@radix-ui/react-label": "^2.1.7",
  "@radix-ui/react-slot": "^1.2.3",
  "class-variance-authority": "^0.7.0",
  "clsx": "^2.1.1",
  "lucide-react": "^0.446.0",
  "next": "^15.0.0",
  "react-hook-form": "^7.63.0",
  "tailwind-merge": "^2.5.2",
  "tailwindcss-animate": "^1.0.7",
  "zod": "^4.1.11"
}
```

## shadcn/ui Components Used

- **button** - `/Users/marcomartins/Desktop/landing-page-digital-marketing/components/ui/button.tsx`
- **card** - `/Users/marcomartins/Desktop/landing-page-digital-marketing/components/ui/card.tsx`
- **input** - `/Users/marcomartins/Desktop/landing-page-digital-marketing/components/ui/input.tsx`
- **textarea** - `/Users/marcomartins/Desktop/landing-page-digital-marketing/components/ui/textarea.tsx`
- **label** - `/Users/marcomartins/Desktop/landing-page-digital-marketing/components/ui/label.tsx`
- **form** - `/Users/marcomartins/Desktop/landing-page-digital-marketing/components/ui/form.tsx`

## Import Examples

### Individual Imports
```typescript
import { HeroSection } from '@/components/hero-section';
import { ServicesSection } from '@/components/services-section';
import { CtaSection } from '@/components/cta-section';
import { ContactForm } from '@/components/contact-form';
import { StatsSection } from '@/components/stats-section';
import { trackEvent, trackPageView } from '@/components/track-event';
```

### Barrel Import (from index.ts)
```typescript
import {
  HeroSection,
  ServicesSection,
  CtaSection,
  ContactForm,
  StatsSection,
  trackEvent,
  trackPageView,
} from '@/components';
```

## Design Features

### Colors
- Primary: Blue (blue-500, blue-600, blue-700)
- Secondary: Purple (purple-500, purple-600, purple-700)
- Neutral: Slate (slate-50 to slate-900)
- Accents: Green (success), Red (destructive)

### Typography
- Headings: Bold, tight tracking
- Body: Regular, relaxed line height
- Sizes: Responsive (text-lg on mobile → text-xl on desktop)

### Animations
- **Fade-in**: `animate-in fade-in`
- **Slide-up**: `slide-in-from-bottom-4`
- **Slide-right**: `slide-in-from-right-8`
- **Zoom**: `zoom-in-95`
- **Stagger delays**: Using inline styles (100ms, 300ms, 500ms)

### Responsive Breakpoints
- **sm**: 640px (mobile landscape)
- **md**: 768px (tablet)
- **lg**: 1024px (desktop)
- **xl**: 1280px (large desktop)

## Accessibility

All components include:
- ✅ Semantic HTML (section, article, button, form)
- ✅ ARIA attributes where needed
- ✅ Keyboard navigation support
- ✅ Focus indicators
- ✅ Screen reader compatibility
- ✅ Color contrast WCAG AA compliant
- ✅ Form field validation with error messages
- ✅ Alt text for images

## Performance

- ✅ Code splitting ready (client components marked)
- ✅ Next.js Image optimization
- ✅ Intersection Observer for lazy animations
- ✅ Efficient re-renders (React hooks optimized)
- ✅ Tree-shakeable exports
- ✅ Minimal bundle size (no heavy dependencies)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- iOS Safari (latest)
- Chrome Mobile (latest)

## File Structure

```
components/
├── hero-section.tsx          # Hero component
├── services-section.tsx      # Services grid
├── cta-section.tsx          # CTA banner
├── contact-form.tsx         # Contact form
├── stats-section.tsx        # Stats display
├── track-event.tsx          # Analytics utilities
├── index.ts                 # Barrel exports
├── COMPONENTS_README.md     # This file
├── USAGE_EXAMPLES.md        # Usage documentation
└── ui/                      # shadcn/ui components
    ├── button.tsx
    ├── card.tsx
    ├── input.tsx
    ├── textarea.tsx
    ├── label.tsx
    └── form.tsx
```

## Next Steps

1. **Create API endpoint** for analytics tracking:
   - Create `/app/api/analytics/track/route.ts`
   - Implement tracking logic (database, analytics service, etc.)

2. **Create API endpoint** for contact form:
   - Create `/app/api/contact/route.ts`
   - Implement email sending or CRM integration

3. **Add hero images**:
   - Place images in `/public/images/`
   - Use optimized formats (WebP, AVIF)

4. **Customize theme**:
   - Modify `tailwind.config.ts` for brand colors
   - Update CSS variables in `app/globals.css`

5. **Add i18n**:
   - Use next-intl for translations
   - Create locale files for Portuguese/Luxembourgish

## Support

For issues or questions:
- Check `USAGE_EXAMPLES.md` for detailed examples
- Review individual component files for JSDoc comments
- Verify all dependencies are installed
- Ensure Next.js 15 and React 19 compatibility

---

**Created by:** Claude Code (Anthropic)
**Date:** 2025-09-30
**Framework:** Next.js 15, React 19, Tailwind CSS 3.4, shadcn/ui
**License:** Use freely for your Luxembourg digital marketing agency