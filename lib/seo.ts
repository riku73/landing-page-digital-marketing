/**
 * SEO utilities for structured data and metadata
 */

export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonical?: string;
}

/**
 * Generate LocalBusiness JSON-LD structured data
 */
export function generateLocalBusinessSchema(locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://luxdigital.lu/#organization',
    name: 'LuxDigital',
    alternateName: locale === 'fr' ? 'LuxDigital Luxembourg' : 'LuxDigital Luxemburg',
    description:
      locale === 'en'
        ? 'Fresh digital marketing agency in Luxembourg specializing in SEO, PPC, and social media marketing for SMBs'
        : locale === 'fr'
        ? 'Nouvelle agence de marketing digital au Luxembourg, spécialisée en SEO, publicité en ligne et réseaux sociaux pour PME'
        : 'Neue Digitalagentur in Luxemburg mit Fokus auf SEO, Online-Werbung und Social-Media-Marketing für KMU',
    url: `https://luxdigital.lu/${locale}`,
    logo: 'https://luxdigital.lu/logo.png',
    image: 'https://luxdigital.lu/og-image.jpg',
    telephone: '+352 27 99 10 50',
    email: 'hello@luxdigital.lu',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1 Rue de la Chapelle',
      addressLocality: 'Luxembourg',
      addressRegion: 'Luxembourg',
      postalCode: 'L-1325',
      addressCountry: 'LU',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 49.6116,
      longitude: 6.1319,
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Luxembourg',
      },
      {
        '@type': 'City',
        name: 'Esch-sur-Alzette',
      },
      {
        '@type': 'State',
        name: 'Luxembourg',
      },
    ],
    priceRange: '€€',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    sameAs: [
      'https://www.facebook.com/luxdigitallu',
      'https://www.linkedin.com/company/luxdigital-luxembourg',
      'https://twitter.com/luxdigital_lu',
      'https://www.instagram.com/luxdigital.lu',
    ],
  };
}

/**
 * Generate Service JSON-LD structured data
 */
export function generateServiceSchema(locale: string) {
  const services =
    locale === 'en'
      ? [
          { name: 'SEO Optimization', description: 'Search engine optimization for Luxembourg businesses' },
          { name: 'PPC Advertising', description: 'Paid advertising campaigns with proven ROI' },
          { name: 'Social Media Marketing', description: 'Engage your audience on social platforms' },
          { name: 'Content Marketing', description: 'Strategic content creation and distribution' },
        ]
      : locale === 'fr'
      ? [
          { name: 'Optimisation SEO', description: 'Optimisation pour les moteurs de recherche' },
          { name: 'Publicité PPC', description: 'Campagnes publicitaires avec ROI prouvé' },
          { name: 'Marketing sur les réseaux sociaux', description: 'Engagez votre audience' },
          { name: 'Marketing de contenu', description: 'Création et distribution de contenu stratégique' },
        ]
      : [
          { name: 'SEO-Optimierung', description: 'Suchmaschinenoptimierung für luxemburgische Unternehmen' },
          { name: 'PPC-Werbung', description: 'Bezahlte Werbekampagnen mit nachgewiesenem ROI' },
          { name: 'Social-Media-Marketing', description: 'Erreichen Sie Ihr Publikum auf sozialen Plattformen' },
          { name: 'Content-Marketing', description: 'Strategische Content-Erstellung und -Verteilung' },
        ];

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    provider: {
      '@id': 'https://luxdigital.lu/#organization',
    },
    serviceType: 'Digital Marketing',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Digital Marketing Services',
      itemListElement: services.map((service, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.name,
          description: service.description,
        },
      })),
    },
  };
}

/**
 * Generate FAQ JSON-LD structured data
 */
export function generateFAQSchema(locale: string) {
  const faqs =
    locale === 'en'
      ? [
          {
            question: 'What digital marketing services do you offer in Luxembourg?',
            answer:
              'We offer comprehensive digital marketing services including SEO optimization, PPC advertising, social media marketing, and content marketing specifically tailored for Luxembourg businesses.',
          },
          {
            question: 'How long does it take to see results from SEO?',
            answer:
              'Typically, you can expect to see initial SEO improvements within 3-4 months, with significant results within 6 months. However, SEO is an ongoing process that delivers compounding returns over time.',
          },
          {
            question: 'Do you work with businesses in all industries?',
            answer:
              'Yes, we have experience across multiple industries including financial services, technology, retail, and professional services. We tailor our strategies to your specific industry and target audience.',
          },
          {
            question: 'What is your pricing structure?',
            answer:
              'Our pricing varies based on the scope of services and your business goals. We offer flexible packages starting from €1,500/month. Contact us for a customized quote based on your needs.',
          },
        ]
      : locale === 'fr'
      ? [
          {
            question: 'Quels services de marketing digital proposez-vous au Luxembourg?',
            answer:
              'Nous proposons des services complets incluant l\'optimisation SEO, la publicité PPC, le marketing sur les réseaux sociaux et le marketing de contenu, spécialement adaptés aux entreprises luxembourgeoises.',
          },
          {
            question: 'Combien de temps faut-il pour voir des résultats SEO?',
            answer:
              'En général, vous pouvez voir des améliorations initiales dans les 3-4 mois, avec des résultats significatifs dans les 6 mois. Le SEO est un processus continu qui offre des retours composés dans le temps.',
          },
          {
            question: 'Travaillez-vous avec toutes les industries?',
            answer:
              'Oui, nous avons de l\'expérience dans plusieurs secteurs incluant les services financiers, la technologie, le commerce de détail et les services professionnels.',
          },
          {
            question: 'Quelle est votre structure tarifaire?',
            answer:
              'Nos prix varient selon l\'étendue des services et vos objectifs. Nous proposons des forfaits flexibles à partir de 1.500€/mois. Contactez-nous pour un devis personnalisé.',
          },
        ]
      : [
          {
            question: 'Welche Digitalmarketing-Dienstleistungen bieten Sie in Luxemburg an?',
            answer:
              'Wir bieten umfassende Digitalmarketing-Dienstleistungen einschließlich SEO-Optimierung, PPC-Werbung, Social-Media-Marketing und Content-Marketing, speziell zugeschnitten auf luxemburgische Unternehmen.',
          },
          {
            question: 'Wie lange dauert es, bis man SEO-Ergebnisse sieht?',
            answer:
              'In der Regel können Sie erste SEO-Verbesserungen innerhalb von 3-4 Monaten erwarten, mit signifikanten Ergebnissen innerhalb von 6 Monaten.',
          },
          {
            question: 'Arbeiten Sie mit Unternehmen aus allen Branchen?',
            answer:
              'Ja, wir haben Erfahrung in mehreren Branchen einschließlich Finanzdienstleistungen, Technologie, Einzelhandel und professionellen Dienstleistungen.',
          },
          {
            question: 'Wie ist Ihre Preisstruktur?',
            answer:
              'Unsere Preise variieren je nach Umfang der Dienstleistungen und Ihren Geschäftszielen. Wir bieten flexible Pakete ab 1.500€/Monat an.',
          },
        ];

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate Organization JSON-LD structured data
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://luxdigital.lu/#organization',
    name: 'LuxDigital',
    url: 'https://luxdigital.lu',
    logo: 'https://luxdigital.lu/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+352 27 99 10 50',
      contactType: 'customer service',
      email: 'hello@luxdigital.lu',
      areaServed: 'LU',
      availableLanguage: ['en', 'fr', 'de'],
    },
    sameAs: [
      'https://www.facebook.com/luxdigitallu',
      'https://www.linkedin.com/company/luxdigital-luxembourg',
      'https://twitter.com/luxdigital_lu',
      'https://www.instagram.com/luxdigital.lu',
    ],
  };
}

/**
 * Get SEO metadata by locale
 */
export function getSEOMetadata(locale: string): SEOMetadata {
  const metadata = {
    en: {
      title: 'LuxDigital - Digital Marketing Agency Luxembourg | SEO, PPC & Social Media',
      description:
        'Fresh digital marketing agency in Luxembourg. Transparent pricing, honest results. SEO, PPC, social media & content marketing for SMBs. Free consultation available.',
      keywords: [
        'digital marketing luxembourg',
        'seo luxembourg',
        'ppc advertising luxembourg',
        'social media marketing luxembourg',
        'marketing agency luxembourg',
        'online marketing luxembourg',
        'content marketing luxembourg',
        'luxdigital',
        'sme marketing luxembourg',
      ],
    },
    fr: {
      title: 'LuxDigital - Agence Marketing Digital Luxembourg | SEO, PPC & Réseaux Sociaux',
      description:
        'Nouvelle agence de marketing digital au Luxembourg. Tarifs transparents, résultats honnêtes. SEO, publicité en ligne, réseaux sociaux pour PME. Consultation gratuite.',
      keywords: [
        'marketing digital luxembourg',
        'agence marketing luxembourg',
        'seo luxembourg',
        'publicité ppc luxembourg',
        'réseaux sociaux luxembourg',
        'marketing en ligne luxembourg',
        'stratégie digitale luxembourg',
        'agence web luxembourg',
      ],
    },
    de: {
      title: 'LuxDigital - Digitalagentur Luxemburg | SEO, PPC & Social Media',
      description:
        'Neue Digitalagentur in Luxemburg. Transparente Preise, ehrliche Ergebnisse. SEO, PPC, Social Media & Content Marketing für KMU. Kostenlose Beratung verfügbar.',
      keywords: [
        'digitalmarketing luxemburg',
        'marketingagentur luxemburg',
        'seo luxemburg',
        'ppc werbung luxemburg',
        'social media marketing luxemburg',
        'online marketing luxemburg',
        'content marketing luxemburg',
        'luxdigital',
        'kmu marketing luxemburg',
      ],
    },
  };

  return metadata[locale as keyof typeof metadata] || metadata.en;
}