import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Experiment Dashboard - CoStudy Admin",
  description: "Monitor and manage A/B tests and experiments",
};

export default function ExperimentsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#374045] dark:text-[#E9EEFF]">
            A/B Testing Dashboard
          </h1>
          <p className="text-[#5E6E76] dark:text-[#A0AEC0] mt-2">
            Monitor active experiments and analyze results
          </p>
        </div>
        <Link
          href="/admin/experiments/new"
          className="bg-[#4A12C0] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#3a0e99] transition-colors"
        >
          + New Experiment
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-lg border border-[#E5E7EB] dark:border-[#404040]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#5E6E76] dark:text-[#A0AEC0] text-sm font-medium">
              Active Tests
            </span>
            <span className="text-2xl">🧪</span>
          </div>
          <div className="text-3xl font-bold text-[#374045] dark:text-[#E9EEFF]">
            3
          </div>
        </div>

        <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-lg border border-[#E5E7EB] dark:border-[#404040]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#5E6E76] dark:text-[#A0AEC0] text-sm font-medium">
              Total Visitors
            </span>
            <span className="text-2xl">👥</span>
          </div>
          <div className="text-3xl font-bold text-[#374045] dark:text-[#E9EEFF]">
            0
          </div>
        </div>

        <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-lg border border-[#E5E7EB] dark:border-[#404040]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#5E6E76] dark:text-[#A0AEC0] text-sm font-medium">
              Conversions
            </span>
            <span className="text-2xl">✅</span>
          </div>
          <div className="text-3xl font-bold text-[#374045] dark:text-[#E9EEFF]">
            0
          </div>
        </div>

        <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-lg border border-[#E5E7EB] dark:border-[#404040]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#5E6E76] dark:text-[#A0AEC0] text-sm font-medium">
              Avg Lift
            </span>
            <span className="text-2xl">📈</span>
          </div>
          <div className="text-3xl font-bold text-green-600 dark:text-green-400">
            -
          </div>
        </div>
      </div>

      {/* Active Experiments */}
      <div className="bg-white dark:bg-[#1a1a1a] rounded-lg border border-[#E5E7EB] dark:border-[#404040]">
        <div className="p-6 border-b border-[#E5E7EB] dark:border-[#404040]">
          <h2 className="text-xl font-bold text-[#374045] dark:text-[#E9EEFF]">
            Active Experiments
          </h2>
        </div>

        <div className="divide-y divide-[#E5E7EB] dark:divide-[#404040]">
          {/* Experiment 1: Homepage Headline */}
          <div className="p-6 hover:bg-gray-50 dark:hover:bg-[#0a0a0a]/50 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-[#374045] dark:text-[#E9EEFF] mb-1">
                  Homepage Headline Test
                </h3>
                <p className="text-sm text-[#5E6E76] dark:text-[#A0AEC0]">
                  Testing 3 headline variations to optimize demo requests
                </p>
              </div>
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-medium rounded-full">
                Active
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-gray-50 dark:bg-[#0a0a0a]/50 p-4 rounded-lg">
                <div className="text-xs text-[#5E6E76] dark:text-[#A0AEC0] mb-1">
                  Variant A (Control)
                </div>
                <div className="text-sm font-semibold text-[#374045] dark:text-[#E9EEFF]">
                  0 visitors • 0% CVR
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-[#0a0a0a]/50 p-4 rounded-lg">
                <div className="text-xs text-[#5E6E76] dark:text-[#A0AEC0] mb-1">
                  Variant B
                </div>
                <div className="text-sm font-semibold text-[#374045] dark:text-[#E9EEFF]">
                  0 visitors • 0% CVR
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-[#0a0a0a]/50 p-4 rounded-lg">
                <div className="text-xs text-[#5E6E76] dark:text-[#A0AEC0] mb-1">
                  Variant C
                </div>
                <div className="text-sm font-semibold text-[#374045] dark:text-[#E9EEFF]">
                  0 visitors • 0% CVR
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-[#5E6E76] dark:text-[#A0AEC0]">
                Need 1000 more visitors for statistical significance
              </div>
              <Link
                href="/admin/experiments/homepage-headline"
                className="text-[#4A12C0] dark:text-[#A78BFA] text-sm font-medium hover:underline"
              >
                View Details →
              </Link>
            </div>
          </div>

          {/* Experiment 2: CTA Copy */}
          <div className="p-6 hover:bg-gray-50 dark:hover:bg-[#0a0a0a]/50 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-[#374045] dark:text-[#E9EEFF] mb-1">
                  Primary CTA Button Test
                </h3>
                <p className="text-sm text-[#5E6E76] dark:text-[#A0AEC0]">
                  Testing 4 CTA button copy variations
                </p>
              </div>
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-medium rounded-full">
                Active
              </span>
            </div>

            <div className="grid grid-cols-4 gap-3 mb-4">
              {["Request a Demo", "See It in Action", "Schedule Demo", "Get Started"].map(
                (variant, i) => (
                  <div
                    key={i}
                    className="bg-gray-50 dark:bg-[#0a0a0a]/50 p-3 rounded-lg"
                  >
                    <div className="text-xs text-[#5E6E76] dark:text-[#A0AEC0] mb-1 truncate">
                      {variant}
                    </div>
                    <div className="text-sm font-semibold text-[#374045] dark:text-[#E9EEFF]">
                      0 clicks
                    </div>
                  </div>
                )
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-[#5E6E76] dark:text-[#A0AEC0]">
                Need 1000 more visitors for statistical significance
              </div>
              <Link
                href="/admin/experiments/primary-cta"
                className="text-[#4A12C0] dark:text-[#A78BFA] text-sm font-medium hover:underline"
              >
                View Details →
              </Link>
            </div>
          </div>

          {/* Experiment 3: Demo Form Length */}
          <div className="p-6 hover:bg-gray-50 dark:hover:bg-[#0a0a0a]/50 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-[#374045] dark:text-[#E9EEFF] mb-1">
                  Demo Form Length Test
                </h3>
                <p className="text-sm text-[#5E6E76] dark:text-[#A0AEC0]">
                  Short form vs. long form completion rates
                </p>
              </div>
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-medium rounded-full">
                Active
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 dark:bg-[#0a0a0a]/50 p-4 rounded-lg">
                <div className="text-xs text-[#5E6E76] dark:text-[#A0AEC0] mb-1">
                  Short Form (3 fields)
                </div>
                <div className="text-sm font-semibold text-[#374045] dark:text-[#E9EEFF]">
                  0 submissions • 0% completion
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-[#0a0a0a]/50 p-4 rounded-lg">
                <div className="text-xs text-[#5E6E76] dark:text-[#A0AEC0] mb-1">
                  Long Form (7 fields)
                </div>
                <div className="text-sm font-semibold text-[#374045] dark:text-[#E9EEFF]">
                  0 submissions • 0% completion
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-[#5E6E76] dark:text-[#A0AEC0]">
                Need 1000 more visitors for statistical significance
              </div>
              <Link
                href="/admin/experiments/demo-form-length"
                className="text-[#4A12C0] dark:text-[#A78BFA] text-sm font-medium hover:underline"
              >
                View Details →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Documentation */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-[#374045] dark:text-[#E9EEFF] mb-3">
          📊 Testing Best Practices
        </h3>
        <ul className="space-y-2 text-sm text-[#5E6E76] dark:text-[#A0AEC0]">
          <li className="flex items-start gap-2">
            <span className="text-blue-500">•</span>
            <span>Run tests for minimum 2 weeks or 1000 visitors per variant</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500">•</span>
            <span>Wait for 95% confidence level before declaring a winner</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500">•</span>
            <span>Document hypothesis and success metrics before starting</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500">•</span>
            <span>Test one variable at a time for clear insights</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
