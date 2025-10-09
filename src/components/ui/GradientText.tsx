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

  // Create mesh gradient distortion based on mouse position
  // Multiple gradient layers that shift and blend
  const distortX = (mousePos.x - 50) * 0.4;
  const distortY = (mousePos.y - 50) * 0.4;

  const gradientAngle1 = 135 + distortX;
  const gradientAngle2 = 225 - distortX;
  const gradientAngle3 = 45 + distortY;

  const lightMeshGradient = `
    radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, #8B5CF6 0%, transparent 50%),
    linear-gradient(${gradientAngle1}deg, #4A12C0 ${Math.max(0, mousePos.x - 30)}%, transparent ${mousePos.x + 20}%),
    linear-gradient(${gradientAngle2}deg, #6B3DCB ${Math.max(0, 100 - mousePos.x - 30)}%, transparent ${100 - mousePos.x + 20}%),
    linear-gradient(${gradientAngle3}deg, #A855F7 ${Math.max(0, mousePos.y - 20)}%, #4A12C0 ${mousePos.y + 30}%)
  `;

  const darkMeshGradient = `
    radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, #C4B5FD 0%, transparent 50%),
    linear-gradient(${gradientAngle1}deg, #E9D5FF ${Math.max(0, mousePos.x - 30)}%, transparent ${mousePos.x + 20}%),
    linear-gradient(${gradientAngle2}deg, #C4B5FD ${Math.max(0, 100 - mousePos.x - 30)}%, transparent ${100 - mousePos.x + 20}%),
    linear-gradient(${gradientAngle3}deg, #DDD6FE ${Math.max(0, mousePos.y - 20)}%, #E9D5FF ${mousePos.y + 30}%)
  `;

  return (
    <span ref={containerRef} className={`relative inline-block ${className}`}>
      {/* Main mesh gradient text for light mode */}
      <span
        className={`
          relative font-extrabold tracking-tight
          dark:opacity-0
          ${mounted ? 'opacity-100' : 'opacity-0'}
          transition-opacity duration-700
        `}
        style={{
          background: lightMeshGradient,
          WebkitTextFillColor: 'transparent',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          transition: 'all 0.3s ease-out',
        }}
      >
        {children}
      </span>

      {/* Dark mode mesh gradient text */}
      <span
        className="absolute inset-0 opacity-0 dark:opacity-100 font-extrabold tracking-tight transition-opacity duration-700"
        style={{
          background: darkMeshGradient,
          WebkitTextFillColor: 'transparent',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          transition: 'all 0.3s ease-out',
        }}
        aria-hidden="true"
      >
        {children}
      </span>

    </span>
  );
}
