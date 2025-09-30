"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, Clock } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * CTA Section Component
 *
 * A prominent call-to-action banner with optional urgency countdown timer.
 * Features gradient backgrounds and conversion-optimized design.
 *
 * @param ctaText - Main call-to-action text/headline
 * @param ctaDescription - Supporting description text
 * @param buttonText - Button text
 * @param buttonVariant - Button variant style
 * @param onButtonClick - Callback function when button is clicked
 * @param urgency - Enable urgency mode with countdown timer
 * @param urgencyText - Custom urgency message
 * @param urgencyEndDate - End date for countdown (ISO string or Date)
 * @param className - Additional CSS classes
 */
export interface CtaSectionProps {
  ctaText: string;
  ctaDescription?: string;
  buttonText: string;
  buttonVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  onButtonClick?: () => void;
  urgency?: boolean;
  urgencyText?: string;
  urgencyEndDate?: string | Date;
  className?: string;
}

export function CtaSection({
  ctaText,
  ctaDescription,
  buttonText,
  buttonVariant = "default",
  onButtonClick,
  urgency = false,
  urgencyText = "Limited time offer",
  urgencyEndDate,
  className,
}: CtaSectionProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    if (!urgency || !urgencyEndDate) return;

    const calculateTimeLeft = () => {
      const endDate = typeof urgencyEndDate === "string"
        ? new Date(urgencyEndDate)
        : urgencyEndDate;
      const now = new Date();
      const difference = endDate.getTime() - now.getTime();

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }

      return null;
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [urgency, urgencyEndDate]);

  return (
    <section
      className={cn(
        "w-full py-16 md:py-20 lg:py-24 relative overflow-hidden",
        className
      )}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700" />

      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container relative mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Urgency indicator */}
          {urgency && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 animate-in fade-in slide-in-from-top-4 duration-700">
              <Clock className="w-4 h-4 text-yellow-300 animate-pulse" />
              <span className="text-sm font-semibold text-white">
                {urgencyText}
              </span>
            </div>
          )}

          {/* Main CTA text */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-700">
            {ctaText}
          </h2>

          {/* Description */}
          {ctaDescription && (
            <p className="text-lg md:text-xl text-blue-100 leading-relaxed max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
              {ctaDescription}
            </p>
          )}

          {/* Countdown timer */}
          {urgency && timeLeft && (
            <div className="flex justify-center gap-4 md:gap-6 py-4 animate-in fade-in zoom-in-95 duration-700 delay-300">
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Minutes", value: timeLeft.minutes },
                { label: "Seconds", value: timeLeft.seconds },
              ].map((item, index) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center min-w-[60px] md:min-w-[80px]"
                  style={{
                    animationDelay: `${300 + index * 100}ms`,
                  }}
                >
                  <div className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl px-3 py-4 md:px-4 md:py-6 min-w-full">
                    <div className="text-2xl md:text-4xl font-bold text-white tabular-nums">
                      {String(item.value).padStart(2, "0")}
                    </div>
                  </div>
                  <div className="text-xs md:text-sm text-blue-200 mt-2 font-medium">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
            <Button
              size="lg"
              variant={buttonVariant}
              onClick={onButtonClick}
              className={cn(
                "text-lg px-8 py-6 bg-white text-blue-600 hover:bg-blue-50",
                "shadow-2xl shadow-black/20 transition-all duration-300",
                "hover:scale-105 hover:shadow-white/30",
                "group"
              )}
            >
              {buttonText}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-6 justify-center text-blue-100 text-sm pt-6 animate-in fade-in duration-700 delay-700">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Free consultation</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}