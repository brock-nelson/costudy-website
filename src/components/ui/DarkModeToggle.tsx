"use client";

import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check if user has a saved preference
    const saved = localStorage.getItem("darkMode");
    if (saved === "true") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
    // Always default to light mode - system preference not checked
  }, []);

  const toggleDarkMode = () => {
    const newValue = !darkMode;
    setDarkMode(newValue);
    localStorage.setItem("darkMode", String(newValue));

    if (newValue) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="flex items-center justify-center p-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-[#4A12C0] dark:hover:border-[#8B5CF6] transition-all shadow-sm"
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={darkMode}
      aria-describedby="theme-toggle-desc"
    >
      <span className="sr-only" id="theme-toggle-desc">
        {darkMode ? "Currently in dark mode. Click to switch to light mode." : "Currently in light mode. Click to switch to dark mode."}
      </span>
      {darkMode ? (
        // In dark mode, show sun emoji to switch to light mode
        <span className="text-lg" role="img" aria-label="Sun - Switch to light mode">☀️</span>
      ) : (
        // In light mode, show moon emoji to switch to dark mode
        <span className="text-lg" role="img" aria-label="Moon - Switch to dark mode">🌙</span>
      )}
    </button>
  );
}
