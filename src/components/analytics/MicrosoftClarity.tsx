"use client";

import Script from "next/script";

/**
 * Microsoft Clarity Heat Mapping Component
 *
 * Integrates Microsoft Clarity for heat maps, session recordings, and user behavior insights.
 * Only loads when NEXT_PUBLIC_CLARITY_PROJECT_ID is set.
 *
 * Usage: Add to root layout alongside GoogleAnalytics
 */
export default function MicrosoftClarity() {
  const projectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

  // Don't load Clarity if project ID is not configured
  if (!projectId) {
    if (process.env.NODE_ENV === "development") {
      console.log("Microsoft Clarity: Project ID not configured");
    }
    return null;
  }

  // Validate project ID format (alphanumeric only) to prevent XSS
  const isValidProjectId = /^[a-zA-Z0-9]+$/.test(projectId);
  if (!isValidProjectId) {
    console.error("Microsoft Clarity: Invalid project ID format");
    return null;
  }

  return (
    <Script id="microsoft-clarity" strategy="afterInteractive">
      {`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${projectId}");
      `}
    </Script>
  );
}
