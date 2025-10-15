"use client";

import { useState } from "react";

interface SecurityItem {
  title: string;
  description: string;
}

interface SecuritySectionProps {
  title: string;
  icon: string;
  items: SecurityItem[];
}

export default function SecuritySection({ title, icon, items }: SecuritySectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <span className="text-4xl">{icon}</span>
        <h2 className="text-3xl md:text-4xl font-bold text-[#6B3DCB] dark:text-[#E9EEFF]">
          {title}
        </h2>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-white dark:bg-[#1a1a1a] rounded-lg border-2 border-[#6B3DCB]/10 dark:border-[#E9EEFF]/10 overflow-hidden transition-all"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#EDE7F9]/50 dark:hover:bg-[#2D2433] transition-colors"
              aria-expanded={openIndex === index}
            >
              <span className="font-semibold text-lg text-[#2D3748] dark:text-[#E9EEFF]">
                {item.title}
              </span>
              <svg
                className={`w-6 h-6 text-[#6B3DCB] dark:text-[#A78BFA] transition-transform ${
                  openIndex === index ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? "max-h-96" : "max-h-0"
              }`}
            >
              <div className="px-6 pb-4 pt-2 text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
                {item.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
