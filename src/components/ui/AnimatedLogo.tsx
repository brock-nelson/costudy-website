"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface GeometricDot {
  id: number;
  angle: number; // Cardinal direction: 0, 90, 180, 270
  baseRadius: number;
  currentRadius: number;
}

export default function AnimatedLogo() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [geometricDots] = useState<GeometricDot[]>([
    { id: 1, angle: 0, baseRadius: 30, currentRadius: 30 },           // Right
    { id: 2, angle: Math.PI / 2, baseRadius: 30, currentRadius: 30 }, // Bottom
    { id: 3, angle: Math.PI, baseRadius: 30, currentRadius: 30 },     // Left
    { id: 4, angle: Math.PI * 1.5, baseRadius: 30, currentRadius: 30 }, // Top
  ]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle click - trigger extension animation
  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 600);
  };

  return (
    <Link
      href="/"
      className="relative group cursor-pointer inline-flex items-center gap-3"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Light mode: Unified logo with brand purple colors */}
      <div className="dark:hidden relative">
        <Image
          src="/logo_upperleft.svg"
          alt="CoStudy Logo"
          width={200}
          height={50}
          className="h-10 w-auto transition-all duration-300 group-hover:scale-105"
          style={{ display: mounted ? undefined : 'block' }}
        />
      </div>

      {/* Dark mode: Full logo image with reduced shadow + animations */}
      <div className="hidden dark:block relative">
        <Image
          src="/logo_upperleft.svg"
          alt="CoStudy Logo"
          width={200}
          height={50}
          className="h-10 w-auto transition-all duration-300 group-hover:scale-105"
          style={{
            filter: mounted
              ? 'invert(1) brightness(2.5) saturate(0.9) drop-shadow(0 0 3px rgba(243, 232, 255, 0.4)) drop-shadow(0 0 2px rgba(255, 255, 255, 0.2))'
              : undefined
          }}
        />

        {/* Animated shimmer overlay effect */}
        {mounted && (
          <div
            className="absolute inset-0 pointer-events-none overflow-hidden"
            style={{
              maskImage: 'url(/logo_upperleft.svg)',
              WebkitMaskImage: 'url(/logo_upperleft.svg)',
              maskSize: 'contain',
              WebkitMaskSize: 'contain',
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer-logo" />
          </div>
        )}

        {/* Geometric dots and lines (dark mode only) */}
        {mounted && geometricDots.length > 0 && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            {/* SVG for lines */}
            <svg
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              width="120"
              height="120"
              style={{
                opacity: isHovered ? 0.4 : 0,
                transition: 'opacity 0.4s ease',
              }}
            >
              {geometricDots.map(dot => {
                const radius = isClicked ? dot.baseRadius + 15 : dot.baseRadius;
                const x = 60 + Math.cos(dot.angle) * radius;
                const y = 60 + Math.sin(dot.angle) * radius;

                return (
                  <line
                    key={`line-${dot.id}`}
                    x1="60"
                    y1="60"
                    x2={x}
                    y2={y}
                    stroke="rgba(167, 139, 250, 0.5)"
                    strokeWidth="1"
                    style={{
                      transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    }}
                  />
                );
              })}
            </svg>

            {/* Render static geometric dots */}
            {geometricDots.map(dot => {
              const radius = isClicked ? dot.baseRadius + 15 : dot.baseRadius;
              const x = Math.cos(dot.angle) * radius;
              const y = Math.sin(dot.angle) * radius;

              return (
                <div
                  key={`dot-${dot.id}`}
                  className="absolute"
                  style={{
                    left: `${x}px`,
                    top: `${y}px`,
                    width: isHovered ? '7px' : '5px',
                    height: isHovered ? '7px' : '5px',
                    transform: 'translate(-50%, -50%)',
                    transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  }}
                >
                  {/* Hollow circle */}
                  <div
                    className="w-full h-full rounded-full border border-purple-400"
                    style={{
                      backgroundColor: 'transparent',
                      boxShadow: isHovered
                        ? '0 0 6px rgba(167, 139, 250, 0.6)'
                        : '0 0 3px rgba(167, 139, 250, 0.3)',
                      transition: 'box-shadow 0.3s ease',
                    }}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes shimmer-logo {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
        .animate-shimmer-logo {
          animation: shimmer-logo 3s ease-in-out infinite;
        }
      `}</style>

      {/* Hover tooltip - appears above logo */}
      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 ease-out pointer-events-none z-50 group-hover:-translate-y-1">
        <div className="relative">
          <span className="text-xs text-gray-600 dark:text-gray-300 whitespace-nowrap bg-white/95 dark:bg-gray-800/95 px-3 py-1.5 rounded-md shadow-lg backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/60 font-medium">
            Home
          </span>
          {/* Tooltip arrow */}
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-white/95 dark:bg-gray-800/95 border-r border-b border-gray-200/60 dark:border-gray-700/60 rotate-45"></div>
        </div>
      </div>
    </Link>
  );
}
