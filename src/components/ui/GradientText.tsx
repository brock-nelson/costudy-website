"use client";

import { useEffect, useState, useRef } from "react";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
}

interface Spark {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

export default function GradientText({ children, className = "" }: GradientTextProps) {
  const [mounted, setMounted] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [isRapidMovement, setIsRapidMovement] = useState(false);
  const [sparks, setSparks] = useState<Spark[]>([]);
  const containerRef = useRef<HTMLSpanElement>(null);
  const prevPosRef = useRef({ x: 50, y: 50 });
  const prevTimeRef = useRef(Date.now());
  const directionChangesRef = useRef<number[]>([]);
  const sparkIdRef = useRef(0);

  // Spark animation loop
  useEffect(() => {
    if (sparks.length === 0) return;

    const animate = () => {
      setSparks(prevSparks =>
        prevSparks
          .map(spark => ({
            ...spark,
            x: spark.x + spark.vx,
            y: spark.y + spark.vy,
            vy: spark.vy + 0.3, // gravity
            life: spark.life - 1
          }))
          .filter(spark => spark.life > 0)
      );
    };

    const interval = setInterval(animate, 16);
    return () => clearInterval(interval);
  }, [sparks.length]);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      // Calculate mouse speed for spark detection only
      const now = Date.now();
      const deltaTime = now - prevTimeRef.current;
      const deltaX = x - prevPosRef.current.x;
      const deltaY = y - prevPosRef.current.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const speed = deltaTime > 0 ? distance / deltaTime : 0;

      // Detect direction changes for gesture recognition (sparks only)
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

        // If 10+ direction changes in recent movements (within 2 seconds), trigger explosive sparks
        if (changes >= 10 && speed > 0.5) {
          setIsRapidMovement(true);

          // Create explosive sparks!
          const newSparks: Spark[] = [];
          const colors = ['#8B5CF6', '#EC4899', '#06B6D4', '#F59E0B', '#10B981'];
          for (let i = 0; i < 15; i++) {
            newSparks.push({
              id: sparkIdRef.current++,
              x: x,
              y: y,
              vx: (Math.random() - 0.5) * 3,
              vy: (Math.random() - 1) * 3,
              life: 60 + Math.random() * 30,
              color: colors[Math.floor(Math.random() * colors.length)]
            });
          }
          setSparks(prev => [...prev, ...newSparks]);

          setTimeout(() => {
            setIsRapidMovement(false);
          }, 1500);
        }
      }

      prevPosRef.current = { x, y };
      prevTimeRef.current = now;
    };

    // Track scroll for gradient shift
    const handleScroll = () => {
      const scroll = window.scrollY;
      setScrollOffset(scroll * 0.1); // Slow scroll effect
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Calculate gradient angle based on scroll only
  const angle = 135 + scrollOffset * 0.3;

  // Dynamic gradient colors that shift with scroll
  // Light mode: Brand purple → lavender/rose
  // Dark mode: Neon indigo → cyan
  const getBrandColors = (isDark: boolean, scroll: number): string[] => {
    try {
      // Normalize scroll to 0-1 range (transition over 500px)
      const scrollProgress = Math.min(scroll / 500, 1);

      if (isDark) {
        // Dark mode: Neon indigo → cyan transition
        // Start: Indigo shades (high contrast on dark bg)
        const start = ['#818CF8', '#6366F1', '#4F46E5', '#4338CA']; // Indigo 400-700
        // End: Cyan shades (neon cyan)
        const end = ['#22D3EE', '#06B6D4', '#0891B2', '#0E7490']; // Cyan 400-700

        // Interpolate between indigo and cyan
        if (scrollProgress < 0.5) {
          return start;
        } else {
          return end;
        }
      } else {
        // Light mode: Brand purple → lavender/rose transition
        // Start: Deep purple (WCAG AA compliant 4.5:1 on white)
        const start = ['#6B21A8', '#7C3AED', '#8B5CF6', '#A78BFA']; // Purple 800-400
        // End: Lavender/rose mix
        const end = ['#A855F7', '#C084FC', '#E879F9', '#F0ABFC']; // Purple 500 → Fuchsia 300

        // Interpolate between purple and lavender/rose
        if (scrollProgress < 0.5) {
          return start;
        } else {
          return end;
        }
      }
    } catch (error) {
      console.debug('getBrandColors error:', error);
      // Return default purple palette on error
      return isDark
        ? ['#818CF8', '#6366F1', '#4F46E5', '#4338CA']
        : ['#6B21A8', '#7C3AED', '#8B5CF6', '#A78BFA'];
    }
  };

  const safeLightColors = getBrandColors(false, scrollOffset);
  const safeDarkColors = getBrandColors(true, scrollOffset);

  // Shift color stops based on scroll only
  const scrollShift = scrollOffset * 0.3;
  const colorStop1 = Math.max(0, Math.min(100, 0 + scrollShift));
  const colorStop2 = Math.max(0, Math.min(100, 30 + scrollShift));
  const colorStop3 = Math.max(0, Math.min(100, 60 + scrollShift));
  const colorStop4 = Math.max(0, Math.min(100, 100 + scrollShift));

  // Light mode gradient with dynamic colors
  const lightGradient = `linear-gradient(${angle}deg,
    ${safeLightColors[0]} ${colorStop1}%,
    ${safeLightColors[1]} ${colorStop2}%,
    ${safeLightColors[2]} ${colorStop3}%,
    ${safeLightColors[3]} ${colorStop4}%)`;

  // Dark mode gradient with dynamic colors
  const darkGradient = `linear-gradient(${angle}deg,
    ${safeDarkColors[0]} ${colorStop1}%,
    ${safeDarkColors[1]} ${colorStop2}%,
    ${safeDarkColors[2]} ${colorStop3}%,
    ${safeDarkColors[3]} ${colorStop4}%)`;

  // Animation classes for special effects
  const specialEffectClass = isRapidMovement ? 'animate-shimmer-text' : '';
  const pulseClass = isRapidMovement ? 'animate-pulse' : '';
  const glowIntensity = isRapidMovement ? 10 : 0;

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
          transition: 'background-image 0.8s ease-out, background-size 0.3s ease-out, filter 0.3s ease-out',
          filter: isRapidMovement
            ? `brightness(1.3) saturate(1.6) drop-shadow(0 0 ${glowIntensity}px rgba(139, 92, 246, 0.8))`
            : 'none',
        }}
      >
        {children}
      </span>

      {/* Dark mode text */}
      <span
        className={`
          hidden dark:inline-block font-extrabold tracking-tight
          bg-clip-text text-transparent
          transition-opacity duration-300
          ${specialEffectClass} ${pulseClass}
          ${className}
        `}
        style={{
          backgroundImage: darkGradient,
          backgroundSize: isRapidMovement ? '200% 200%' : '100% 100%',
          transition: 'background-image 0.8s ease-out, background-size 0.3s ease-out, filter 0.3s ease-out',
          filter: isRapidMovement
            ? `brightness(1.4) saturate(1.6) drop-shadow(0 0 ${glowIntensity}px rgba(233, 213, 255, 0.9))`
            : 'none',
        }}
      >
        {children}
      </span>

      {/* Sparks */}
      {sparks.map(spark => (
        <div
          key={spark.id}
          className="absolute w-2 h-2 rounded-full pointer-events-none"
          style={{
            left: `${spark.x}%`,
            top: `${spark.y}%`,
            backgroundColor: spark.color,
            opacity: spark.life / 90,
            boxShadow: `0 0 ${4 + spark.life / 15}px ${spark.color}`,
            transition: 'all 0.016s linear',
          }}
        />
      ))}
    </span>
  );
}
