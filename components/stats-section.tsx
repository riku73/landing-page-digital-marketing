"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useEffect, useState, useRef } from "react";
import { TrendingUp, Users, Award, Calendar } from "lucide-react";

/**
 * Stat item interface
 */
export interface Stat {
  id: string;
  icon: React.ElementType;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description?: string;
}

/**
 * Stats Section Component
 *
 * Displays key metrics with animated counters and icons.
 * Features intersection observer for trigger animations when in viewport.
 *
 * @param title - Section title
 * @param subtitle - Section subtitle/description
 * @param stats - Array of stat objects (optional, uses defaults if not provided)
 * @param className - Additional CSS classes
 */
export interface StatsSectionProps {
  title?: string;
  subtitle?: string;
  stats?: Stat[];
  className?: string;
}

const defaultStats: Stat[] = [
  {
    id: "clients",
    icon: Users,
    value: 150,
    suffix: "+",
    label: "Happy Clients",
    description: "Trusted by businesses across Luxembourg",
  },
  {
    id: "roi",
    icon: TrendingUp,
    value: 250,
    suffix: "%",
    label: "Average ROI",
    description: "Proven results that drive growth",
  },
  {
    id: "experience",
    icon: Calendar,
    value: 5,
    suffix: "+",
    label: "Years Experience",
    description: "Digital marketing expertise",
  },
  {
    id: "success",
    icon: Award,
    value: 98,
    suffix: "%",
    label: "Success Rate",
    description: "Client satisfaction guaranteed",
  },
];

/**
 * Counter hook with easing animation
 */
function useCounter(end: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime: number | null = null;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function (easeOutExpo)
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(startValue + (end - startValue) * easeOut));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, start]);

  return count;
}

/**
 * Individual stat card component
 */
function StatCard({ stat, index, startCounting }: { stat: Stat; index: number; startCounting: boolean }) {
  const count = useCounter(stat.value, 2000, startCounting);
  const Icon = stat.icon;

  return (
    <Card
      className={cn(
        "group relative overflow-hidden border-2 border-slate-200",
        "hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10",
        "transition-all duration-500 hover:-translate-y-2",
        "bg-white",
        "animate-in fade-in slide-in-from-bottom-4",
      )}
      style={{
        animationDelay: `${index * 100}ms`,
        animationFillMode: "backwards",
      }}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <CardContent className="relative p-6 md:p-8 space-y-4">
        {/* Icon */}
        <div
          className={cn(
            "w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center",
            "bg-gradient-to-br from-blue-500 to-blue-600",
            "group-hover:from-blue-600 group-hover:to-purple-600",
            "transition-all duration-500 group-hover:scale-110 group-hover:rotate-12",
            "shadow-lg shadow-blue-500/30"
          )}
        >
          <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" strokeWidth={2.5} />
        </div>

        {/* Counter */}
        <div className="space-y-1">
          <div className="text-4xl md:text-5xl font-bold text-slate-900 tabular-nums">
            {stat.prefix}
            {count}
            {stat.suffix}
          </div>
          <div className="text-lg md:text-xl font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">
            {stat.label}
          </div>
        </div>

        {/* Description */}
        {stat.description && (
          <p className="text-sm md:text-base text-slate-600 leading-relaxed">
            {stat.description}
          </p>
        )}

        {/* Decorative corner element */}
        <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-blue-500/5 rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </CardContent>
    </Card>
  );
}

export function StatsSection({
  title = "Our Track Record",
  subtitle = "Numbers that speak for themselves",
  stats = defaultStats,
  className,
}: StatsSectionProps) {
  const [startCounting, setStartCounting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startCounting) {
            setStartCounting(true);
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [startCounting]);

  return (
    <section
      ref={sectionRef}
      className={cn(
        "w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-white via-slate-50 to-white",
        className
      )}
    >
      <div className="container mx-auto px-4">
        {/* Section header */}
        {(title || subtitle) && (
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 space-y-4">
            {title && (
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.id}
              stat={stat}
              index={index}
              startCounting={startCounting}
            />
          ))}
        </div>

        {/* Optional bottom CTA */}
        <div className="text-center mt-12 md:mt-16 animate-in fade-in duration-1000 delay-700">
          <p className="text-slate-600 text-lg">
            Ready to achieve similar results?{" "}
            <a
              href="#contact"
              className="text-blue-600 hover:text-blue-700 font-semibold underline underline-offset-4 transition-colors"
            >
              Let&apos;s talk
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}