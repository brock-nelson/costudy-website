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
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [targetMousePos, setTargetMousePos] = useState({ x: 50, y: 50 });
  const [scrollOffset, setScrollOffset] = useState(0);
  const [mouseSpeed, setMouseSpeed] = useState(0);
  const [isRapidMovement, setIsRapidMovement] = useState(false);
  const [sparks, setSparks] = useState<Spark[]>([]);
  const containerRef = useRef<HTMLSpanElement>(null);
  const prevPosRef = useRef({ x: 50, y: 50 });
  const prevTimeRef = useRef(Date.now());
  const rapidMovementCountRef = useRef(0);
  const directionChangesRef = useRef<number[]>([]);
  const sparkIdRef = useRef(0);

  // Smooth interpolation for mouse position
  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const smoothUpdate = () => {
      setMousePos(prev => ({
        x: lerp(prev.x, targetMousePos.x, 0.1),
        y: lerp(prev.y, targetMousePos.y, 0.1)
      }));
    };

    const interval = setInterval(smoothUpdate, 16); // ~60fps
    return () => clearInterval(interval);
  }, [targetMousePos]);

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

      // Update target for smooth following
      setTargetMousePos({ x, y });

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

          // Create sparks!
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
            rapidMovementCountRef.current = Math.max(0, rapidMovementCountRef.current - 1);
          }, 1500);
        }
      }

      setMouseSpeed(speed);
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

  // Brand purple color palettes - consistent and scroll-based
  const getBrandColors = (isDark: boolean, scroll: number): string[] => {
    try {
      // Normalize scroll to 0-1 range (fade over 500px of scroll)
      const scrollProgress = Math.min(scroll / 500, 1);

      if (isDark) {
        // Dark mode: Start with bright purples, shift to lighter purples/whites
        const baseColors = ['#E9D5FF', '#C4B5FD', '#DDD6FE', '#F3E8FF'];
        const scrolledColors = ['#FEFCFF', '#F3E8FF', '#E9D5FF', '#DDD6FE'];

        // Interpolate between base and scrolled colors
        return baseColors.map((base, i) => {
          // Simple color mixing would go here, for now return base
          return scrollProgress > 0.5 ? scrolledColors[i] : base;
        });
      } else {
        // Light mode: Start with deep purples, shift to vibrant purples
        const baseColors = ['#4A12C0', '#6B3DCB', '#8B5CF6', '#A855F7'];
        const scrolledColors = ['#6B3DCB', '#8B5CF6', '#A855F7', '#C084FC'];

        return baseColors.map((base, i) => {
          return scrollProgress > 0.5 ? scrolledColors[i] : base;
        });
      }
    } catch (error) {
      console.debug('getBrandColors error:', error);
      // Return default purple palette on error
      return isDark
        ? ['#E9D5FF', '#C4B5FD', '#DDD6FE', '#F3E8FF']
        : ['#4A12C0', '#6B3DCB', '#8B5CF6', '#A855F7'];
    }
  };

  const safeLightColors = getBrandColors(false, scrollOffset);
  const safeDarkColors = getBrandColors(true, scrollOffset);

  // Speed-based intensity (faster = more vibrant)
  const speedIntensity = Math.min(mouseSpeed * 100, 50);

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
  const pulseClass = rapidMovementCountRef.current > 0 ? 'animate-pulse' : '';
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
      {/* Combined text - single element for both light and dark mode */}
      <span
        className={`
          inline-block font-extrabold tracking-tight
          bg-clip-text text-transparent
          transition-opacity duration-300
          ${specialEffectClass} ${pulseClass}
          ${className}
        `}
        style={{
          backgroundImage: `var(--gradient-light)`,
          backgroundSize: isRapidMovement ? '200% 200%' : '100% 100%',
          transition: 'background-image 0.8s ease-out, background-size 0.3s ease-out, filter 0.3s ease-out',
          filter: isRapidMovement
            ? `brightness(${1.2 + mouseSpeed * 2}) saturate(${1.5 + mouseSpeed}) drop-shadow(0 0 ${glowIntensity}px rgba(139, 92, 246, 0.8))`
            : 'none',
          // @ts-ignore - CSS custom properties
          '--gradient-light': lightGradient,
          '--gradient-dark': darkGradient,
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

      <style jsx>{`
        span {
          background-image: ${lightGradient};
        }
        @media (prefers-color-scheme: dark) {
          span {
            background-image: ${darkGradient};
            filter: ${isRapidMovement
              ? `brightness(${1.3 + mouseSpeed * 2}) saturate(${1.5 + mouseSpeed}) drop-shadow(0 0 ${glowIntensity}px rgba(233, 213, 255, 0.9))`
              : 'none'} !important;
          }
        }
      `}</style>
    </span>
  );
}
