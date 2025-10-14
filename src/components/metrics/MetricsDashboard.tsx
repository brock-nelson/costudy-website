"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

interface Metric {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  description?: string;
  icon?: string;
}

interface MetricsDashboardProps {
  metrics?: Metric[];
  title?: string;
  subtitle?: string;
}

const defaultMetrics: Metric[] = [
  {
    label: "Universities Using CoStudy",
    value: 50,
    suffix: "+",
    description: "Leading institutions nationwide",
    icon: "🎓",
  },
  {
    label: "Study Sessions Completed",
    value: 2.5,
    suffix: "M",
    decimals: 1,
    description: "Collaborative learning experiences",
    icon: "📚",
  },
  {
    label: "Student Retention Improvement",
    value: 30,
    suffix: "%",
    description: "Average increase across institutions",
    icon: "📈",
  },
  {
    label: "Average NPS Score",
    value: 72,
    description: "Student satisfaction rating",
    icon: "⭐",
  },
  {
    label: "Hours of Study Collaboration",
    value: 1.2,
    suffix: "M",
    decimals: 1,
    description: "Facilitated through CoStudy",
    icon: "⏱️",
  },
  {
    label: "Active Student Teams",
    value: 15000,
    suffix: "+",
    description: "Working together right now",
    icon: "👥",
  },
];

function AnimatedCounter({ value, decimals = 0, prefix = "", suffix = "" }: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 2000 });
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      setDisplayValue(latest);
    });
  }, [springValue]);

  return (
    <div ref={ref}>
      {prefix}
      {displayValue.toFixed(decimals)}
      {suffix}
    </div>
  );
}

export default function MetricsDashboard({
  metrics = defaultMetrics,
  title = "Success by the Numbers",
  subtitle = "Real results from institutions using CoStudy",
}: MetricsDashboardProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-purple-900/10 dark:via-[#0a0a0a] dark:to-blue-900/10 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-purple-200/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-gradient-to-tl from-blue-200/20 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-[#374045] dark:text-[#E9EEFF]">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-[#5E6E76] dark:text-[#A0AEC0] max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-white dark:bg-[#1a1a1a] rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-gray-200 dark:border-[#404040] transition-all duration-300 hover:scale-105"
            >
              {/* Icon */}
              {metric.icon && (
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {metric.icon}
                </div>
              )}

              {/* Value */}
              <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                <AnimatedCounter
                  value={metric.value}
                  decimals={metric.decimals}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                />
              </div>

              {/* Label */}
              <h3 className="text-lg font-semibold mb-2 text-[#374045] dark:text-[#E9EEFF]">
                {metric.label}
              </h3>

              {/* Description */}
              {metric.description && (
                <p className="text-sm text-[#5E6E76] dark:text-[#A0AEC0]">
                  {metric.description}
                </p>
              )}

              {/* Hover gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-blue-500/0 group-hover:from-purple-500/5 group-hover:to-blue-500/5 dark:group-hover:from-purple-500/10 dark:group-hover:to-blue-500/10 rounded-2xl transition-all duration-300 pointer-events-none"></div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-[#5E6E76] dark:text-[#A0AEC0] mb-6">
            Join thousands of students and educators transforming collaboration
          </p>
          <a
            href="/demo"
            className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
          >
            See CoStudy in Action
          </a>
        </motion.div>
      </div>
    </section>
  );
}
