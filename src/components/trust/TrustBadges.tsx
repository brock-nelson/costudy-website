"use client";

import { motion } from "framer-motion";

interface Badge {
  name: string;
  description: string;
  icon: React.ReactNode;
}

interface TrustBadgesProps {
  badges?: Badge[];
  variant?: "horizontal" | "grid";
  showDescriptions?: boolean;
}

const defaultBadges: Badge[] = [
  {
    name: "FERPA Compliant",
    description: "Full compliance with student privacy regulations",
    icon: (
      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: "SOC 2 Type II",
    description: "Enterprise-grade security standards",
    icon: (
      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: "LMS Integration",
    description: "Seamless Canvas, Blackboard & Moodle integration",
    icon: (
      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
        <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
      </svg>
    ),
  },
  {
    name: "GDPR Ready",
    description: "European data protection compliance",
    icon: (
      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
        <path
          fillRule="evenodd"
          d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: "99.9% Uptime",
    description: "Reliable infrastructure you can count on",
    icon: (
      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
      </svg>
    ),
  },
  {
    name: "ADA Accessible",
    description: "Designed for all students",
    icon: (
      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" />
      </svg>
    ),
  },
];

export default function TrustBadges({
  badges = defaultBadges,
  variant = "grid",
  showDescriptions = true,
}: TrustBadgesProps) {
  if (variant === "horizontal") {
    return (
      <div className="py-8 overflow-hidden bg-white dark:bg-[#0a0a0a] border-y border-gray-200 dark:border-[#404040]">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-8">
            {badges.map((badge, index) => (
              <motion.div
                key={`badge-h-${index}-${badge.name}`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-3 text-purple-600 dark:text-purple-400"
              >
                <div className="w-8 h-8">{badge.icon}</div>
                <span className="font-semibold text-[#374045] dark:text-[#E9EEFF]">
                  {badge.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-white dark:bg-[#0a0a0a] relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#374045] dark:text-[#E9EEFF]">
            Enterprise-Grade Security & Compliance
          </h2>
          <p className="text-lg text-[#5E6E76] dark:text-[#A0AEC0] max-w-2xl mx-auto">
            Built with the highest standards for data protection, privacy, and accessibility
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {badges.map((badge, index) => (
            <motion.div
              key={`badge-g-${index}-${badge.name}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="group bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/10 dark:to-blue-900/10 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 hover:scale-105 border border-purple-100 dark:border-purple-900/30"
            >
              <div className="text-purple-600 dark:text-purple-400 flex justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {badge.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#374045] dark:text-[#E9EEFF]">
                {badge.name}
              </h3>
              {showDescriptions && (
                <p className="text-sm text-[#5E6E76] dark:text-[#A0AEC0]">
                  {badge.description}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
