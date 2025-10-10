"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function SchoolLogoScroller() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const schools = [
    { name: "Boston University", logo: "/schools/boston-university.png" },
    { name: "Indiana University Kelley School", logo: "/schools/indiana-kelley.png" },
    { name: "BU PRLab", logo: "/schools/bu-prlab.png" },
    { name: "University of San Francisco", logo: "/schools/usf.png" },
    { name: "City College of San Francisco", logo: "/schools/ccsf.png" },
    { name: "UC Berkeley", logo: "/schools/ucb.png" },
    { name: "NYU", logo: "/schools/nyu.png" },
    { name: "Boston College", logo: "/schools/boston-college.png" },
    { name: "University of Arizona", logo: "/schools/arizona.png" },
  ];

  if (!mounted) {
    return (
      <div className="py-8 overflow-hidden bg-gradient-to-r from-purple-50/30 via-blue-50/20 to-purple-50/30 dark:from-purple-900/10 dark:via-blue-900/5 dark:to-purple-900/10">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm font-semibold text-gray-600 dark:text-gray-300 mb-6 uppercase tracking-wide">
            Trusted by Leading Institutions
          </p>
          <div className="flex justify-center gap-8 opacity-50">
            <div className="w-32 h-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="w-32 h-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="w-32 h-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gradient-to-r from-purple-100/50 via-blue-100/40 to-purple-100/50 dark:from-purple-900/10 dark:via-blue-900/5 dark:to-purple-900/10 border-y border-purple-200/70 dark:border-purple-800/30 shadow-inner">
      <div className="container mx-auto px-4">
        <p className="text-center text-base font-bold text-gray-700 dark:text-gray-300 mb-10 uppercase tracking-wider">
          Trusted by Leading Institutions
        </p>

        {/* Static grid layout - organized in rows */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {schools.map((school, index) => (
              <div
                key={`${school.name}-${index}`}
                className="group transition-all duration-300"
              >
                <div className="relative h-24 flex items-center justify-center bg-white/80 dark:bg-gray-800/40 rounded-xl p-5 backdrop-blur-md border-2 border-gray-300/70 dark:border-gray-700/50 group-hover:border-purple-400 dark:group-hover:border-purple-600 group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-purple-200/50 dark:group-hover:shadow-purple-900/30 transition-all duration-300">
                  <Image
                    src={school.logo}
                    alt={`${school.name} logo`}
                    width={160}
                    height={96}
                    className="object-contain max-h-14 w-auto filter opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 dark:brightness-0 dark:invert dark:opacity-80 dark:group-hover:opacity-100"
                    onError={(e) => {
                      // Fallback to text if image doesn't load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `<div class="text-xs text-center font-semibold text-gray-500 dark:text-gray-400 px-2">${school.name}</div>`;
                      }
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
