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

      {/* Dark mode: Full logo image with neon effect */}
      <div className="hidden dark:block relative">
        <Image
          src="/logo_upperleft.svg"
          alt="CoStudy Logo"
          width={200}
          height={50}
          className="h-10 w-auto transition-all duration-300 group-hover:scale-105"
          style={{
            filter: mounted
              ? 'invert(1) brightness(2.5) saturate(0.9) drop-shadow(0 0 6px rgba(243, 232, 255, 0.6)) drop-shadow(0 0 3px rgba(255, 255, 255, 0.4))'
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
