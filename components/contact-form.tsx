"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader2, Mail, Phone, Building2, User, MessageSquare } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

/**
 * Contact form field labels interface for i18n support
 */
export interface ContactFormLabels {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  submit: string;
  submitting: string;
  successTitle: string;
  successMessage: string;
}

/**
 * Default labels in English
 */
const defaultLabels: ContactFormLabels = {
  name: "Full Name",
  email: "Email Address",
  phone: "Phone Number",
  company: "Company Name",
  message: "Message",
  submit: "Send Message",
  submitting: "Sending...",
  successTitle: "Message Sent Successfully!",
  successMessage: "Thank you for reaching out. We'll get back to you within 24 hours.",
};

/**
 * Contact Form Component
 *
 * A fully validated contact form with react-hook-form and zod validation.
 * Includes success/error states, loading indicators, and locale support.
 *
 * @param onSubmit - Callback function when form is successfully submitted
 * @param labels - Form field labels for i18n support
 * @param className - Additional CSS classes
 */
export interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => Promise<void> | void;
  labels?: Partial<ContactFormLabels>;
  className?: string;
}

/**
 * Form data interface
 */
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

/**
 * Form validation schema with zod
 */
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(6, {
    message: "Please enter a valid phone number.",
  }),
  company: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

export function ContactForm({
  onSubmit,
  labels: customLabels,
  className,
}: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const labels = { ...defaultLabels, ...customLabels };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    },
  });

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setError(null);

    try {
      if (onSubmit) {
        await onSubmit(values);
      }
      setIsSuccess(true);
      form.reset();

      // Reset success state after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  // Success state
  if (isSuccess) {
    return (
      <div
        className={cn(
          "w-full max-w-2xl mx-auto p-8 md:p-12 rounded-2xl border-2 border-green-500 bg-green-50",
          "animate-in fade-in zoom-in-95 duration-500",
          className
        )}
      >
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-green-500 rounded-full flex items-center justify-center animate-in zoom-in-50 duration-700">
            <Check className="w-8 h-8 text-white" strokeWidth={3} />
          </div>
          <h3 className="text-2xl font-bold text-green-900">{labels.successTitle}</h3>
          <p className="text-green-700">{labels.successMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "w-full max-w-2xl mx-auto p-6 md:p-8 lg:p-10 rounded-2xl border-2 border-slate-200 bg-white shadow-xl",
        className
      )}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {/* Name field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-900 font-semibold">
                  {labels.name}
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      placeholder="John Doe"
                      className="pl-11 h-12 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-900 font-semibold">
                  {labels.email}
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      className="pl-11 h-12 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone and Company in grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Phone field */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-900 font-semibold">
                    {labels.phone}
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input
                        type="tel"
                        placeholder="+352 123 456"
                        className="pl-11 h-12 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Company field */}
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-900 font-semibold">
                    {labels.company}
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input
                        placeholder="Your Company"
                        className="pl-11 h-12 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Message field */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-900 font-semibold">
                  {labels.message}
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                    <Textarea
                      placeholder="Tell us about your project..."
                      className="pl-11 min-h-[150px] border-slate-300 focus:border-blue-500 focus:ring-blue-500 resize-none"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Error message */}
          {error && (
            <div className="p-4 bg-red-50 border-2 border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Submit button */}
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full h-12 text-lg font-semibold bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                {labels.submitting}
              </>
            ) : (
              labels.submit
            )}
          </Button>

          {/* Privacy notice */}
          <p className="text-xs text-slate-500 text-center">
            By submitting this form, you agree to our Privacy Policy and Terms of Service.
          </p>
        </form>
      </Form>
    </div>
  );
}