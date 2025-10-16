/**
 * Statistical functions for A/B testing analysis
 */

/**
 * Calculate z-score for two proportions
 */
function calculateZScore(
  conversions1: number,
  visitors1: number,
  conversions2: number,
  visitors2: number
): number {
  const p1 = conversions1 / visitors1;
  const p2 = conversions2 / visitors2;

  // Pooled proportion
  const pPooled =
    (conversions1 + conversions2) / (visitors1 + visitors2);

  // Standard error
  const se = Math.sqrt(
    pPooled * (1 - pPooled) * (1 / visitors1 + 1 / visitors2)
  );

  // Z-score
  return (p1 - p2) / se;
}

/**
 * Calculate p-value from z-score (two-tailed test)
 */
function calculatePValue(zScore: number): number {
  // Using complementary error function approximation
  const z = Math.abs(zScore);

  // Approximation for p-value from z-score
  const t = 1 / (1 + 0.2316419 * z);
  const d = 0.3989423 * Math.exp((-z * z) / 2);
  const p =
    d *
    t *
    (0.3193815 +
      t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));

  // Two-tailed test
  return 2 * p;
}

/**
 * Calculate confidence interval for a proportion
 */
function calculateConfidenceInterval(
  conversions: number,
  visitors: number,
  confidenceLevel: number = 95
): { lower: number; upper: number; margin: number } {
  if (visitors === 0) {
    return { lower: 0, upper: 0, margin: 0 };
  }

  const proportion = conversions / visitors;
  const z = confidenceLevel === 95 ? 1.96 : confidenceLevel === 99 ? 2.576 : 1.96;

  const se = Math.sqrt((proportion * (1 - proportion)) / visitors);
  const margin = z * se;

  return {
    lower: Math.max(0, proportion - margin),
    upper: Math.min(1, proportion + margin),
    margin,
  };
}

/**
 * Calculate sample size needed for a test
 */
export function calculateSampleSize(
  baselineConversion: number,
  minimumDetectableEffect: number,
  significanceLevel: number = 0.05,
  power: number = 0.8
): number {
  // Z-scores
  const zAlpha = significanceLevel === 0.05 ? 1.96 : 2.576;
  const zBeta = power === 0.8 ? 0.84 : 1.036;

  const p1 = baselineConversion;
  const p2 = baselineConversion * (1 + minimumDetectableEffect);

  const numerator =
    (zAlpha * Math.sqrt(2 * p1 * (1 - p1)) +
      zBeta * Math.sqrt(p1 * (1 - p1) + p2 * (1 - p2))) **
    2;
  const denominator = (p2 - p1) ** 2;

  return Math.ceil(numerator / denominator);
}

/**
 * Result of statistical significance test
 */
export interface SignificanceTestResult {
  isSignificant: boolean;
  pValue: number;
  zScore: number;
  confidenceLevel: number;
  sampleSize: number;
  conversionRate1: number;
  conversionRate2: number;
  relativeLift: number;
  absoluteLift: number;
  confidenceInterval1: { lower: number; upper: number; margin: number };
  confidenceInterval2: { lower: number; upper: number; margin: number };
  recommendation: string;
  minimumSampleSize: number;
  hasEnoughData: boolean;
}

/**
 * Calculate statistical significance between two variants
 *
 * @param conversions1 Number of conversions for variant 1 (baseline)
 * @param visitors1 Number of visitors for variant 1 (baseline)
 * @param conversions2 Number of conversions for variant 2 (test)
 * @param visitors2 Number of visitors for variant 2 (test)
 * @param confidenceLevel Desired confidence level (90, 95, or 99)
 * @param minimumSampleSize Minimum sample size before declaring winner
 */
export function testSignificance(
  conversions1: number,
  visitors1: number,
  conversions2: number,
  visitors2: number,
  confidenceLevel: number = 95,
  minimumSampleSize: number = 1000
): SignificanceTestResult {
  // Calculate conversion rates
  const conversionRate1 = visitors1 > 0 ? conversions1 / visitors1 : 0;
  const conversionRate2 = visitors2 > 0 ? conversions2 / visitors2 : 0;

  // Calculate lifts
  const absoluteLift = conversionRate2 - conversionRate1;
  const relativeLift =
    conversionRate1 > 0 ? (absoluteLift / conversionRate1) * 100 : 0;

  // Check if we have enough data
  const totalSampleSize = visitors1 + visitors2;
  const hasEnoughData = totalSampleSize >= minimumSampleSize;

  // Calculate statistical significance
  let zScore = 0;
  let pValue = 1;
  let isSignificant = false;

  if (visitors1 > 0 && visitors2 > 0) {
    zScore = calculateZScore(conversions1, visitors1, conversions2, visitors2);
    pValue = calculatePValue(zScore);

    // Determine significance based on confidence level
    const alpha = (100 - confidenceLevel) / 100;
    isSignificant = pValue < alpha && hasEnoughData;
  }

  // Calculate confidence intervals
  const confidenceInterval1 = calculateConfidenceInterval(
    conversions1,
    visitors1,
    confidenceLevel
  );
  const confidenceInterval2 = calculateConfidenceInterval(
    conversions2,
    visitors2,
    confidenceLevel
  );

  // Generate recommendation
  let recommendation = "";
  if (!hasEnoughData) {
    recommendation = `Continue test. Need ${minimumSampleSize - totalSampleSize} more visitors to reach minimum sample size.`;
  } else if (isSignificant) {
    if (relativeLift > 0) {
      recommendation = `Variant 2 is a clear winner with ${relativeLift.toFixed(1)}% improvement. Consider implementing this variant.`;
    } else {
      recommendation = `Variant 1 (baseline) performs significantly better. Keep the original.`;
    }
  } else if (pValue < 0.1) {
    recommendation = `Results are trending towards significance (p=${pValue.toFixed(3)}). Consider running the test longer.`;
  } else {
    recommendation = `No significant difference detected. Consider stopping the test or trying a different variant.`;
  }

  return {
    isSignificant,
    pValue,
    zScore,
    confidenceLevel,
    sampleSize: totalSampleSize,
    conversionRate1,
    conversionRate2,
    relativeLift,
    absoluteLift,
    confidenceInterval1,
    confidenceInterval2,
    recommendation,
    minimumSampleSize,
    hasEnoughData,
  };
}

/**
 * Calculate experiment metrics for display
 */
export interface ExperimentMetrics {
  variant: string;
  visitors: number;
  conversions: number;
  conversionRate: number;
  confidenceInterval: { lower: number; upper: number };
}

/**
 * Format a number as a percentage
 */
export function formatPercentage(value: number, decimals: number = 2): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

/**
 * Format a lift value with sign
 */
export function formatLift(value: number, decimals: number = 1): string {
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(decimals)}%`;
}

/**
 * Check if test duration is sufficient
 */
export function hasMinimumDuration(
  startDate: Date,
  minimumDays: number = 14
): boolean {
  const now = new Date();
  const daysPassed = (now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
  return daysPassed >= minimumDays;
}

/**
 * Calculate days remaining for minimum test duration
 */
export function daysUntilMinimumDuration(
  startDate: Date,
  minimumDays: number = 14
): number {
  const now = new Date();
  const daysPassed = (now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
  return Math.max(0, Math.ceil(minimumDays - daysPassed));
}
