"use client";

import { useEffect, useState } from "react";
import * as analytics from "./analytics";

/**
 * Experiment configuration interface
 */
export interface ExperimentConfig<T extends string = string> {
  /** Unique identifier for the experiment */
  experimentId: string;
  /** List of variant identifiers */
  variants: T[];
  /** Default variant to use if experiment is not active */
  defaultVariant: T;
  /** Optional: weights for each variant (must sum to 1.0) */
  weights?: number[];
  /** Optional: callback when variant is assigned */
  onVariantAssigned?: (variant: T) => void;
}

/**
 * Storage key prefix for experiments
 */
const STORAGE_PREFIX = "costudy_experiment_";

/**
 * Get the storage key for an experiment
 */
function getStorageKey(experimentId: string): string {
  return `${STORAGE_PREFIX}${experimentId}`;
}

/**
 * Get or assign a variant for a user in an experiment
 * Uses localStorage to persist variant assignment across sessions
 */
function getOrAssignVariant<T extends string>(
  config: ExperimentConfig<T>
): T {
  if (typeof window === "undefined") {
    return config.defaultVariant;
  }

  const storageKey = getStorageKey(config.experimentId);

  // Check if user already has an assigned variant
  const existingVariant = localStorage.getItem(storageKey);
  if (existingVariant && config.variants.includes(existingVariant as T)) {
    return existingVariant as T;
  }

  // Assign a new variant based on weights or uniform distribution
  const variant = assignVariant(config);

  // Store the variant
  localStorage.setItem(storageKey, variant);

  // Track the assignment
  analytics.event({
    action: "experiment_assigned",
    category: "experiments",
    label: `${config.experimentId}:${variant}`,
  });

  // Call optional callback
  config.onVariantAssigned?.(variant);

  return variant;
}

/**
 * Assign a variant based on weights or uniform distribution
 */
function assignVariant<T extends string>(config: ExperimentConfig<T>): T {
  const { variants, weights, defaultVariant } = config;

  // If no weights provided, use uniform distribution
  if (!weights || weights.length !== variants.length) {
    const randomIndex = Math.floor(Math.random() * variants.length);
    return variants[randomIndex] || defaultVariant;
  }

  // Validate weights sum to 1.0 (with small tolerance for floating point)
  const sum = weights.reduce((acc, w) => acc + w, 0);
  if (Math.abs(sum - 1.0) > 0.001) {
    console.warn(
      `Experiment ${config.experimentId}: weights do not sum to 1.0 (sum=${sum}). Using uniform distribution.`
    );
    const randomIndex = Math.floor(Math.random() * variants.length);
    return variants[randomIndex] || defaultVariant;
  }

  // Use weighted random selection
  const random = Math.random();
  let cumulativeWeight = 0;

  for (let i = 0; i < variants.length; i++) {
    cumulativeWeight += weights[i] || 0;
    if (random <= cumulativeWeight) {
      return variants[i] || defaultVariant;
    }
  }

  // Fallback (should never reach here)
  return defaultVariant;
}

/**
 * Hook to use an experiment variant
 *
 * @example
 * ```tsx
 * function HeroSection() {
 *   const headline = useExperiment({
 *     experimentId: 'homepage-headline',
 *     variants: ['variant-a', 'variant-b', 'variant-c'],
 *     defaultVariant: 'variant-a',
 *   });
 *
 *   const headlineText = {
 *     'variant-a': 'Transform Student Collaboration',
 *     'variant-b': 'Increase Student Retention',
 *     'variant-c': 'The Study Platform Universities Trust',
 *   }[headline];
 *
 *   return <h1>{headlineText}</h1>;
 * }
 * ```
 */
export function useExperiment<T extends string>(
  config: ExperimentConfig<T>
): T {
  const [variant, setVariant] = useState<T>(config.defaultVariant);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const assignedVariant = getOrAssignVariant(config);
    setVariant(assignedVariant);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.experimentId]); // Only re-run if experiment ID changes

  // Return default variant during SSR
  if (!isClient) {
    return config.defaultVariant;
  }

  return variant;
}

/**
 * Track a conversion event for an experiment
 *
 * @example
 * ```tsx
 * trackConversion('homepage-headline', 'demo_request');
 * ```
 */
export function trackConversion(
  experimentId: string,
  conversionEvent: string,
  value?: number
): void {
  if (typeof window === "undefined") {
    return;
  }

  const storageKey = getStorageKey(experimentId);
  const variant = localStorage.getItem(storageKey);

  if (variant) {
    analytics.event({
      action: conversionEvent,
      category: "experiments",
      label: `${experimentId}:${variant}`,
      value,
    });
  }
}

/**
 * Force a specific variant for testing purposes
 * Useful for QA and debugging
 */
export function setTestVariant<T extends string>(
  experimentId: string,
  variant: T
): void {
  if (typeof window === "undefined") {
    return;
  }

  const storageKey = getStorageKey(experimentId);
  localStorage.setItem(storageKey, variant);

  // Reload to apply the variant
  window.location.reload();
}

/**
 * Clear all experiment assignments (useful for testing)
 */
export function clearAllExperiments(): void {
  if (typeof window === "undefined") {
    return;
  }

  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith(STORAGE_PREFIX)) {
      localStorage.removeItem(key);
    }
  });
}

/**
 * Get the current variant for an experiment (if assigned)
 */
export function getCurrentVariant(experimentId: string): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  const storageKey = getStorageKey(experimentId);
  return localStorage.getItem(storageKey);
}

/**
 * Predefined experiment IDs for type safety
 */
export const EXPERIMENTS = {
  HOMEPAGE_HEADLINE: "homepage-headline",
  PRIMARY_CTA: "primary-cta",
  DEMO_FORM_LENGTH: "demo-form-length",
  SOCIAL_PROOF_PLACEMENT: "social-proof-placement",
  PRICING_DISPLAY: "pricing-display",
} as const;

/**
 * Experiment configurations
 */
export const EXPERIMENT_CONFIGS = {
  [EXPERIMENTS.HOMEPAGE_HEADLINE]: {
    experimentId: EXPERIMENTS.HOMEPAGE_HEADLINE,
    variants: ["variant-a", "variant-b", "variant-c"] as const,
    defaultVariant: "variant-a" as const,
    weights: [0.34, 0.33, 0.33], // Roughly equal distribution
  },
  [EXPERIMENTS.PRIMARY_CTA]: {
    experimentId: EXPERIMENTS.PRIMARY_CTA,
    variants: ["variant-a", "variant-b", "variant-c", "variant-d"] as const,
    defaultVariant: "variant-a" as const,
    weights: [0.25, 0.25, 0.25, 0.25], // Equal distribution
  },
  [EXPERIMENTS.DEMO_FORM_LENGTH]: {
    experimentId: EXPERIMENTS.DEMO_FORM_LENGTH,
    variants: ["short", "long"] as const,
    defaultVariant: "short" as const,
    weights: [0.5, 0.5], // Equal distribution
  },
} as const;
