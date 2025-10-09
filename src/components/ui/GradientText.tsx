"use client";

import { useEffect, useState, useRef } from "react";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
}

export default function GradientText({ children, className = "" }: GradientTextProps) {
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Calculate dynamic gradient angle and positions based on mouse
  const gradientAngle = 135 + (mousePos.x - 50) * 0.3;
  const lightGradient = `linear-gradient(${gradientAngle}deg,
    #4A12C0 ${Math.max(0, mousePos.x - 25)}%,
    #6B3DCB ${mousePos.x}%,
    #8B5CF6 ${Math.min(100, mousePos.x + 25)}%)`;

  const darkGradient = `linear-gradient(${gradientAngle}deg,
    #E9D5FF ${Math.max(0, mousePos.x - 25)}%,
    #C4B5FD ${mousePos.x}%,
    #A78BFA ${Math.min(100, mousePos.x + 25)}%)`;

  return (
    <span ref={containerRef} className={`relative inline-block ${className}`}>
      {/* Main gradient text for light mode */}
      <span
        className={`
          relative font-extrabold tracking-tight
          dark:opacity-0
          ${mounted ? 'opacity-100' : 'opacity-0'}
          transition-opacity duration-700
        `}
        style={{
          background: lightGradient,
          WebkitTextFillColor: 'transparent',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
        }}
      >
        {children}
      </span>

      {/* Dark mode text */}
      <span
        className="absolute inset-0 opacity-0 dark:opacity-100 font-extrabold tracking-tight transition-opacity duration-700"
        style={{
          background: darkGradient,
          WebkitTextFillColor: 'transparent',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
        }}
        aria-hidden="true"
      >
        {children}
      </span>
    </span>
  );
}
