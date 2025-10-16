"use client";

import Link from "next/link";
import { useExperiment, EXPERIMENTS, trackConversion } from "@/lib/experiments";
import GradientText from "@/components/ui/GradientText";

/**
 * HomePage A/B Testing Component
 * Tests different headlines and CTA copy variations
 */
export default function HomePageExperiments() {
  // Test 1: Homepage Headline
  const headlineVariant = useExperiment({
    experimentId: EXPERIMENTS.HOMEPAGE_HEADLINE,
    variants: ["variant-a", "variant-b", "variant-c"] as const,
    defaultVariant: "variant-a" as const,
    weights: [0.34, 0.33, 0.33],
  });

  // Test 2: Primary CTA Copy
  const ctaVariant = useExperiment({
    experimentId: EXPERIMENTS.PRIMARY_CTA,
    variants: ["variant-a", "variant-b", "variant-c", "variant-d"] as const,
    defaultVariant: "variant-a" as const,
    weights: [0.25, 0.25, 0.25, 0.25],
  });

  // Headline variations
  const headlineText = {
    "variant-a": "Transform Student Collaboration at Your University",
    "variant-b": "Increase Student Retention Through Better Study Groups",
    "variant-c": "The Study Platform Universities Trust",
  }[headlineVariant];

  const subtitleText = {
    "variant-a":
      "Structured teamwork tools that help students build essential collaboration skills and achieve better learning outcomes.",
    "variant-b":
      "Research-backed collaboration tools that improve student engagement, retention, and academic success across your institution.",
    "variant-c":
      "Join leading universities in transforming student teamwork with purpose-built collaboration software designed for higher education.",
  }[headlineVariant];

  // CTA variations
  const ctaText = {
    "variant-a": "Request a Demo",
    "variant-b": "See It in Action",
    "variant-c": "Schedule Demo",
    "variant-d": "Get Started",
  }[ctaVariant];

  // Track CTA click
  const handleCtaClick = () => {
    trackConversion(EXPERIMENTS.PRIMARY_CTA, "cta_click");
    trackConversion(EXPERIMENTS.HOMEPAGE_HEADLINE, "cta_click");
  };

  return (
    <>
      {/* Main Heading */}
      <h1
        id="hero-heading"
        className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-[1.1]"
      >
        <GradientText>{headlineText}</GradientText>
      </h1>

      {/* Subtitle */}
      <p className="text-xl md:text-2xl text-[#5E6E76] dark:text-[#A0AEC0] mb-10 max-w-3xl mx-auto leading-relaxed font-medium">
        {subtitleText}
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Link
          href="/demo"
          onClick={handleCtaClick}
          className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 overflow-hidden"
          aria-label="Schedule a demo of CoStudy"
        >
          <span className="relative z-10 flex items-center gap-2">
            {ctaText}
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </Link>
        <Link
          href="/products"
          className="group bg-white dark:bg-[#1a1a1a] text-[#4A12C0] dark:text-[#A78BFA] px-8 py-4 rounded-xl font-semibold border-2 border-purple-200 dark:border-[#404040] hover:border-purple-300 dark:hover:border-[#606060] hover:bg-purple-50/50 dark:hover:bg-purple-900/30 transition-all duration-300 hover:shadow-lg"
          aria-label="Explore CoStudy products"
        >
          <span className="flex items-center gap-2">
            Explore Products
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </span>
        </Link>
      </div>
    </>
  );
}
