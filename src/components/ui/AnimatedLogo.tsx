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

      {/* Dark mode logo - ELECTRIC */}
      <svg
        className="hidden dark:block h-10 w-auto transition-all duration-300 group-hover:scale-105"
        viewBox="0 0 200 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: mounted ? undefined : 'none' }}
      >
        {/* Glowing animated underline */}
        <path
          d="M10 45 L190 45"
          stroke="url(#gradient-dark)"
          strokeWidth="3"
          strokeLinecap="round"
          filter="url(#glow-dark)"
          className={`transition-all duration-700 ${isAnimating ? 'animate-draw-line' : ''}`}
          style={{
            strokeDasharray: isAnimating ? 180 : 0,
            strokeDashoffset: isAnimating ? 180 : 0,
          }}
        />

        {/* Electric particles - brighter */}
        <circle
          cx="30"
          cy="42"
          r="1.5"
          fill="#F3E8FF"
          className={mounted ? 'animate-particle-1' : ''}
          opacity="0.9"
        />
        <circle
          cx="90"
          cy="43"
          r="1"
          fill="#FEFCFF"
          className={mounted ? 'animate-particle-2' : ''}
          opacity="0.8"
        />
        <circle
          cx="150"
          cy="42"
          r="1.5"
          fill="#F3E8FF"
          className={mounted ? 'animate-particle-3' : ''}
          opacity="0.9"
        />

        {/* CoStudy Text with electric glow and shimmer */}
        <text
          x="10"
          y="30"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="32"
          fontWeight="800"
          fill="url(#gradient-dark-shimmer)"
          filter="url(#glow-text-dark)"
          className="transition-all duration-300 group-hover:opacity-95"
        >
          CoStudy
        </text>

        {/* Pulsing electric dot - brighter */}
        <circle
          cx="185"
          cy="28"
          r="4"
          fill="#FEFCFF"
          filter="url(#glow-dot-dark)"
          className={mounted ? 'animate-pulse-electric' : ''}
        />

        {/* Additional electric spark on hover - brighter */}
        <circle
          cx="185"
          cy="28"
          r="6"
          fill="none"
          stroke="#F3E8FF"
          strokeWidth="0.5"
          opacity="0.6"
          className="group-hover:animate-ping"
        />

        <defs>
          <linearGradient id="gradient-dark" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#F3E8FF" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>

          {/* Animated shimmer gradient for text */}
          <linearGradient id="gradient-dark-shimmer" x1="0%" y1="0%" x2="200%" y2="0%">
            <stop offset="0%" stopColor="#E9D5FF">
              <animate attributeName="stop-color" values="#E9D5FF; #FEFCFF; #FFFFFF; #FEFCFF; #E9D5FF" dur="2.5s" repeatCount="indefinite" />
            </stop>
            <stop offset="50%" stopColor="#FFFFFF">
              <animate attributeName="stop-color" values="#FFFFFF; #FEFCFF; #E9D5FF; #FEFCFF; #FFFFFF" dur="2.5s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#FEFCFF">
              <animate attributeName="stop-color" values="#FEFCFF; #FFFFFF; #E9D5FF; #FFFFFF; #FEFCFF" dur="2.5s" repeatCount="indefinite" />
            </stop>
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              from="-0.5 0"
              to="0.5 0"
              dur="3s"
              repeatCount="indefinite"
            />
          </linearGradient>

          {/* Electric glow filters - enhanced for brighter glow */}
          <filter id="glow-dark" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <filter id="glow-text-dark" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <filter id="glow-dot-dark" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Logo Image - Light Mode */}
      <div className="dark:hidden">
        <Image
          src="/logo_purple.svg"
          alt="CoStudy Logo"
          width={40}
          height={40}
          className="transition-all duration-300 group-hover:scale-105"
        />
      </div>

      {/* Logo Image - Dark Mode with shimmer effect */}
      <div className="hidden dark:block">
        <Image
          src="/logo_upperleft.svg"
          alt="CoStudy Logo"
          width={40}
          height={40}
          className="transition-all duration-300 group-hover:scale-105 brightness-150"
          style={{ filter: mounted ? 'brightness(1.5) drop-shadow(0 0 8px rgba(243, 232, 255, 0.5))' : undefined }}
        />
      </div>

      {/* Hover tooltip */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
          Back to home
        </span>
      </div>
    </Link>
  );
}
