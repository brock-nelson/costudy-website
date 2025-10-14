"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";

export default function ROICalculator() {
  // Input state
  const [numStudents, setNumStudents] = useState(1000);
  const [currentRetention, setCurrentRetention] = useState(85);
  const [avgTuition, setAvgTuition] = useState(30000);
  const [currentToolCost, setCurrentToolCost] = useState(10000);
  const [estimatedImprovement, setEstimatedImprovement] = useState(5);

  const results = useMemo(() => {
    // Estimate CoStudy annual cost (simplified: $10 per student per year)
    const costudyCost = numStudents * 10;

    // Annual cost savings from replacing current tools
    const toolSavings = currentToolCost - costudyCost;

    // Calculate retention improvement
    const additionalStudentsRetained = (numStudents * estimatedImprovement) / 100;

    // Additional tuition revenue from improved retention
    const additionalRevenue = additionalStudentsRetained * avgTuition;

    // Total annual savings
    const totalAnnualSavings = toolSavings + additionalRevenue;

    // Cost per student
    const costPerStudent = costudyCost / numStudents;

    // Payback period in months
    const paybackPeriod = totalAnnualSavings > 0
      ? (costudyCost / totalAnnualSavings) * 12
      : 0;

    // 3-year ROI percentage
    const threeYearROI = costudyCost > 0
      ? ((totalAnnualSavings * 3 - costudyCost) / costudyCost) * 100
      : 0;

    return {
      annualCostSavings: Math.round(totalAnnualSavings),
      additionalRevenue: Math.round(additionalRevenue),
      costPerStudent: Math.round(costPerStudent * 100) / 100,
      paybackPeriod: Math.round(paybackPeriod * 10) / 10,
      threeYearROI: Math.round(threeYearROI),
    };
  }, [numStudents, avgTuition, currentToolCost, estimatedImprovement]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-xl p-8 max-w-6xl mx-auto border border-gray-200 dark:border-[#404040]"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-[#374045] dark:text-[#E9EEFF]">
          ROI Calculator
        </h2>
        <p className="text-[#5E6E76] dark:text-[#A0AEC0] text-lg">
          Calculate the financial impact of CoStudy at your institution
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Inputs */}
        <div className="space-y-6">
          <div>
            <label htmlFor="numStudents" className="block text-sm font-medium text-[#374045] dark:text-[#E9EEFF] mb-2">
              Number of Students
            </label>
            <input
              type="range"
              id="numStudents"
              min="100"
              max="50000"
              step="100"
              value={numStudents}
              onChange={(e) => setNumStudents(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-[#404040] rounded-lg appearance-none cursor-pointer accent-purple-600"
              aria-label="Number of students"
            />
            <div className="text-right text-2xl font-bold text-purple-600 dark:text-purple-400 mt-2">
              {numStudents.toLocaleString()}
            </div>
          </div>

          <div>
            <label htmlFor="currentRetention" className="block text-sm font-medium text-[#374045] dark:text-[#E9EEFF] mb-2">
              Current Retention Rate (%)
            </label>
            <input
              type="range"
              id="currentRetention"
              min="50"
              max="100"
              step="1"
              value={currentRetention}
              onChange={(e) => setCurrentRetention(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-[#404040] rounded-lg appearance-none cursor-pointer accent-purple-600"
              aria-label="Current retention rate"
            />
            <div className="text-right text-2xl font-bold text-purple-600 dark:text-purple-400 mt-2">
              {currentRetention}%
            </div>
          </div>

          <div>
            <label htmlFor="avgTuition" className="block text-sm font-medium text-[#374045] dark:text-[#E9EEFF] mb-2">
              Average Tuition per Student ($)
            </label>
            <input
              type="range"
              id="avgTuition"
              min="5000"
              max="80000"
              step="1000"
              value={avgTuition}
              onChange={(e) => setAvgTuition(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-[#404040] rounded-lg appearance-none cursor-pointer accent-purple-600"
              aria-label="Average tuition per student"
            />
            <div className="text-right text-2xl font-bold text-purple-600 dark:text-purple-400 mt-2">
              ${avgTuition.toLocaleString()}
            </div>
          </div>

          <div>
            <label htmlFor="currentToolCost" className="block text-sm font-medium text-[#374045] dark:text-[#E9EEFF] mb-2">
              Current Collaboration Tool Cost ($/year)
            </label>
            <input
              type="range"
              id="currentToolCost"
              min="0"
              max="100000"
              step="1000"
              value={currentToolCost}
              onChange={(e) => setCurrentToolCost(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-[#404040] rounded-lg appearance-none cursor-pointer accent-purple-600"
              aria-label="Current tool cost"
            />
            <div className="text-right text-2xl font-bold text-purple-600 dark:text-purple-400 mt-2">
              ${currentToolCost.toLocaleString()}
            </div>
          </div>

          <div>
            <label htmlFor="estimatedImprovement" className="block text-sm font-medium text-[#374045] dark:text-[#E9EEFF] mb-2">
              Estimated Retention Improvement (%)
            </label>
            <input
              type="range"
              id="estimatedImprovement"
              min="1"
              max="15"
              step="0.5"
              value={estimatedImprovement}
              onChange={(e) => setEstimatedImprovement(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-[#404040] rounded-lg appearance-none cursor-pointer accent-purple-600"
              aria-label="Estimated retention improvement"
            />
            <div className="text-right text-2xl font-bold text-purple-600 dark:text-purple-400 mt-2">
              {estimatedImprovement}%
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-6 space-y-4">
          <h3 className="text-xl font-bold text-[#374045] dark:text-[#E9EEFF] mb-4">
            Estimated Annual Impact
          </h3>

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-[#0a0a0a] rounded-lg p-4 shadow-sm border border-purple-100 dark:border-purple-900/50"
          >
            <div className="text-sm text-[#5E6E76] dark:text-[#A0AEC0] mb-1">Annual Cost Savings</div>
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              ${results.annualCostSavings.toLocaleString()}
            </div>
            <div className="text-xs text-[#5E6E76] dark:text-[#A0AEC0] mt-1">
              From tool replacement and retention
            </div>
          </motion.div>

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white dark:bg-[#0a0a0a] rounded-lg p-4 shadow-sm border border-purple-100 dark:border-purple-900/50"
          >
            <div className="text-sm text-[#5E6E76] dark:text-[#A0AEC0] mb-1">Additional Tuition Revenue</div>
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              ${results.additionalRevenue.toLocaleString()}
            </div>
            <div className="text-xs text-[#5E6E76] dark:text-[#A0AEC0] mt-1">
              From improved retention
            </div>
          </motion.div>

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-white dark:bg-[#0a0a0a] rounded-lg p-4 shadow-sm border border-purple-100 dark:border-purple-900/50"
          >
            <div className="text-sm text-[#5E6E76] dark:text-[#A0AEC0] mb-1">Cost Per Student</div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              ${results.costPerStudent.toLocaleString()}
            </div>
            <div className="text-xs text-[#5E6E76] dark:text-[#A0AEC0] mt-1">
              Annual CoStudy cost per student
            </div>
          </motion.div>

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-white dark:bg-[#0a0a0a] rounded-lg p-4 shadow-sm border border-purple-100 dark:border-purple-900/50"
          >
            <div className="text-sm text-[#5E6E76] dark:text-[#A0AEC0] mb-1">Payback Period</div>
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
              {results.paybackPeriod.toLocaleString()} mo
            </div>
            <div className="text-xs text-[#5E6E76] dark:text-[#A0AEC0] mt-1">
              Time to recover investment
            </div>
          </motion.div>

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="bg-white dark:bg-[#0a0a0a] rounded-lg p-4 shadow-sm border border-purple-100 dark:border-purple-900/50"
          >
            <div className="text-sm text-[#5E6E76] dark:text-[#A0AEC0] mb-1">3-Year ROI</div>
            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
              {results.threeYearROI.toLocaleString()}%
            </div>
            <div className="text-xs text-[#5E6E76] dark:text-[#A0AEC0] mt-1">
              Return on investment over 3 years
            </div>
          </motion.div>
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-[#404040] pt-6">
        <p className="text-sm text-[#5E6E76] dark:text-[#A0AEC0] text-center">
          <strong>Note:</strong> These estimates are based on industry case studies showing improved student
          retention through enhanced collaboration tools. Actual results may vary based on institution size,
          implementation approach, and current infrastructure.
        </p>
      </div>
    </motion.div>
  );
}
