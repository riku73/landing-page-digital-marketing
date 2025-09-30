# Landing Page Components - Usage Examples

This document provides comprehensive examples for using the high-quality, conversion-optimized landing page components built with shadcn/ui.

## Table of Contents
1. [Hero Section](#hero-section)
2. [Services Section](#services-section)
3. [CTA Section](#cta-section)
4. [Contact Form](#contact-form)
5. [Stats Section](#stats-section)
6. [Track Event](#track-event)

---

## Hero Section

### Basic Usage

```tsx
import { HeroSection } from '@/components';

export default function HomePage() {
  return (
    <HeroSection
      headline="Transform Your Digital Presence"
      subheadline="Data-driven marketing strategies that deliver measurable results for Luxembourg businesses"
      ctaText="Get Started Today"
      onCtaClick={() => {
        // Handle CTA click
        window.location.href = '#contact';
      }}
    />
  );
}
```

### With Hero Image

```tsx
import { HeroSection } from '@/components';

export default function HomePage() {
  return (
    <HeroSection
      headline="Transform Your Digital Presence"
      subheadline="Data-driven marketing strategies that deliver measurable results"
      ctaText="Get Started Today"
      ctaStyle="default"
      heroImage="/images/hero-dashboard.jpg"
      heroImageAlt="Digital marketing dashboard"
      onCtaClick={() => {
        // Track analytics
        trackCTA('Get Started Today', 'hero');
        // Navigate to form
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }}
    />
  );
}
```

---

## Services Section

### Basic Usage

```tsx
import { ServicesSection } from '@/components';

export default function ServicesPage() {
  return (
    <ServicesSection
      title="Our Services"
      subtitle="Comprehensive digital marketing solutions tailored to your business needs"
    />
  );
}
```

### Custom Services

```tsx
import { ServicesSection, Service } from '@/components';
import { Target, Globe, Zap, Shield } from 'lucide-react';

const customServices: Service[] = [
  {
    id: 'targeting',
    icon: Target,
    title: 'Precision Targeting',
    description: 'Reach your ideal customers with data-driven audience targeting strategies.',
  },
  {
    id: 'global',
    icon: Globe,
    title: 'Global Reach',
    description: 'Expand your business across borders with our international marketing expertise.',
  },
  {
    id: 'fast',
    icon: Zap,
    title: 'Rapid Results',
    description: 'See tangible improvements in your metrics within the first 30 days.',
  },
  {
    id: 'security',
    icon: Shield,
    title: 'Brand Protection',
    description: 'Safeguard your online reputation with our comprehensive monitoring tools.',
  },
];

export default function ServicesPage() {
  return (
    <ServicesSection
      title="Why Choose Us"
      subtitle="Industry-leading solutions that set us apart"
      services={customServices}
    />
  );
}
```

---

## CTA Section

### Basic CTA

```tsx
import { CtaSection } from '@/components';

export default function CTAComponent() {
  return (
    <CtaSection
      ctaText="Ready to Grow Your Business?"
      ctaDescription="Join 150+ satisfied clients and start seeing real results today"
      buttonText="Schedule Free Consultation"
      onButtonClick={() => {
        window.location.href = '/contact';
      }}
    />
  );
}
```

### With Urgency Countdown

```tsx
import { CtaSection } from '@/components';

export default function UrgentCTA() {
  // Calculate end date (30 days from now)
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 30);

  return (
    <CtaSection
      ctaText="Limited Time Offer: 50% Off First Month"
      ctaDescription="Start your digital transformation journey with exclusive launch pricing"
      buttonText="Claim Your Discount"
      buttonVariant="default"
      urgency={true}
      urgencyText="Offer ends soon"
      urgencyEndDate={endDate.toISOString()}
      onButtonClick={() => {
        // Track conversion
        trackCTA('Claim Your Discount', 'urgency-cta');
        // Open contact modal or navigate
        window.location.href = '#contact';
      }}
    />
  );
}
```

---

## Contact Form

### Basic Form

```tsx
import { ContactForm, ContactFormData } from '@/components';

export default function ContactPage() {
  const handleSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      // Track successful submission
      await trackFormSubmission('contact-form', true);
    } catch (error) {
      // Track failed submission
      await trackFormSubmission('contact-form', false);
      throw error;
    }
  };

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Get In Touch</h2>
        <ContactForm onSubmit={handleSubmit} />
      </div>
    </section>
  );
}
```

### Multilingual Form (Portuguese)

```tsx
import { ContactForm, ContactFormData, ContactFormLabels } from '@/components';

const portugueseLabels: ContactFormLabels = {
  name: 'Nome Completo',
  email: 'Endereço de Email',
  phone: 'Número de Telefone',
  company: 'Nome da Empresa',
  message: 'Mensagem',
  submit: 'Enviar Mensagem',
  submitting: 'Enviando...',
  successTitle: 'Mensagem Enviada com Sucesso!',
  successMessage: 'Obrigado por entrar em contato. Responderemos em até 24 horas.',
};

export default function ContactPagePT() {
  const handleSubmit = async (data: ContactFormData) => {
    // Handle form submission
    await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, locale: 'pt' }),
    });
  };

  return (
    <ContactForm
      onSubmit={handleSubmit}
      labels={portugueseLabels}
    />
  );
}
```

---

## Stats Section

### Basic Stats

```tsx
import { StatsSection } from '@/components';

export default function AboutPage() {
  return (
    <StatsSection
      title="Our Track Record"
      subtitle="Numbers that speak for themselves"
    />
  );
}
```

### Custom Stats

```tsx
import { StatsSection, Stat } from '@/components';
import { Rocket, Star, Users, Trophy } from 'lucide-react';

const customStats: Stat[] = [
  {
    id: 'campaigns',
    icon: Rocket,
    value: 500,
    suffix: '+',
    label: 'Campaigns Launched',
    description: 'Successful marketing campaigns delivered',
  },
  {
    id: 'rating',
    icon: Star,
    value: 4.9,
    suffix: '/5',
    label: 'Client Rating',
    description: 'Average satisfaction score',
  },
  {
    id: 'team',
    icon: Users,
    value: 25,
    suffix: '',
    label: 'Expert Team Members',
    description: 'Certified marketing professionals',
  },
  {
    id: 'awards',
    icon: Trophy,
    value: 12,
    suffix: '',
    label: 'Industry Awards',
    description: 'Recognition for excellence',
  },
];

export default function AboutPage() {
  return (
    <StatsSection
      title="Why We're Different"
      subtitle="Award-winning team with proven results"
      stats={customStats}
    />
  );
}
```

---

## Track Event

### Page View Tracking

```tsx
'use client';

import { useEffect } from 'react';
import { trackPageView } from '@/components';

export default function AboutPage() {
  useEffect(() => {
    trackPageView('About Page', {
      path: '/about',
      referrer: document.referrer,
    });
  }, []);

  return (
    <div>
      {/* Page content */}
    </div>
  );
}
```

### Button Click Tracking

```tsx
import { trackClick } from '@/components';
import { Button } from '@/components/ui/button';

export default function PricingPage() {
  return (
    <Button
      onClick={async () => {
        await trackClick('View Pricing', 'conversion');
        // Navigate or show pricing
        window.location.href = '/pricing';
      }}
    >
      View Pricing
    </Button>
  );
}
```

### Form Submission Tracking

```tsx
import { ContactForm, ContactFormData, trackFormSubmission } from '@/components';

export default function ContactPage() {
  const handleSubmit = async (data: ContactFormData) => {
    try {
      await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      // Track successful submission
      await trackFormSubmission('contact-form', true, {
        source: 'landing-page',
        fields: Object.keys(data),
      });
    } catch (error) {
      // Track failed submission
      await trackFormSubmission('contact-form', false, {
        error: error.message,
      });
      throw error;
    }
  };

  return <ContactForm onSubmit={handleSubmit} />;
}
```

### CTA Click Tracking

```tsx
import { HeroSection, trackCTA } from '@/components';

export default function HomePage() {
  return (
    <HeroSection
      headline="Transform Your Business"
      subheadline="Get started today"
      ctaText="Start Free Trial"
      onCtaClick={async () => {
        await trackCTA('Start Free Trial', 'hero', {
          variant: 'primary',
          position: 'top',
        });
        window.location.href = '/signup';
      }}
    />
  );
}
```

### Scroll Depth Tracking

```tsx
'use client';

import { useEffect } from 'react';
import { trackScrollDepth } from '@/components';

export default function BlogPost() {
  useEffect(() => {
    const thresholds = [25, 50, 75, 100];
    const tracked = new Set<number>();

    const handleScroll = () => {
      const scrollPercent =
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

      thresholds.forEach((threshold) => {
        if (scrollPercent >= threshold && !tracked.has(threshold)) {
          tracked.add(threshold);
          trackScrollDepth(threshold, {
            page: 'blog-post',
            postId: 'example-post',
          });
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <article>
      {/* Blog post content */}
    </article>
  );
}
```

---

## Complete Landing Page Example

Here's a complete example combining all components:

```tsx
import {
  HeroSection,
  ServicesSection,
  StatsSection,
  CtaSection,
  ContactForm,
  ContactFormData,
  trackPageView,
  trackCTA,
  trackFormSubmission,
} from '@/components';
import { useEffect } from 'react';

export default function LandingPage() {
  useEffect(() => {
    trackPageView('Home Page');
  }, []);

  const handleContactSubmit = async (data: ContactFormData) => {
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      await trackFormSubmission('contact-form', true);
    } catch (error) {
      await trackFormSubmission('contact-form', false);
      throw error;
    }
  };

  return (
    <main>
      {/* Hero Section */}
      <HeroSection
        headline="Transform Your Digital Presence"
        subheadline="Data-driven marketing strategies for Luxembourg businesses"
        ctaText="Get Started Today"
        heroImage="/images/hero.jpg"
        onCtaClick={async () => {
          await trackCTA('Get Started Today', 'hero');
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Services Section */}
      <ServicesSection
        title="Our Services"
        subtitle="Comprehensive solutions tailored to your needs"
      />

      {/* Stats Section */}
      <StatsSection />

      {/* CTA Section */}
      <CtaSection
        ctaText="Ready to Grow Your Business?"
        ctaDescription="Join 150+ satisfied clients"
        buttonText="Schedule Free Consultation"
        onButtonClick={async () => {
          await trackCTA('Schedule Free Consultation', 'mid-page-cta');
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Contact Form */}
      <section id="contact" className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Get In Touch</h2>
          <ContactForm onSubmit={handleContactSubmit} />
        </div>
      </section>
    </main>
  );
}
```

---

## Styling Customization

All components accept a `className` prop for custom styling:

```tsx
<HeroSection
  headline="Custom Styled Hero"
  subheadline="With Tailwind classes"
  ctaText="Click Me"
  className="bg-gradient-to-r from-purple-900 to-indigo-900"
/>

<ServicesSection
  title="Services"
  className="bg-slate-100 py-32"
/>

<ContactForm
  onSubmit={handleSubmit}
  className="max-w-4xl shadow-2xl"
/>
```

---

## Accessibility Features

All components include:
- Proper ARIA attributes
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- Semantic HTML
- Color contrast compliance

---

## Performance Optimization

Components are optimized with:
- Code splitting support
- Lazy loading for images
- Efficient re-renders
- Intersection observer for animations
- Minimal bundle size

---

## Browser Support

All components work on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

---

For more information, refer to the individual component source files or contact the development team.