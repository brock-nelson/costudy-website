"use client";

import { useEffect } from "react";
import { getUTMParameters } from "@/lib/analytics";

/**
 * UTM Parameter Tracking Component
 *
 * Automatically captures and stores UTM parameters from the URL
 * for attribution tracking across the user journey.
 *
 * Usage: Add to root layout to capture UTM params on every page load
 */
export default function UTMTracker() {
  useEffect(() => {
    // Capture and store UTM parameters on mount
    const utmParams = getUTMParameters();

    // If UTM parameters exist, track them as a custom event
    if (Object.keys(utmParams).length > 0 && typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "utm_capture", {
        event_category: "attribution",
        ...utmParams,
      });
    }
  }, []);

  return null;
}
