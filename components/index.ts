/**
 * Landing Page Components Index
 *
 * Export all landing page components for easy importing
 */

// Core landing page components
export { HeroSection } from "./hero-section";
export type { HeroSectionProps } from "./hero-section";

export { ServicesSection } from "./services-section";
export type { ServicesSectionProps, Service } from "./services-section";

export { CtaSection } from "./cta-section";
export type { CtaSectionProps } from "./cta-section";

export { ContactForm } from "./contact-form";
export type { ContactFormProps, ContactFormData, ContactFormLabels } from "./contact-form";

export { StatsSection } from "./stats-section";
export type { StatsSectionProps, Stat } from "./stats-section";

// Analytics tracking
export {
  trackEvent,
  trackPageView,
  trackClick,
  trackFormSubmission,
  trackCTA,
  trackScrollDepth,
  trackVideoPlay,
  trackDownload,
  useTrackMount,
  useTrackUnmount,
} from "./track-event";
export type {
  AnalyticsEvent,
  TrackingResponse,
} from "./track-event";