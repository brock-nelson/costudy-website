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
      {/* Background shimmer effect - more pronounced in dark mode */}
      <span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/20 dark:via-purple-300/30 to-transparent bg-[length:200%_100%] animate-shimmer-text pointer-events-none"
        aria-hidden="true"
      />

      {/* Main gradient text with enhanced dark mode styling */}
      <span
        className={`
          relative bg-gradient-to-r from-[#4A12C0] via-[#6B3DCB] to-[#4A12C0]
          dark:from-[#E9D5FF] dark:via-[#C4B5FD] dark:to-[#E9D5FF]
          bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient
          font-extrabold tracking-tight
          ${mounted ? 'opacity-100' : 'opacity-0'}
          transition-opacity duration-1000
          [text-shadow:_0_0_80px_rgb(139_92_246_/_0.5)]
          dark:[text-shadow:_0_0_80px_rgb(196_181_253_/_0.3),_0_0_40px_rgb(196_181_253_/_0.2)]
        `}
        style={{
          WebkitTextFillColor: 'transparent',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text'
        }}
      >
        {children}
      </span>

      {/* Subtle glow effect - only in light mode */}
      <span
        className="absolute inset-0 bg-gradient-to-r from-[#4A12C0] via-[#6B3DCB] to-[#4A12C0] bg-clip-text text-transparent blur-[2px] opacity-10 animate-gradient bg-[length:200%_auto] dark:hidden"
        aria-hidden="true"
      >
        {children}
      </span>

      {/* Enhanced glow for dark mode - more vibrant */}
      <span
        className="hidden dark:block absolute inset-0 bg-gradient-to-r from-[#E9D5FF] via-[#C4B5FD] to-[#E9D5FF] bg-clip-text text-transparent blur-sm opacity-40 animate-gradient bg-[length:200%_auto]"
        aria-hidden="true"
      >
        {children}
      </span>
    </span>
  );
}
