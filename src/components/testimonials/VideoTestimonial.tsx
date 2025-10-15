"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export interface TestimonialData {
  universityName: string;
  universityLogo: string;
  personName: string;
  personTitle: string;
  personPhoto: string;
  videoUrl: string;
  videoThumbnail: string;
  quote: string;
  metrics: {
    label: string;
    value: string;
  }[];
  beforeAfter: {
    before: string;
    after: string;
  };
}

interface VideoTestimonialProps {
  testimonial: TestimonialData;
}

export default function VideoTestimonial({ testimonial }: VideoTestimonialProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-[#404040]"
    >
      <div className="grid lg:grid-cols-2 gap-0">
        {/* Video Section */}
        <div className="relative bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-8 flex items-center justify-center">
          <div className="w-full max-w-md">
            {isPlaying ? (
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                  src={testimonial.videoUrl}
                  title={`${testimonial.personName} testimonial video`}
                  style={{ border: 0 }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <button
                onClick={() => setIsPlaying(true)}
                className="relative w-full group cursor-pointer"
                aria-label={`Play testimonial video from ${testimonial.personName}`}
              >
                <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                  <Image
                    src={testimonial.videoThumbnail}
                    alt={`${testimonial.personName} video thumbnail`}
                    fill
                    priority
                    className="object-cover rounded-lg shadow-lg"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors rounded-lg flex items-center justify-center">
                    <div className="w-20 h-20 bg-white/90 group-hover:bg-white rounded-full flex items-center justify-center shadow-xl transition-all group-hover:scale-110">
                      <svg
                        className="w-10 h-10 text-purple-600 ml-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </button>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 flex flex-col justify-between">
          {/* University Logo */}
          <div className="mb-6">
            <div className="relative h-12 w-48">
              <Image
                src={testimonial.universityLogo}
                alt={`${testimonial.universityName} logo`}
                fill
                priority
                className="object-contain object-left dark:brightness-[1.3] dark:contrast-[0.9]"
              />
            </div>
          </div>

          {/* Quote */}
          <div className="mb-6">
            <blockquote className="text-lg md:text-xl text-[#374045] dark:text-[#E9EEFF] italic leading-relaxed mb-4">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
          </div>

          {/* Person Info */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-purple-200 dark:border-purple-800">
              <Image
                src={testimonial.personPhoto}
                alt={testimonial.personName}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="font-bold text-[#374045] dark:text-[#E9EEFF]">
                {testimonial.personName}
              </div>
              <div className="text-sm text-[#5E6E76] dark:text-[#A0AEC0]">
                {testimonial.personTitle}
              </div>
              <div className="text-xs text-[#92A2AA] dark:text-[#718096]">
                {testimonial.universityName}
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {testimonial.metrics.map((metric, index) => (
              <motion.div
                key={`${testimonial.universityName}-${metric.label}-${index}`}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg p-4 border border-purple-100 dark:border-purple-900/50"
              >
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                  {metric.value}
                </div>
                <div className="text-xs text-[#5E6E76] dark:text-[#A0AEC0]">
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Before/After */}
          <div className="border-t border-gray-200 dark:border-[#404040] pt-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs font-semibold text-red-600 dark:text-red-400 mb-1">
                  BEFORE
                </div>
                <div className="text-sm text-[#5E6E76] dark:text-[#A0AEC0]">
                  {testimonial.beforeAfter.before}
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold text-green-600 dark:text-green-400 mb-1">
                  AFTER
                </div>
                <div className="text-sm text-[#5E6E76] dark:text-[#A0AEC0]">
                  {testimonial.beforeAfter.after}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
