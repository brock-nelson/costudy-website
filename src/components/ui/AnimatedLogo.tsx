"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function AnimatedLogo() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClick = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1500);
  };

  return (
    <Link href="/" onClick={handleClick} className="relative group cursor-pointer inline-flex items-center gap-3">
      {/* Light mode: Logo icon + SVG text */}
      <div className="dark:hidden">
        <Image
          src="/logo_purple.svg"
          alt="CoStudy Logo"
          width={40}
          height={40}
          className="transition-all duration-300 group-hover:scale-105"
        />
      </div>

      {/* Light mode logo */}
      <svg
        className="h-10 w-auto dark:hidden transition-all duration-300 group-hover:scale-105"
        viewBox="0 0 200 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: mounted ? undefined : 'block' }}
      >
        {/* Animated underline */}
        <path
          d="M10 45 L190 45"
          stroke="url(#gradient-light)"
          strokeWidth="3"
          strokeLinecap="round"
          className={`transition-all duration-700 ${isAnimating ? 'animate-draw-line' : ''}`}
          style={{
            strokeDasharray: isAnimating ? 180 : 0,
            strokeDashoffset: isAnimating ? 180 : 0,
          }}
        />

        {/* CoStudy Text */}
        <text
          x="10"
          y="30"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="32"
          fontWeight="800"
          fill="url(#gradient-light)"
          className="transition-all duration-300 group-hover:opacity-90"
        >
          CoStudy
        </text>

        {/* Animated dot */}
        <circle
          cx="185"
          cy="28"
          r="4"
          fill="#4A12C0"
          className={mounted ? 'animate-pulse' : ''}
        />

        <defs>
          <linearGradient id="gradient-light" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4A12C0" />
            <stop offset="50%" stopColor="#6B3DCB" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
      </svg>

      {/* Dark mode: Full logo image with text and icon (logo_upperleft.svg already has both) */}
      <div className="hidden dark:block relative">
        <Image
          src="/logo_upperleft.svg"
          alt="CoStudy Logo"
          width={200}
          height={50}
          className="h-10 w-auto transition-all duration-300 group-hover:scale-105"
          style={{
            filter: mounted
              ? 'invert(1) brightness(2.5) saturate(0.9) drop-shadow(0 0 16px rgba(243, 232, 255, 1)) drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))'
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

      {/* Hover tooltip */}
      <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
        <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap bg-white/90 dark:bg-gray-800/90 px-3 py-1.5 rounded-lg shadow-lg backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
          Back to home
        </span>
      </div>
    </Link>
  );
}
