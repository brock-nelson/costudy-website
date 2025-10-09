"use client";

import { useEffect, useState } from "react";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
}

export default function GradientText({ children, className = "" }: GradientTextProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <span className={`relative inline-block ${className}`}>
      {/* Main gradient text with enhanced styling */}
      <span
        className={`
          relative bg-gradient-to-r from-[#4A12C0] via-[#6B3DCB] to-[#4A12C0]
          dark:from-[#A78BFA] dark:via-[#C4B5FD] dark:to-[#A78BFA]
          bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient
          font-extrabold tracking-tight
          ${mounted ? 'opacity-100' : 'opacity-0'}
          transition-opacity duration-1000
        `}
      >
        {children}
      </span>

      {/* Very subtle glow effect - only in light mode for crispness in dark mode */}
      <span
        className="absolute inset-0 bg-gradient-to-r from-[#4A12C0] via-[#6B3DCB] to-[#4A12C0] bg-clip-text text-transparent blur-[2px] opacity-15 animate-gradient bg-[length:200%_auto] dark:hidden"
        aria-hidden="true"
      >
        {children}
      </span>
    </span>
  );
}
