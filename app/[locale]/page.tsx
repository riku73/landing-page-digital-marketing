'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { HeroSection } from '@/components/hero-section';
import { ServicesSection } from '@/components/services-section';
import { StatsSection } from '@/components/stats-section';
import { CtaSection } from '@/components/cta-section';
import { ContactForm } from '@/components/contact-form';
import { trackPageView } from '@/components/track-event';
import { getVariantContent, type VariantId } from '@/lib/ab-testing';

export default function HomePage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const [variant, setVariant] = useState<VariantId>('control');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get assigned variant from API
    async function fetchVariant() {
      try {
        const response = await fetch('/api/variant');
        const data = await response.json();
        setVariant(data.variant);

        // Track page view with assigned variant
        await trackPageView(data.variant, { locale });
      } catch (error) {
        console.error('Failed to fetch variant:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchVariant();
  }, [locale]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      </div>
    );
  }

  const content = getVariantContent(locale, variant);

  const handleFormSubmit = async (data: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    message: string;
  }) => {
    try {
      // Track form submission
      const { trackFormSubmission } = await import('@/components/track-event');
      await trackFormSubmission(variant, true, {
        locale,
        name: data.name,
        email: data.email,
      });

      // Here you would normally send to your email service or CRM
      console.log('Form submitted:', data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Form submission error:', error);
      throw error;
    }
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        headline={content.hero.headline}
        subheadline={content.hero.subheadline}
        ctaText={content.hero.ctaText}
        ctaStyle={content.hero.ctaStyle}
      />

      {/* Services Section */}
      <ServicesSection
        title={content.services.title}
      />

      {/* Stats Section */}
      <StatsSection />

      {/* CTA Section */}
      <CtaSection
        ctaText={content.cta.text}
        buttonText={content.hero.ctaText}
      />

      {/* Contact Form */}
      <section className="bg-muted/30 py-24">
        <div className="container max-w-2xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              {locale === 'fr'
                ? 'Commencez Votre Transformation'
                : locale === 'de'
                ? 'Starten Sie Ihre Transformation'
                : 'Start Your Transformation'}
            </h2>
            <p className="text-lg text-muted-foreground">
              {locale === 'fr'
                ? 'Obtenez votre audit gratuit et découvrez comment nous pouvons faire croître votre entreprise'
                : locale === 'de'
                ? 'Erhalten Sie Ihre kostenlose Analyse und erfahren Sie, wie wir Ihr Geschäft wachsen lassen können'
                : 'Get your free audit and discover how we can grow your business'}
            </p>
          </div>
          <ContactForm onSubmit={handleFormSubmit} />
        </div>
      </section>
    </main>
  );
}