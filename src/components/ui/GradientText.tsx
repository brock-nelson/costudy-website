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

  // Calculate gradient angle based on mouse position
  const angle = 135 + (mousePos.x - 50) * 0.5;

  // Shift color stops based on mouse position
  const colorStop1 = Math.max(0, Math.min(100, mousePos.x - 20));
  const colorStop2 = Math.max(0, Math.min(100, mousePos.x + 10));
  const colorStop3 = Math.max(0, Math.min(100, mousePos.x + 40));

  // Light mode gradient
  const lightGradient = `linear-gradient(${angle}deg, #4A12C0 ${colorStop1}%, #6B3DCB ${colorStop2}%, #A855F7 ${colorStop3}%)`;

  // Dark mode gradient
  const darkGradient = `linear-gradient(${angle}deg, #E9D5FF ${colorStop1}%, #C4B5FD ${colorStop2}%, #DDD6FE ${colorStop3}%)`;

  return (
    <>
      {/* Light mode text */}
      <span
        ref={containerRef}
        className={`
          inline-block font-extrabold tracking-tight
          bg-clip-text text-transparent
          dark:hidden
          ${mounted ? 'opacity-100' : 'opacity-0'}
          transition-opacity duration-700
          ${className}
        `}
        style={{
          backgroundImage: lightGradient,
          transition: 'background-image 0.3s ease-out',
        }}
      >
        {children}
      </span>

      {/* Dark mode text */}
      <span
        className={`
          hidden dark:inline-block font-extrabold tracking-tight
          bg-clip-text text-transparent
          ${mounted ? 'opacity-100' : 'opacity-0'}
          transition-opacity duration-700
          ${className}
        `}
        style={{
          backgroundImage: darkGradient,
          transition: 'background-image 0.3s ease-out',
        }}
      >
        {children}
      </span>
    </>
  );
}
