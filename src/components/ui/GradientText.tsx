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
      {/* Main gradient text - crisp and clean */}
      <span
        className={`
          relative bg-gradient-to-r from-[#4A12C0] via-[#6B3DCB] to-[#4A12C0]
          dark:from-[#E9D5FF] dark:via-[#C4B5FD] dark:to-[#E9D5FF]
          bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient
          font-extrabold tracking-tight
          ${mounted ? 'opacity-100' : 'opacity-0'}
          transition-opacity duration-1000
        `}
        style={{
          WebkitTextFillColor: 'transparent',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text'
        }}
      >
        {children}
      </span>

      {/* Very subtle glow - minimal, integrated with background */}
      <span
        className="absolute inset-0 bg-gradient-to-r from-[#4A12C0] via-[#6B3DCB] to-[#4A12C0] dark:from-[#E9D5FF] dark:via-[#C4B5FD] dark:to-[#E9D5FF] bg-clip-text text-transparent blur-[1px] opacity-5 dark:opacity-10 animate-gradient bg-[length:200%_auto]"
        aria-hidden="true"
      >
        {children}
      </span>
    </span>
  );
}
