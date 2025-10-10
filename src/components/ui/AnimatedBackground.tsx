"use client";

import { useEffect, useState, useRef } from "react";

// ============================================================================
// CONFIGURATION CONSTANTS - Easily adjustable parameters
// ============================================================================

const PHYSICS_CONFIG = {
  // Microgravity drift
  driftSpeed: 0.00015,           // Speed of Perlin noise drift
  driftScale: 30,                // Scale of drift movement (px)
  driftDamping: 0.98,            // How quickly drift settles (0.9-0.99)

  // Moon-trampoline scroll physics
  scrollSinkStrength: 50,        // How much dots sink when scrolled
  scrollSpringK: 0.08,           // Spring constant (higher = snappier)
  scrollDamping: 0.88,           // Spring damping (lower = bouncier)

  // Particle properties
  particleCount: 7,
  minSize: 10,
  maxSize: 18,
  pulseAmount: 0.04,             // ±4% size variation
  pulseSpeed: 0.0008,
};

// Visual styling configuration for light/dark modes
const VISUAL_CONFIG = {
  light: {
    particleCount: 5,              // Fewer particles in light mode for subtlety
    particles: {
      // Pastel lavender with thin border
      borderColor: 'rgba(167, 139, 250, 0.35)',     // Soft purple border
      borderWidth: '1.5px',
      innerGradient: 'radial-gradient(circle, rgba(237, 233, 254, 0.6), rgba(221, 214, 254, 0.4))',  // Very light pastel
      outerGradient: 'radial-gradient(circle, rgba(196, 181, 253, 0.3), rgba(167, 139, 250, 0.2))',
      shadow: '0 2px 8px rgba(167, 139, 250, 0.15)',
      glowShadow: 'none',
    }
  },
  dark: {
    particleCount: 7,              // More particles in dark mode for richness
    // Neon color palette: teal, magenta, violet, cyan
    neonColors: [
      {
        name: 'neon-magenta',
        borderColor: 'rgba(236, 72, 153, 0.9)',      // Bright magenta border
        innerGradient: 'radial-gradient(circle, rgba(219, 39, 119, 0.85), rgba(190, 24, 93, 0.7))',
        glowShadow: '0 0 20px rgba(236, 72, 153, 0.7), 0 0 35px rgba(219, 39, 119, 0.4)',
      },
      {
        name: 'neon-cyan',
        borderColor: 'rgba(34, 211, 238, 0.9)',      // Bright cyan border
        innerGradient: 'radial-gradient(circle, rgba(6, 182, 212, 0.85), rgba(8, 145, 178, 0.7))',
        glowShadow: '0 0 20px rgba(34, 211, 238, 0.7), 0 0 35px rgba(6, 182, 212, 0.4)',
      },
      {
        name: 'neon-violet',
        borderColor: 'rgba(167, 139, 250, 0.9)',     // Bright violet border
        innerGradient: 'radial-gradient(circle, rgba(139, 92, 246, 0.85), rgba(124, 58, 237, 0.7))',
        glowShadow: '0 0 20px rgba(167, 139, 250, 0.7), 0 0 35px rgba(139, 92, 246, 0.4)',
      },
      {
        name: 'neon-teal',
        borderColor: 'rgba(45, 212, 191, 0.9)',      // Bright teal border
        innerGradient: 'radial-gradient(circle, rgba(20, 184, 166, 0.85), rgba(13, 148, 136, 0.7))',
        glowShadow: '0 0 20px rgba(45, 212, 191, 0.7), 0 0 35px rgba(20, 184, 166, 0.4)',
      },
      {
        name: 'neon-purple',
        borderColor: 'rgba(192, 132, 252, 0.9)',     // Bright purple border
        innerGradient: 'radial-gradient(circle, rgba(168, 85, 247, 0.85), rgba(147, 51, 234, 0.7))',
        glowShadow: '0 0 20px rgba(192, 132, 252, 0.7), 0 0 35px rgba(168, 85, 247, 0.4)',
      },
      {
        name: 'neon-fuchsia',
        borderColor: 'rgba(240, 171, 252, 0.9)',     // Bright fuchsia border
        innerGradient: 'radial-gradient(circle, rgba(217, 70, 239, 0.85), rgba(192, 38, 211, 0.7))',
        glowShadow: '0 0 20px rgba(240, 171, 252, 0.7), 0 0 35px rgba(217, 70, 239, 0.4)',
      },
      {
        name: 'neon-blue',
        borderColor: 'rgba(96, 165, 250, 0.9)',      // Bright blue border
        innerGradient: 'radial-gradient(circle, rgba(59, 130, 246, 0.85), rgba(37, 99, 235, 0.7))',
        glowShadow: '0 0 20px rgba(96, 165, 250, 0.7), 0 0 35px rgba(59, 130, 246, 0.4)',
      },
    ],
    particles: {
      borderWidth: '2px',
      shadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
    }
  }
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

// Sanitize numeric values
const sanitizeNumber = (value: number, fallback: number = 0): number => {
  if (typeof value !== 'number' || !isFinite(value) || isNaN(value)) {
    return fallback;
  }
  return value;
};

// Simple 1D Perlin-like noise function
const noise1D = (x: number): number => {
  // Simplified noise using sine waves for smooth organic motion
  return Math.sin(x) * 0.5 + Math.sin(x * 2.5) * 0.3 + Math.sin(x * 5.2) * 0.2;
};

// Smooth easing function for spring physics
const easeOutElastic = (x: number): number => {
  const c4 = (2 * Math.PI) / 3;
  return x === 0
    ? 0
    : x === 1
    ? 1
    : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
};

// ============================================================================
// INTERFACES
// ============================================================================

interface ParticleState {
  // Position (relative to base position)
  x: number;
  y: number;

  // Velocity for spring physics
  vx: number;
  vy: number;

  // Base position on screen
  baseX: number;
  baseY: number;

  // Drift offsets (from Perlin noise)
  driftX: number;
  driftY: number;
  noiseOffsetX: number;  // Time offset for Perlin noise
  noiseOffsetY: number;

  // Visual properties
  size: number;
  pulsePhase: number;
  pulseSpeed: number;
  scale: number;
  colorIndex: number;    // Index into neon colors array (dark mode)
  zIndex: number;        // Z-index for parallax layering
  blendMode: string;     // CSS blend mode for visual effects

  // Scroll spring physics
  scrollDisplacement: number;  // How far pushed by scroll
  scrollVelocity: number;      // Velocity from scroll spring
}

interface DriftState {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface PhysicsProperties {
  damping: number;
  maxVelocity: number;
  forceMultiplier: number;
  bounce: number;
  maxDrift: number;
  substance: string;
}

// ============================================================================
// SHAPE PHYSICS CONSTANTS
// ============================================================================

const SHAPE_PHYSICS: Record<string, PhysicsProperties> = {
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
  rose: { damping: 0.95, maxVelocity: 0.07, forceMultiplier: 0.9, bounce: 0.55, maxDrift: 21, substance: 'soft-gel' },
  accentOrange: { damping: 0.98, maxVelocity: 0.06, forceMultiplier: 0.7, bounce: 0.3, maxDrift: 18, substance: 'mist' },
  accentEmerald: { damping: 0.97, maxVelocity: 0.07, forceMultiplier: 0.8, bounce: 0.4, maxDrift: 20, substance: 'mist' },
  accentViolet: { damping: 0.96, maxVelocity: 0.06, forceMultiplier: 0.7, bounce: 0.35, maxDrift: 19, substance: 'mist' }
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function AnimatedBackground() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [textBounds, setTextBounds] = useState<DOMRect | null>(null);
  const [mounted, setMounted] = useState(false);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [drift, setDrift] = useState<Record<string, DriftState>>({});
  const [particles, setParticles] = useState<ParticleState[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const lastScrollRef = useRef(0);
  const lastScrollTimeRef = useRef(Date.now());
  const driftAnimationRef = useRef<number | null>(null);
  const particleAnimationRef = useRef<number | null>(null);

  // Initialize drift states for all shapes
  useEffect(() => {
    const shapes = ['orb1', 'orb2', 'orb3', 'hex', 'cyan', 'pink', 'square', 'orange', 'emerald', 'violet', 'teal', 'rose', 'accentOrange', 'accentEmerald', 'accentViolet'];
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

  // Initialize particles with microgravity physics
  useEffect(() => {
    const allParticleData = [
      { baseX: 33.33, baseY: 25 },
      { baseX: 75, baseY: 66.67 },
      { baseX: 66.67, baseY: 50 },
      { baseX: 50, baseY: 75 },
      { baseX: 60, baseY: 20 },
      { baseX: 20, baseY: 66.67 },
      { baseX: 66.67, baseY: 75 },
    ];

    // Use fewer particles in light mode for subtlety
    const particleCount = isDarkMode ? VISUAL_CONFIG.dark.particleCount : VISUAL_CONFIG.light.particleCount;
    const particleData = allParticleData.slice(0, particleCount);

    const initialParticles: ParticleState[] = particleData.map((p, index) => {
      // Assign z-index for parallax layering (1-3, higher = closer to viewer)
      const zIndex = (index % 3) + 1;

      // Assign blend mode based on z-index for depth effect
      const blendModes = ['screen', 'normal', 'overlay'];
      const blendMode = isDarkMode ? blendModes[zIndex - 1] : 'normal';

      return {
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        baseX: p.baseX,
        baseY: p.baseY,
        driftX: 0,
        driftY: 0,
        noiseOffsetX: Math.random() * 1000,  // Random starting point in noise space
        noiseOffsetY: Math.random() * 1000,
        size: PHYSICS_CONFIG.minSize + Math.random() * (PHYSICS_CONFIG.maxSize - PHYSICS_CONFIG.minSize),
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: PHYSICS_CONFIG.pulseSpeed + Math.random() * PHYSICS_CONFIG.pulseSpeed,
        scale: 1,
        colorIndex: index % VISUAL_CONFIG.dark.neonColors.length,  // Cycle through neon colors
        zIndex,
        blendMode,
        scrollDisplacement: 0,
        scrollVelocity: 0,
      };
    });

    setParticles(initialParticles);
  }, [isDarkMode]);

  // Shape drift animation with substance physics
  useEffect(() => {
    if (!mounted) return;

    const animate = () => {
      setDrift(prevDrift => {
        const newDrift: Record<string, DriftState> = {};

        Object.keys(prevDrift).forEach(key => {
          const d = prevDrift[key];
          const physics = SHAPE_PHYSICS[key];
          if (!physics) return;

          // Add random drift force
          const baseForce = 0.002;
          const forceX = (Math.random() - 0.5) * baseForce * physics.forceMultiplier;
          const forceY = (Math.random() - 0.5) * baseForce * physics.forceMultiplier;

          // Update velocity with forces
          let vx = d.vx + forceX;
          let vy = d.vy + forceY;

          // Apply damping
          vx *= physics.damping;
          vy *= physics.damping;

          // Limit velocity
          vx = Math.max(-physics.maxVelocity, Math.min(physics.maxVelocity, vx));
          vy = Math.max(-physics.maxVelocity, Math.min(physics.maxVelocity, vy));

          // Update position
          let x = d.x + vx;
          let y = d.y + vy;

          // Boundary bounce
          if (Math.abs(x) > physics.maxDrift) {
            x = Math.sign(x) * physics.maxDrift;
            vx *= -physics.bounce;
          }
          if (Math.abs(y) > physics.maxDrift) {
            y = Math.sign(y) * physics.maxDrift;
            vy *= -physics.bounce;
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
  }, [mounted]);

  // Particle physics: Microgravity drift + Moon-trampoline scroll
  useEffect(() => {
    if (!mounted || particles.length === 0) return;

    const animate = () => {
      const time = Date.now() * 0.001;

      setParticles(prevParticles => {
        return prevParticles.map((p) => {
          // ========== MICROGRAVITY DRIFT (Perlin noise-based) ==========
          // Advance through noise space slowly
          const noiseOffsetX = p.noiseOffsetX + PHYSICS_CONFIG.driftSpeed;
          const noiseOffsetY = p.noiseOffsetY + PHYSICS_CONFIG.driftSpeed;

          // Sample Perlin-like noise for organic drift
          const targetDriftX = noise1D(noiseOffsetX) * PHYSICS_CONFIG.driftScale;
          const targetDriftY = noise1D(noiseOffsetY) * PHYSICS_CONFIG.driftScale;

          // Smooth interpolation to target drift position
          let driftX = p.driftX + (targetDriftX - p.driftX) * (1 - PHYSICS_CONFIG.driftDamping);
          let driftY = p.driftY + (targetDriftY - p.driftY) * (1 - PHYSICS_CONFIG.driftDamping);

          // ========== MOON-TRAMPOLINE SCROLL PHYSICS ==========
          // Target position when not scrolling: 0 (resting position)
          // When scrolling: pushed down/up by scroll velocity
          const scrollMag = Math.abs(scrollVelocity);
          const scrollDir = Math.sign(scrollVelocity);

          // Scroll pushes dots (sink effect)
          const scrollTarget = scrollDir * scrollMag * PHYSICS_CONFIG.scrollSinkStrength;

          // Spring force pulling back to rest position
          const springForce = -p.scrollDisplacement * PHYSICS_CONFIG.scrollSpringK;

          // Update scroll velocity with spring force
          let scrollVel = p.scrollVelocity + springForce;
          scrollVel *= PHYSICS_CONFIG.scrollDamping;  // Damping for smooth return

          // Update scroll displacement
          let scrollDisplacement = p.scrollDisplacement + scrollVel;

          // Apply scroll push (only when actively scrolling)
          if (scrollMag > 0.01) {
            scrollDisplacement += (scrollTarget - scrollDisplacement) * 0.15;
          }

          // ========== COMBINE ALL FORCES ==========
          const x = driftX;
          const y = driftY + scrollDisplacement;

          // ========== VISUAL PROPERTIES ==========
          // Gentle pulse
          const pulsePhase = p.pulsePhase + p.pulseSpeed;
          const pulseFactor = Math.sin(pulsePhase) * PHYSICS_CONFIG.pulseAmount + 1;
          const scale = pulseFactor;

          return {
            x,
            y,
            vx: p.vx,
            vy: p.vy,
            baseX: p.baseX,
            baseY: p.baseY,
            driftX,
            driftY,
            noiseOffsetX,
            noiseOffsetY,
            size: p.size,
            pulsePhase,
            pulseSpeed: p.pulseSpeed,
            scale: Math.max(0.9, Math.min(1.15, scale)),
            scrollDisplacement,
            scrollVelocity: scrollVel,
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
  }, [mounted, scrollVelocity, particles.length]);

  useEffect(() => {
    setMounted(true);

    // Detect dark mode
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    checkDarkMode();

    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    const handleMouseMove = (e: MouseEvent) => {
      try {
        if (!e || typeof window === 'undefined') return;
        const width = window.innerWidth || 1;
        const height = window.innerHeight || 1;
        const x = sanitizeNumber(((e.clientX || 0) / width) * 100, 50);
        const y = sanitizeNumber(((e.clientY || 0) / height) * 100, 50);
        setMousePos({ x, y });
      } catch (error) {
        console.debug('MouseMove error:', error);
      }
    };

    const updateTextBounds = () => {
      try {
        if (typeof document === 'undefined') return;
        const titleElement = document.querySelector('h1') || document.querySelector('[id="hero-heading"]');
        if (titleElement && titleElement.getBoundingClientRect) {
          setTextBounds(titleElement.getBoundingClientRect());
        }
      } catch (error) {
        console.debug('UpdateTextBounds error:', error);
      }
    };

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

          setTimeout(() => {
            setScrollVelocity(v => v * 0.9);
          }, 100);
        }

        lastScrollRef.current = currentScroll;
        lastScrollTimeRef.current = now;
        updateTextBounds();
      } catch (error) {
        console.debug('HandleScroll error:', error);
      }
    };

    setTimeout(updateTextBounds, 100);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', updateTextBounds);
    window.addEventListener('scroll', handleScroll, { passive: true });

    const interval = setInterval(updateTextBounds, 500);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', updateTextBounds);
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  // Calculate repulsion for shapes
  const getRepulsion = (shapeX: number, shapeY: number, strength: number = 20) => {
    try {
      const dx = sanitizeNumber(mousePos.x - shapeX, 0);
      const dy = sanitizeNumber(mousePos.y - shapeY, 0);
      const distance = sanitizeNumber(Math.sqrt(dx * dx + dy * dy), 0);
      const maxDistance = 30;

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

  // Calculate text interaction
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

      const orbitalRadius = 15;
      const attraction = sanitizeNumber((distance - orbitalRadius) * 0.3, 0);

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

  // Calculate parallax scroll
  const getParallaxScroll = (shapeY: number, depthLayer: number = 0.5) => {
    try {
      const baseScrollForce = sanitizeNumber(scrollVelocity * 10, 0);
      const depthMultiplier = 0.2 + (depthLayer * 0.8);
      const centerDistance = Math.abs(shapeY - 50) / 50;
      const positionFactor = sanitizeNumber(1 - centerDistance * 0.3, 0.7);

      return {
        x: sanitizeNumber(baseScrollForce * depthMultiplier * 0.2, 0),
        y: sanitizeNumber(baseScrollForce * depthMultiplier * positionFactor, 0),
      };
    } catch (error) {
      console.debug('Parallax scroll error:', error);
      return { x: 0, y: 0 };
    }
  };

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none animated-background-blur transition-opacity duration-300 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      {/* Tech grid pattern */}
      <div className="absolute inset-0 opacity-[0.01] dark:opacity-[0.04]" style={{
        backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }}></div>

      {/* Circuit lines */}
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

      {/* Large gradient orbs */}
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

        const orb1Scroll = getParallaxScroll(orb1Pos.y, 0.8);
        const orb2Scroll = getParallaxScroll(orb2Pos.y, 0.6);
        const orb3Scroll = getParallaxScroll(orb3Pos.y, 0.4);

        const orb1Drift = drift.orb1 || { x: 0, y: 0 };
        const orb2Drift = drift.orb2 || { x: 0, y: 0 };
        const orb3Drift = drift.orb3 || { x: 0, y: 0 };

        return (
          <>
            <div
              className="animated-orb absolute -top-40 -left-40 w-[400px] h-[400px] md:w-[700px] md:h-[700px] bg-gradient-to-br from-purple-400/10 dark:from-purple-500/20 via-purple-300/6 dark:via-purple-400/15 to-transparent rounded-full blur-3xl animate-float transition-all duration-300 ease-out will-change-transform"
              style={{
                transform: `translate(${orb1Repulsion.x + orb1Text.x + orb1Scroll.x + orb1Drift.x}px, ${orb1Repulsion.y + orb1Text.y + orb1Scroll.y + orb1Drift.y}px)`,
                opacity: mounted ? undefined : 0
              }}
            ></div>
            <div
              className="animated-orb absolute top-20 -right-40 w-[350px] h-[350px] md:w-[600px] md:h-[600px] bg-gradient-to-br from-cyan-400/10 dark:from-cyan-500/20 via-blue-400/6 dark:via-blue-500/15 to-transparent rounded-full blur-3xl animate-float-delayed transition-all duration-300 ease-out will-change-transform"
              style={{
                transform: `translate(${orb2Repulsion.x + orb2Text.x + orb2Scroll.x + orb2Drift.x}px, ${orb2Repulsion.y + orb2Text.y + orb2Scroll.y + orb2Drift.y}px)`,
                opacity: mounted ? undefined : 0
              }}
            ></div>
            <div
              className="animated-orb absolute -bottom-40 left-1/3 w-[320px] h-[320px] md:w-[550px] md:h-[550px] bg-gradient-to-br from-pink-400/8 dark:from-pink-500/18 via-fuchsia-300/5 dark:via-fuchsia-400/12 to-transparent rounded-full blur-3xl animate-float-slow transition-all duration-300 ease-out will-change-transform"
              style={{
                transform: `translate(${orb3Repulsion.x + orb3Text.x + orb3Scroll.x + orb3Drift.x}px, ${orb3Repulsion.y + orb3Text.y + orb3Scroll.y + orb3Drift.y}px)`,
                opacity: mounted ? undefined : 0
              }}
            ></div>
          </>
        );
      })()}

      {/* Vibrant accent orbs */}
      {(() => {
        const accentOrangeDrift = drift.accentOrange || { x: 0, y: 0 };
        const accentEmeraldDrift = drift.accentEmerald || { x: 0, y: 0 };
        const accentVioletDrift = drift.accentViolet || { x: 0, y: 0 };
        const accentOrangeScroll = getParallaxScroll(33, 0.45);
        const accentEmeraldScroll = getParallaxScroll(75, 0.38);
        const accentVioletScroll = getParallaxScroll(20, 0.55);

        return (
          <>
            <div
              className="absolute top-1/3 right-1/3 w-48 h-48 md:w-80 md:h-80 bg-gradient-to-br from-orange-300/10 dark:from-orange-400/25 to-transparent rounded-full blur-2xl animate-pulse-slow transition-transform duration-300 ease-out will-change-transform"
              style={{
                transform: `translate(${accentOrangeScroll.x + accentOrangeDrift.x}px, ${accentOrangeScroll.y + accentOrangeDrift.y}px)`,
                opacity: mounted ? undefined : 0
              }}
            ></div>
            <div
              className="absolute bottom-1/4 left-1/4 w-40 h-40 md:w-72 md:h-72 bg-gradient-to-br from-emerald-300/10 dark:from-emerald-400/25 to-transparent rounded-full blur-2xl animate-float-delayed transition-transform duration-300 ease-out will-change-transform"
              style={{
                transform: `translate(${accentEmeraldScroll.x + accentEmeraldDrift.x}px, ${accentEmeraldScroll.y + accentEmeraldDrift.y}px)`,
                opacity: mounted ? undefined : 0
              }}
            ></div>
            <div
              className="absolute top-1/5 left-1/2 w-36 h-36 md:w-64 md:h-64 bg-gradient-to-br from-violet-300/8 dark:from-violet-400/22 to-transparent rounded-full blur-2xl animate-float transition-transform duration-300 ease-out will-change-transform"
              style={{
                transform: `translate(${accentVioletScroll.x + accentVioletDrift.x}px, ${accentVioletScroll.y + accentVioletDrift.y}px)`,
                opacity: mounted ? undefined : 0
              }}
            ></div>
          </>
        );
      })()}

      {/* Purple morphing hexagon */}
      {(() => {
        const hexPos = { x: 75, y: 25 };
        const hexRepulsion = getRepulsion(hexPos.x, hexPos.y, 10);
        const hexScroll = getParallaxScroll(hexPos.y, 0.7);
        const hexDrift = drift.hex || { x: 0, y: 0 };
        return (
          <div
            className="hidden md:block absolute top-1/4 right-1/4 w-40 h-40 lg:w-56 lg:h-56 bg-gradient-to-br from-purple-500/12 dark:from-purple-500/30 via-purple-400/8 dark:via-purple-400/22 to-transparent border-2 border-purple-400/30 dark:border-purple-400/50 rounded-[3rem] animate-morph backdrop-blur-sm shadow-xl shadow-purple-500/25 dark:shadow-purple-400/45 transition-transform duration-300 ease-out will-change-transform"
            style={{
              transform: `translate(${hexRepulsion.x + hexScroll.x + hexDrift.x}px, ${hexRepulsion.y + hexScroll.y + hexDrift.y}px) rotate(12deg)`,
              opacity: mounted ? undefined : 0
            }}
          ></div>
        );
      })()}

      {/* Cyan/Blue floating shape */}
      {(() => {
        const cyanPos = { x: 20, y: 33 };
        const cyanRepulsion = getRepulsion(cyanPos.x, cyanPos.y, 10);
        const cyanScroll = getParallaxScroll(cyanPos.y, 0.5);
        const cyanDrift = drift.cyan || { x: 0, y: 0 };
        return (
          <div
            className="hidden md:block absolute top-1/3 left-1/5 w-44 h-44 lg:w-64 lg:h-64 bg-gradient-to-br from-cyan-500/10 dark:from-cyan-400/28 via-blue-500/12 dark:via-blue-400/32 to-sky-400/6 dark:to-sky-400/18 border-2 border-cyan-400/30 dark:border-cyan-400/50 rounded-[3.5rem] animate-morph-delayed backdrop-blur-sm shadow-xl shadow-cyan-500/25 dark:shadow-cyan-400/48 transition-transform duration-300 ease-out will-change-transform"
            style={{
              transform: `translate(${cyanRepulsion.x + cyanScroll.x + cyanDrift.x}px, ${cyanRepulsion.y + cyanScroll.y + cyanDrift.y}px) rotate(-6deg)`,
              opacity: mounted ? undefined : 0
            }}
          ></div>
        );
      })()}

      {/* Pink/Magenta octagon */}
      {(() => {
        const pinkPos = { x: 66, y: 66 };
        const pinkRepulsion = getRepulsion(pinkPos.x, pinkPos.y, 10);
        const pinkScroll = getParallaxScroll(pinkPos.y, 0.3);
        const pinkDrift = drift.pink || { x: 0, y: 0 };
        return (
          <div
            className="hidden md:block absolute bottom-1/3 right-1/3 w-36 h-36 lg:w-52 lg:h-52 bg-gradient-to-br from-pink-500/12 dark:from-pink-400/32 via-fuchsia-500/10 dark:via-fuchsia-400/24 to-rose-400/6 dark:to-rose-400/18 border-2 border-pink-500/30 dark:border-pink-400/50 rounded-[2.5rem] animate-morph backdrop-blur-sm shadow-xl shadow-pink-500/28 dark:shadow-pink-400/48 transition-transform duration-300 ease-out will-change-transform"
            style={{
              clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
              transform: `translate(${pinkRepulsion.x + pinkScroll.x + pinkDrift.x}px, ${pinkRepulsion.y + pinkScroll.y + pinkDrift.y}px) rotate(45deg)`,
              opacity: mounted ? undefined : 0
            }}
          ></div>
        );
      })()}

      {/* Rotating square */}
      {(() => {
        const squarePos = { x: 50, y: 40 };
        const squareRepulsion = getRepulsion(squarePos.x, squarePos.y, 8);
        const squareScroll = getParallaxScroll(squarePos.y, 0.9);
        const squareDrift = drift.square || { x: 0, y: 0 };
        return (
          <div
            className="absolute top-[40%] left-1/2 w-24 h-24 md:w-36 md:h-36 bg-gradient-to-br from-amber-500/12 dark:from-amber-400/28 via-orange-500/10 dark:via-orange-400/24 to-yellow-400/6 dark:to-yellow-400/16 border-2 border-amber-500/25 dark:border-amber-400/45 backdrop-blur-sm shadow-lg shadow-amber-500/20 dark:shadow-amber-400/40 transition-transform duration-300 ease-out will-change-transform animate-spin-very-slow"
            style={{
              transform: `translate(${squareRepulsion.x + squareScroll.x + squareDrift.x}px, ${squareRepulsion.y + squareScroll.y + squareDrift.y}px)`,
              borderRadius: '1.5rem',
              opacity: mounted ? undefined : 0
            }}
          ></div>
        );
      })()}

      {/* Orange/Amber morphing shape */}
      {(() => {
        const orangePos = { x: 50, y: 50 };
        const orangeRepulsion = getRepulsion(orangePos.x, orangePos.y, 8);
        const orangeScroll = getParallaxScroll(orangePos.y, 0.5);
        const orangeDrift = drift.orange || { x: 0, y: 0 };
        return (
          <div
            className="absolute top-1/2 left-1/2 w-32 h-32 md:w-48 md:h-48 bg-gradient-to-br from-orange-500/15 dark:from-orange-400/35 via-amber-500/12 dark:via-amber-400/28 to-yellow-400/8 dark:to-yellow-400/20 border-2 border-orange-500/30 dark:border-orange-400/50 animate-pulse-slow backdrop-blur-sm shadow-xl shadow-orange-500/25 dark:shadow-orange-400/45 transition-transform duration-300 ease-out will-change-transform animate-morph-to-circle"
            style={{
              transform: `translate(${orangeRepulsion.x + orangeScroll.x + orangeDrift.x}px, ${orangeRepulsion.y + orangeScroll.y + orangeDrift.y}px)`,
              opacity: mounted ? undefined : 0
            }}
          ></div>
        );
      })()}

      {/* Emerald star */}
      {(() => {
        const emeraldPos = { x: 25, y: 75 };
        const emeraldRepulsion = getRepulsion(emeraldPos.x, emeraldPos.y, 10);
        const emeraldScroll = getParallaxScroll(emeraldPos.y, 0.4);
        const emeraldDrift = drift.emerald || { x: 0, y: 0 };
        return (
          <div
            className="hidden lg:block absolute bottom-1/4 left-1/4 w-48 h-48 bg-gradient-to-br from-emerald-500/10 dark:from-emerald-400/30 via-green-500/8 dark:via-green-400/24 to-teal-400/6 dark:to-teal-400/18 border-2 border-emerald-500/28 dark:border-emerald-400/50 animate-spin-slow backdrop-blur-sm shadow-xl shadow-emerald-500/22 dark:shadow-emerald-400/42 transition-transform duration-300 ease-out will-change-transform"
            style={{
              clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
              borderRadius: "15%",
              transform: `translate(${emeraldRepulsion.x + emeraldScroll.x + emeraldDrift.x}px, ${emeraldRepulsion.y + emeraldScroll.y + emeraldDrift.y}px)`,
              opacity: mounted ? undefined : 0
            }}
          ></div>
        );
      })()}

      {/* Violet triangle */}
      {(() => {
        const violetPos = { x: 80, y: 66 };
        const violetRepulsion = getRepulsion(violetPos.x, violetPos.y, 10);
        const violetScroll = getParallaxScroll(violetPos.y, 0.6);
        const violetDrift = drift.violet || { x: 0, y: 0 };
        return (
          <div
            className="hidden lg:block absolute top-2/3 right-1/5 w-44 h-44 bg-gradient-to-br from-violet-500/14 dark:from-violet-400/34 via-indigo-500/10 dark:via-indigo-400/26 to-purple-400/6 dark:to-purple-400/18 border-2 border-violet-500/30 dark:border-violet-400/50 rounded-[2rem] animate-morph backdrop-blur-sm shadow-xl shadow-violet-500/25 dark:shadow-violet-400/45 transition-transform duration-300 ease-out will-change-transform"
            style={{
              clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
              transform: `translate(${violetRepulsion.x + violetScroll.x + violetDrift.x}px, ${violetRepulsion.y + violetScroll.y + violetDrift.y}px) rotate(30deg)`,
              opacity: mounted ? undefined : 0
            }}
          ></div>
        );
      })()}

      {/* Teal diamond */}
      {(() => {
        const tealPos = { x: 33, y: 16 };
        const tealRepulsion = getRepulsion(tealPos.x, tealPos.y, 10);
        const tealScroll = getParallaxScroll(tealPos.y, 0.2);
        const tealDrift = drift.teal || { x: 0, y: 0 };
        return (
          <div
            className="hidden lg:block absolute top-1/6 left-1/3 w-40 h-40 bg-gradient-to-br from-teal-500/14 dark:from-teal-400/34 via-cyan-400/10 dark:via-cyan-400/26 to-blue-400/6 dark:to-blue-400/18 border-2 border-teal-500/30 dark:border-teal-400/50 rounded-[1.8rem] animate-morph-delayed backdrop-blur-sm shadow-xl shadow-teal-500/25 dark:shadow-teal-400/45 transition-transform duration-300 ease-out will-change-transform"
            style={{
              clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
              transform: `translate(${tealRepulsion.x + tealScroll.x + tealDrift.x}px, ${tealRepulsion.y + tealScroll.y + tealDrift.y}px) rotate(45deg)`,
              opacity: mounted ? undefined : 0
            }}
          ></div>
        );
      })()}

      {/* Rose pentagon */}
      {(() => {
        const rosePos = { x: 60, y: 80 };
        const roseRepulsion = getRepulsion(rosePos.x, rosePos.y, 10);
        const roseScroll = getParallaxScroll(rosePos.y, 0.35);
        const roseDrift = drift.rose || { x: 0, y: 0 };
        return (
          <div
            className="hidden lg:block absolute bottom-1/5 right-2/5 w-36 h-36 bg-gradient-to-br from-rose-500/12 dark:from-rose-400/32 via-pink-400/8 dark:via-pink-400/22 to-fuchsia-400/6 dark:to-fuchsia-400/16 border-2 border-rose-500/30 dark:border-rose-400/50 rounded-[1.5rem] animate-morph backdrop-blur-sm shadow-xl shadow-rose-500/24 dark:shadow-rose-400/44 transition-transform duration-300 ease-out will-change-transform"
            style={{
              clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
              transform: `translate(${roseRepulsion.x + roseScroll.x + roseDrift.x}px, ${roseRepulsion.y + roseScroll.y + roseDrift.y}px) rotate(72deg)`,
              opacity: mounted ? undefined : 0
            }}
          ></div>
        );
      })()}

      {/* Animated lines */}
      <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-400/30 dark:via-purple-400/60 to-transparent animate-shimmer"></div>
      <div className="absolute top-2/3 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400/25 dark:via-cyan-400/55 to-transparent animate-shimmer-delayed"></div>
      <div className="absolute top-1/3 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-pink-400/25 dark:via-pink-400/55 to-transparent animate-shimmer"></div>

      {/* Microgravity particles with moon-trampoline scroll */}
      {particles.map((particle, i) => {
        let visualConfig;

        if (isDarkMode) {
          // Get the specific neon color for this particle
          const neonColor = VISUAL_CONFIG.dark.neonColors[particle.colorIndex];
          visualConfig = {
            borderWidth: VISUAL_CONFIG.dark.particles.borderWidth,
            borderColor: neonColor.borderColor,
            innerGradient: neonColor.innerGradient,
            shadow: VISUAL_CONFIG.dark.particles.shadow,
            glowShadow: neonColor.glowShadow,
          };
        } else {
          // Light mode: single pastel style
          visualConfig = VISUAL_CONFIG.light.particles;
        }

        // Calculate text-aware opacity for better readability
        let textOpacity = 1;
        if (textBounds && typeof window !== 'undefined') {
          const width = window.innerWidth || 1;
          const height = window.innerHeight || 1;

          // Convert particle position to screen coordinates
          const particleScreenX = (particle.baseX / 100) * width + particle.x;
          const particleScreenY = (particle.baseY / 100) * height + particle.y;

          // Check if particle is near text
          const textPadding = 100; // Padding around text area
          const isNearText =
            particleScreenX > textBounds.left - textPadding &&
            particleScreenX < textBounds.right + textPadding &&
            particleScreenY > textBounds.top - textPadding &&
            particleScreenY < textBounds.bottom + textPadding;

          if (isNearText) {
            // Reduce opacity when near text for better legibility
            textOpacity = isDarkMode ? 0.4 : 0.3;
          }
        }

        const finalOpacity = mounted ? textOpacity : 0;

        return (
          <div
            key={i}
            className="absolute rounded-full will-change-transform transition-opacity duration-300"
            style={{
              left: `${particle.baseX}%`,
              top: `${particle.baseY}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: visualConfig.innerGradient,
              border: `${visualConfig.borderWidth} solid ${visualConfig.borderColor}`,
              boxShadow: visualConfig.glowShadow !== 'none'
                ? `${visualConfig.shadow}, ${visualConfig.glowShadow}`
                : visualConfig.shadow,
              transform: `translate(${particle.x}px, ${particle.y}px) scale(${particle.scale})`,
              opacity: finalOpacity,
              zIndex: particle.zIndex,
              mixBlendMode: particle.blendMode as any,
            }}
          />
        );
      })}
    </div>
  );
}
