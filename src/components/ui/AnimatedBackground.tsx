"use client";

import { useEffect, useState, useRef } from "react";

export default function AnimatedBackground() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [textBounds, setTextBounds] = useState<DOMRect | null>(null);
  const [mounted, setMounted] = useState(false);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const lastScrollRef = useRef(0);
  const lastScrollTimeRef = useRef(Date.now());

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
    };

    // Track title text position for orb interactions
    const updateTextBounds = () => {
      // Look for hero title specifically
      const titleElement = document.querySelector('h1') || document.querySelector('[id="hero-heading"]');
      if (titleElement) {
        setTextBounds(titleElement.getBoundingClientRect());
      }
    };

    // Handle scroll for physics
    const handleScroll = () => {
      const now = Date.now();
      const currentScroll = window.scrollY;
      const deltaTime = now - lastScrollTimeRef.current;
      const deltaScroll = currentScroll - lastScrollRef.current;

      if (deltaTime > 0) {
        const velocity = deltaScroll / deltaTime;
        setScrollVelocity(velocity);

        // Decay scroll velocity over time
        setTimeout(() => {
          setScrollVelocity(v => v * 0.9);
        }, 100);
      }

      lastScrollRef.current = currentScroll;
      lastScrollTimeRef.current = now;
      updateTextBounds();
    };

    // Initial update after a small delay to ensure DOM is ready
    setTimeout(updateTextBounds, 100);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', updateTextBounds);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Update text bounds more frequently for better tracking
    const interval = setInterval(updateTextBounds, 500);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', updateTextBounds);
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  // Calculate repulsion for shapes based on mouse proximity
  const getRepulsion = (shapeX: number, shapeY: number, strength: number = 20) => {
    const dx = mousePos.x - shapeX;
    const dy = mousePos.y - shapeY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxDistance = 30; // pixels of influence

    if (distance < maxDistance) {
      const force = (1 - distance / maxDistance) * strength;
      return {
        x: -dx * force * 0.3,
        y: -dy * force * 0.3,
      };
    }
    return { x: 0, y: 0 };
  };

  // Calculate gentle attraction/orbit around text elements
  const getTextInteraction = (orbX: number, orbY: number) => {
    if (!textBounds) return { x: 0, y: 0 };

    const textCenterX = ((textBounds.left + textBounds.width / 2) / window.innerWidth) * 100;
    const textCenterY = ((textBounds.top + textBounds.height / 2) / window.innerHeight) * 100;

    const dx = textCenterX - orbX;
    const dy = textCenterY - orbY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Create orbital motion around text
    const orbitalRadius = 15; // ideal orbital distance
    const attraction = (distance - orbitalRadius) * 0.3;

    // Add perpendicular force for orbital motion
    const orbitalX = -dy * 0.2;
    const orbitalY = dx * 0.2;

    return {
      x: (dx * attraction * 0.1) + orbitalX,
      y: (dy * attraction * 0.1) + orbitalY,
    };
  };

  // Calculate scroll-based physics for shapes
  const getScrollPhysics = (shapeY: number) => {
    // Scroll down = positive velocity, push shapes down
    // Scroll up = negative velocity, pull shapes up
    const scrollForce = scrollVelocity * 50;

    // Y position affects how much scroll impacts the shape
    // Shapes at top are more affected, shapes at bottom less affected
    const positionFactor = 1 - (shapeY / 100);

    return {
      x: 0,
      y: scrollForce * positionFactor,
    };
  };

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none animated-background-blur transition-opacity duration-300 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      {/* Tech grid pattern overlay - reduced for better text contrast */}
      <div className="absolute inset-0 opacity-[0.01] dark:opacity-[0.04]" style={{
        backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }}></div>

      {/* Circuit-like connecting lines */}
      <svg className="absolute inset-0 w-full h-full opacity-5 dark:opacity-15" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="circuit-1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#EC4899" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="circuit-2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <path d="M0,150 Q300,100 600,150 T1200,150 L1920,150" stroke="url(#circuit-1)" strokeWidth="3" fill="none" className="animate-float" />
        <path d="M1920,400 Q1600,450 1300,400 T700,400 L0,400" stroke="url(#circuit-2)" strokeWidth="3" fill="none" className="animate-float-delayed" />
        <circle cx="600" cy="150" r="6" fill="#EC4899" className="animate-pulse-slow dark:opacity-80" />
        <circle cx="1300" cy="400" r="6" fill="#F59E0B" className="animate-pulse-slow dark:opacity-80" />
        <circle cx="300" cy="100" r="5" fill="#8B5CF6" className="animate-pulse-slow dark:opacity-80" />
        <circle cx="1600" cy="450" r="5" fill="#10B981" className="animate-pulse-slow dark:opacity-80" />
      </svg>

      {/* Large gradient orbs with text interaction and scroll physics - heavily blurred for better text readability, mobile-optimized sizes */}
      {(() => {
        const orb1Pos = { x: 10, y: 20 };
        const orb2Pos = { x: 90, y: 15 };
        const orb3Pos = { x: 50, y: 80 };

        const orb1Repulsion = getRepulsion(orb1Pos.x, orb1Pos.y, 15);
        const orb2Repulsion = getRepulsion(orb2Pos.x, orb2Pos.y, 15);
        const orb3Repulsion = getRepulsion(orb3Pos.x, orb3Pos.y, 15);

        const orb1Text = getTextInteraction(orb1Pos.x, orb1Pos.y);
        const orb2Text = getTextInteraction(orb2Pos.x, orb2Pos.y);
        const orb3Text = getTextInteraction(orb3Pos.x, orb3Pos.y);

        const orb1Scroll = getScrollPhysics(orb1Pos.y);
        const orb2Scroll = getScrollPhysics(orb2Pos.y);
        const orb3Scroll = getScrollPhysics(orb3Pos.y);

        return (
          <>
            <div
              className="animated-orb absolute -top-40 -left-40 w-[400px] h-[400px] md:w-[700px] md:h-[700px] bg-gradient-to-br from-purple-400/10 dark:from-purple-500/20 via-purple-300/6 dark:via-purple-400/15 to-transparent rounded-full blur-3xl animate-float transition-all duration-300 ease-out will-change-transform"
              style={{ transform: `translate(${orb1Repulsion.x + orb1Text.x}px, ${orb1Repulsion.y + orb1Text.y + orb1Scroll.y}px)` }}
            ></div>
            <div
              className="animated-orb absolute top-20 -right-40 w-[350px] h-[350px] md:w-[600px] md:h-[600px] bg-gradient-to-bl from-cyan-400/10 dark:from-cyan-500/20 via-blue-400/6 dark:via-blue-500/15 to-transparent rounded-full blur-3xl animate-float-delayed transition-all duration-300 ease-out will-change-transform"
              style={{ transform: `translate(${orb2Repulsion.x + orb2Text.x}px, ${orb2Repulsion.y + orb2Text.y + orb2Scroll.y}px)` }}
            ></div>
            <div
              className="animated-orb absolute -bottom-40 left-1/3 w-[320px] h-[320px] md:w-[550px] md:h-[550px] bg-gradient-to-tr from-pink-400/8 dark:from-pink-500/18 via-fuchsia-300/5 dark:via-fuchsia-400/12 to-transparent rounded-full blur-3xl animate-float-slow transition-all duration-300 ease-out will-change-transform"
              style={{ transform: `translate(${orb3Repulsion.x + orb3Text.x}px, ${orb3Repulsion.y + orb3Text.y + orb3Scroll.y}px)` }}
            ></div>
          </>
        );
      })()}

      {/* Vibrant accent orbs - reduced opacity, mobile-optimized */}
      <div className="absolute top-1/3 right-1/3 w-48 h-48 md:w-80 md:h-80 bg-gradient-to-br from-orange-300/10 dark:from-orange-400/25 to-transparent rounded-full blur-2xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 left-1/4 w-40 h-40 md:w-72 md:h-72 bg-gradient-to-br from-emerald-300/10 dark:from-emerald-400/25 to-transparent rounded-full blur-2xl animate-float-delayed"></div>
      <div className="absolute top-1/5 left-1/2 w-36 h-36 md:w-64 md:h-64 bg-gradient-to-br from-violet-300/8 dark:from-violet-400/22 to-transparent rounded-full blur-2xl animate-float"></div>

      {/* Purple morphing hexagon - hidden on mobile, reduced opacity for text readability */}
      {(() => {
        const hexPos = { x: 75, y: 25 };
        const hexRepulsion = getRepulsion(hexPos.x, hexPos.y, 10);
        const hexScroll = getScrollPhysics(hexPos.y);
        return (
          <div
            className="hidden md:block absolute top-1/4 right-1/4 w-40 h-40 lg:w-56 lg:h-56 bg-gradient-to-br from-purple-500/12 dark:from-purple-500/30 via-purple-400/8 dark:via-purple-400/22 to-transparent border-2 border-purple-400/30 dark:border-purple-400/50 rounded-[3rem] animate-morph backdrop-blur-sm shadow-xl shadow-purple-500/25 dark:shadow-purple-400/45 transition-transform duration-300 ease-out will-change-transform"
            style={{ transform: `translate(${hexRepulsion.x}px, ${hexRepulsion.y + hexScroll.y}px) rotate(12deg)` }}
          ></div>
        );
      })()}

      {/* Cyan/Blue floating shape - hidden on mobile */}
      {(() => {
        const cyanPos = { x: 20, y: 33 };
        const cyanRepulsion = getRepulsion(cyanPos.x, cyanPos.y, 10);
        const cyanScroll = getScrollPhysics(cyanPos.y);
        return (
          <div
            className="hidden md:block absolute top-1/3 left-1/5 w-44 h-44 lg:w-64 lg:h-64 bg-gradient-to-br from-cyan-500/10 dark:from-cyan-400/28 via-blue-500/12 dark:via-blue-400/32 to-sky-400/6 dark:to-sky-400/18 border-2 border-cyan-400/30 dark:border-cyan-400/50 rounded-[3.5rem] -rotate-6 animate-morph-delayed backdrop-blur-sm shadow-xl shadow-cyan-500/25 dark:shadow-cyan-400/48 transition-transform duration-300 ease-out will-change-transform"
            style={{ transform: `translate(${cyanRepulsion.x}px, ${cyanRepulsion.y + cyanScroll.y}px) rotate(-6deg)` }}
          ></div>
        );
      })()}

      {/* Pink/Magenta octagon - hidden on mobile */}
      {(() => {
        const pinkPos = { x: 66, y: 66 };
        const pinkRepulsion = getRepulsion(pinkPos.x, pinkPos.y, 10);
        const pinkScroll = getScrollPhysics(pinkPos.y);
        return (
          <div
            className="hidden md:block absolute bottom-1/3 right-1/3 w-36 h-36 lg:w-52 lg:h-52 bg-gradient-to-br from-pink-500/12 dark:from-pink-400/32 via-fuchsia-500/10 dark:from-fuchsia-400/24 to-rose-400/6 dark:to-rose-400/18 border-2 border-pink-500/30 dark:border-pink-400/50 rounded-[2.5rem] rotate-45 animate-morph backdrop-blur-sm shadow-xl shadow-pink-500/28 dark:shadow-pink-400/48 transition-transform duration-300 ease-out will-change-transform"
            style={{
              clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
              transform: `translate(${pinkRepulsion.x}px, ${pinkRepulsion.y + pinkScroll.y}px) rotate(45deg)`
            }}
          ></div>
        );
      })()}

      {/* Orange/Amber circle - simplified for mobile */}
      {(() => {
        const orangePos = { x: 50, y: 50 };
        const orangeRepulsion = getRepulsion(orangePos.x, orangePos.y, 12);
        const orangeScroll = getScrollPhysics(orangePos.y);
        return (
          <div
            className="absolute top-1/2 left-1/2 w-32 h-32 md:w-48 md:h-48 bg-gradient-to-br from-orange-500/15 dark:from-orange-400/35 via-amber-500/12 dark:via-amber-400/28 to-yellow-400/8 dark:to-yellow-400/20 border-2 border-orange-500/30 dark:border-orange-400/50 rounded-full animate-pulse-slow backdrop-blur-sm shadow-xl shadow-orange-500/25 dark:shadow-orange-400/45 transition-transform duration-300 ease-out will-change-transform"
            style={{
              transform: `translate(${orangeRepulsion.x}px, ${orangeRepulsion.y + orangeScroll.y}px)`,
              borderRadius: '9999px' // Force circular shape immediately to prevent flash
            }}
          ></div>
        );
      })()}

      {/* Emerald star - hidden on mobile */}
      {(() => {
        const emeraldPos = { x: 25, y: 75 };
        const emeraldRepulsion = getRepulsion(emeraldPos.x, emeraldPos.y, 10);
        const emeraldScroll = getScrollPhysics(emeraldPos.y);
        return (
          <div
            className="hidden lg:block absolute bottom-1/4 left-1/4 w-48 h-48 bg-gradient-to-br from-emerald-500/10 dark:from-emerald-400/30 via-green-500/8 dark:via-green-400/24 to-teal-400/6 dark:to-teal-400/18 border-2 border-emerald-500/28 dark:border-emerald-400/50 animate-spin-slow backdrop-blur-sm shadow-xl shadow-emerald-500/22 dark:shadow-emerald-400/42 transition-transform duration-300 ease-out will-change-transform"
            style={{
              clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
              borderRadius: "15%",
              transform: `translate(${emeraldRepulsion.x}px, ${emeraldRepulsion.y + emeraldScroll.y}px)`
            }}
          ></div>
        );
      })()}

      {/* Violet triangle - hidden on mobile */}
      {(() => {
        const violetPos = { x: 80, y: 66 };
        const violetRepulsion = getRepulsion(violetPos.x, violetPos.y, 10);
        const violetScroll = getScrollPhysics(violetPos.y);
        return (
          <div
            className="hidden lg:block absolute top-2/3 right-1/5 w-44 h-44 bg-gradient-to-br from-violet-500/14 dark:from-violet-400/34 via-indigo-500/10 dark:via-indigo-400/26 to-purple-400/6 dark:to-purple-400/18 border-2 border-violet-500/30 dark:border-violet-400/50 rounded-[2rem] animate-morph backdrop-blur-sm shadow-xl shadow-violet-500/25 dark:shadow-violet-400/45 transition-transform duration-300 ease-out will-change-transform"
            style={{
              clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
              transform: `translate(${violetRepulsion.x}px, ${violetRepulsion.y + violetScroll.y}px) rotate(30deg)`
            }}
          ></div>
        );
      })()}

      {/* Teal diamond - hidden on mobile */}
      {(() => {
        const tealPos = { x: 33, y: 16 };
        const tealRepulsion = getRepulsion(tealPos.x, tealPos.y, 10);
        const tealScroll = getScrollPhysics(tealPos.y);
        return (
          <div
            className="hidden lg:block absolute top-1/6 left-1/3 w-40 h-40 bg-gradient-to-br from-teal-500/14 dark:from-teal-400/34 via-cyan-400/10 dark:via-cyan-400/26 to-blue-400/6 dark:to-blue-400/18 border-2 border-teal-500/30 dark:border-teal-400/50 rounded-[1.8rem] animate-morph-delayed backdrop-blur-sm shadow-xl shadow-teal-500/25 dark:shadow-teal-400/45 transition-transform duration-300 ease-out will-change-transform"
            style={{
              clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
              transform: `translate(${tealRepulsion.x}px, ${tealRepulsion.y + tealScroll.y}px) rotate(45deg)`
            }}
          ></div>
        );
      })()}

      {/* Rose pentagon - hidden on mobile */}
      {(() => {
        const rosePos = { x: 60, y: 80 };
        const roseRepulsion = getRepulsion(rosePos.x, rosePos.y, 10);
        const roseScroll = getScrollPhysics(rosePos.y);
        return (
          <div
            className="hidden lg:block absolute bottom-1/5 right-2/5 w-36 h-36 bg-gradient-to-br from-rose-500/12 dark:from-rose-400/32 via-pink-400/8 dark:via-pink-400/22 to-fuchsia-400/6 dark:to-fuchsia-400/16 border-2 border-rose-500/30 dark:border-rose-400/50 rounded-[1.5rem] animate-morph backdrop-blur-sm shadow-xl shadow-rose-500/24 dark:shadow-rose-400/44 transition-transform duration-300 ease-out will-change-transform"
            style={{
              clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
              transform: `translate(${roseRepulsion.x}px, ${roseRepulsion.y + roseScroll.y}px) rotate(72deg)`
            }}
          ></div>
        );
      })()}

      {/* Animated lines with rainbow gradients */}
      <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-400/30 dark:via-purple-400/60 to-transparent animate-shimmer"></div>
      <div className="absolute top-2/3 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400/25 dark:via-cyan-400/55 to-transparent animate-shimmer-delayed"></div>
      <div className="absolute top-1/3 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-pink-400/25 dark:via-pink-400/55 to-transparent animate-shimmer"></div>

      {/* Rainbow floating particles */}
      <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-purple-500/70 dark:bg-purple-400/90 rounded-full animate-float-particle-1 shadow-lg shadow-purple-500/60 dark:shadow-purple-400/80"></div>
      <div className="absolute top-2/3 right-1/4 w-4 h-4 bg-cyan-500/70 dark:bg-cyan-400/90 rounded-full animate-float-particle-2 shadow-lg shadow-cyan-500/60 dark:shadow-cyan-400/80"></div>
      <div className="absolute top-1/2 left-2/3 w-3 h-3 bg-pink-500/75 dark:bg-pink-400/95 rounded-full animate-float-particle-3 shadow-lg shadow-pink-500/65 dark:shadow-pink-400/85"></div>
      <div className="absolute bottom-1/4 left-1/2 w-4 h-4 bg-orange-500/70 dark:bg-orange-400/90 rounded-full animate-float-particle-1 shadow-lg shadow-orange-500/60 dark:shadow-orange-400/80"></div>
      <div className="absolute top-1/5 right-2/5 w-3 h-3 bg-emerald-500/70 dark:bg-emerald-400/90 rounded-full animate-float-particle-2 shadow-lg shadow-emerald-500/60 dark:shadow-emerald-400/80"></div>
      <div className="absolute bottom-1/3 left-1/5 w-3 h-3 bg-violet-500/75 dark:bg-violet-400/95 rounded-full animate-float-particle-3 shadow-lg shadow-violet-500/65 dark:shadow-violet-400/85"></div>
      <div className="absolute top-3/4 right-1/3 w-4 h-4 bg-amber-500/70 dark:bg-amber-400/90 rounded-full animate-float-particle-1 shadow-lg shadow-amber-500/60 dark:shadow-amber-400/80"></div>
    </div>
  );
}
