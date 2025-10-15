"use client";

import { useEffect, useState, useRef } from "react";

interface Stat {
  value: string;
  label: string;
  icon: string;
  color: string;
}

const stats: Stat[] = [
  {
    value: "10,000+",
    label: "Students Supported",
    icon: "👥",
    color: "from-blue-500 to-blue-600",
  },
  {
    value: "50+",
    label: "Universities Trust CoStudy",
    icon: "🎓",
    color: "from-purple-500 to-purple-600",
  },
  {
    value: "15%",
    label: "Average Retention Improvement",
    icon: "📈",
    color: "from-green-500 to-green-600",
  },
  {
    value: "98%",
    label: "Would Recommend",
    icon: "⭐",
    color: "from-amber-500 to-amber-600",
  },
];

export default function StatsBar() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 relative overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 dark:from-purple-900 dark:via-blue-900 dark:to-purple-900"
      aria-labelledby="stats-heading"
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.1),transparent)]"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <h2 id="stats-heading" className="sr-only">
          CoStudy by the numbers
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center transform transition-all duration-700 delay-${
                index * 100
              } ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              {/* Icon */}
              <div className="text-5xl mb-3 animate-bounce-subtle">
                {stat.icon}
              </div>

              {/* Value with gradient */}
              <div
                className={`text-4xl md:text-5xl font-black mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent drop-shadow-sm`}
                style={{
                  WebkitTextFillColor: "transparent",
                  WebkitBackgroundClip: "text",
                }}
              >
                {isVisible && <CountUpAnimation value={stat.value} />}
              </div>

              {/* Label */}
              <div className="text-sm md:text-base font-semibold text-white/90 dark:text-white/80 uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white dark:from-[#0a0a0a] to-transparent"></div>
    </section>
  );
}

function CountUpAnimation({ value }: { value: string }) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    // Extract numeric part and suffix
    const match = value.match(/^([\d,]+)(\+|%)?$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const numericPart = match[1].replace(/,/g, "");
    const suffix = match[2] || "";
    const targetValue = parseInt(numericPart, 10);

    if (isNaN(targetValue)) {
      setDisplayValue(value);
      return;
    }

    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = targetValue / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(current + increment, targetValue);

      if (step >= steps) {
        clearInterval(timer);
        current = targetValue;
      }

      // Format with commas
      const formatted = Math.floor(current).toLocaleString();
      setDisplayValue(formatted + suffix);
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{displayValue}</span>;
}

// Add subtle bounce animation in global CSS or use Tailwind config
// For now, we'll use inline style approach
