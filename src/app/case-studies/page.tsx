"use client";

import { useState } from "react";
import Link from "next/link";
import CaseStudyCard from "@/components/case-studies/CaseStudyCard";
import CaseStudyFilters from "@/components/case-studies/CaseStudyFilters";

// Case study data - in a real app, this would come from a CMS or database
const caseStudies = [
  {
    slug: "stanford-cs-department",
    universityName: "Stanford University",
    department: "Computer Science Department",
    logo: "/images/case-studies/stanford-logo.png", // Placeholder
    studentCount: 850,
    keyMetric: "78% of students joined study groups (vs. 12% before)",
    quote: "CoStudy solved our biggest challenge: helping students connect in 200-person lectures. The data shows it works.",
    author: "Dr. Sarah Chen",
    authorTitle: "CS 101 Professor",
    universitySize: "Large",
    useCase: "Large Lecture Courses",
  },
  {
    slug: "ucla-pre-med",
    universityName: "UCLA",
    department: "Pre-Med Program",
    logo: "/images/case-studies/ucla-logo.png", // Placeholder
    studentCount: 450,
    keyMetric: "Drop rate decreased from 22% to 14% (8% improvement)",
    quote: "For every dollar spent on CoStudy, we retain $12 in tuition from students who would have dropped out.",
    author: "Maria Rodriguez",
    authorTitle: "Director of Academic Success",
    universitySize: "Large",
    useCase: "High-Stakes Programs",
  },
  {
    slug: "community-college-system",
    universityName: "Community College System",
    department: "System-Wide Deployment",
    logo: "/images/case-studies/community-college-logo.png", // Placeholder
    studentCount: 12000,
    keyMetric: "Online course completion: 68% → 81%",
    quote: "CoStudy met our students where they are: working full-time, juggling family, studying late at night. It works.",
    author: "James Thompson",
    authorTitle: "VP of Student Affairs",
    universitySize: "Large",
    useCase: "Online & Hybrid Learning",
  },
];

export default function CaseStudiesPage() {
  const [filters, setFilters] = useState({
    size: "all",
    useCase: "all",
    department: "all",
  });

  // Filter case studies based on selected filters
  const filteredStudies = caseStudies.filter((study) => {
    if (filters.size !== "all") {
      const sizeMatch = study.universitySize.toLowerCase() === filters.size;
      if (!sizeMatch) return false;
    }
    if (filters.useCase !== "all") {
      const useCaseMatch = study.useCase.toLowerCase().replace(/\s+/g, "-") === filters.useCase;
      if (!useCaseMatch) return false;
    }
    if (filters.department !== "all") {
      const deptMatch = study.department.toLowerCase().includes(filters.department.replace("-", " "));
      if (!deptMatch) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-[#121212]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 dark:from-blue-800 dark:via-purple-800 dark:to-indigo-900 text-white py-20 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-10 right-20 text-5xl opacity-20 animate-float">📊</div>
          <div className="absolute bottom-20 left-16 text-4xl opacity-20 animate-pulse">🎓</div>
          <div className="absolute top-1/2 left-1/4 text-4xl opacity-20 animate-bounce">✨</div>

          {/* Gradient orbs */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-cyan-400/20 to-transparent rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-gradient-to-tl from-pink-400/20 to-transparent rounded-full blur-3xl animate-float"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-4">
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                <span className="text-sm font-semibold">Real Results. Real Universities.</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
              See How Universities Are Transforming Student Success
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed drop-shadow-md text-white/95 mb-8">
              Discover proven strategies and measurable results from institutions that have implemented CoStudy
            </p>

            {/* Filter tags - for phase 2, these would be interactive */}
            <div className="flex flex-wrap gap-3 justify-center">
              <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm border border-white/20">
                All Sizes
              </span>
              <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm border border-white/20">
                All Use Cases
              </span>
              <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm border border-white/20">
                All Departments
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#EDE7F9] dark:bg-[#1a1a1a] py-12 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#6B3DCB] dark:text-[#E9EEFF] mb-2">
                13,300+
              </div>
              <div className="text-sm text-[#4A5568] dark:text-[#A0AEC0]">Students Impacted</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#6B3DCB] dark:text-[#E9EEFF] mb-2">
                3
              </div>
              <div className="text-sm text-[#4A5568] dark:text-[#A0AEC0]">Universities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#6B3DCB] dark:text-[#E9EEFF] mb-2">
                +73
              </div>
              <div className="text-sm text-[#4A5568] dark:text-[#A0AEC0]">Average NPS Score</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#6B3DCB] dark:text-[#E9EEFF] mb-2">
                $1.2M
              </div>
              <div className="text-sm text-[#4A5568] dark:text-[#A0AEC0]">Tuition Retained</div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#2D3748] dark:text-[#E9EEFF]">
            Success Stories
          </h2>

          {/* Filters */}
          <CaseStudyFilters onFilterChange={setFilters} />

          {/* Results Count */}
          <div className="mb-6 text-center">
            <p className="text-[#4A5568] dark:text-[#A0AEC0]">
              Showing {filteredStudies.length} of {caseStudies.length} case {filteredStudies.length === 1 ? "study" : "studies"}
            </p>
          </div>

          {/* Case Studies Grid */}
          {filteredStudies.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredStudies.map((study) => (
                <CaseStudyCard key={study.slug} {...study} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-[#2D3748] dark:text-[#E9EEFF] mb-2">
                No case studies match your filters
              </h3>
              <p className="text-[#4A5568] dark:text-[#A0AEC0] mb-4">
                Try adjusting your filters to see more results
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 dark:from-purple-800 dark:via-pink-800 dark:to-red-800 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-8 left-10 text-4xl opacity-20 animate-bounce">🚀</div>
          <div className="absolute bottom-10 right-12 text-3xl opacity-20 animate-pulse">⭐</div>
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute -bottom-20 -right-20 w-56 h-56 bg-white/10 rounded-full blur-3xl animate-float"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 drop-shadow-lg">
            Ready to Transform Your Institution?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-md text-white/95">
            Join leading universities in improving student outcomes. Schedule a demo to see how CoStudy can work for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/demo"
              className="group bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span className="flex items-center justify-center gap-2">
                Schedule a Demo
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
            <Link
              href="/contact"
              className="group bg-transparent text-white px-8 py-4 rounded-xl font-semibold border-2 border-white hover:bg-white/10 transition-all hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span className="flex items-center justify-center gap-2">
                Contact Sales
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
