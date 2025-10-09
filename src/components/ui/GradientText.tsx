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

  return (
    <span ref={containerRef} className={`relative inline-block ${className}`}>
      {/* Dynamic gradient orb that follows mouse */}
      <span
        className="absolute inset-0 opacity-0 dark:opacity-20 pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle 400px at ${mousePos.x}% ${mousePos.y}%, rgba(139, 92, 246, 0.3), transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Main gradient text with dynamic gradient based on mouse position */}
      <span
        className={`
          relative font-extrabold tracking-tight
          ${mounted ? 'opacity-100' : 'opacity-0'}
          transition-opacity duration-1000
        `}
        style={{
          background: `linear-gradient(${135 + (mousePos.x - 50) * 0.5}deg, #4A12C0 ${Math.max(0, mousePos.x - 20)}%, #6B3DCB ${mousePos.x}%, #8B5CF6 ${Math.min(100, mousePos.x + 20)}%)`,
          WebkitTextFillColor: 'transparent',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
        }}
      >
        {children}
      </span>

      {/* Dark mode version with lighter colors */}
      <span
        className={`
          absolute inset-0 opacity-0 dark:opacity-100
          font-extrabold tracking-tight
          transition-opacity duration-500
        `}
        style={{
          background: `linear-gradient(${135 + (mousePos.x - 50) * 0.5}deg, #E9D5FF ${Math.max(0, mousePos.x - 20)}%, #C4B5FD ${mousePos.x}%, #A78BFA ${Math.min(100, mousePos.x + 20)}%)`,
          WebkitTextFillColor: 'transparent',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
        }}
        aria-hidden="true"
      >
        {children}
      </span>

      {/* Subtle glow that pulses */}
      <span
        className="absolute inset-0 bg-gradient-to-r from-[#4A12C0] via-[#6B3DCB] to-[#8B5CF6] dark:from-[#E9D5FF] dark:via-[#C4B5FD] dark:to-[#A78BFA] bg-clip-text text-transparent blur-[2px] opacity-0 dark:opacity-5 animate-pulse"
        style={{ animationDuration: '3s' }}
        aria-hidden="true"
      >
        {children}
      </span>
    </span>
  );
}
