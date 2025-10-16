"use client";

import { useState, useEffect } from "react";

interface CalEmbedProps {
  calLink: string;
  className?: string;
  prefillData?: Record<string, string>;
}

export default function CalEmbed({ calLink, className = "", prefillData }: CalEmbedProps) {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check if dark mode is enabled
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    checkDarkMode();

    // Watch for dark mode changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  // Use appropriate theme based on mode
  const theme = isDark ? "dark" : "light";

  // Build URL with prefill data
  const params = new URLSearchParams({ embed: "true", theme });
  if (prefillData) {
    Object.entries(prefillData).forEach(([key, value]) => {
      params.set(key, value);
    });
  }
  const embedUrl = `https://cal.com/${calLink}?${params.toString()}`;

  const handleIframeLoad = () => {
    setIframeLoaded(true);
    setIframeError(false);
  };

  const handleIframeError = () => {
    setIframeError(true);
    setIframeLoaded(false);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Loading indicator */}
      {!iframeLoaded && !iframeError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-purple-200 dark:border-purple-700 border-t-purple-600 dark:border-t-purple-400 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">Loading calendar...</p>
          </div>
        </div>
      )}

      {/* Error fallback */}
      {iframeError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
          <div className="text-center max-w-md">
            <svg className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Calendar not loading?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              If you&apos;re using a privacy blocker or ad blocker, you may need to allow Cal.com to display the scheduler.
            </p>
            <a
              href={`https://cal.com/${calLink}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Open Scheduler in New Tab
            </a>
          </div>
        </div>
      )}

      {/* Iframe embed */}
      <iframe
        src={embedUrl}
        width="100%"
        height="100%"
        style={{
          minHeight: "700px",
          border: "none",
          borderRadius: "8px",
          display: iframeError ? 'none' : 'block'
        }}
        title="Schedule a demo with CoStudy"
        onLoad={handleIframeLoad}
        onError={handleIframeError}
        allow="payment"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
      />
    </div>
  );
}
