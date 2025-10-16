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

    // Only track if UTM parameters exist
    if (Object.keys(utmParams).length === 0) return;

    const trackUTM = () => {
      try {
        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("event", "utm_capture", {
            event_category: "attribution",
            ...utmParams,
          });
          return true;
        }
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.error("UTMTracker error:", error);
        }
      }
      return false;
    };

    // Try immediately
    if (trackUTM()) return;

    // If gtag not ready, try again after a short delay
    const timeout = setTimeout(trackUTM, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return null;
}
