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
    // Only track once on mount to prevent duplicate events
    if (!hasTracked.current && typeof window !== "undefined" && window.gtag) {
      window.gtag("event", eventName, eventParams);
      hasTracked.current = true;
    }
  }, [eventName, eventParams]);

  return null;
}
