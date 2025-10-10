"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// Particle burst effect - commented out per user request
// interface Particle {
//   id: number;
//   x: number;
//   y: number;
//   angle: number;
//   speed: number;
//   life: number;
//   size: number;
//   color: string;
// }

export default function AnimatedLogo() {
  const [mounted, setMounted] = useState(false);
  // const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Particle animation - commented out per user request
  // useEffect(() => {
  //   if (particles.length === 0) return;

  //   const animate = () => {
  //     setParticles(prev =>
  //       prev
  //         .map(p => ({
  //           ...p,
  //           x: p.x + Math.cos(p.angle) * p.speed,
  //           y: p.y + Math.sin(p.angle) * p.speed,
  //           life: p.life - 0.02,
  //         }))
  //         .filter(p => p.life > 0)
  //     );
  //   };

  //   const interval = setInterval(animate, 16);
  //   return () => clearInterval(interval);
  // }, [particles]);

  // Particle burst handler - commented out per user request
  // const handleClick = () => {
  //   // Create particle burst!
  //   const colors = ['#8B5CF6', '#A78BFA', '#EC4899', '#F472B6', '#06B6D4', '#22D3EE'];
  //   const newParticles: Particle[] = [];

  //   for (let i = 0; i < 20; i++) {
  //     newParticles.push({
  //       id: Date.now() + i,
  //       x: 0,
  //       y: 0,
  //       angle: (Math.PI * 2 * i) / 20 + (Math.random() - 0.5) * 0.5,
  //       speed: 2 + Math.random() * 3,
  //       life: 1,
  //       size: 4 + Math.random() * 6,
  //       color: colors[Math.floor(Math.random() * colors.length)],
  //     });
  //   }

  //   setParticles(newParticles);
  // };

  return (
    <Link href="/" className="relative group cursor-pointer inline-flex items-center gap-3">
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

      {/* Particle burst effect on click - commented out per user request */}
      {/* {mounted && particles.map(particle => (
        <div
          key={particle.id}
          className="absolute pointer-events-none rounded-full"
          style={{
            left: `${50 + particle.x}px`,
            top: `${20 + particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.life,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            transition: 'opacity 0.1s',
          }}
        />
      ))} */}
    </Link>
  );
}
