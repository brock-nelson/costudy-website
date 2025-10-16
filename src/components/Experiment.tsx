"use client";

import { ReactNode } from "react";
import { useExperiment, ExperimentConfig } from "@/lib/experiments";

/**
 * Props for the Experiment component
 */
interface ExperimentProps<T extends string> {
  /** Experiment configuration */
  config: ExperimentConfig<T>;
  /** Mapping of variant IDs to their rendered content */
  variants: Record<T, ReactNode>;
  /** Optional: render prop pattern for more complex scenarios */
  children?: (variant: T) => ReactNode;
}

/**
 * Experiment component for A/B testing
 *
 * This component makes it easy to implement A/B tests in your React components.
 * It automatically assigns variants and tracks them via analytics.
 *
 * @example Using the variants prop:
 * ```tsx
 * <Experiment
 *   config={{
 *     experimentId: 'homepage-headline',
 *     variants: ['variant-a', 'variant-b'],
 *     defaultVariant: 'variant-a',
 *   }}
 *   variants={{
 *     'variant-a': <h1>Original Headline</h1>,
 *     'variant-b': <h1>New Headline</h1>,
 *   }}
 * />
 * ```
 *
 * @example Using the children render prop:
 * ```tsx
 * <Experiment
 *   config={{
 *     experimentId: 'homepage-headline',
 *     variants: ['variant-a', 'variant-b'],
 *     defaultVariant: 'variant-a',
 *   }}
 * >
 *   {(variant) => (
 *     <h1>{variant === 'variant-a' ? 'Original' : 'New'}</h1>
 *   )}
 * </Experiment>
 * ```
 */
export default function Experiment<T extends string>({
  config,
  variants,
  children,
}: ExperimentProps<T>) {
  const variant = useExperiment(config);

  // If children is provided (render prop pattern), use it
  if (children) {
    return <>{children(variant)}</>;
  }

  // Otherwise, use the variants mapping
  return <>{variants[variant]}</>;
}

/**
 * Type-safe experiment component creator
 *
 * Creates a pre-configured Experiment component with specific variant types.
 * This ensures type safety and better developer experience.
 *
 * @example
 * ```tsx
 * const HeadlineExperiment = createExperiment({
 *   experimentId: 'homepage-headline',
 *   variants: ['variant-a', 'variant-b', 'variant-c'] as const,
 *   defaultVariant: 'variant-a' as const,
 * });
 *
 * // Now use it with type safety:
 * <HeadlineExperiment
 *   variants={{
 *     'variant-a': <h1>Original</h1>,
 *     'variant-b': <h1>New</h1>,
 *     'variant-c': <h1>Newer</h1>,
 *   }}
 * />
 * ```
 */
export function createExperiment<T extends string>(
  config: ExperimentConfig<T>
) {
  return function ExperimentComponent({
    variants,
    children,
  }: Omit<ExperimentProps<T>, "config">) {
    return (
      <Experiment config={config} variants={variants}>
        {children}
      </Experiment>
    );
  };
}
