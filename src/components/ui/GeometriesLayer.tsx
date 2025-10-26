"use client";

import { useEffect, useState, useRef } from "react";

interface GeometriesLayerProps {
  reducedMotion: boolean;
  intensity?: number;
}

interface Shape {
  id: string;
  type: 'sphere' | 'rectangle' | 'triangle' | 'circle' | 'cube';
  x: number; // percentage
  y: number; // percentage
  size: string; // viewport-based sizing
  color: string;
  depthFactor: number; // 0.4-0.8 for parallax
  animationDelay: number; // stagger animations
  rotationSpeed: number; // degrees per second for rotation
  driftX: number;
  driftY: number;
}

export default function GeometriesLayer({ reducedMotion, intensity = 1 }: GeometriesLayerProps) {
  // Initialize dark mode early to prevent flicker
  const getInitialDarkMode = () => {
    if (typeof window === 'undefined') return false;
    return document.documentElement.classList.contains('dark');
  };

  const [mounted, setMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(getInitialDarkMode);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [textBounds, setTextBounds] = useState<DOMRect | null>(null);
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [fadeIn, setFadeIn] = useState(false);
  const animationRef = useRef<number | null>(null);
  const timeRef = useRef(0);
  const shapesInitialized = useRef(false);

  const neonColors = ['#EC4899', '#22D3EE', '#A78BFA', '#2DD4BF', '#C084FC', '#F0ABFC', '#60A5FA'];
  const mutedPurples = ['#9333EA', '#A855F7', '#8B5CF6', '#7C3AED'];

  // Initialize shapes once on mount
  useEffect(() => {
    if (shapesInitialized.current) return;

    const initialShapes: Shape[] = [
      {
        id: 'sphere',
        type: 'sphere',
        x: -12,
        y: -10,
        size: '50vw',
        color: isDarkMode ? neonColors[0] : mutedPurples[0],
        depthFactor: 0.8,
        animationDelay: 0,
        rotationSpeed: 30,
        driftX: 0,
        driftY: 0,
      },
      {
        id: 'rectangle',
        type: 'rectangle',
        x: 65,
        y: 45,
        size: '28vw',
        color: isDarkMode ? neonColors[1] : mutedPurples[1],
        depthFactor: 0.6,
        animationDelay: 2.7,
        rotationSpeed: 2,
        driftX: 0,
        driftY: 0,
      },
      {
        id: 'triangle',
        type: 'triangle',
        x: 28,
        y: 58,
        size: '19vw',
        color: isDarkMode ? neonColors[2] : mutedPurples[2],
        depthFactor: 0.5,
        animationDelay: 5.1,
        rotationSpeed: 3,
        driftX: 0,
        driftY: 0,
      },
      {
        id: 'circle',
        type: 'circle',
        x: 104,
        y: -6,
        size: '32vw',
        color: isDarkMode ? neonColors[3] : mutedPurples[3],
        depthFactor: 0.7,
        animationDelay: 7.8,
        rotationSpeed: 25,
        driftX: 0,
        driftY: 0,
      },
      {
        id: 'cube',
        type: 'cube',
        x: 76,
        y: 78,
        size: '21vw',
        color: isDarkMode ? neonColors[4] : mutedPurples[0],
        depthFactor: 0.4,
        animationDelay: 10.5,
        rotationSpeed: 15,
        driftX: 0,
        driftY: 0,
      },
    ];

    setShapes(initialShapes);
    shapesInitialized.current = true;

    // Trigger fade-in after shapes are set
    setTimeout(() => setFadeIn(true), 50);
  }, []);

  // Update colors when dark mode changes (without recreating shapes)
  useEffect(() => {
    if (!shapesInitialized.current || shapes.length === 0) return;

    setShapes(prevShapes =>
      prevShapes.map((shape, index) => ({
        ...shape,
        color: isDarkMode
          ? index === 4 ? neonColors[0] : neonColors[index]
          : index === 4 ? mutedPurples[0] : mutedPurples[index],
      }))
    );
  }, [isDarkMode]);

  // Animation loop for drift
  useEffect(() => {
    if (reducedMotion || shapes.length === 0) return;

    const animate = (timestamp: number) => {
      timeRef.current = timestamp;

      setShapes(prevShapes =>
        prevShapes.map(shape => {
          // Simple sinusoidal drift (±12px over 20s)
          const time = timestamp / 1000; // seconds
          const driftX = Math.sin(time / 10 + shape.depthFactor * 5) * 12;
          const driftY = Math.cos(time / 10 + shape.depthFactor * 3) * 12;

          return {
            ...shape,
            driftX,
            driftY,
          };
        })
      );

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [reducedMotion, shapes.length]);

  useEffect(() => {
    setMounted(true);

    // Detect dark mode
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    checkDarkMode();

    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const width = window.innerWidth || 1;
      const height = window.innerHeight || 1;
      setMousePos({
        x: (e.clientX / width) * 100,
        y: (e.clientY / height) * 100,
      });
    };

    // Track text bounds
    const updateTextBounds = () => {
      const titleElement = document.querySelector('h1') || document.querySelector('[id="hero-heading"]');
      if (titleElement) {
        setTextBounds(titleElement.getBoundingClientRect());
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', updateTextBounds);
    setTimeout(updateTextBounds, 100);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', updateTextBounds);
      observer.disconnect();
    };
  }, []);

  if (!mounted) return null;

  // Calculate mouse parallax (2-8px based on depth)
  const getParallax = (shape: Shape) => {
    const dx = (mousePos.x - shape.x) * 0.05 * shape.depthFactor;
    const dy = (mousePos.y - shape.y) * 0.05 * shape.depthFactor;
    return { dx, dy };
  };

  // Check if shape intersects text (auto-dim)
  const getOpacity = (shape: Shape) => {
    if (!textBounds || typeof window === 'undefined') return isDarkMode ? 1 : 0.6;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Convert shape position to screen coordinates (approximate center)
    const shapeScreenX = (shape.x / 100) * width;
    const shapeScreenY = (shape.y / 100) * height;

    // Check if within 120px of text bounding box
    const padding = 120;
    const isNearText =
      shapeScreenX > textBounds.left - padding &&
      shapeScreenX < textBounds.right + padding &&
      shapeScreenY > textBounds.top - padding &&
      shapeScreenY < textBounds.bottom + padding;

    if (isNearText) {
      return isDarkMode ? 0.25 : 0.12;
    }

    return (isDarkMode ? 1 : 0.6) * intensity;
  };

  const renderShape = (shape: Shape) => {
    const parallax = getParallax(shape);
    const opacity = getOpacity(shape);
    const strokeWidth = isDarkMode ? 3 : 2;
    const fill = isDarkMode ? `rgba(${hexToRgb(shape.color)}, 0.04)` : 'transparent';

    // Total transform including drift + parallax
    const transform = `translate(${shape.driftX + parallax.dx}px, ${shape.driftY + parallax.dy}px)`;

    // Animation class (disabled if reduced motion)
    const pulseClass = reducedMotion ? '' : 'animate-slow-pulse';
    const rotateClass = reducedMotion ? '' : 'animate-slow-rotate';

    const glowFilter = isDarkMode
      ? `drop-shadow(0 0 10px ${shape.color}) drop-shadow(0 0 22px ${shape.color})`
      : `drop-shadow(0 0 4px rgba(98,44,198,0.15))`;

    const blendMode: React.CSSProperties['mixBlendMode'] = isDarkMode ? 'screen' : 'normal';

    switch (shape.type) {
      case 'sphere':
        return (
          <svg
            key={shape.id}
            className={`absolute ${pulseClass}`}
            style={{
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              width: shape.size,
              height: shape.size,
              transform,
              opacity,
              mixBlendMode: blendMode,
              filter: glowFilter,
              animationDelay: `${shape.animationDelay}s`,
            }}
            aria-hidden="true"
          >
            {/* Outer ripple */}
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              fill={fill}
              stroke={shape.color}
              strokeWidth={strokeWidth}
              strokeDasharray="10 15"
            >
              {!reducedMotion && (
                <animate
                  attributeName="stroke-dashoffset"
                  dur="22s"
                  values="0;-200"
                  repeatCount="indefinite"
                />
              )}
            </circle>
            {/* Inner static */}
            <circle
              cx="50%"
              cy="50%"
              r="40%"
              fill="transparent"
              stroke={shape.color}
              strokeWidth={strokeWidth * 0.7}
              opacity="0.5"
            />
          </svg>
        );

      case 'rectangle':
        return (
          <svg
            key={shape.id}
            className={`absolute ${pulseClass} ${rotateClass}`}
            style={{
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              width: shape.size,
              height: shape.size,
              transform,
              opacity,
              mixBlendMode: blendMode,
              filter: glowFilter,
              animationDelay: `${shape.animationDelay}s`,
              animationDuration: `${360 / shape.rotationSpeed}s`,
            }}
            aria-hidden="true"
          >
            <rect
              x="10%"
              y="10%"
              width="80%"
              height="80%"
              rx="40"
              fill={fill}
              stroke={shape.color}
              strokeWidth={strokeWidth}
              strokeDasharray="8 12"
            >
              {!reducedMotion && (
                <animate
                  attributeName="stroke-dashoffset"
                  dur="20s"
                  values="0;-200"
                  repeatCount="indefinite"
                />
              )}
            </rect>
          </svg>
        );

      case 'triangle':
        return (
          <svg
            key={shape.id}
            className={`absolute ${pulseClass} ${rotateClass}`}
            style={{
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              width: shape.size,
              height: shape.size,
              transform,
              opacity,
              mixBlendMode: blendMode,
              filter: glowFilter,
              animationDelay: `${shape.animationDelay}s`,
              animationDuration: `${360 / shape.rotationSpeed}s`,
            }}
            aria-hidden="true"
          >
            <polygon
              points="50,10 90,85 10,85"
              fill={fill}
              stroke={shape.color}
              strokeWidth={strokeWidth}
              strokeDasharray="6 10"
              strokeLinejoin="round"
            >
              {!reducedMotion && (
                <animate
                  attributeName="stroke-dashoffset"
                  dur="18s"
                  values="0;-200"
                  repeatCount="indefinite"
                />
              )}
            </polygon>
          </svg>
        );

      case 'circle':
        return (
          <svg
            key={shape.id}
            className={`absolute ${pulseClass}`}
            style={{
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              width: shape.size,
              height: shape.size,
              transform,
              opacity,
              mixBlendMode: blendMode,
              filter: glowFilter,
              animationDelay: `${shape.animationDelay}s`,
            }}
            aria-hidden="true"
          >
            <circle
              cx="50%"
              cy="50%"
              r="40%"
              fill={fill}
              stroke={shape.color}
              strokeWidth={strokeWidth}
              strokeDasharray="12 18"
            >
              {!reducedMotion && (
                <animate
                  attributeName="stroke-dashoffset"
                  dur="26s"
                  values="0;-200"
                  repeatCount="indefinite"
                />
              )}
            </circle>
          </svg>
        );

      case 'cube':
        // Isometric cube wireframe (3 faces)
        return (
          <svg
            key={shape.id}
            className={`absolute ${pulseClass} ${rotateClass}`}
            style={{
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              width: shape.size,
              height: shape.size,
              transform,
              opacity,
              mixBlendMode: blendMode,
              filter: glowFilter,
              animationDelay: `${shape.animationDelay}s`,
              animationDuration: `${360 / shape.rotationSpeed}s`,
            }}
            aria-hidden="true"
            viewBox="0 0 100 100"
          >
            {/* Front face */}
            <path
              d="M 30 50 L 70 50 L 70 90 L 30 90 Z"
              fill={fill}
              stroke={shape.color}
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
              strokeDasharray="5 8"
            >
              {!reducedMotion && (
                <animate
                  attributeName="stroke-dashoffset"
                  dur="24s"
                  values="0;-200"
                  repeatCount="indefinite"
                />
              )}
            </path>
            {/* Top face */}
            <path
              d="M 30 50 L 50 35 L 90 35 L 70 50 Z"
              fill="transparent"
              stroke={shape.color}
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
              strokeDasharray="5 8"
              opacity="0.7"
            >
              {!reducedMotion && (
                <animate
                  attributeName="stroke-dashoffset"
                  dur="24s"
                  values="-50;-250"
                  repeatCount="indefinite"
                />
              )}
            </path>
            {/* Right face */}
            <path
              d="M 70 50 L 90 35 L 90 75 L 70 90 Z"
              fill="transparent"
              stroke={shape.color}
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
              strokeDasharray="5 8"
              opacity="0.7"
            >
              {!reducedMotion && (
                <animate
                  attributeName="stroke-dashoffset"
                  dur="24s"
                  values="-100;-300"
                  repeatCount="indefinite"
                />
              )}
            </path>
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-700"
      style={{
        zIndex: 5,
        opacity: fadeIn ? 1 : 0,
      }}
    >
      {shapes.map(renderShape)}
    </div>
  );
}

// Helper function to convert hex to rgb
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '139, 92, 246';
}
