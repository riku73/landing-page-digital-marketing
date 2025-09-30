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
        headline: 'Digital Marketing Excellence in Luxembourg',
        subheadline: 'Drive growth with data-driven strategies tailored for Luxembourg businesses',
        ctaText: 'Get Your Free Audit',
        ctaStyle: 'default',
      },
      services: {
        title: 'Comprehensive Digital Solutions',
        description: 'From SEO to paid advertising, we deliver results',
      },
      cta: {
        text: 'Start Your Growth Journey',
      },
    },
    'variant-a': {
      hero: {
        headline: 'Transform Your Business This Quarter',
        subheadline: 'Limited slots available - Luxembourg\'s premier digital marketing agency',
        ctaText: 'Claim Your Spot Now',
        ctaStyle: 'default',
      },
      services: {
        title: 'Proven Growth Strategies',
        description: 'Join 150+ Luxembourg companies already growing',
      },
      cta: {
        text: 'Book Free Strategy Call',
        urgency: 'Only 3 spots left this month',
      },
    },
    'variant-b': {
      hero: {
        headline: 'Generate 3X More Qualified Leads',
        subheadline: 'Data-proven strategies that delivered €2.5M in client revenue last year',
        ctaText: 'See Our ROI Calculator',
        ctaStyle: 'secondary',
      },
      services: {
        title: 'Performance-Driven Marketing',
        description: 'Average 250% ROI across our Luxembourg clients',
      },
      cta: {
        text: 'Calculate Your Potential ROI',
      },
    },
    'variant-c': {
      hero: {
        headline: 'Luxembourg\'s Local Digital Marketing Experts',
        subheadline: 'Serving Luxembourg-Ville, Esch, and the Greater Region since 2018',
        ctaText: 'Talk to a Local Expert',
        ctaStyle: 'outline',
      },
      services: {
        title: 'Local Expertise, Global Standards',
        description: 'Trusted by Luxembourg Chamber of Commerce members',
      },
      cta: {
        text: 'Meet Your Local Team',
      },
    },
  },
  fr: {
    'control': {
      hero: {
        headline: 'Excellence en Marketing Digital au Luxembourg',
        subheadline: 'Stimulez votre croissance avec des stratégies adaptées aux entreprises luxembourgeoises',
        ctaText: 'Obtenez Votre Audit Gratuit',
        ctaStyle: 'default',
      },
      services: {
        title: 'Solutions Digitales Complètes',
        description: 'Du SEO à la publicité payante, nous livrons des résultats',
      },
      cta: {
        text: 'Démarrez Votre Croissance',
      },
    },
    'variant-a': {
      hero: {
        headline: 'Transformez Votre Entreprise Ce Trimestre',
        subheadline: 'Places limitées - L\'agence digitale de référence au Luxembourg',
        ctaText: 'Réservez Votre Place',
        ctaStyle: 'default',
      },
      services: {
        title: 'Stratégies de Croissance Éprouvées',
        description: 'Rejoignez 150+ entreprises luxembourgeoises en croissance',
      },
      cta: {
        text: 'Réservez Votre Appel Stratégique',
        urgency: 'Seulement 3 places disponibles ce mois',
      },
    },
    'variant-b': {
      hero: {
        headline: 'Générez 3X Plus de Prospects Qualifiés',
        subheadline: 'Stratégies prouvées ayant généré 2,5M€ de revenus clients l\'an dernier',
        ctaText: 'Voir Notre Calculateur ROI',
        ctaStyle: 'secondary',
      },
      services: {
        title: 'Marketing Axé sur la Performance',
        description: 'ROI moyen de 250% pour nos clients luxembourgeois',
      },
      cta: {
        text: 'Calculez Votre ROI Potentiel',
      },
    },
    'variant-c': {
      hero: {
        headline: 'Experts Locaux en Marketing Digital',
        subheadline: 'Au service de Luxembourg-Ville, Esch et la Grande Région depuis 2018',
        ctaText: 'Parlez à un Expert Local',
        ctaStyle: 'outline',
      },
      services: {
        title: 'Expertise Locale, Standards Internationaux',
        description: 'De confiance des membres de la Chambre de Commerce',
      },
      cta: {
        text: 'Rencontrez Votre Équipe Locale',
      },
    },
  },
  de: {
    'control': {
      hero: {
        headline: 'Exzellenz im Digitalmarketing in Luxemburg',
        subheadline: 'Fördern Sie Wachstum mit datengesteuerten Strategien für luxemburgische Unternehmen',
        ctaText: 'Kostenloses Audit Anfordern',
        ctaStyle: 'default',
      },
      services: {
        title: 'Umfassende Digitale Lösungen',
        description: 'Von SEO bis bezahlter Werbung - wir liefern Ergebnisse',
      },
      cta: {
        text: 'Starten Sie Ihre Wachstumsreise',
      },
    },
    'variant-a': {
      hero: {
        headline: 'Transformieren Sie Ihr Geschäft Dieses Quartal',
        subheadline: 'Begrenzte Plätze - Luxemburgs führende Digitalmarketing-Agentur',
        ctaText: 'Platz Jetzt Sichern',
        ctaStyle: 'default',
      },
      services: {
        title: 'Bewährte Wachstumsstrategien',
        description: 'Über 150 luxemburgische Unternehmen wachsen bereits',
      },
      cta: {
        text: 'Kostenloses Strategiegespräch Buchen',
        urgency: 'Nur noch 3 Plätze diesen Monat',
      },
    },
    'variant-b': {
      hero: {
        headline: 'Generieren Sie 3X Mehr Qualifizierte Leads',
        subheadline: 'Datenbasierte Strategien mit 2,5M€ Kundenumsatz im letzten Jahr',
        ctaText: 'ROI-Rechner Ansehen',
        ctaStyle: 'secondary',
      },
      services: {
        title: 'Leistungsorientiertes Marketing',
        description: 'Durchschnittlich 250% ROI bei unseren luxemburgischen Kunden',
      },
      cta: {
        text: 'Potentiellen ROI Berechnen',
      },
    },
    'variant-c': {
      hero: {
        headline: 'Luxemburgs Lokale Digitalmarketing-Experten',
        subheadline: 'Seit 2018 in Luxemburg-Stadt, Esch und der Großregion tätig',
        ctaText: 'Mit Lokalem Experten Sprechen',
        ctaStyle: 'outline',
      },
      services: {
        title: 'Lokales Know-how, Globale Standards',
        description: 'Vertraut von Mitgliedern der Handelskammer Luxemburg',
      },
      cta: {
        text: 'Lernen Sie Ihr Lokales Team Kennen',
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