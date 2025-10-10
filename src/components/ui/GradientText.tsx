"use client";

import { useEffect, useState, useRef } from "react";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
}

export default function GradientText({ children, className = "" }: GradientTextProps) {
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [mouseSpeed, setMouseSpeed] = useState(0);
  const [isRapidMovement, setIsRapidMovement] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const prevPosRef = useRef({ x: 50, y: 50 });
  const prevTimeRef = useRef(Date.now());
  const rapidMovementCountRef = useRef(0);
  const directionChangesRef = useRef<number[]>([]);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      // Calculate mouse speed
      const now = Date.now();
      const deltaTime = now - prevTimeRef.current;
      const deltaX = x - prevPosRef.current.x;
      const deltaY = y - prevPosRef.current.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const speed = deltaTime > 0 ? distance / deltaTime : 0;

      // Detect direction changes for gesture recognition
      if (Math.abs(deltaX) > 2) {
        const direction = deltaX > 0 ? 1 : -1;
        directionChangesRef.current.push(direction);

        // Keep only last 10 movements
        if (directionChangesRef.current.length > 10) {
          directionChangesRef.current.shift();
        }

        // Check for rapid back-and-forth movement
        let changes = 0;
        for (let i = 1; i < directionChangesRef.current.length; i++) {
          if (directionChangesRef.current[i] !== directionChangesRef.current[i - 1]) {
            changes++;
          }
        }

        // If 5+ direction changes in recent movements, trigger special effect
        if (changes >= 5 && speed > 0.5) {
          setIsRapidMovement(true);
          rapidMovementCountRef.current++;
          setTimeout(() => {
            setIsRapidMovement(false);
            rapidMovementCountRef.current = Math.max(0, rapidMovementCountRef.current - 1);
          }, 1500);
        }
      }

      setMousePos({ x, y });
      setMouseSpeed(speed);
      prevPosRef.current = { x, y };
      prevTimeRef.current = now;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Calculate gradient angle based on mouse position
  const angle = 135 + (mousePos.x - 50) * 0.8 + (mousePos.y - 50) * 0.3;

  // Dynamic color selection based on x and y position
  const getColorPalette = (x: number, y: number, isDark: boolean) => {
    // Divide the area into regions for different color palettes
    const region = Math.floor((x / 25)) + Math.floor((y / 25)) * 4;

    if (isDark) {
      const palettes = [
        ['#E9D5FF', '#C4B5FD', '#DDD6FE', '#F3E8FF'], // Purple
        ['#BFDBFE', '#93C5FD', '#DBEAFE', '#E0F2FE'], // Blue
        ['#A7F3D0', '#6EE7B7', '#D1FAE5', '#ECFDF5'], // Green
        ['#FED7AA', '#FDBA74', '#FEF3C7', '#FEF9C3'], // Orange
        ['#FBCFE8', '#F9A8D4', '#FCE7F3', '#FDF2F8'], // Pink
        ['#DDD6FE', '#C4B5FD', '#EDE9FE', '#F5F3FF'], // Violet
        ['#BAE6FD', '#7DD3FC', '#E0F2FE', '#F0F9FF'], // Sky
        ['#D9F99D', '#BEF264', '#ECFCCB', '#F7FEE7'], // Lime
      ];
      return palettes[region % palettes.length];
    } else {
      const palettes = [
        ['#4A12C0', '#6B3DCB', '#8B5CF6', '#A855F7'], // Purple
        ['#1E40AF', '#3B82F6', '#2563EB', '#1D4ED8'], // Blue
        ['#059669', '#10B981', '#14B8A6', '#0D9488'], // Green/Teal
        ['#D97706', '#F59E0B', '#FBBF24', '#FCD34D'], // Orange/Yellow
        ['#DB2777', '#EC4899', '#F472B6', '#F9A8D4'], // Pink
        ['#7C3AED', '#8B5CF6', '#A78BFA', '#C4B5FD'], // Violet
        ['#0284C7', '#0EA5E9', '#38BDF8', '#7DD3FC'], // Sky
        ['#65A30D', '#84CC16', '#A3E635', '#BEF264'], // Lime
      ];
      return palettes[region % palettes.length];
    }
  };

  const lightColors = getColorPalette(mousePos.x, mousePos.y, false);
  const darkColors = getColorPalette(mousePos.x, mousePos.y, true);

  // Speed-based intensity (faster = more vibrant)
  const speedIntensity = Math.min(mouseSpeed * 100, 50);

  // Shift color stops based on mouse position and speed
  const colorStop1 = Math.max(0, Math.min(100, mousePos.x - 20 - speedIntensity));
  const colorStop2 = Math.max(0, Math.min(100, mousePos.x + 10));
  const colorStop3 = Math.max(0, Math.min(100, mousePos.x + 30 + mousePos.y * 0.2));
  const colorStop4 = Math.max(0, Math.min(100, mousePos.x + 50 + speedIntensity));

  // Light mode gradient with dynamic colors
  const lightGradient = `linear-gradient(${angle}deg,
    ${lightColors[0]} ${colorStop1}%,
    ${lightColors[1]} ${colorStop2}%,
    ${lightColors[2]} ${colorStop3}%,
    ${lightColors[3]} ${colorStop4}%)`;

  // Dark mode gradient with dynamic colors
  const darkGradient = `linear-gradient(${angle}deg,
    ${darkColors[0]} ${colorStop1}%,
    ${darkColors[1]} ${colorStop2}%,
    ${darkColors[2]} ${colorStop3}%,
    ${darkColors[3]} ${colorStop4}%)`;

  // Animation classes for special effects
  const specialEffectClass = isRapidMovement ? 'animate-shimmer-text' : '';
  const pulseClass = rapidMovementCountRef.current > 0 ? 'animate-pulse' : '';

  // Prevent flash by using a wrapper with consistent dimensions
  if (!mounted) {
    return (
      <span className={`inline-block font-extrabold tracking-tight ${className}`}>
        {children}
      </span>
    );
  }

  return (
    <span className="inline-block relative" ref={containerRef}>
      {/* Light mode text */}
      <span
        className={`
          inline-block font-extrabold tracking-tight
          bg-clip-text text-transparent
          dark:hidden
          transition-opacity duration-300
          ${specialEffectClass} ${pulseClass}
          ${className}
        `}
        style={{
          backgroundImage: lightGradient,
          backgroundSize: isRapidMovement ? '200% 200%' : '100% 100%',
          transition: 'background-image 0.15s ease-out, background-size 0.3s ease-out',
          filter: isRapidMovement ? `brightness(${1.2 + mouseSpeed * 2}) saturate(${1.5 + mouseSpeed})` : 'none',
        }}
      >
        {children}
      </span>

      {/* Dark mode text */}
      <span
        className={`
          hidden dark:inline-block font-extrabold tracking-tight
          bg-clip-text text-transparent
          absolute top-0 left-0
          transition-opacity duration-300
          ${specialEffectClass} ${pulseClass}
          ${className}
        `}
        style={{
          backgroundImage: darkGradient,
          backgroundSize: isRapidMovement ? '200% 200%' : '100% 100%',
          transition: 'background-image 0.15s ease-out, background-size 0.3s ease-out',
          filter: isRapidMovement ? `brightness(${1.3 + mouseSpeed * 2}) saturate(${1.5 + mouseSpeed})` : 'none',
        }}
      >
        {children}
      </span>
    </span>
  );
}
