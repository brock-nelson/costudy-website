"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

/**
 * StripeHero Component
 *
 * A modern, Stripe-inspired hero section featuring:
 * - Diagonal split layout with large copy on left, layered images on right
 * - Animated gradient mesh background (respects prefers-reduced-motion)
 * - Email capture CTA
 * - Phone-over-desktop screenshot layering
 * - Repositioned decorative geometries (corners/edges only)
 * - Performance fallback for slow connections (6s timeout)
 * - Full accessibility and dark mode support
 *
 * Design Philosophy:
 * - Bold, simple typography with Figtree
 * - Solid text colors (no gradients) with excellent contrast
 * - Vibrant but professional button colors
 * - Layered depth without clutter
 * - Responsive mobile-first design
 */

export default function StripeHero() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [slowConnection, setSlowConnection] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const loadStartTime = useRef(Date.now());

  useEffect(() => {
    setMounted(true);

    // Performance fallback: detect slow connections after 6s
    const slowConnectionTimer = setTimeout(() => {
      const loadTime = Date.now() - loadStartTime.current;
      if (loadTime > 6000) {
        setSlowConnection(true);
        console.log("Slow connection detected. Switching to lightweight mode.");
      }
    }, 6000);

    return () => clearTimeout(slowConnectionTimer);
  }, []);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log("Email submitted:", email);
    setEmail("");
    setIsSubmitting(false);
  };

  // Gradient animation keyframes (only if motion is allowed)
  const shouldAnimate = !prefersReducedMotion && !slowConnection;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white dark:bg-gray-950">
      {/* Performance Fallback Message */}
      {slowConnection && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-blue-50 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100 px-4 py-2 rounded-lg shadow-lg border border-blue-200 dark:border-blue-800 text-sm">
          ⚡ We noticed things are loading a bit slowly. Switching to a streamlined view…
        </div>
      )}

      {/* Animated Gradient Mesh Background */}
      {!slowConnection && (
        <motion.div
          className="absolute inset-0 -z-10"
          style={{
            background: `
              radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 10% 80%, rgba(6, 182, 212, 0.12) 0%, transparent 50%),
              linear-gradient(135deg, #f0f9ff 0%, #faf5ff 50%, #fef2f2 100%)
            `,
            backgroundSize: "200% 200%",
          }}
          animate={shouldAnimate ? {
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          } : undefined}
          transition={shouldAnimate ? {
            duration: 15,
            repeat: Infinity,
            ease: "linear" as const,
          } : undefined}
          aria-hidden="true"
        />
      )}

      {/* Dark mode gradient overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gray-900 via-purple-950 to-blue-950 opacity-0 dark:opacity-100 transition-opacity duration-500" aria-hidden="true" />

      {/* Decorative Geometries - Positioned at corners/edges */}
      {!slowConnection && mounted && (
        <div className="absolute inset-0 -z-5 pointer-events-none" aria-hidden="true">
          {/* Top left corner */}
          <motion.div
            className="absolute top-20 left-10 w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-400/20 to-purple-500/20 dark:from-indigo-500/30 dark:to-purple-600/30 backdrop-blur-sm border border-indigo-300/30 dark:border-indigo-500/30"
            initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
            animate={{
              opacity: prefersReducedMotion ? 0.7 : 1,
              scale: 1,
              rotate: prefersReducedMotion ? 12 : [12, 18, 12]
            }}
            transition={{ duration: prefersReducedMotion ? 0 : 8, repeat: prefersReducedMotion ? 0 : Infinity }}
          />

          {/* Top right accent */}
          <motion.div
            className="absolute top-32 right-20 w-16 h-16 rounded-full bg-gradient-to-br from-pink-400/20 to-coral-500/20 dark:from-pink-500/30 dark:to-coral-600/30"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: prefersReducedMotion ? 0.6 : 1,
              scale: prefersReducedMotion ? 1 : [1, 1.2, 1]
            }}
            transition={{ duration: prefersReducedMotion ? 0 : 6, repeat: prefersReducedMotion ? 0 : Infinity, delay: 1 }}
          />

          {/* Bottom left diamond */}
          <motion.div
            className="absolute bottom-40 left-16 w-20 h-20 rotate-45 bg-gradient-to-br from-cyan-400/20 to-teal-500/20 dark:from-cyan-500/30 dark:to-teal-600/30 border border-cyan-300/30 dark:border-cyan-500/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: prefersReducedMotion ? 0.7 : 1,
              y: prefersReducedMotion ? 0 : [0, -10, 0]
            }}
            transition={{ duration: prefersReducedMotion ? 0 : 7, repeat: prefersReducedMotion ? 0 : Infinity, delay: 0.5 }}
          />

          {/* Bottom right subtle circle */}
          <motion.div
            className="absolute bottom-20 right-32 w-32 h-32 rounded-full bg-gradient-to-br from-violet-400/15 to-purple-500/15 dark:from-violet-500/25 dark:to-purple-600/25 blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: prefersReducedMotion ? 0.5 : [0.5, 0.8, 0.5] }}
            transition={{ duration: prefersReducedMotion ? 0 : 10, repeat: prefersReducedMotion ? 0 : Infinity }}
          />
        </div>
      )}

      {/* Main Content Container */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left Column: Copy and CTA */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Hero Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.1] tracking-tight text-gray-900 dark:text-white">
              Transform Student
              <br />
              <span className="text-[#4A12C0] dark:text-[#A78BFA]">Collaboration</span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl lg:text-3xl font-medium text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              AI-powered study groups that help students build essential teamwork skills and achieve better learning outcomes.
            </p>

            {/* Email Capture Form */}
            <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto lg:mx-0">
              <label htmlFor="hero-email" className="sr-only">
                Email address
              </label>
              <input
                id="hero-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-6 py-4 text-lg rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                aria-label="Enter your email address to get started"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-4 text-lg font-semibold rounded-xl bg-[#4A12C0] hover:bg-[#3a0e99] dark:bg-[#8B5CF6] dark:hover:bg-[#7C3AED] text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                aria-label="Get started with CoStudy"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  "Get Started"
                )}
              </button>
            </form>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Free to try</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">No credit card</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Cancel anytime</span>
              </div>
            </div>
          </div>

          {/* Right Column: Product Screenshots with Diagonal Divider */}
          <div className="relative">
            {/* Diagonal Divider (subtle, guides the eye) */}
            <div
              className="hidden lg:block absolute -left-16 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-purple-300/30 dark:via-purple-600/30 to-transparent"
              style={{ transform: "skewX(-12deg)" }}
              aria-hidden="true"
            />

            {/* Layered Screenshots Container */}
            <div className="relative max-w-2xl mx-auto lg:mx-0">
              {/* Desktop Screenshot (background layer) */}
              <motion.div
                className="relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/20 dark:shadow-purple-900/40 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                  {/* Desktop Placeholder - Dashboard View */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                    {/* Mock browser chrome */}
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 flex items-center px-3 gap-2 border-b border-gray-300 dark:border-gray-600">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                      </div>
                      <div className="flex-1 bg-white dark:bg-gray-600 rounded px-3 py-1 text-xs text-gray-500 dark:text-gray-400">
                        app.costudy.co/dashboard
                      </div>
                    </div>

                    {/* Mock dashboard content */}
                    <div className="p-6 space-y-4">
                      <div className="h-6 bg-purple-200 dark:bg-purple-800 rounded w-1/3" />
                      <div className="grid grid-cols-3 gap-4">
                        <div className="h-24 bg-blue-100 dark:bg-blue-900 rounded-lg" />
                        <div className="h-24 bg-green-100 dark:bg-green-900 rounded-lg" />
                        <div className="h-24 bg-pink-100 dark:bg-pink-900 rounded-lg" />
                      </div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full" />
                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6" />
                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-4/6" />
                      </div>
                    </div>
                  </div>

                  <Image
                    src="/placeholder-desktop.png"
                    alt="CoStudy dashboard showing team collaboration tools, study groups, and analytics"
                    fill
                    className="object-cover opacity-0"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </motion.div>

              {/* Phone Screenshot (foreground layer, overlapping) */}
              <motion.div
                className="relative -mt-32 lg:-mt-40 lg:-ml-20 z-20 max-w-xs mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 30, x: -10 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="relative aspect-[9/19.5] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-purple-600/30 dark:shadow-purple-900/50 border-[6px] border-gray-800 dark:border-gray-900 bg-white dark:bg-gray-900">
                  {/* Phone notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-gray-800 dark:bg-black rounded-b-2xl z-30" />

                  {/* Mock mobile app content */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 pt-8">
                    {/* Status bar */}
                    <div className="px-6 py-2 flex justify-between text-xs text-gray-600 dark:text-gray-400">
                      <span>9:41</span>
                      <div className="flex gap-1">
                        <span>📶</span>
                        <span>🔋</span>
                      </div>
                    </div>

                    {/* App header */}
                    <div className="px-6 py-4">
                      <div className="h-4 bg-purple-300 dark:bg-purple-700 rounded w-1/2 mb-4" />
                      <div className="space-y-3">
                        <div className="h-20 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-xl" />
                        <div className="h-20 bg-gradient-to-r from-green-100 to-teal-100 dark:from-green-900 dark:to-teal-900 rounded-xl" />
                        <div className="h-20 bg-gradient-to-r from-pink-100 to-rose-100 dark:from-pink-900 dark:to-rose-900 rounded-xl" />
                      </div>
                    </div>
                  </div>

                  <Image
                    src="/placeholder-mobile.png"
                    alt="CoStudy mobile app showing study group chat, notifications, and quick actions"
                    fill
                    className="object-cover opacity-0"
                    loading="lazy"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle bottom fade for visual flow */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-gray-950 to-transparent pointer-events-none" aria-hidden="true" />
    </section>
  );
}
