"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

export default function SchoolLogoScroller() {
  const [mounted, setMounted] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !scrollerRef.current) return;

    const scroller = scrollerRef.current;
    let animationId: number;
    let position = 0;
    const speed = 0.4; // pixels per frame (reduced by 20%)

    // Calculate the width of one set of logos
    const firstChild = scroller.firstElementChild as HTMLElement;
    if (!firstChild) return;

    const animate = () => {
      if (scroller) {
        position += speed;

        // Get the width of one complete set (half the total width since we duplicate)
        const scrollWidth = scroller.scrollWidth / 2;

        // When we've scrolled past one full set, reset to the start
        // This creates the seamless loop effect
        if (position >= scrollWidth) {
          position = 0;
        }

        scroller.style.transform = `translate3d(-${position}px, 0, 0)`;
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [mounted]);

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
    <div className="relative py-16 bg-gradient-to-r from-purple-100/50 via-blue-100/40 to-purple-100/50 dark:from-purple-900/10 dark:via-blue-900/5 dark:to-purple-900/10 border-y border-purple-200/70 dark:border-purple-800/30 shadow-inner overflow-hidden">
      <div className="container mx-auto px-4">
        <p className="text-center text-base font-bold text-gray-700 dark:text-gray-300 mb-10 uppercase tracking-wider">
          Trusted by Leading Institutions
        </p>
      </div>

      {/* Gradient masks extending to viewport edges */}
      <div className="absolute left-0 top-0 bottom-0 w-48 bg-gradient-to-r from-purple-100/50 via-purple-100/30 to-transparent dark:from-[#0a0a0a] dark:via-[#0a0a0a]/90 dark:to-transparent z-20 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-purple-100/50 via-purple-100/30 to-transparent dark:from-[#0a0a0a] dark:via-[#0a0a0a]/90 dark:to-transparent z-20 pointer-events-none"></div>

      {/* Scrolling container wrapper */}
      <div className="relative overflow-hidden">
        <div
          ref={scrollerRef}
          className="flex"
          style={{
            willChange: 'transform',
          }}
        >
          {/* Render logos twice for seamless loop */}
          {[...schools, ...schools].map((school, index) => (
            <div
              key={`logo-${index}`}
              className="flex-shrink-0 mx-8"
            >
              <div className="relative h-24 w-40 flex items-center justify-center bg-white dark:bg-[#1a1a1a] rounded-xl p-5 border-2 border-gray-300/70 dark:border-[#404040]">
                <Image
                  src={school.logo}
                  alt={`${school.name} logo`}
                  width={160}
                  height={96}
                  className="object-contain max-h-14 w-auto dark:brightness-[1.3] dark:contrast-[0.9] dark:saturate-[0.8] dark:opacity-90"
                  onError={(e) => {
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
  );
}
