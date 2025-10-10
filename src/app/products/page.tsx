"use client";

import Link from "next/link";
import { useState } from "react";

type UserRole = "professor" | "student" | "admin" | null;

export default function Products() {
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);

  return (
    <div className="min-h-screen">
      {/* 1. HERO SECTION - Vibrant Gradient Background */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-purple-500 via-purple-400 to-pink-400 dark:from-purple-600 dark:via-purple-500 dark:to-pink-500">
        {/* New Geometric Background Elements - No Dots */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Large gradient orbs */}
          <div className="absolute top-20 right-0 w-96 h-96 bg-pink-400/30 dark:bg-pink-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-400/30 dark:bg-cyan-600/20 rounded-full blur-3xl"></div>

          {/* Geometric shapes */}
          <div className="absolute top-10 left-1/4 w-32 h-32 bg-white/5 border border-white/20 rounded-3xl rotate-12 backdrop-blur-sm"></div>
          <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-white/5 border border-white/20 rounded-2xl -rotate-12 backdrop-blur-sm"></div>
          <div className="absolute bottom-20 left-1/3 w-28 h-28 bg-white/5 border border-white/20 rounded-full backdrop-blur-sm"></div>
          <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-white/10 border-2 border-white/30 rounded-xl rotate-45 backdrop-blur-sm"></div>

          {/* Accent lines */}
          <div className="absolute top-1/4 left-0 w-40 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
          <div className="absolute bottom-1/3 right-0 w-48 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-8" role="list" aria-label="Compliance and certifications">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 dark:bg-white/10 backdrop-blur-md rounded-full text-sm font-medium text-white border border-white/30 shadow-lg" role="listitem">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>FERPA Compliant</span>
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 dark:bg-white/10 backdrop-blur-md rounded-full text-sm font-medium text-white border border-white/30 shadow-lg" role="listitem">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>SOC 2 Certified</span>
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 dark:bg-white/10 backdrop-blur-md rounded-full text-sm font-medium text-white border border-white/30 shadow-lg" role="listitem">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                </svg>
                <span>LMS Integration</span>
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 dark:bg-white/10 backdrop-blur-md rounded-full text-sm font-medium text-white border border-white/30 shadow-lg" role="listitem">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 11a1 1 0 112 0v3a1 1 0 11-2 0v-3zm1-5a1 1 0 100 2 1 1 0 000-2z" />
                </svg>
                <span>WCAG Compliant</span>
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-[1.05] text-white">
              Empower Every Team Member to Grow and Succeed
            </h1>

            {/* Sub-Headline */}
            <p className="text-lg md:text-xl lg:text-2xl text-white/95 dark:text-gray-50 mb-10 leading-relaxed max-w-4xl mx-auto font-medium">
              Research-based collaboration tools that support all learners, regardless of discipline, ability, or learning environment. Build professional skills, improve grading fairness, and save instructors time.
            </p>

            {/* Role Selection */}
            <div className="mb-8">
              <p className="text-sm font-semibold text-white/80 mb-3 uppercase tracking-wide">I am a:</p>
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => setSelectedRole("professor")}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    selectedRole === "professor"
                      ? "bg-white text-purple-600 shadow-xl scale-105"
                      : "bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30 hover:scale-105"
                  }`}
                  aria-pressed={selectedRole === "professor"}
                >
                  Professor/Instructor
                </button>
                <button
                  onClick={() => setSelectedRole("student")}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    selectedRole === "student"
                      ? "bg-white text-purple-600 shadow-xl scale-105"
                      : "bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30 hover:scale-105"
                  }`}
                  aria-pressed={selectedRole === "student"}
                >
                  Student
                </button>
                <button
                  onClick={() => setSelectedRole("admin")}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    selectedRole === "admin"
                      ? "bg-white text-purple-600 shadow-xl scale-105"
                      : "bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30 hover:scale-105"
                  }`}
                  aria-pressed={selectedRole === "admin"}
                >
                  Administrator
                </button>
              </div>
            </div>

            {/* Primary CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/demo"
                className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden"
                aria-label="Schedule a demo of CoStudy"
              >
                <span className="relative z-10 flex items-center gap-2 justify-center">
                  Schedule a Demo
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg border-2 border-white/30 hover:border-white/50 hover:scale-105 transition-all duration-300"
                aria-label="Contact sales team"
              >
                Contact Sales
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </Link>
            </div>

            {/* Outcome Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl">
                <div className="text-5xl font-black text-white mb-2">5,000+</div>
                <div className="text-white/90 font-medium">Students using CoStudy</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl">
                <div className="text-5xl font-black text-white mb-2">96%</div>
                <div className="text-white/90 font-medium">Instructors report better grading</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-xl">
                <div className="text-5xl font-black text-white mb-2">30hrs</div>
                <div className="text-white/90 font-medium">Saved per course semester</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SOCIAL PROOF - Clean White Background */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-600 dark:text-gray-200 mb-10 text-sm uppercase tracking-wide font-semibold">
            Trusted by Leading Institutions Worldwide
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center max-w-5xl mx-auto">
            <div className="flex items-center justify-center p-4 opacity-60 hover:opacity-100 transition-opacity">
              <div className="text-lg md:text-xl font-bold text-gray-700 dark:text-gray-200">Boston College</div>
            </div>
            <div className="flex items-center justify-center p-4 opacity-60 hover:opacity-100 transition-opacity">
              <div className="text-lg md:text-xl font-bold text-gray-700 dark:text-gray-200">Carnegie Mellon</div>
            </div>
            <div className="flex items-center justify-center p-4 opacity-60 hover:opacity-100 transition-opacity">
              <div className="text-lg md:text-xl font-bold text-gray-700 dark:text-gray-200">NYU</div>
            </div>
            <div className="flex items-center justify-center p-4 opacity-60 hover:opacity-100 transition-opacity">
              <div className="text-lg md:text-xl font-bold text-gray-700 dark:text-gray-200">UC Berkeley</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TESTIMONIALS - Gradient Background */}
      <section className="py-20 bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 dark:from-cyan-900/20 dark:via-blue-900/20 dark:to-purple-900/20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-black text-center mb-4 bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-purple-400 dark:to-cyan-400 bg-clip-text text-transparent">
            What Our Community Says
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-200 mb-16 max-w-2xl mx-auto text-lg">
            Real feedback from professors, students, and administrators using CoStudy
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Testimonial 1 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-purple-100 dark:border-purple-700">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  DR
                </div>
                <div>
                  <div className="font-bold text-gray-900 dark:text-white text-lg">Dr. Rachel Martinez</div>
                  <div className="text-sm text-gray-600 dark:text-gray-200">Associate Professor, Boston College</div>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                &quot;CoStudy has transformed how I assess group work. I can finally see who&apos;s contributing and intervene before conflicts escalate. It&apos;s saved me countless hours.&quot;
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-cyan-100 dark:border-cyan-700">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  JK
                </div>
                <div>
                  <div className="font-bold text-gray-900 dark:text-white text-lg">Jamie Kim</div>
                  <div className="text-sm text-gray-600 dark:text-gray-200">Computer Science Student, NYU</div>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                &quot;The peer feedback helped me identify my communication weak spots early on. I actually learned how to collaborate professionally, not just complete assignments.&quot;
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-emerald-100 dark:border-emerald-700">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  MT
                </div>
                <div>
                  <div className="font-bold text-gray-900 dark:text-white text-lg">Michael Thompson</div>
                  <div className="text-sm text-gray-600 dark:text-gray-200">Dean of Engineering, Carnegie Mellon</div>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                &quot;CoStudy&apos;s analytics give us unprecedented insight into student collaboration outcomes. The ROI in terms of student success and faculty satisfaction is remarkable.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CHALLENGES / PAIN POINTS - White Background */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-black text-center mb-4 bg-gradient-to-r from-red-600 to-orange-600 dark:from-red-400 dark:to-orange-400 bg-clip-text text-transparent">
            The Collaboration Challenge
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-200 mb-16 max-w-3xl mx-auto text-lg">
            Group work is essential, but it&apos;s broken. Here&apos;s what instructors and students face every day:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {/* Challenge 1 */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 p-8 rounded-3xl border-2 border-red-100 dark:border-red-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="text-5xl mb-4">😤</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Social Loafing</h3>
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                Some students do all the work while others coast along, making grading unfair and frustrating for everyone.
              </p>
            </div>

            {/* Challenge 2 */}
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 p-8 rounded-3xl border-2 border-orange-100 dark:border-orange-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="text-5xl mb-4">⏰</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Grading Burden</h3>
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                Instructors spend hours trying to determine individual contributions from group submissions.
              </p>
            </div>

            {/* Challenge 3 */}
            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 p-8 rounded-3xl border-2 border-yellow-100 dark:border-yellow-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="text-5xl mb-4">👻</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Late Discovery</h3>
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                Conflicts and dysfunction surface too late to intervene, often after the project deadline.
              </p>
            </div>

            {/* Challenge 4 */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-8 rounded-3xl border-2 border-amber-100 dark:border-amber-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="text-5xl mb-4">🎓</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Missed Learning</h3>
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                Students graduate without developing crucial collaboration skills employers demand.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FEATURES - Alternating Gradient Sections */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-black text-center mb-4 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            Complete Collaboration Toolkit
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-200 mb-20 max-w-3xl mx-auto text-lg">
            Research-backed features that address every stage of team development
          </p>

          {/* Feature 1: Team Charters - Purple Gradient */}
          <div className="max-w-7xl mx-auto mb-20">
            <div className="bg-gradient-to-br from-purple-400 to-pink-400 dark:from-purple-500 dark:to-pink-500 rounded-3xl p-8 md:p-12 shadow-2xl">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="text-white">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold text-sm mb-6">
                    <span>🎯</span> Foundation
                  </div>
                  <h3 className="text-4xl md:text-5xl font-black mb-6">Team Charters</h3>
                  <p className="text-xl text-white/90 mb-6 leading-relaxed">
                    Help teams establish clear expectations, roles, and working agreements from day one.
                  </p>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-lg">Customizable templates for different project types</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-lg">Guided prompts surface potential conflicts early</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-lg">Version history and mid-semester updates</span>
                    </li>
                  </ul>
                  <Link
                    href="/demo"
                    className="inline-flex items-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all"
                  >
                    Watch Demo
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </Link>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-12 rounded-2xl border border-white/20 min-h-[400px] flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-8xl mb-4">📋</div>
                    <p className="text-xl opacity-80">Team Charter Visualization</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2: Growth-Goal Scales - Cyan Gradient */}
          <div className="max-w-7xl mx-auto mb-20">
            <div className="bg-gradient-to-br from-cyan-400 to-blue-400 dark:from-cyan-500 dark:to-blue-500 rounded-3xl p-8 md:p-12 shadow-2xl">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1 bg-white/10 backdrop-blur-sm p-12 rounded-2xl border border-white/20 min-h-[400px] flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-8xl mb-4">📈</div>
                    <p className="text-xl opacity-80">Progress Tracking Dashboard</p>
                  </div>
                </div>
                <div className="order-1 md:order-2 text-white">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold text-sm mb-6">
                    <span>🌱</span> Growth
                  </div>
                  <h3 className="text-4xl md:text-5xl font-black mb-6">Growth-Goal Scales</h3>
                  <p className="text-xl text-white/90 mb-6 leading-relaxed">
                    Allow students to set personal collaboration goals and track progress over the semester.
                  </p>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-lg">Research-backed competencies aligned with professional skills</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-lg">Visual progress tracking and reflection prompts</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-lg">Personalized learning resources</span>
                    </li>
                  </ul>
                  <Link
                    href="/demo"
                    className="inline-flex items-center gap-2 bg-white text-cyan-600 px-6 py-3 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all"
                  >
                    Watch Demo
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 3: Peer Feedback - Emerald Gradient */}
          <div className="max-w-7xl mx-auto mb-20">
            <div className="bg-gradient-to-br from-emerald-400 to-teal-400 dark:from-emerald-500 dark:to-teal-500 rounded-3xl p-8 md:p-12 shadow-2xl">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="text-white">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold text-sm mb-6">
                    <span>💬</span> Continuous Improvement
                  </div>
                  <h3 className="text-4xl md:text-5xl font-black mb-6">Peer Feedback</h3>
                  <p className="text-xl text-white/90 mb-6 leading-relaxed">
                    Enable constructive, structured peer feedback that promotes accountability and continuous improvement.
                  </p>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-lg">Guided prompts for constructive, actionable feedback</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-lg">Anonymous or identified feedback options</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-lg">Aggregated insights to reduce bias</span>
                    </li>
                  </ul>
                  <Link
                    href="/demo"
                    className="inline-flex items-center gap-2 bg-white text-emerald-600 px-6 py-3 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all"
                  >
                    Watch Demo
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </Link>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-12 rounded-2xl border border-white/20 min-h-[400px] flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-8xl mb-4">💭</div>
                    <p className="text-xl opacity-80">Feedback Interface Preview</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 4: Check-Ins - Indigo Gradient */}
          <div className="max-w-7xl mx-auto mb-20">
            <div className="bg-gradient-to-br from-indigo-400 to-violet-400 dark:from-indigo-500 dark:to-violet-500 rounded-3xl p-8 md:p-12 shadow-2xl">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1 bg-white/10 backdrop-blur-sm p-12 rounded-2xl border border-white/20 min-h-[400px] flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-8xl mb-4">✅</div>
                    <p className="text-xl opacity-80">Check-In Dashboard</p>
                  </div>
                </div>
                <div className="order-1 md:order-2 text-white">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold text-sm mb-6">
                    <span>🔔</span> Real-Time Monitoring
                  </div>
                  <h3 className="text-4xl md:text-5xl font-black mb-6">Team Check-Ins</h3>
                  <p className="text-xl text-white/90 mb-6 leading-relaxed">
                    Regular pulse checks help teams stay aligned and instructors identify issues before they escalate.
                  </p>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-lg">Quick surveys to gauge team health and progress</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-lg">Automated alerts for teams that need support</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-lg">Trend analysis across the semester</span>
                    </li>
                  </ul>
                  <Link
                    href="/demo"
                    className="inline-flex items-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all"
                  >
                    Watch Demo
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 5: Instructor Insights - Blue Gradient */}
          <div className="max-w-7xl mx-auto mb-20">
            <div className="bg-gradient-to-br from-blue-400 to-sky-400 dark:from-blue-500 dark:to-sky-500 rounded-3xl p-8 md:p-12 shadow-2xl">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="text-white">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold text-sm mb-6">
                    <span>📊</span> Data-Driven Decisions
                  </div>
                  <h3 className="text-4xl md:text-5xl font-black mb-6">Instructor Insights</h3>
                  <p className="text-xl text-white/90 mb-6 leading-relaxed">
                    Comprehensive analytics dashboard that transforms team data into actionable insights for better teaching.
                  </p>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-lg">At-a-glance team health scores and participation metrics</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-lg">Individual contribution tracking for fair grading</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-lg">Export reports for assessment and accreditation</span>
                    </li>
                  </ul>
                  <Link
                    href="/demo"
                    className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all"
                  >
                    Watch Demo
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </Link>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-12 rounded-2xl border border-white/20 min-h-[400px] flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-8xl mb-4">📈</div>
                    <p className="text-xl opacity-80">Analytics Dashboard</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 6: API Integration - Rose Gradient */}
          <div className="max-w-7xl mx-auto">
            <div className="bg-gradient-to-br from-rose-400 to-pink-400 dark:from-rose-500 dark:to-pink-500 rounded-3xl p-8 md:p-12 shadow-2xl">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1 bg-white/10 backdrop-blur-sm p-12 rounded-2xl border border-white/20 min-h-[400px] flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-8xl mb-4">🔌</div>
                    <p className="text-xl opacity-80">API Integration</p>
                  </div>
                </div>
                <div className="order-1 md:order-2 text-white">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold text-sm mb-6">
                    <span>🔗</span> Seamless Integration
                  </div>
                  <h3 className="text-4xl md:text-5xl font-black mb-6">LMS & Tool Integration</h3>
                  <p className="text-xl text-white/90 mb-6 leading-relaxed">
                    Works seamlessly with your existing learning management system and collaboration tools.
                  </p>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-lg">LTI 1.3 integration with Canvas, Blackboard, Moodle</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-lg">Auto-sync rosters and gradebook data</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-6 h-6 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-lg">SSO and institutional authentication support</span>
                    </li>
                  </ul>
                  <Link
                    href="/demo"
                    className="inline-flex items-center gap-2 bg-white text-rose-600 px-6 py-3 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all"
                  >
                    Watch Demo
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ROLE-BASED BENEFITS - Clean White Background */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-black text-center mb-4 bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400 bg-clip-text text-transparent">
            Benefits For Everyone
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-200 mb-12 max-w-3xl mx-auto text-lg">
            See how CoStudy delivers value to each stakeholder
          </p>

          {/* Role-specific content */}
          <div className="max-w-5xl mx-auto">
            {selectedRole === "professor" && (
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 p-8 rounded-3xl border-2 border-purple-200 dark:border-purple-700">
                  <div className="text-5xl mb-4">⏰</div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Save 30+ Hours Per Semester</h3>
                  <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                    Automate peer assessment, track contributions automatically, and grade with confidence using data-driven insights.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30 p-8 rounded-3xl border-2 border-cyan-200 dark:border-cyan-700">
                  <div className="text-5xl mb-4">📊</div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Data-Backed Grading Fairness</h3>
                  <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                    Move beyond guesswork with quantitative participation metrics and peer-validated contribution data.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 p-8 rounded-3xl border-2 border-emerald-200 dark:border-emerald-700">
                  <div className="text-5xl mb-4">🚨</div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Early Intervention</h3>
                  <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                    Identify struggling teams before the deadline with automated alerts and weekly check-in data.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-indigo-900/30 dark:to-violet-900/30 p-8 rounded-3xl border-2 border-indigo-200 dark:border-indigo-700">
                  <div className="text-5xl mb-4">🎓</div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Build Transferable Skills</h3>
                  <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                    Explicitly teach and assess collaboration competencies that students will use throughout their careers.
                  </p>
                </div>
              </div>
            )}

            {selectedRole === "student" && (
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 p-8 rounded-3xl border-2 border-purple-200 dark:border-purple-700">
                  <div className="text-5xl mb-4">⚖️</div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Fair Recognition</h3>
                  <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                    Your contributions are tracked and valued. No more carrying the team without credit.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30 p-8 rounded-3xl border-2 border-cyan-200 dark:border-cyan-700">
                  <div className="text-5xl mb-4">💡</div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Grow Real Skills</h3>
                  <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                    Develop communication, conflict resolution, and teamwork abilities employers actually want.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 p-8 rounded-3xl border-2 border-emerald-200 dark:border-emerald-700">
                  <div className="text-5xl mb-4">🎯</div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Clear Expectations</h3>
                  <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                    Team charters and structured feedback eliminate confusion about roles and responsibilities.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-indigo-900/30 dark:to-violet-900/30 p-8 rounded-3xl border-2 border-indigo-200 dark:border-indigo-700">
                  <div className="text-5xl mb-4">📈</div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Track Your Progress</h3>
                  <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                    Set personal growth goals and see yourself improve as a collaborator throughout the semester.
                  </p>
                </div>
              </div>
            )}

            {selectedRole === "admin" && (
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 p-8 rounded-3xl border-2 border-purple-200 dark:border-purple-700">
                  <div className="text-5xl mb-4">📊</div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Institution-Wide Analytics</h3>
                  <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                    Track collaboration outcomes across departments, programs, and cohorts to inform strategic decisions.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30 p-8 rounded-3xl border-2 border-cyan-200 dark:border-cyan-700">
                  <div className="text-5xl mb-4">🎓</div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Accreditation Support</h3>
                  <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                    Document learning outcomes with exportable reports that demonstrate teamwork competency development.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 p-8 rounded-3xl border-2 border-emerald-200 dark:border-emerald-700">
                  <div className="text-5xl mb-4">💰</div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Measurable ROI</h3>
                  <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                    Reduce faculty time burden, improve student satisfaction, and enhance employment outcomes.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-indigo-900/30 dark:to-violet-900/30 p-8 rounded-3xl border-2 border-indigo-200 dark:border-indigo-700">
                  <div className="text-5xl mb-4">🔒</div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Enterprise Security</h3>
                  <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                    FERPA compliant, SOC 2 certified, SSO integration, and dedicated support for your institution.
                  </p>
                </div>
              </div>
            )}

            {!selectedRole && (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600 dark:text-gray-200 mb-6">
                  Select your role above to see how CoStudy benefits you specifically
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 p-6 rounded-2xl border border-purple-200 dark:border-purple-700">
                    <div className="text-4xl mb-3">👨‍🏫</div>
                    <p className="font-semibold text-gray-900 dark:text-white">Professors</p>
                    <p className="text-sm text-gray-700 dark:text-gray-200">Save time & grade fairly</p>
                  </div>
                  <div className="bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30 p-6 rounded-2xl border border-cyan-200 dark:border-cyan-700">
                    <div className="text-4xl mb-3">🎓</div>
                    <p className="font-semibold text-gray-900 dark:text-white">Students</p>
                    <p className="text-sm text-gray-700 dark:text-gray-200">Build career skills</p>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 p-6 rounded-2xl border border-emerald-200 dark:border-emerald-700">
                    <div className="text-4xl mb-3">🏛️</div>
                    <p className="font-semibold text-gray-900 dark:text-white">Administrators</p>
                    <p className="text-sm text-gray-700 dark:text-gray-200">Track outcomes</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 7. HOW IT WORKS - Gradient Background */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-slate-900/50 dark:via-gray-900/50 dark:to-zinc-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-black text-center mb-4 bg-gradient-to-r from-slate-700 to-zinc-700 dark:from-slate-300 dark:to-zinc-300 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-200 mb-16 max-w-3xl mx-auto text-lg">
            Get started with CoStudy in three simple steps
          </p>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="relative">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-2 border-purple-200 dark:border-purple-700">
                  <div className="absolute -top-6 left-8 bg-gradient-to-br from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-black shadow-lg">
                    1
                  </div>
                  <div className="text-6xl mb-6 mt-4 text-center">🚀</div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">Setup & Integration</h3>
                  <p className="text-gray-700 dark:text-gray-200 leading-relaxed text-center">
                    Connect CoStudy to your LMS, import your course rosters, and customize team formation settings. Takes less than 15 minutes.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-2 border-cyan-200 dark:border-cyan-700">
                  <div className="absolute -top-6 left-8 bg-gradient-to-br from-cyan-600 to-blue-600 dark:from-cyan-500 dark:to-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-black shadow-lg">
                    2
                  </div>
                  <div className="text-6xl mb-6 mt-4 text-center">📝</div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">Teams Collaborate</h3>
                  <p className="text-gray-700 dark:text-gray-200 leading-relaxed text-center">
                    Students create team charters, give peer feedback, complete check-ins, and track their growth throughout the semester.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-2 border-emerald-200 dark:border-emerald-700">
                  <div className="absolute -top-6 left-8 bg-gradient-to-br from-emerald-600 to-teal-600 dark:from-emerald-500 dark:to-teal-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-black shadow-lg">
                    3
                  </div>
                  <div className="text-6xl mb-6 mt-4 text-center">🎯</div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">Insights & Grading</h3>
                  <p className="text-gray-700 dark:text-gray-200 leading-relaxed text-center">
                    Review analytics, identify struggling teams early, and grade individual contributions fairly with data-backed insights.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. RESEARCH & FAIRNESS - White Background */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-black text-center mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
            Built on Research, Designed for Fairness
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-200 mb-16 max-w-3xl mx-auto text-lg">
            CoStudy is grounded in decades of learning science research and designed with equity at its core
          </p>

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
            {/* Research */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-10 rounded-3xl border-2 border-blue-200 dark:border-blue-700">
              <div className="text-6xl mb-6">🔬</div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Research-Backed Methodology</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-200">Based on Tuckman&apos;s stages of team development</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-200">Aligned with ABET and professional competency frameworks</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-200">Incorporates best practices from team-based learning literature</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-200">Continuously refined through user feedback and efficacy studies</span>
                </li>
              </ul>
            </div>

            {/* Fairness */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-10 rounded-3xl border-2 border-indigo-200 dark:border-indigo-700">
              <div className="text-6xl mb-6">⚖️</div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Equity & Accessibility First</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-200">WCAG 2.1 AA compliant for screen readers and assistive technologies</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-200">Multiple data points reduce bias in peer evaluations</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-200">Supports diverse learning styles and collaboration preferences</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-200">Privacy-first design protects student data and identities</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 9. PRODUCT ROADMAP - Gradient Background */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 dark:from-purple-900/20 dark:via-blue-900/20 dark:to-cyan-900/20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-black text-center mb-4 bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-purple-400 dark:to-cyan-400 bg-clip-text text-transparent">
            What&apos;s Next
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-200 mb-16 max-w-3xl mx-auto text-lg">
            We&apos;re constantly improving CoStudy based on your feedback. Here&apos;s what&apos;s coming soon:
          </p>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Roadmap Item 1 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-2 border-purple-200 dark:border-purple-700">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 dark:bg-purple-900/40 rounded-full text-purple-700 dark:text-purple-300 text-sm font-bold mb-4">
                Coming Q2 2025
              </div>
              <div className="text-5xl mb-4">🤖</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">AI-Powered Insights</h3>
              <p className="text-gray-700 dark:text-gray-200">
                Smart suggestions for team interventions and personalized coaching recommendations.
              </p>
            </div>

            {/* Roadmap Item 2 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-2 border-cyan-200 dark:border-cyan-700">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-100 dark:bg-cyan-900/40 rounded-full text-cyan-700 dark:text-cyan-300 text-sm font-bold mb-4">
                Coming Q2 2025
              </div>
              <div className="text-5xl mb-4">📱</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Mobile App</h3>
              <p className="text-gray-700 dark:text-gray-200">
                Native iOS and Android apps for on-the-go check-ins and feedback.
              </p>
            </div>

            {/* Roadmap Item 3 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-2 border-blue-200 dark:border-blue-700">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/40 rounded-full text-blue-700 dark:text-blue-300 text-sm font-bold mb-4">
                Coming Q3 2025
              </div>
              <div className="text-5xl mb-4">🎥</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Video Reflection</h3>
              <p className="text-gray-700 dark:text-gray-200">
                Record and share video reflections on team experiences and growth.
              </p>
            </div>

            {/* Roadmap Item 4 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-2 border-emerald-200 dark:border-emerald-700">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/40 rounded-full text-emerald-700 dark:text-emerald-300 text-sm font-bold mb-4">
                Coming Q3 2025
              </div>
              <div className="text-5xl mb-4">🌍</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Multi-Language Support</h3>
              <p className="text-gray-700 dark:text-gray-200">
                Full interface translation for Spanish, Mandarin, and 10+ additional languages.
              </p>
            </div>

            {/* Roadmap Item 5 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-2 border-indigo-200 dark:border-indigo-700">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 dark:bg-indigo-900/40 rounded-full text-indigo-700 dark:text-indigo-300 text-sm font-bold mb-4">
                Coming Q4 2025
              </div>
              <div className="text-5xl mb-4">🎮</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Gamification</h3>
              <p className="text-gray-700 dark:text-gray-200">
                Badges, achievements, and friendly competition to boost engagement.
              </p>
            </div>

            {/* Roadmap Item 6 */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-2 border-violet-200 dark:border-violet-700">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-violet-100 dark:bg-violet-900/40 rounded-full text-violet-700 dark:text-violet-300 text-sm font-bold mb-4">
                Coming Q4 2025
              </div>
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Advanced Analytics</h3>
              <p className="text-gray-700 dark:text-gray-200">
                Predictive modeling for team success and longitudinal collaboration tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. PRICING - Gradient Background */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-orange-900/20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-black text-center mb-4 bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
            Flexible Pricing
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-200 mb-16 max-w-3xl mx-auto text-lg">
            Choose the plan that fits your institution&apos;s needs
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Pilot */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-2 border-gray-200 dark:border-gray-700">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Free Pilot</h3>
              <p className="text-gray-600 dark:text-gray-200 mb-6">Perfect for trying CoStudy</p>
              <div className="mb-8">
                <span className="text-5xl font-black text-gray-900 dark:text-white">$0</span>
                <span className="text-gray-600 dark:text-gray-200 text-lg">/semester</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-200 text-lg">Up to 50 students</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-200 text-lg">Core features</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-200 text-lg">Email support</span>
                </li>
              </ul>
              <Link
                href="/contact"
                className="block text-center bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-6 py-4 rounded-xl font-bold text-lg transition-colors"
              >
                Start Free Pilot
              </Link>
            </div>

            {/* Department - Featured */}
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600 p-8 rounded-3xl shadow-2xl transform scale-105 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-white px-6 py-2 rounded-full shadow-lg">
                <span className="text-purple-600 font-black text-sm uppercase tracking-wide">Most Popular</span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-2 mt-4">Department</h3>
              <p className="text-white/90 mb-6">For departments and programs</p>
              <div className="mb-8">
                <span className="text-5xl font-black text-white">Custom</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-white flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white text-lg">Unlimited students</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-white flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white text-lg">All features</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-white flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white text-lg">Priority support</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-white flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white text-lg">Custom integrations</span>
                </li>
              </ul>
              <Link
                href="/demo"
                className="block text-center bg-white text-purple-600 px-6 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all"
              >
                Schedule Demo
              </Link>
            </div>

            {/* Institution */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-2 border-gray-200 dark:border-gray-700">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Institution</h3>
              <p className="text-gray-600 dark:text-gray-200 mb-6">University-wide deployment</p>
              <div className="mb-8">
                <span className="text-5xl font-black text-gray-900 dark:text-white">Custom</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-200 text-lg">Unlimited users</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-200 text-lg">Enterprise features</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-200 text-lg">Dedicated support</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-200 text-lg">SLA guarantees</span>
                </li>
              </ul>
              <Link
                href="/contact"
                className="block text-center bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-6 py-4 rounded-xl font-bold text-lg transition-colors"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 11. FINAL CTA - Purple Gradient */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-purple-500 via-pink-400 to-orange-400 dark:from-purple-600 dark:via-pink-500 dark:to-orange-500">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight text-white">
              Ready to Transform Your Classroom?
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed">
              Join leading educators who are building collaborative skills with CoStudy. Schedule a personalized demo or start a free pilot today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/demo"
                className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-5 rounded-xl font-bold text-xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 overflow-hidden inline-flex items-center justify-center gap-2"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Schedule a Demo
                  <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md text-white px-10 py-5 rounded-xl font-bold text-xl border-2 border-white/30 hover:bg-white/20 hover:scale-105 transition-all duration-300"
              >
                Start Free Pilot
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
