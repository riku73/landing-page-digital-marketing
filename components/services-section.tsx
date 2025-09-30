"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Search, MousePointerClick, Share2, FileText, LucideIcon } from "lucide-react";

/**
 * Service item interface
 */
export interface Service {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

/**
 * Services Section Component
 *
 * Displays a grid of digital marketing services with icons and hover animations.
 * Optimized for conversion and mobile-first responsive design.
 *
 * @param title - Section title
 * @param subtitle - Section subtitle/description
 * @param services - Array of service objects (optional, uses defaults if not provided)
 * @param className - Additional CSS classes
 */
export interface ServicesSectionProps {
  title: string;
  subtitle?: string;
  services?: Service[];
  className?: string;
}

const defaultServices: Service[] = [
  {
    id: "seo",
    icon: Search,
    title: "SEO",
    description: "Optimize your website to rank higher in search results and attract organic traffic that converts.",
  },
  {
    id: "ppc",
    icon: MousePointerClick,
    title: "PPC",
    description: "Drive immediate results with targeted pay-per-click campaigns that maximize ROI and minimize costs.",
  },
  {
    id: "social-media",
    icon: Share2,
    title: "Social Media",
    description: "Build your brand presence and engage with your audience across all major social media platforms.",
  },
  {
    id: "content-marketing",
    icon: FileText,
    title: "Content Marketing",
    description: "Create compelling content that tells your story, builds trust, and drives customer action.",
  },
];

export function ServicesSection({
  title,
  subtitle,
  services = defaultServices,
  className,
}: ServicesSectionProps) {
  return (
    <section
      className={cn(
        "w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-slate-50 to-white",
        className
      )}
    >
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={service.id}
                className={cn(
                  "group relative overflow-hidden border-2 border-slate-200",
                  "hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10",
                  "transition-all duration-300 hover:-translate-y-2",
                  "bg-white",
                  "animate-in fade-in slide-in-from-bottom-4",
                )}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: "backwards",
                }}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <CardHeader className="relative space-y-4">
                  {/* Icon container */}
                  <div
                    className={cn(
                      "w-14 h-14 rounded-xl flex items-center justify-center",
                      "bg-gradient-to-br from-blue-500 to-blue-600",
                      "group-hover:from-blue-600 group-hover:to-purple-600",
                      "transition-all duration-300 group-hover:scale-110 group-hover:rotate-6",
                      "shadow-lg shadow-blue-500/30"
                    )}
                  >
                    <Icon className="w-7 h-7 text-white" strokeWidth={2.5} />
                  </div>

                  <CardTitle className="text-xl md:text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="relative">
                  <CardDescription className="text-base text-slate-600 leading-relaxed">
                    {service.description}
                  </CardDescription>

                  {/* Decorative corner element */}
                  <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-blue-500/5 rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </CardContent>

                {/* Bottom border accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Card>
            );
          })}
        </div>

        {/* Optional CTA */}
        <div className="text-center mt-12 md:mt-16">
          <p className="text-slate-600 text-lg">
            Looking for a custom solution?{" "}
            <a
              href="#contact"
              className="text-blue-600 hover:text-blue-700 font-semibold underline underline-offset-4 transition-colors"
            >
              Get in touch
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}