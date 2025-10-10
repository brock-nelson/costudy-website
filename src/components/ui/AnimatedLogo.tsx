"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface Particle {
  id: number;
  x: number;
  y: number;
  angle: number;
  speed: number;
  life: number;
  maxLife: number;
  size: number;
}

interface OrbitDot {
  id: number;
  angle: number;
  radius: number;
  speed: number;
}

export default function AnimatedLogo() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [orbitDots, setOrbitDots] = useState<OrbitDot[]>([]);

  useEffect(() => {
    setMounted(true);

    // Initialize 3 orbit dots for dark mode animation
    const initialDots: OrbitDot[] = [
      { id: 1, angle: 0, radius: 35, speed: 0.02 },
      { id: 2, angle: Math.PI * 2 / 3, radius: 35, speed: 0.02 },
      { id: 3, angle: Math.PI * 4 / 3, radius: 35, speed: 0.02 },
    ];
    setOrbitDots(initialDots);
  }, []);

  // Animate orbit dots
  useEffect(() => {
    if (!mounted || orbitDots.length === 0) return;

    const animate = () => {
      setOrbitDots(prev => prev.map(dot => ({
        ...dot,
        angle: dot.angle + dot.speed
      })));
    };

    const interval = setInterval(animate, 16);
    return () => clearInterval(interval);
  }, [mounted, orbitDots.length]);

  // Animate particles (burst on click)
  useEffect(() => {
    if (particles.length === 0) return;

    const animate = () => {
      setParticles(prev =>
        prev
          .map(p => ({
            ...p,
            x: p.x + Math.cos(p.angle) * p.speed,
            y: p.y + Math.sin(p.angle) * p.speed,
            life: p.life - 1,
          }))
          .filter(p => p.life > 0)
      );
    };

    const interval = setInterval(animate, 16);
    return () => clearInterval(interval);
  }, [particles.length]);

  // Handle click - create subtle particle burst
  const handleClick = () => {
    const newParticles: Particle[] = [];

    // Create 6 particles bursting outward (more subtle)
    for (let i = 0; i < 6; i++) {
      newParticles.push({
        id: Date.now() + i,
        x: 0,
        y: 0,
        angle: (Math.PI * 2 * i) / 6,
        speed: 1.5 + Math.random() * 1,
        life: 45,
        maxLife: 45,
        size: 3 + Math.random() * 2,
      });
    }

    setParticles(newParticles);
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

        {/* Orbit dots (dark mode only) - abstract, disconnected */}
        {mounted && orbitDots.length > 0 && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            {/* Render orbit dots */}
            {orbitDots.map(dot => {
              const x = Math.cos(dot.angle) * dot.radius;
              const y = Math.sin(dot.angle) * dot.radius;

              return (
                <div
                  key={`dot-${dot.id}`}
                  className="absolute rounded-full border-2 border-purple-400"
                  style={{
                    left: `${x}px`,
                    top: `${y}px`,
                    width: isHovered ? '8px' : '6px',
                    height: isHovered ? '8px' : '6px',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'transparent',
                    boxShadow: isHovered
                      ? '0 0 8px rgba(167, 139, 250, 0.8)'
                      : '0 0 4px rgba(167, 139, 250, 0.5)',
                    transition: 'all 0.3s ease',
                  }}
                />
              );
            })}
          </div>
        )}

        {/* Particle burst on click */}
        {mounted && particles.map(particle => (
          <div
            key={particle.id}
            className="absolute pointer-events-none rounded-full"
            style={{
              left: '50%',
              top: '50%',
              transform: `translate(calc(-50% + ${particle.x}px), calc(-50% + ${particle.y}px))`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: 'rgba(167, 139, 250, 0.8)',
              opacity: particle.life / particle.maxLife,
              boxShadow: `0 0 ${particle.size * 2}px rgba(167, 139, 250, 0.6)`,
            }}
          />
        ))}
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
