"use client";

/**
 * Analytics event data interface
 */
export interface AnalyticsEvent {
  event: string;
  category?: string;
  action?: string;
  label?: string;
  value?: number;
  metadata?: Record<string, any>;
}

/**
 * Analytics tracking response interface
 */
export interface TrackingResponse {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * Track Event Client Component
 *
 * A client-side wrapper for tracking analytics events.
 * Sends events to the /api/analytics/track endpoint.
 *
 * @param event - Event name or event object
 * @param data - Optional additional event data
 * @returns Promise with tracking response
 */
export async function trackEvent(
  event: string | AnalyticsEvent,
  data?: Partial<AnalyticsEvent>
): Promise<TrackingResponse> {
  try {
    const eventData: AnalyticsEvent =
      typeof event === "string"
        ? {
            event,
            ...data,
          }
        : event;

    const response = await fetch("/api/analytics/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...eventData,
        timestamp: new Date().toISOString(),
        url: typeof window !== "undefined" ? window.location.href : undefined,
        referrer: typeof document !== "undefined" ? document.referrer : undefined,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return {
      success: true,
      message: result.message || "Event tracked successfully",
    };
  } catch (error) {
    console.error("Analytics tracking error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to track event",
    };
  }
}

/**
 * Track page view event
 *
 * @param variantId - The A/B test variant ID
 * @param metadata - Optional additional metadata (should include locale)
 */
export async function trackPageView(
  variantId: string,
  metadata?: Record<string, any>
): Promise<TrackingResponse> {
  try {
    const response = await fetch("/api/analytics/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        variantId,
        eventType: "page_view",
        metadata,
        locale: metadata?.locale || 'en',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    return {
      success: true,
      message: "Page view tracked successfully",
    };
  } catch (error) {
    console.error("Page view tracking error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to track page view",
    };
  }
}

/**
 * Track button/link click event
 *
 * @param label - Button/link label
 * @param category - Event category
 * @param metadata - Optional additional metadata
 */
export async function trackClick(
  label: string,
  category: string = "engagement",
  metadata?: Record<string, any>
): Promise<TrackingResponse> {
  return trackEvent({
    event: "click",
    category,
    action: "click",
    label,
    metadata,
  });
}

/**
 * Track form submission event
 *
 * @param variantId - The A/B test variant ID
 * @param success - Whether submission was successful
 * @param metadata - Optional additional metadata (should include locale)
 */
export async function trackFormSubmission(
  variantId: string,
  success: boolean = true,
  metadata?: Record<string, any>
): Promise<TrackingResponse> {
  try {
    const response = await fetch("/api/analytics/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        variantId,
        eventType: "form_submit",
        metadata: {
          ...metadata,
          success,
        },
        locale: metadata?.locale || 'en',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    return {
      success: true,
      message: "Form submission tracked successfully",
    };
  } catch (error) {
    console.error("Form submission tracking error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to track form submission",
    };
  }
}

/**
 * Track CTA interaction event
 *
 * @param variantId - The A/B test variant ID
 * @param ctaLocation - Where the CTA appears (hero, footer, etc)
 * @param metadata - Optional additional metadata (should include locale)
 */
export async function trackCTA(
  variantId: string,
  ctaLocation: string,
  metadata?: Record<string, any>
): Promise<TrackingResponse> {
  try {
    const response = await fetch("/api/analytics/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        variantId,
        eventType: "cta_click",
        metadata: {
          location: ctaLocation,
          ...metadata,
        },
        locale: metadata?.locale || 'en',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    return {
      success: true,
      message: "CTA click tracked successfully",
    };
  } catch (error) {
    console.error("CTA tracking error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to track CTA",
    };
  }
}

/**
 * Track scroll depth event
 *
 * @param depth - Scroll depth percentage (25, 50, 75, 100)
 * @param metadata - Optional additional metadata
 */
export async function trackScrollDepth(
  depth: number,
  metadata?: Record<string, any>
): Promise<TrackingResponse> {
  return trackEvent({
    event: "scroll_depth",
    category: "engagement",
    action: "scroll",
    label: `${depth}%`,
    value: depth,
    metadata,
  });
}

/**
 * Track video play event
 *
 * @param videoTitle - Title of the video
 * @param videoId - ID of the video
 * @param metadata - Optional additional metadata
 */
export async function trackVideoPlay(
  videoTitle: string,
  videoId?: string,
  metadata?: Record<string, any>
): Promise<TrackingResponse> {
  return trackEvent({
    event: "video_play",
    category: "engagement",
    action: "play",
    label: videoTitle,
    metadata: {
      videoId,
      ...metadata,
    },
  });
}

/**
 * Track download event
 *
 * @param fileName - Name of the downloaded file
 * @param fileType - Type of file (pdf, docx, etc)
 * @param metadata - Optional additional metadata
 */
export async function trackDownload(
  fileName: string,
  fileType?: string,
  metadata?: Record<string, any>
): Promise<TrackingResponse> {
  return trackEvent({
    event: "download",
    category: "engagement",
    action: "download",
    label: fileName,
    metadata: {
      fileType,
      ...metadata,
    },
  });
}

/**
 * React Hook for tracking component mount
 *
 * @param componentName - Name of the component
 * @param metadata - Optional additional metadata
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   useTrackMount('MyComponent', { version: '1.0' });
 *   return <div>...</div>;
 * }
 * ```
 */
export function useTrackMount(componentName: string, metadata?: Record<string, any>) {
  if (typeof window === "undefined") return;

  // Using setTimeout to avoid blocking component mount
  setTimeout(() => {
    trackEvent({
      event: "component_mount",
      category: "technical",
      label: componentName,
      metadata,
    }).catch(() => {
      // Silently fail - don't block component render
    });
  }, 0);
}

/**
 * React Hook for tracking component unmount
 *
 * @param componentName - Name of the component
 * @param metadata - Optional additional metadata
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   useTrackUnmount('MyComponent', { duration: '5s' });
 *   return <div>...</div>;
 * }
 * ```
 */
export function useTrackUnmount(componentName: string, metadata?: Record<string, any>) {
  if (typeof window === "undefined") return;

  // Return cleanup function
  return () => {
    trackEvent({
      event: "component_unmount",
      category: "technical",
      label: componentName,
      metadata,
    }).catch(() => {
      // Silently fail
    });
  };
}