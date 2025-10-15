"use client";

import { useState } from "react";
import Image from "next/image";

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  university: string;
  photo: string;
  rating: number;
  persona: "administrator" | "faculty" | "student" | "it";
}

const testimonials: Testimonial[] = [
  {
    quote: "CoStudy delivered a 12% improvement in retention within one semester. The ROI is incredible.",
    name: "Dr. Maria Rodriguez",
    title: "VP of Student Success",
    university: "Large Public University",
    photo: "/testimonials/administrator.jpg",
    rating: 5,
    persona: "administrator",
  },
  {
    quote: "I can finally see which students are struggling and intervene early. CoStudy gives me insights I never had before.",
    name: "Professor James Chen",
    title: "Computer Science Professor",
    university: "Research University",
    photo: "/testimonials/faculty.jpg",
    rating: 5,
    persona: "faculty",
  },
  {
    quote: "I went from feeling lost in a 200-person lecture to having a study group of 6 people who actually get me. Game changer.",
    name: "Sarah Thompson",
    title: "Pre-Med Junior",
    university: "State University",
    photo: "/testimonials/student.jpg",
    rating: 5,
    persona: "student",
  },
  {
    quote: "Setup took 2 hours. SSO integration was seamless. Students were using it within a week.",
    name: "Mike Johnson",
    title: "Director of IT",
    university: "Private University",
    photo: "/testimonials/it-director.jpg",
    rating: 5,
    persona: "it",
  },
];

const personaColors = {
  administrator: {
    bg: "from-green-50 dark:from-green-950/30 to-green-100/50 dark:to-green-900/20",
    border: "border-green-200 dark:border-green-800",
    accent: "text-green-600 dark:text-green-400",
  },
  faculty: {
    bg: "from-blue-50 dark:from-blue-950/30 to-blue-100/50 dark:to-blue-900/20",
    border: "border-blue-200 dark:border-blue-800",
    accent: "text-blue-600 dark:text-blue-400",
  },
  student: {
    bg: "from-purple-50 dark:from-purple-950/30 to-purple-100/50 dark:to-purple-900/20",
    border: "border-purple-200 dark:border-purple-800",
    accent: "text-purple-600 dark:text-purple-400",
  },
  it: {
    bg: "from-indigo-50 dark:from-indigo-950/30 to-indigo-100/50 dark:to-indigo-900/20",
    border: "border-indigo-200 dark:border-indigo-800",
    accent: "text-indigo-600 dark:text-indigo-400",
  },
};

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      className="py-20 relative overflow-hidden bg-white dark:bg-[#0a0a0a]"
      aria-labelledby="testimonials-heading"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-br from-purple-200/20 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-gradient-to-tr from-blue-200/20 to-transparent rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2
            id="testimonials-heading"
            className="text-3xl md:text-4xl font-bold mb-4 text-[#6B3DCB] dark:text-[#E9EEFF]"
          >
            Trusted by Educators and Students
          </h2>
          <p className="text-lg text-[#5E6E76] dark:text-[#A0AEC0] max-w-2xl mx-auto">
            See how CoStudy is transforming collaboration across universities
          </p>
        </div>

        {/* Desktop grid view */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden">
          <div className="max-w-lg mx-auto">
            <TestimonialCard testimonial={testimonials[activeIndex]} />

            {/* Carousel navigation */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={() =>
                  setActiveIndex((prev) =>
                    prev === 0 ? testimonials.length - 1 : prev - 1
                  )
                }
                className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/30 hover:bg-purple-200 dark:hover:bg-purple-800/40 transition-colors"
                aria-label="Previous testimonial"
              >
                <svg
                  className="w-6 h-6 text-purple-600 dark:text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === activeIndex
                        ? "bg-purple-600 dark:bg-purple-400 w-8"
                        : "bg-purple-300 dark:bg-purple-700"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() =>
                  setActiveIndex((prev) =>
                    prev === testimonials.length - 1 ? 0 : prev + 1
                  )
                }
                className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/30 hover:bg-purple-200 dark:hover:bg-purple-800/40 transition-colors"
                aria-label="Next testimonial"
              >
                <svg
                  className="w-6 h-6 text-purple-600 dark:text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const colors = personaColors[testimonial.persona];

  return (
    <div
      className={`relative p-8 rounded-2xl border-2 ${colors.border} bg-gradient-to-br ${colors.bg} hover:shadow-xl transition-all duration-300 group`}
    >
      {/* Quote icon */}
      <div className="absolute top-6 right-6 text-6xl opacity-10 dark:opacity-5 select-none">
        &ldquo;
      </div>

      {/* Star rating */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${colors.accent}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-lg text-[#2D3748] dark:text-[#E9EEFF] mb-6 leading-relaxed relative z-10">
        {testimonial.quote}
      </blockquote>

      {/* Author info */}
      <div className="flex items-center gap-4">
        <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-purple-200 to-purple-300 dark:from-purple-700 dark:to-purple-600 flex items-center justify-center overflow-hidden">
          <Image
            src={testimonial.photo}
            alt={testimonial.name}
            width={56}
            height={56}
            className="object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              const parent = target.parentElement;
              if (parent) {
                // Show initials if image fails to load
                const initials = testimonial.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("");
                parent.innerHTML = `<span class="text-white font-bold text-lg">${initials}</span>`;
              }
            }}
          />
        </div>
        <div>
          <div className="font-bold text-[#2D3748] dark:text-[#E9EEFF]">
            {testimonial.name}
          </div>
          <div className="text-sm text-[#5E6E76] dark:text-[#A0AEC0]">
            {testimonial.title}
          </div>
          <div className={`text-sm font-semibold ${colors.accent}`}>
            {testimonial.university}
          </div>
        </div>
      </div>
    </div>
  );
}
