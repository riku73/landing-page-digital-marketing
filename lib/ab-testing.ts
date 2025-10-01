/**
 * A/B Testing System
 * Manages variant assignment, tracking, and persistence
 */

export type VariantId = 'control' | 'variant-a' | 'variant-b' | 'variant-c';

export interface Variant {
  id: VariantId;
  name: string;
  weight: number; // Percentage of traffic (0-100)
  description: string;
}

export interface VariantContent {
  hero: {
    headline: string;
    subheadline: string;
    ctaText: string;
    ctaStyle: 'default' | 'secondary' | 'outline' | 'destructive' | 'ghost' | 'link';
    imageSrc?: string;
  };
  services: {
    title: string;
    description: string;
  };
  cta: {
    text: string;
    urgency?: string;
  };
}

// Define all available variants
export const VARIANTS: Record<VariantId, Variant> = {
  'control': {
    id: 'control',
    name: 'Control (Original)',
    weight: 25,
    description: 'Original version - professional tone',
  },
  'variant-a': {
    id: 'variant-a',
    name: 'Variant A (Urgency)',
    weight: 25,
    description: 'Focus on urgency and scarcity',
  },
  'variant-b': {
    id: 'variant-b',
    name: 'Variant B (ROI Focus)',
    weight: 25,
    description: 'ROI and data-driven approach',
  },
  'variant-c': {
    id: 'variant-c',
    name: 'Variant C (Local Trust)',
    weight: 25,
    description: 'Local Luxembourg focus',
  },
};

// Variant content for each language
export const VARIANT_CONTENT: Record<string, Record<VariantId, VariantContent>> = {
  en: {
    'control': {
      hero: {
        headline: 'Digital Growth Made Simple for Luxembourg Businesses',
        subheadline: 'Fresh approach to digital marketing. Transparent pricing, honest results, and strategies that work for SMBs in Luxembourg',
        ctaText: 'Get Free 30-Min Consultation',
        ctaStyle: 'default',
      },
      services: {
        title: 'Digital Marketing Services',
        description: 'SEO, PPC, Social Media, and Content Marketing for the Luxembourg market',
      },
      cta: {
        text: 'Ready to Grow Your Online Presence?',
      },
    },
    'variant-a': {
      hero: {
        headline: 'Honest Digital Marketing for Luxembourg SMBs',
        subheadline: 'No inflated promises. No hidden fees. Just transparent, results-focused digital marketing from a team that understands your market',
        ctaText: 'See Our Transparent Pricing',
        ctaStyle: 'default',
      },
      services: {
        title: 'What We Actually Do',
        description: 'Real services, honest approach, measurable results',
      },
      cta: {
        text: 'Let\'s Discuss Your Goals',
      },
    },
    'variant-b': {
      hero: {
        headline: 'Grow Your Business with Smart Digital Marketing',
        subheadline: 'Strategic SEO, targeted ads, and engaging content designed specifically for Luxembourg\'s trilingual market',
        ctaText: 'Request Free Marketing Audit',
        ctaStyle: 'secondary',
      },
      services: {
        title: 'How We Help You Grow',
        description: 'Comprehensive digital strategies tailored to your business goals',
      },
      cta: {
        text: 'Start Your Digital Strategy',
      },
    },
    'variant-c': {
      hero: {
        headline: 'Luxembourg\'s Fresh Digital Marketing Agency',
        subheadline: 'New agency, experienced team. Specializing in multilingual digital marketing for Luxembourg, Esch, and the Greater Region',
        ctaText: 'Meet Our Team',
        ctaStyle: 'outline',
      },
      services: {
        title: 'Local Expertise, Modern Approach',
        description: 'Digital marketing that understands Luxembourg\'s unique market',
      },
      cta: {
        text: 'Discover Our Approach',
      },
    },
  },
  fr: {
    'control': {
      hero: {
        headline: 'Marketing Digital Simplifié pour les Entreprises Luxembourgeoises',
        subheadline: 'Approche moderne du marketing digital. Tarifs transparents, résultats honnêtes et stratégies efficaces pour les PME au Luxembourg',
        ctaText: 'Consultation Gratuite de 30 Min',
        ctaStyle: 'default',
      },
      services: {
        title: 'Services de Marketing Digital',
        description: 'SEO, publicité en ligne, réseaux sociaux et content marketing pour le marché luxembourgeois',
      },
      cta: {
        text: 'Prêt à Développer Votre Présence en Ligne?',
      },
    },
    'variant-a': {
      hero: {
        headline: 'Marketing Digital Transparent pour PME Luxembourgeoises',
        subheadline: 'Pas de promesses exagérées. Pas de frais cachés. Juste du marketing digital transparent et axé sur les résultats',
        ctaText: 'Voir Nos Tarifs Transparents',
        ctaStyle: 'default',
      },
      services: {
        title: 'Ce Que Nous Faisons Réellement',
        description: 'Services réels, approche honnête, résultats mesurables',
      },
      cta: {
        text: 'Discutons de Vos Objectifs',
      },
    },
    'variant-b': {
      hero: {
        headline: 'Développez Votre Entreprise avec du Marketing Digital Intelligent',
        subheadline: 'SEO stratégique, publicités ciblées et contenu engageant conçus spécifiquement pour le marché trilingue du Luxembourg',
        ctaText: 'Demander un Audit Marketing Gratuit',
        ctaStyle: 'secondary',
      },
      services: {
        title: 'Comment Nous Vous Aidons à Grandir',
        description: 'Stratégies digitales complètes adaptées à vos objectifs commerciaux',
      },
      cta: {
        text: 'Commencez Votre Stratégie Digitale',
      },
    },
    'variant-c': {
      hero: {
        headline: 'Nouvelle Agence de Marketing Digital au Luxembourg',
        subheadline: 'Nouvelle agence, équipe expérimentée. Spécialistes du marketing digital multilingue pour Luxembourg, Esch et la Grande Région',
        ctaText: 'Rencontrer Notre Équipe',
        ctaStyle: 'outline',
      },
      services: {
        title: 'Expertise Locale, Approche Moderne',
        description: 'Marketing digital qui comprend le marché unique du Luxembourg',
      },
      cta: {
        text: 'Découvrez Notre Approche',
      },
    },
  },
  de: {
    'control': {
      hero: {
        headline: 'Digitales Wachstum Einfach Gemacht für Luxemburger Unternehmen',
        subheadline: 'Frischer Ansatz im Digitalmarketing. Transparente Preise, ehrliche Ergebnisse und Strategien für KMU in Luxemburg',
        ctaText: 'Kostenlose 30-Min-Beratung',
        ctaStyle: 'default',
      },
      services: {
        title: 'Digitalmarketing-Services',
        description: 'SEO, Online-Werbung, Social Media und Content Marketing für den luxemburgischen Markt',
      },
      cta: {
        text: 'Bereit, Ihre Online-Präsenz Auszubauen?',
      },
    },
    'variant-a': {
      hero: {
        headline: 'Ehrliches Digitalmarketing für Luxemburger KMU',
        subheadline: 'Keine überzogenen Versprechen. Keine versteckten Kosten. Nur transparentes, ergebnisorientiertes Digitalmarketing',
        ctaText: 'Transparente Preise Ansehen',
        ctaStyle: 'default',
      },
      services: {
        title: 'Was Wir Tatsächlich Tun',
        description: 'Echte Dienstleistungen, ehrlicher Ansatz, messbare Ergebnisse',
      },
      cta: {
        text: 'Lassen Sie Uns Ihre Ziele Besprechen',
      },
    },
    'variant-b': {
      hero: {
        headline: 'Wachsen Sie mit Intelligentem Digitalmarketing',
        subheadline: 'Strategisches SEO, gezielte Werbung und ansprechende Inhalte speziell für Luxemburgs mehrsprachigen Markt',
        ctaText: 'Kostenloses Marketing-Audit Anfordern',
        ctaStyle: 'secondary',
      },
      services: {
        title: 'Wie Wir Ihnen Beim Wachstum Helfen',
        description: 'Umfassende digitale Strategien, zugeschnitten auf Ihre Geschäftsziele',
      },
      cta: {
        text: 'Starten Sie Ihre Digitalstrategie',
      },
    },
    'variant-c': {
      hero: {
        headline: 'Luxemburgs Neue Digitalmarketing-Agentur',
        subheadline: 'Neue Agentur, erfahrenes Team. Spezialisiert auf mehrsprachiges Digitalmarketing für Luxemburg, Esch und die Großregion',
        ctaText: 'Unser Team Kennenlernen',
        ctaStyle: 'outline',
      },
      services: {
        title: 'Lokale Expertise, Moderner Ansatz',
        description: 'Digitalmarketing, das Luxemburgs einzigartigen Markt versteht',
      },
      cta: {
        text: 'Entdecken Sie Unseren Ansatz',
      },
    },
  },
};

/**
 * Assign variant based on weights
 */
export function assignVariant(): VariantId {
  const random = Math.random() * 100;
  let cumulative = 0;

  for (const [id, variant] of Object.entries(VARIANTS)) {
    cumulative += variant.weight;
    if (random <= cumulative) {
      return id as VariantId;
    }
  }

  return 'control';
}

/**
 * Get variant content for specific locale
 */
export function getVariantContent(locale: string, variantId: VariantId): VariantContent {
  const localeContent = VARIANT_CONTENT[locale] || VARIANT_CONTENT.en;
  return localeContent[variantId] || localeContent.control;
}

/**
 * Track conversion event
 */
export async function trackConversion(
  variantId: VariantId,
  eventType: 'page_view' | 'cta_click' | 'form_submit' | 'phone_click',
  metadata?: Record<string, string>
) {
  try {
    await fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        variantId,
        eventType,
        metadata,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch (error) {
    console.error('Failed to track conversion:', error);
  }
}