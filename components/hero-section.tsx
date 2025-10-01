"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

/**
 * Hero Section Component
 *
 * A conversion-optimized hero section for digital marketing landing pages.
 * Features gradient backgrounds, smooth animations, and mobile-first responsive design.
 *
 * @param headline - Main headline text
 * @param subheadline - Supporting subheadline text
 * @param ctaText - Call-to-action button text
 * @param ctaStyle - Button variant ('default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link')
 * @param onCtaClick - Callback function when CTA button is clicked
 * @param heroImage - Optional hero image URL
 * @param heroImageAlt - Alt text for hero image
 * @param className - Additional CSS classes
 */
export interface HeroSectionProps {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaStyle?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  onCtaClick?: () => void;
  heroImage?: string;
  heroImageAlt?: string;
  className?: string;
}

export function HeroSection({
  headline,
  subheadline,
  ctaText,
  ctaStyle = "default",
  onCtaClick,
  heroImage,
  heroImageAlt = "Hero image",
  className,
}: HeroSectionProps) {
  return (
    <section
      className={cn(
        "relative min-h-[600px] md:min-h-[700px] lg:min-h-[800px] w-full overflow-hidden",
        "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900",
        className
      )}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="container relative mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text content */}
          <div className="text-center lg:text-left space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
              {headline}
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {subheadline}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Button
                size="lg"
                variant={ctaStyle}
                onClick={onCtaClick}
                className={cn(
                  "text-lg px-8 py-6 shadow-2xl transition-all duration-300",
                  "hover:scale-105 hover:shadow-blue-500/50",
                  "animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300"
                )}
              >
                {ctaText}
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start pt-8 text-slate-400 text-sm animate-in fade-in duration-1000 delay-500">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>New Agency, Experienced Team</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Transparent Pricing</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Luxembourg Based</span>
              </div>
            </div>
          </div>

          {/* Hero image */}
          {heroImage && (
            <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] animate-in fade-in slide-in-from-right-8 duration-1000 delay-300">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-2xl blur-3xl" />
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
                <Image
                  src={heroImage}
                  alt={heroImageAlt}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent" />
    </section>
  );
}