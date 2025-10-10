"use client";

import { useEffect, useState, useRef } from "react";

// Sanitize numeric values to prevent NaN/Infinity
const sanitizeNumber = (value: number, fallback: number = 0): number => {
  if (typeof value !== 'number' || !isFinite(value) || isNaN(value)) {
    return fallback;
  }
  return value;
};

// Physics drift state for smooth floating motion
interface DriftState {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

// Unique physics properties for each shape (substance-based)
interface PhysicsProperties {
  damping: number;          // How quickly motion decays (0.9-0.99)
  maxVelocity: number;      // Maximum drift speed
  forceMultiplier: number;  // How responsive to random forces
  bounce: number;           // Velocity retained after collision (0-1)
  maxDrift: number;         // Maximum distance from origin
  substance: string;        // For reference
}

// Playful particle state with rotation, scale, and color
interface ParticleState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  scale: number;
  baseY: number;
  pulsePhase: number;
  pulseSpeed: number;
  colorIndex: number;
  colorTransition: number;
  squishX: number;
  squishY: number;
}

export default function AnimatedBackground() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [textBounds, setTextBounds] = useState<DOMRect | null>(null);
  const [mounted, setMounted] = useState(false);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [drift, setDrift] = useState<Record<string, DriftState>>({});
  const [particles, setParticles] = useState<ParticleState[]>([]);
  const lastScrollRef = useRef(0);
  const lastScrollTimeRef = useRef(Date.now());
  const driftAnimationRef = useRef<number | null>(null);
  const particleAnimationRef = useRef<number | null>(null);

  // Unique physics for each shape - different substances!
  const shapePhysics: Record<string, PhysicsProperties> = {
    orb1: { damping: 0.995, maxVelocity: 0.05, forceMultiplier: 0.3, bounce: 0.3, maxDrift: 20, substance: 'heavy-liquid' },
    orb2: { damping: 0.97, maxVelocity: 0.12, forceMultiplier: 1.5, bounce: 0.6, maxDrift: 25, substance: 'light-air' },
    orb3: { damping: 0.99, maxVelocity: 0.04, forceMultiplier: 0.5, bounce: 0.2, maxDrift: 15, substance: 'thick-gel' },
    hex: { damping: 0.94, maxVelocity: 0.1, forceMultiplier: 1.2, bounce: 0.8, maxDrift: 22, substance: 'jello' },
    cyan: { damping: 0.96, maxVelocity: 0.09, forceMultiplier: 1.0, bounce: 0.5, maxDrift: 20, substance: 'water' },
    pink: { damping: 0.93, maxVelocity: 0.11, forceMultiplier: 1.3, bounce: 0.85, maxDrift: 24, substance: 'rubber' },
    square: { damping: 0.995, maxVelocity: 0.06, forceMultiplier: 0.4, bounce: 0.4, maxDrift: 18, substance: 'dense-metal' },
    orange: { damping: 0.98, maxVelocity: 0.05, forceMultiplier: 0.6, bounce: 0.25, maxDrift: 16, substance: 'putty' },
    emerald: { damping: 0.92, maxVelocity: 0.13, forceMultiplier: 1.4, bounce: 0.9, maxDrift: 26, substance: 'elastic' },
    violet: { damping: 0.97, maxVelocity: 0.14, forceMultiplier: 1.6, bounce: 0.7, maxDrift: 28, substance: 'gas' },
    teal: { damping: 0.91, maxVelocity: 0.08, forceMultiplier: 0.8, bounce: 0.6, maxDrift: 19, substance: 'glass' },
    rose: { damping: 0.95, maxVelocity: 0.07, forceMultiplier: 0.9, bounce: 0.55, maxDrift: 21, substance: 'soft-gel' }
  };

  // Initialize drift states for all shapes
  useEffect(() => {
    const shapes = ['orb1', 'orb2', 'orb3', 'hex', 'cyan', 'pink', 'square', 'orange', 'emerald', 'violet', 'teal', 'rose'];
    const initialDrift: Record<string, DriftState> = {};

    shapes.forEach(shape => {
      initialDrift[shape] = {
        x: 0,
        y: 0,
        vx: (Math.random() - 0.5) * 0.05,
        vy: (Math.random() - 0.5) * 0.05,
      };
    });

    setDrift(initialDrift);
  }, []);

  // Initialize playful particle states (7 particles)
  useEffect(() => {
    const particleData = [
      { top: 25, left: 33.33 },
      { top: 66.67, right: 25 },
      { top: 50, left: 66.67 },
      { bottom: 25, left: 50 },
      { top: 20, right: 40 },
      { bottom: 33.33, left: 20 },
      { top: 75, right: 33.33 },
    ];

    const initialParticles: ParticleState[] = particleData.map((p, index) => {
      const baseY = p.top !== undefined ? p.top : 100 - (p.bottom || 0);
      return {
        x: 0,
        y: 0,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        rotation: 0, // No rotation
        rotationSpeed: 0, // No rotation
        scale: 1,
        baseY,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.0008 + Math.random() * 0.0012, // Very slow random pulse
        colorIndex: index,
        colorTransition: 0,
        squishX: 1,
        squishY: 1,
      };
    });

    setParticles(initialParticles);
  }, []);

  // Physics-based drift animation loop with unique substance physics per shape
  useEffect(() => {
    if (!mounted) return;

    const animate = () => {
      setDrift(prevDrift => {
        const newDrift: Record<string, DriftState> = {};

        Object.keys(prevDrift).forEach(key => {
          const d = prevDrift[key];
          const physics = shapePhysics[key];
          if (!physics) return;

          // Add random drift force (scaled by substance properties)
          const baseForce = 0.002;
          const forceX = (Math.random() - 0.5) * baseForce * physics.forceMultiplier;
          const forceY = (Math.random() - 0.5) * baseForce * physics.forceMultiplier;

          // Update velocity with forces
          let vx = d.vx + forceX;
          let vy = d.vy + forceY;

          // Apply substance-specific damping
          vx *= physics.damping;
          vy *= physics.damping;

          // Limit to substance-specific max velocity
          vx = Math.max(-physics.maxVelocity, Math.min(physics.maxVelocity, vx));
          vy = Math.max(-physics.maxVelocity, Math.min(physics.maxVelocity, vy));

          // Update position
          let x = d.x + vx;
          let y = d.y + vy;

          // Keep within substance-specific bounds with substance-specific bounce
          if (Math.abs(x) > physics.maxDrift) {
            x = Math.sign(x) * physics.maxDrift;
            vx *= -physics.bounce; // substance-specific bounce
          }
          if (Math.abs(y) > physics.maxDrift) {
            y = Math.sign(y) * physics.maxDrift;
            vy *= -physics.bounce; // substance-specific bounce
          }

          newDrift[key] = { x, y, vx, vy };
        });

        return newDrift;
      });

      driftAnimationRef.current = requestAnimationFrame(animate);
    };

    driftAnimationRef.current = requestAnimationFrame(animate);

    return () => {
      if (driftAnimationRef.current) {
        cancelAnimationFrame(driftAnimationRef.current);
      }
    };
  }, [mounted, shapePhysics]);

  // Playful particle physics animation loop with jello squish and slow pulse
  useEffect(() => {
    if (!mounted || particles.length === 0) return;

    const animate = () => {
      setParticles(prevParticles => {
        return prevParticles.map((p, index) => {
          // Add playful random forces (increased for more movement)
          const forceX = (Math.random() - 0.5) * 0.025;
          const forceY = (Math.random() - 0.5) * 0.025;

          // Scroll creates upward/downward force with playful oscillation
          const scrollForce = scrollVelocity * 8;
          const oscillation = Math.sin(Date.now() * 0.001 + index * 0.5) * 0.03;

          // Update velocity with forces, scroll impact, and damping
          let vx = p.vx + forceX;
          let vy = p.vy + forceY + scrollForce + oscillation;

          // Playful damping (less damping = more bouncy)
          vx *= 0.95;
          vy *= 0.95;

          // Limit max velocity but allow more playful movement
          const maxVel = 0.5;
          vx = Math.max(-maxVel, Math.min(maxVel, vx));
          vy = Math.max(-maxVel, Math.min(maxVel, vy));

          // Update position
          let x = p.x + vx;
          let y = p.y + vy;

          // Jello squish physics - detect collisions and squish
          let squishX = p.squishX;
          let squishY = p.squishY;
          const maxDrift = 30;
          let hitWall = false;

          if (Math.abs(x) > maxDrift) {
            x = Math.sign(x) * maxDrift;
            vx *= -0.8; // bouncy!
            // Jello squish horizontally on impact
            squishX = 0.6;
            squishY = 1.4;
            hitWall = true;
          }
          if (Math.abs(y) > maxDrift) {
            y = Math.sign(y) * maxDrift;
            vy *= -0.8; // bouncy!
            // Jello squish vertically on impact
            if (!hitWall) {
              squishX = 1.4;
              squishY = 0.6;
            }
            hitWall = true;
          }

          // Smooth jello squish recovery (spring back to normal)
          if (!hitWall) {
            squishX += (1 - squishX) * 0.15;
            squishY += (1 - squishY) * 0.15;
          }

          // No rotation - keep particles oriented
          const velocityMag = Math.sqrt(vx * vx + vy * vy);

          // Slow random pulse (independent per particle)
          const pulsePhase = p.pulsePhase + p.pulseSpeed;
          const pulseFactor = Math.sin(pulsePhase) * 0.08 + 1; // ±8% size variation
          const scale = pulseFactor + velocityMag * 0.2;

          // Slow color transition (cycle through rainbow over time)
          const colorTransition = (p.colorTransition + 0.0003) % 1;

          return {
            x,
            y,
            vx,
            vy,
            rotation: 0, // No rotation
            rotationSpeed: 0,
            scale: Math.max(0.8, Math.min(1.3, scale)),
            baseY: p.baseY,
            pulsePhase,
            pulseSpeed: p.pulseSpeed,
            colorIndex: p.colorIndex,
            colorTransition,
            squishX: Math.max(0.6, Math.min(1.4, squishX)),
            squishY: Math.max(0.6, Math.min(1.4, squishY)),
          };
        });
      });

      particleAnimationRef.current = requestAnimationFrame(animate);
    };

    particleAnimationRef.current = requestAnimationFrame(animate);

    return () => {
      if (particleAnimationRef.current) {
        cancelAnimationFrame(particleAnimationRef.current);
      }
    };
  }, [mounted, particles.length, scrollVelocity]);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      try {
        if (!e || typeof window === 'undefined') return;
        const width = window.innerWidth || 1;
        const height = window.innerHeight || 1;
        const x = sanitizeNumber(((e.clientX || 0) / width) * 100, 50);
        const y = sanitizeNumber(((e.clientY || 0) / height) * 100, 50);
        setMousePos({ x, y });
      } catch (error) {
        // Silently handle any errors to prevent crashes
        console.debug('MouseMove error:', error);
      }
    };

    // Track title text position for orb interactions
    const updateTextBounds = () => {
      try {
        if (typeof document === 'undefined') return;
        // Look for hero title specifically
        const titleElement = document.querySelector('h1') || document.querySelector('[id="hero-heading"]');
        if (titleElement && titleElement.getBoundingClientRect) {
          setTextBounds(titleElement.getBoundingClientRect());
        }
      } catch (error) {
        // Silently handle any errors
        console.debug('UpdateTextBounds error:', error);
      }
    };

    // Handle scroll for physics
    const handleScroll = () => {
      try {
        if (typeof window === 'undefined') return;
        const now = Date.now();
        const currentScroll = window.scrollY || 0;
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
      } catch (error) {
        // Silently handle any errors
        console.debug('HandleScroll error:', error);
      }
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
    try {
      const dx = sanitizeNumber(mousePos.x - shapeX, 0);
      const dy = sanitizeNumber(mousePos.y - shapeY, 0);
      const distance = sanitizeNumber(Math.sqrt(dx * dx + dy * dy), 0);
      const maxDistance = 30; // pixels of influence

      if (distance < maxDistance && distance > 0) {
        const force = sanitizeNumber((1 - distance / maxDistance) * strength, 0);
        return {
          x: sanitizeNumber(-dx * force * 0.3, 0),
          y: sanitizeNumber(-dy * force * 0.3, 0),
        };
      }
    } catch (error) {
      console.debug('Repulsion calculation error:', error);
    }
    return { x: 0, y: 0 };
  };

  // Calculate gentle attraction/orbit around text elements
  const getTextInteraction = (orbX: number, orbY: number) => {
    try {
      if (!textBounds || typeof window === 'undefined') return { x: 0, y: 0 };

      const width = window.innerWidth || 1;
      const height = window.innerHeight || 1;
      const textCenterX = sanitizeNumber(((textBounds.left + textBounds.width / 2) / width) * 100, 50);
      const textCenterY = sanitizeNumber(((textBounds.top + textBounds.height / 2) / height) * 100, 50);

      const dx = sanitizeNumber(textCenterX - orbX, 0);
      const dy = sanitizeNumber(textCenterY - orbY, 0);
      const distance = sanitizeNumber(Math.sqrt(dx * dx + dy * dy), 0);

      // Create orbital motion around text
      const orbitalRadius = 15; // ideal orbital distance
      const attraction = sanitizeNumber((distance - orbitalRadius) * 0.3, 0);

      // Add perpendicular force for orbital motion
      const orbitalX = sanitizeNumber(-dy * 0.2, 0);
      const orbitalY = sanitizeNumber(dx * 0.2, 0);

      return {
        x: sanitizeNumber((dx * attraction * 0.1) + orbitalX, 0),
        y: sanitizeNumber((dy * attraction * 0.1) + orbitalY, 0),
      };
    } catch (error) {
      console.debug('Text interaction error:', error);
      return { x: 0, y: 0 };
    }
  };

  // Calculate scroll-based physics for shapes
  const getScrollPhysics = (shapeY: number) => {
    try {
      // Scroll down = positive velocity, push shapes down
      // Scroll up = negative velocity, pull shapes up
      const scrollForce = sanitizeNumber(scrollVelocity * 50, 0);

      // Y position affects how much scroll impacts the shape
      // Shapes at top are more affected, shapes at bottom less affected
      const positionFactor = sanitizeNumber(1 - (shapeY / 100), 1);

      return {
        x: 0,
        y: sanitizeNumber(scrollForce * positionFactor, 0),
      };
    } catch (error) {
      console.debug('Scroll physics error:', error);
      return { x: 0, y: 0 };
    }
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

        const orb1Drift = drift.orb1 || { x: 0, y: 0 };
        const orb2Drift = drift.orb2 || { x: 0, y: 0 };
        const orb3Drift = drift.orb3 || { x: 0, y: 0 };

        return (
          <>
            <div
              className="animated-orb absolute -top-40 -left-40 w-[400px] h-[400px] md:w-[700px] md:h-[700px] bg-gradient-to-br from-purple-400/10 dark:from-purple-500/20 via-purple-300/6 dark:via-purple-400/15 to-transparent rounded-full blur-3xl animate-float transition-all duration-300 ease-out will-change-transform"
              style={{
                transform: `translate(${orb1Repulsion.x + orb1Text.x + orb1Drift.x}px, ${orb1Repulsion.y + orb1Text.y + orb1Scroll.y + orb1Drift.y}px)`,
                opacity: mounted ? undefined : 0
              }}
            ></div>
            <div
              className="animated-orb absolute top-20 -right-40 w-[350px] h-[350px] md:w-[600px] md:h-[600px] bg-gradient-to-bl from-cyan-400/10 dark:from-cyan-500/20 via-blue-400/6 dark:via-blue-500/15 to-transparent rounded-full blur-3xl animate-float-delayed transition-all duration-300 ease-out will-change-transform"
              style={{
                transform: `translate(${orb2Repulsion.x + orb2Text.x + orb2Drift.x}px, ${orb2Repulsion.y + orb2Text.y + orb2Scroll.y + orb2Drift.y}px)`,
                opacity: mounted ? undefined : 0
              }}
            ></div>
            <div
              className="animated-orb absolute -bottom-40 left-1/3 w-[320px] h-[320px] md:w-[550px] md:h-[550px] bg-gradient-to-tr from-pink-400/8 dark:from-pink-500/18 via-fuchsia-300/5 dark:via-fuchsia-400/12 to-transparent rounded-full blur-3xl animate-float-slow transition-all duration-300 ease-out will-change-transform"
              style={{
                transform: `translate(${orb3Repulsion.x + orb3Text.x + orb3Drift.x}px, ${orb3Repulsion.y + orb3Text.y + orb3Scroll.y + orb3Drift.y}px)`,
                opacity: mounted ? undefined : 0
              }}
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
        const hexDrift = drift.hex || { x: 0, y: 0 };
        return (
          <div
            className="hidden md:block absolute top-1/4 right-1/4 w-40 h-40 lg:w-56 lg:h-56 bg-gradient-to-br from-purple-500/12 dark:from-purple-500/30 via-purple-400/8 dark:via-purple-400/22 to-transparent border-2 border-purple-400/30 dark:border-purple-400/50 rounded-[3rem] animate-morph backdrop-blur-sm shadow-xl shadow-purple-500/25 dark:shadow-purple-400/45 transition-transform duration-300 ease-out will-change-transform"
            style={{
              transform: `translate(${hexRepulsion.x + hexDrift.x}px, ${hexRepulsion.y + hexScroll.y + hexDrift.y}px) rotate(12deg)`,
              opacity: mounted ? undefined : 0
            }}
          ></div>
        );
      })()}

      {/* Cyan/Blue floating shape - hidden on mobile */}
      {(() => {
        const cyanPos = { x: 20, y: 33 };
        const cyanRepulsion = getRepulsion(cyanPos.x, cyanPos.y, 10);
        const cyanScroll = getScrollPhysics(cyanPos.y);
        const cyanDrift = drift.cyan || { x: 0, y: 0 };
        return (
          <div
            className="hidden md:block absolute top-1/3 left-1/5 w-44 h-44 lg:w-64 lg:h-64 bg-gradient-to-br from-cyan-500/10 dark:from-cyan-400/28 via-blue-500/12 dark:via-blue-400/32 to-sky-400/6 dark:to-sky-400/18 border-2 border-cyan-400/30 dark:border-cyan-400/50 rounded-[3.5rem] animate-morph-delayed backdrop-blur-sm shadow-xl shadow-cyan-500/25 dark:shadow-cyan-400/48 transition-transform duration-300 ease-out will-change-transform"
            style={{
              transform: `translate(${cyanRepulsion.x + cyanDrift.x}px, ${cyanRepulsion.y + cyanScroll.y + cyanDrift.y}px) rotate(-6deg)`,
              opacity: mounted ? undefined : 0
            }}
          ></div>
        );
      })()}

      {/* Pink/Magenta octagon - hidden on mobile */}
      {(() => {
        const pinkPos = { x: 66, y: 66 };
        const pinkRepulsion = getRepulsion(pinkPos.x, pinkPos.y, 10);
        const pinkScroll = getScrollPhysics(pinkPos.y);
        const pinkDrift = drift.pink || { x: 0, y: 0 };
        return (
          <div
            className="hidden md:block absolute bottom-1/3 right-1/3 w-36 h-36 lg:w-52 lg:h-52 bg-gradient-to-br from-pink-500/12 dark:from-pink-400/32 via-fuchsia-500/10 dark:via-fuchsia-400/24 to-rose-400/6 dark:to-rose-400/18 border-2 border-pink-500/30 dark:border-pink-400/50 rounded-[2.5rem] animate-morph backdrop-blur-sm shadow-xl shadow-pink-500/28 dark:shadow-pink-400/48 transition-transform duration-300 ease-out will-change-transform"
            style={{
              clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
              transform: `translate(${pinkRepulsion.x + pinkDrift.x}px, ${pinkRepulsion.y + pinkScroll.y + pinkDrift.y}px) rotate(45deg)`,
              opacity: mounted ? undefined : 0
            }}
          ></div>
        );
      })()}

      {/* Rotating square - perfect square above the morphing circle */}
      {(() => {
        const squarePos = { x: 50, y: 40 };
        const squareRepulsion = getRepulsion(squarePos.x, squarePos.y, 8);
        const squareScroll = getScrollPhysics(squarePos.y);
        const squareDrift = drift.square || { x: 0, y: 0 };
        return (
          <div
            className="absolute top-[40%] left-1/2 w-24 h-24 md:w-36 md:h-36 bg-gradient-to-br from-amber-500/12 dark:from-amber-400/28 via-orange-500/10 dark:via-orange-400/24 to-yellow-400/6 dark:to-yellow-400/16 border-2 border-amber-500/25 dark:border-amber-400/45 backdrop-blur-sm shadow-lg shadow-amber-500/20 dark:shadow-amber-400/40 transition-transform duration-300 ease-out will-change-transform animate-spin-very-slow"
            style={{
              transform: `translate(${squareRepulsion.x + squareDrift.x}px, ${squareRepulsion.y + squareScroll.y + squareDrift.y}px)`,
              borderRadius: '1.5rem',
              opacity: mounted ? undefined : 0
            }}
          ></div>
        );
      })()}

      {/* Orange/Amber morphing shape - starts as square, morphs to circle */}
      {(() => {
        const orangePos = { x: 50, y: 50 };
        // No mouse repulsion for this shape - only drift and scroll
        const orangeScroll = getScrollPhysics(orangePos.y);
        const orangeDrift = drift.orange || { x: 0, y: 0 };
        return (
          <div
            className="absolute top-1/2 left-1/2 w-32 h-32 md:w-48 md:h-48 bg-gradient-to-br from-orange-500/15 dark:from-orange-400/35 via-amber-500/12 dark:via-amber-400/28 to-yellow-400/8 dark:to-yellow-400/20 border-2 border-orange-500/30 dark:border-orange-400/50 animate-pulse-slow backdrop-blur-sm shadow-xl shadow-orange-500/25 dark:shadow-orange-400/45 transition-transform duration-300 ease-out will-change-transform animate-morph-to-circle"
            style={{
              transform: `translate(${orangeDrift.x}px, ${orangeScroll.y + orangeDrift.y}px)`,
              opacity: mounted ? undefined : 0
            }}
          ></div>
        );
      })()}

      {/* Emerald star - hidden on mobile */}
      {(() => {
        const emeraldPos = { x: 25, y: 75 };
        const emeraldRepulsion = getRepulsion(emeraldPos.x, emeraldPos.y, 10);
        const emeraldScroll = getScrollPhysics(emeraldPos.y);
        const emeraldDrift = drift.emerald || { x: 0, y: 0 };
        return (
          <div
            className="hidden lg:block absolute bottom-1/4 left-1/4 w-48 h-48 bg-gradient-to-br from-emerald-500/10 dark:from-emerald-400/30 via-green-500/8 dark:via-green-400/24 to-teal-400/6 dark:to-teal-400/18 border-2 border-emerald-500/28 dark:border-emerald-400/50 animate-spin-slow backdrop-blur-sm shadow-xl shadow-emerald-500/22 dark:shadow-emerald-400/42 transition-transform duration-300 ease-out will-change-transform"
            style={{
              clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
              borderRadius: "15%",
              transform: `translate(${emeraldRepulsion.x + emeraldDrift.x}px, ${emeraldRepulsion.y + emeraldScroll.y + emeraldDrift.y}px)`,
              opacity: mounted ? undefined : 0
            }}
          ></div>
        );
      })()}

      {/* Violet triangle - hidden on mobile */}
      {(() => {
        const violetPos = { x: 80, y: 66 };
        const violetRepulsion = getRepulsion(violetPos.x, violetPos.y, 10);
        const violetScroll = getScrollPhysics(violetPos.y);
        const violetDrift = drift.violet || { x: 0, y: 0 };
        return (
          <div
            className="hidden lg:block absolute top-2/3 right-1/5 w-44 h-44 bg-gradient-to-br from-violet-500/14 dark:from-violet-400/34 via-indigo-500/10 dark:via-indigo-400/26 to-purple-400/6 dark:to-purple-400/18 border-2 border-violet-500/30 dark:border-violet-400/50 rounded-[2rem] animate-morph backdrop-blur-sm shadow-xl shadow-violet-500/25 dark:shadow-violet-400/45 transition-transform duration-300 ease-out will-change-transform"
            style={{
              clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
              transform: `translate(${violetRepulsion.x + violetDrift.x}px, ${violetRepulsion.y + violetScroll.y + violetDrift.y}px) rotate(30deg)`,
              opacity: mounted ? undefined : 0
            }}
          ></div>
        );
      })()}

      {/* Teal diamond - hidden on mobile */}
      {(() => {
        const tealPos = { x: 33, y: 16 };
        const tealRepulsion = getRepulsion(tealPos.x, tealPos.y, 10);
        const tealScroll = getScrollPhysics(tealPos.y);
        const tealDrift = drift.teal || { x: 0, y: 0 };
        return (
          <div
            className="hidden lg:block absolute top-1/6 left-1/3 w-40 h-40 bg-gradient-to-br from-teal-500/14 dark:from-teal-400/34 via-cyan-400/10 dark:via-cyan-400/26 to-blue-400/6 dark:to-blue-400/18 border-2 border-teal-500/30 dark:border-teal-400/50 rounded-[1.8rem] animate-morph-delayed backdrop-blur-sm shadow-xl shadow-teal-500/25 dark:shadow-teal-400/45 transition-transform duration-300 ease-out will-change-transform"
            style={{
              clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
              transform: `translate(${tealRepulsion.x + tealDrift.x}px, ${tealRepulsion.y + tealScroll.y + tealDrift.y}px) rotate(45deg)`,
              opacity: mounted ? undefined : 0
            }}
          ></div>
        );
      })()}

      {/* Rose pentagon - hidden on mobile */}
      {(() => {
        const rosePos = { x: 60, y: 80 };
        const roseRepulsion = getRepulsion(rosePos.x, rosePos.y, 10);
        const roseScroll = getScrollPhysics(rosePos.y);
        const roseDrift = drift.rose || { x: 0, y: 0 };
        return (
          <div
            className="hidden lg:block absolute bottom-1/5 right-2/5 w-36 h-36 bg-gradient-to-br from-rose-500/12 dark:from-rose-400/32 via-pink-400/8 dark:via-pink-400/22 to-fuchsia-400/6 dark:to-fuchsia-400/16 border-2 border-rose-500/30 dark:border-rose-400/50 rounded-[1.5rem] animate-morph backdrop-blur-sm shadow-xl shadow-rose-500/24 dark:shadow-rose-400/44 transition-transform duration-300 ease-out will-change-transform"
            style={{
              clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
              transform: `translate(${roseRepulsion.x + roseDrift.x}px, ${roseRepulsion.y + roseScroll.y + roseDrift.y}px) rotate(72deg)`,
              opacity: mounted ? undefined : 0
            }}
          ></div>
        );
      })()}

      {/* Animated lines with rainbow gradients */}
      <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-400/30 dark:via-purple-400/60 to-transparent animate-shimmer"></div>
      <div className="absolute top-2/3 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400/25 dark:via-cyan-400/55 to-transparent animate-shimmer-delayed"></div>
      <div className="absolute top-1/3 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-pink-400/25 dark:via-pink-400/55 to-transparent animate-shimmer"></div>

      {/* Rainbow floating particles with jello physics and color transitions */}
      {(() => {
        const particleData = [
          { top: 25, left: 33.33, size: 12, lightColor: 'rgba(139, 92, 246, 0.7)', darkColor: 'rgba(168, 85, 247, 0.9)', shadowLight: 'rgba(139, 92, 246, 0.6)', shadowDark: 'rgba(168, 85, 247, 0.8)' },
          { top: 66.67, right: 25, size: 16, lightColor: 'rgba(6, 182, 212, 0.7)', darkColor: 'rgba(34, 211, 238, 0.9)', shadowLight: 'rgba(6, 182, 212, 0.6)', shadowDark: 'rgba(34, 211, 238, 0.8)' },
          { top: 50, left: 66.67, size: 12, lightColor: 'rgba(236, 72, 153, 0.7)', darkColor: 'rgba(244, 114, 182, 0.9)', shadowLight: 'rgba(236, 72, 153, 0.6)', shadowDark: 'rgba(244, 114, 182, 0.8)' },
          { bottom: 25, left: 50, size: 16, lightColor: 'rgba(249, 115, 22, 0.7)', darkColor: 'rgba(251, 146, 60, 0.9)', shadowLight: 'rgba(249, 115, 22, 0.6)', shadowDark: 'rgba(251, 146, 60, 0.8)' },
          { top: 20, right: 40, size: 12, lightColor: 'rgba(16, 185, 129, 0.7)', darkColor: 'rgba(52, 211, 153, 0.9)', shadowLight: 'rgba(16, 185, 129, 0.6)', shadowDark: 'rgba(52, 211, 153, 0.8)' },
          { bottom: 33.33, left: 20, size: 12, lightColor: 'rgba(124, 58, 237, 0.7)', darkColor: 'rgba(167, 139, 250, 0.9)', shadowLight: 'rgba(124, 58, 237, 0.6)', shadowDark: 'rgba(167, 139, 250, 0.8)' },
          { top: 75, right: 33.33, size: 16, lightColor: 'rgba(245, 158, 11, 0.7)', darkColor: 'rgba(251, 191, 36, 0.9)', shadowLight: 'rgba(245, 158, 11, 0.6)', shadowDark: 'rgba(251, 191, 36, 0.8)' },
        ];

        // Color palette for transitions
        const rainbowColors = [
          'rgba(139, 92, 246, 0.7)',   // Purple
          'rgba(236, 72, 153, 0.7)',   // Pink
          'rgba(6, 182, 212, 0.7)',    // Cyan
          'rgba(16, 185, 129, 0.7)',   // Green
          'rgba(245, 158, 11, 0.7)',   // Amber
          'rgba(249, 115, 22, 0.7)',   // Orange
        ];

        return particleData.map((particle, i) => {
          const particleState = particles[i];
          if (!particleState) return null;

          // Calculate transitioning color
          const colorIndex1 = Math.floor(particleState.colorTransition * rainbowColors.length);
          const colorIndex2 = (colorIndex1 + 1) % rainbowColors.length;
          const colorMix = (particleState.colorTransition * rainbowColors.length) % 1;

          const positionStyle: React.CSSProperties = {
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          };

          // Apply physics-based position with playful transform
          if (particle.top !== undefined) positionStyle.top = `${particle.top}%`;
          if (particle.bottom !== undefined) positionStyle.bottom = `${particle.bottom}%`;
          if (particle.left !== undefined) positionStyle.left = `${particle.left}%`;
          if (particle.right !== undefined) positionStyle.right = `${particle.right}%`;

          return (
            <div
              key={i}
              className="absolute rounded-full will-change-transform"
              style={{
                ...positionStyle,
                background: `var(--particle-bg-${i})`,
                boxShadow: `0 ${4 * particleState.scale * particleState.squishY}px ${6 * particleState.scale}px -1px var(--particle-shadow-${i}),
                            0 ${2 * particleState.scale * particleState.squishY}px ${4 * particleState.scale}px -1px var(--particle-shadow-${i})`,
                transform: `translate(${particleState.x}px, ${particleState.y}px)
                           scale(${particleState.scale * particleState.squishX}, ${particleState.scale * particleState.squishY})`,
                transition: 'none',
                opacity: mounted ? undefined : 0,
              }}
            />
          );
        });
      })()}

      <style jsx>{`
        :global(body:not(.dark)) {
          ${[0, 1, 2, 3, 4, 5, 6].map(i => {
            const particles = [
              { lightColor: 'rgba(139, 92, 246, 0.7)', shadowLight: 'rgba(139, 92, 246, 0.6)' },
              { lightColor: 'rgba(6, 182, 212, 0.7)', shadowLight: 'rgba(6, 182, 212, 0.6)' },
              { lightColor: 'rgba(236, 72, 153, 0.7)', shadowLight: 'rgba(236, 72, 153, 0.6)' },
              { lightColor: 'rgba(249, 115, 22, 0.7)', shadowLight: 'rgba(249, 115, 22, 0.6)' },
              { lightColor: 'rgba(16, 185, 129, 0.7)', shadowLight: 'rgba(16, 185, 129, 0.6)' },
              { lightColor: 'rgba(124, 58, 237, 0.7)', shadowLight: 'rgba(124, 58, 237, 0.6)' },
              { lightColor: 'rgba(245, 158, 11, 0.7)', shadowLight: 'rgba(245, 158, 11, 0.6)' },
            ];
            return `
              --particle-bg-${i}: ${particles[i].lightColor};
              --particle-shadow-${i}: ${particles[i].shadowLight};
            `;
          }).join('')}
        }
        :global(body.dark) {
          ${[0, 1, 2, 3, 4, 5, 6].map(i => {
            const particles = [
              { darkColor: 'rgba(168, 85, 247, 0.9)', shadowDark: 'rgba(168, 85, 247, 0.8)' },
              { darkColor: 'rgba(34, 211, 238, 0.9)', shadowDark: 'rgba(34, 211, 238, 0.8)' },
              { darkColor: 'rgba(244, 114, 182, 0.9)', shadowDark: 'rgba(244, 114, 182, 0.8)' },
              { darkColor: 'rgba(251, 146, 60, 0.9)', shadowDark: 'rgba(251, 146, 60, 0.8)' },
              { darkColor: 'rgba(52, 211, 153, 0.9)', shadowDark: 'rgba(52, 211, 153, 0.8)' },
              { darkColor: 'rgba(167, 139, 250, 0.9)', shadowDark: 'rgba(167, 139, 250, 0.8)' },
              { darkColor: 'rgba(251, 191, 36, 0.9)', shadowDark: 'rgba(251, 191, 36, 0.8)' },
            ];
            return `
              --particle-bg-${i}: ${particles[i].darkColor};
              --particle-shadow-${i}: ${particles[i].shadowDark};
            `;
          }).join('')}
        }
      `}</style>
    </div>
  );
}
