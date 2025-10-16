"use client";

import { useEffect, useRef } from "react";

interface PageViewTrackerProps {
  eventName: string;
  eventParams?: Record<string, string | number | boolean | undefined>;
}

/**
 * Client component to track page views with custom analytics events
 *
 * Usage:
 * <PageViewTracker eventName="pricing_view" eventParams={{ plan: "pro" }} />
 */
export default function PageViewTracker({ eventName, eventParams }: PageViewTrackerProps) {
  const hasTracked = useRef(false);

  useEffect(() => {
    const trackPageView = () => {
      try {
        if (!hasTracked.current && typeof window !== "undefined" && window.gtag) {
          window.gtag("event", eventName, eventParams);
          hasTracked.current = true;
          return true;
        }
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.error("PageViewTracker error:", error);
        }
      }
      return false;
    };

    // Try immediately
    if (trackPageView()) return;

    // If gtag not ready, try again after a short delay
    const timeout = setTimeout(trackPageView, 1000);
    return () => clearTimeout(timeout);
  }, [eventName, eventParams]);

  return null;
}
