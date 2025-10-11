"use client";

import Script from "next/script";

/**
 * Google Analytics GA4 Component
 *
 * Integrates Google Analytics 4 tracking throughout the site.
 * Only loads when NEXT_PUBLIC_GA_MEASUREMENT_ID is set.
 *
 * Usage: Add to root layout to track all pages
 */
export default function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  // Don't load GA if measurement ID is not configured
  if (!measurementId) {
    if (process.env.NODE_ENV === "development") {
      console.log("Google Analytics: Measurement ID not configured");
    }
    return null;
  }

  return (
    <>
      {/* Google Analytics gtag.js */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}

/**
 * Custom event tracking helper
 *
 * @example
 * trackEvent('newsletter_signup', { method: 'footer_form' });
 * trackEvent('feature_vote', { feature_id: '123' });
 */
export function trackEvent(eventName: string, eventParams?: Record<string, unknown>) {
  if (typeof window !== "undefined" && (window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag) {
    (window as typeof window & { gtag: (...args: unknown[]) => void }).gtag("event", eventName, eventParams);
  }
}
