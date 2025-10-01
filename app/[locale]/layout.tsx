import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import '../globals.css';
import { Inter } from 'next/font/google';
import LanguageSwitcher from '@/components/language-switcher';
import { getSEOMetadata, generateLocalBusinessSchema, generateServiceSchema, generateFAQSchema, generateOrganizationSchema } from '@/lib/seo';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const seoData = getSEOMetadata(locale);

  return {
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords,
    alternates: {
      canonical: `https://luxdigital.lu/${locale}`,
      languages: {
        'en': 'https://luxdigital.lu/en',
        'fr': 'https://luxdigital.lu/fr',
        'de': 'https://luxdigital.lu/de',
      },
    },
    openGraph: {
      title: seoData.title,
      description: seoData.description,
      url: `https://luxdigital.lu/${locale}`,
      siteName: 'LuxDigital',
      locale: locale,
      type: 'website',
      images: [
        {
          url: 'https://luxdigital.lu/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'LuxDigital - Digital Marketing Luxembourg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoData.title,
      description: seoData.description,
      images: ['https://luxdigital.lu/og-image.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  // Generate JSON-LD structured data
  const localBusinessSchema = generateLocalBusinessSchema(locale);
  const serviceSchema = generateServiceSchema(locale);
  const faqSchema = generateFAQSchema(locale);
  const organizationSchema = generateOrganizationSchema();

  return (
    <html lang={locale} className={inter.variable}>
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <div className="relative min-h-screen">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-6">
                  <a href={`/${locale}`} className="text-xl font-bold">
                    LuxDigital
                  </a>
                </div>
                <LanguageSwitcher currentLocale={locale} />
              </div>
            </header>
            <main>{children}</main>
            <footer className="border-t py-8">
              <div className="container text-center text-sm text-muted-foreground">
                © 2024 LuxDigital. All rights reserved.
              </div>
            </footer>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}