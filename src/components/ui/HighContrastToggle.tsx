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
      aria-label={highContrast ? "Disable high contrast mode" : "Enable high contrast mode"}
      aria-pressed={highContrast}
    >
      <svg
        className="w-5 h-5 text-gray-700 dark:text-gray-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    </button>
  );
}
