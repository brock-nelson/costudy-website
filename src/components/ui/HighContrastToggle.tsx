"use client";

import { useEffect, useState } from "react";

export default function HighContrastToggle() {
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    // Check if user has a saved preference
    const saved = localStorage.getItem("highContrast");
    if (saved === "true") {
      setHighContrast(true);
      document.documentElement.classList.add("high-contrast");
    }

    // Also respect system preference
    const mediaQuery = window.matchMedia("(prefers-contrast: more)");
    if (mediaQuery.matches && !saved) {
      setHighContrast(true);
      document.documentElement.classList.add("high-contrast");
    }

    const handler = (e: MediaQueryListEvent) => {
      if (e.matches && !saved) {
        setHighContrast(true);
        document.documentElement.classList.add("high-contrast");
      }
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const toggleHighContrast = () => {
    const newValue = !highContrast;
    setHighContrast(newValue);
    localStorage.setItem("highContrast", String(newValue));

    if (newValue) {
      document.documentElement.classList.add("high-contrast");
    } else {
      document.documentElement.classList.remove("high-contrast");
    }
  };

  return (
    <button
      onClick={toggleHighContrast}
      className="flex items-center justify-center p-2 rounded-lg border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-[#4A12C0] dark:hover:border-[#8B5CF6] transition-all shadow-sm"
      aria-label={highContrast ? "Disable high contrast mode for better accessibility" : "Enable high contrast mode for better accessibility"}
      aria-pressed={highContrast}
    >
      {/* Accessibility icon - universal accessibility symbol */}
      <svg
        className="w-5 h-5 text-gray-700 dark:text-gray-300"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
        role="img"
        aria-describedby="accessibility-icon-desc"
      >
        <title id="accessibility-icon-desc">Universal accessibility symbol</title>
        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2M21 9H15V22H13V16H11V22H9V9H3V7H21V9Z" />
      </svg>
    </button>
  );
}
