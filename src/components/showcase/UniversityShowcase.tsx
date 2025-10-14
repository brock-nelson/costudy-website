"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface University {
  name: string;
  logo: string;
  studentCount?: string;
  testimonialSnippet?: string;
  featured?: boolean;
}

interface UniversityShowcaseProps {
  universities?: University[];
  title?: string;
  subtitle?: string;
}

const defaultUniversities: University[] = [
  {
    name: "Boston University",
    logo: "/schools/boston-university.png",
    studentCount: "35,000+",
    testimonialSnippet: "CoStudy has transformed how our students collaborate",
    featured: true,
  },
  {
    name: "Indiana University Kelley School",
    logo: "/schools/indiana-kelley.png",
    studentCount: "8,000+",
    testimonialSnippet: "A game-changer for business education",
    featured: true,
  },
  {
    name: "UC Berkeley",
    logo: "/schools/ucb.png",
    studentCount: "45,000+",
    testimonialSnippet: "Essential for modern collaborative learning",
    featured: true,
  },
  {
    name: "University of San Francisco",
    logo: "/schools/usf.png",
    studentCount: "11,000+",
  },
  {
    name: "NYU",
    logo: "/schools/nyu.png",
    studentCount: "50,000+",
  },
  {
    name: "Boston College",
    logo: "/schools/boston-college.png",
    studentCount: "15,000+",
  },
  {
    name: "University of Arizona",
    logo: "/schools/arizona.png",
    studentCount: "49,000+",
  },
  {
    name: "City College of San Francisco",
    logo: "/schools/ccsf.png",
    studentCount: "60,000+",
  },
  {
    name: "BU PRLab",
    logo: "/schools/bu-prlab.png",
  },
];

export default function UniversityShowcase({
  universities = defaultUniversities,
  title = "Trusted by Leading Universities",
  subtitle = "Join prestigious institutions using CoStudy to enhance student collaboration",
}: UniversityShowcaseProps) {
  const featuredUniversities = universities.filter((u) => u.featured);
  const otherUniversities = universities.filter((u) => !u.featured);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-purple-50/30 dark:from-[#0a0a0a] dark:to-purple-900/5 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-10 w-64 h-64 bg-gradient-to-br from-purple-200/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-10 w-64 h-64 bg-gradient-to-tl from-blue-200/10 to-transparent rounded-full blur-3xl"></div>
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
          <p className="text-lg md:text-xl text-[#5E6E76] dark:text-[#A0AEC0] max-w-3xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Featured Universities */}
        {featuredUniversities.length > 0 && (
          <div className="mb-16">
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {featuredUniversities.map((university) => (
                <motion.div
                  key={university.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5 }}
                  className="group bg-white dark:bg-[#1a1a1a] rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-gray-200 dark:border-[#404040] transition-all duration-300 hover:scale-105"
                >
                  {/* Logo */}
                  <div className="relative h-24 mb-6 flex items-center justify-center">
                    <div className="relative w-full h-full">
                      <Image
                        src={university.logo}
                        alt={`${university.name} logo`}
                        fill
                        className="object-contain dark:brightness-[1.3] dark:contrast-[0.9]"
                      />
                    </div>
                  </div>

                  {/* Student Count */}
                  {university.studentCount && (
                    <div className="text-center mb-4">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {university.studentCount}
                      </div>
                      <div className="text-sm text-[#5E6E76] dark:text-[#A0AEC0]">
                        Students
                      </div>
                    </div>
                  )}

                  {/* Testimonial Snippet */}
                  {university.testimonialSnippet && (
                    <div className="text-center">
                      <p className="text-sm italic text-[#5E6E76] dark:text-[#A0AEC0]">
                        &ldquo;{university.testimonialSnippet}&rdquo;
                      </p>
                    </div>
                  )}

                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-blue-500/0 group-hover:from-purple-500/5 group-hover:to-blue-500/5 dark:group-hover:from-purple-500/10 dark:group-hover:to-blue-500/10 rounded-2xl transition-all duration-300 pointer-events-none"></div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Other Universities Grid */}
        {otherUniversities.length > 0 && (
          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center text-lg font-semibold text-[#5E6E76] dark:text-[#A0AEC0] mb-8 uppercase tracking-wide"
            >
              And Many More
            </motion.h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
              {otherUniversities.map((university) => (
                <motion.div
                  key={university.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.3 }}
                  className="group bg-white dark:bg-[#1a1a1a] rounded-xl p-4 shadow-md hover:shadow-lg border border-gray-200 dark:border-[#404040] transition-all duration-300 hover:scale-110"
                >
                  <div className="relative h-16 flex items-center justify-center">
                    <div className="relative w-full h-full">
                      <Image
                        src={university.logo}
                        alt={`${university.name} logo`}
                        fill
                        className="object-contain dark:brightness-[1.3] dark:contrast-[0.9] group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  </div>
                  {university.studentCount && (
                    <div className="text-center mt-2 text-xs text-[#5E6E76] dark:text-[#A0AEC0]">
                      {university.studentCount}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-16"
        >
          <p className="text-[#5E6E76] dark:text-[#A0AEC0] mb-6 text-lg">
            Ready to join these leading institutions?
          </p>
          <a
            href="/demo"
            className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
          >
            Schedule a Demo
          </a>
        </motion.div>
      </div>
    </section>
  );
}
