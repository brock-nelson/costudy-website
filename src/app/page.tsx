import Link from "next/link";
import { Metadata } from "next";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import GradientText from "@/components/ui/GradientText";
import SchoolLogoScroller from "@/components/ui/SchoolLogoScroller";

export const metadata: Metadata = {
  title: "CoStudy - Transform Student Collaboration & Teamwork",
  description: "Empower students with structured teamwork tools. CoStudy provides team charters, growth-goal scales, and peer feedback for meaningful collaboration.",
  openGraph: {
    title: "CoStudy - Transform Student Collaboration & Teamwork",
    description: "Empower students with structured teamwork tools. CoStudy provides team charters, growth-goal scales, and peer feedback for meaningful collaboration.",
    url: "https://costudy.co",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CoStudy - Transform Student Collaboration",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CoStudy - Transform Student Collaboration & Teamwork",
    description: "Empower students with structured teamwork tools. CoStudy provides team charters, growth-goal scales, and peer feedback for meaningful collaboration.",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a]">
      {/* Hero Section */}
      <section className="relative container mx-auto px-4 py-24 md:py-32 overflow-hidden" aria-labelledby="hero-heading">
        <AnimatedBackground />
        <div className="hero-content text-center max-w-5xl mx-auto relative z-10">
          {/* Main Heading */}
          <h1 id="hero-heading" className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-[1.1]">
            <GradientText>Transform Student Collaboration</GradientText>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-[#5E6E76] dark:text-gray-100 mb-10 max-w-3xl mx-auto leading-relaxed font-medium">
            Structured teamwork tools that help students build essential collaboration skills
            and achieve better learning outcomes.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/demo"
              className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 overflow-hidden"
              aria-label="Schedule a demo of CoStudy"
            >
              <span className="relative z-10 flex items-center gap-2">
                Schedule a Demo
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link
              href="/products"
              className="group bg-white dark:bg-gray-800 text-[#4A12C0] dark:text-[#A78BFA] px-8 py-4 rounded-xl font-semibold border-2 border-purple-200 dark:border-purple-700 hover:border-purple-300 dark:hover:border-purple-600 hover:bg-purple-50/50 dark:hover:bg-purple-900/30 transition-all duration-300 hover:shadow-lg"
              aria-label="Explore CoStudy products"
            >
              <span className="flex items-center gap-2">
                Explore Products
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
          </div>

          {/* Trust Badge */}
          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-[#92A2AA] dark:text-gray-300">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-purple-500 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>FERPA Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-purple-500 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>SOC 2 Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-purple-500 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>LMS Integration</span>
            </div>
          </div>
        </div>
      </section>

      {/* School Logo Scroller */}
      <SchoolLogoScroller />

      {/* Transition element */}
      <div className="relative h-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white dark:from-[#0a0a0a] via-purple-50/10 dark:via-purple-900/10 to-white dark:to-[#0a0a0a]"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-purple-300/30 dark:via-purple-600/40 to-transparent"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-purple-400/40 dark:bg-purple-500/60 rounded-full shadow-sm shadow-purple-400/30 dark:shadow-purple-500/50"></div>
      </div>

      {/* Audience Sections */}
      <section className="py-20 relative overflow-hidden bg-white dark:bg-[#0a0a0a]" aria-labelledby="solutions-heading">
        {/* Subtle background elements for visual continuity */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-br from-purple-200/20 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 left-10 w-40 h-40 bg-gradient-to-tr from-blue-200/20 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-gradient-to-bl from-purple-300/10 to-transparent border border-purple-200/20 rounded-3xl rotate-12 backdrop-blur-sm"></div>
        </div>

        <div className="container mx-auto px-4 relative">
        <h2 id="solutions-heading" className="text-3xl md:text-4xl font-bold text-center mb-16 text-[#6B3DCB] dark:text-[#C4B5FD]">
          Tailored Solutions for Every Role
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Link
            href="/for-professors"
            className="group relative p-8 rounded-2xl border border-blue-100 dark:border-blue-900/50 hover:border-blue-200 dark:hover:border-blue-700 bg-gradient-to-br from-white dark:from-gray-900 to-blue-50/30 dark:to-blue-950/30 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            aria-label="Learn about CoStudy for professors"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/5 dark:bg-blue-400/10 rounded-bl-[100px] rounded-tr-2xl group-hover:bg-blue-500/10 dark:group-hover:bg-blue-400/20 transition-colors"></div>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-100/0 via-blue-100/0 to-blue-100/0 dark:from-blue-900/0 dark:via-blue-900/0 dark:to-blue-900/0 group-hover:from-blue-100/10 dark:group-hover:from-blue-900/20 group-hover:via-blue-50/5 dark:group-hover:via-blue-900/10 transition-all duration-300 pointer-events-none"></div>
            <h3 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-300 relative">For Professors</h3>
            <p className="text-[#5E6E76] dark:text-gray-300 relative leading-relaxed">
              Streamline team formation, monitor collaboration, and integrate seamlessly with your LMS.
            </p>
          </Link>

          <Link
            href="/for-administrators"
            className="group relative p-8 rounded-2xl border border-green-100 dark:border-green-900/50 hover:border-green-200 dark:hover:border-green-700 bg-gradient-to-br from-white dark:from-gray-900 to-green-50/30 dark:to-green-950/30 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            aria-label="Learn about CoStudy for administrators"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/5 dark:bg-green-400/10 rounded-bl-[100px] rounded-tr-2xl group-hover:bg-green-500/10 dark:group-hover:bg-green-400/20 transition-colors"></div>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-100/0 via-green-100/0 to-green-100/0 dark:from-green-900/0 dark:via-green-900/0 dark:to-green-900/0 group-hover:from-green-100/10 dark:group-hover:from-green-900/20 group-hover:via-green-50/5 dark:group-hover:via-green-900/10 transition-all duration-300 pointer-events-none"></div>
            <h3 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-300 relative">For Administrators</h3>
            <p className="text-[#5E6E76] dark:text-gray-300 relative leading-relaxed">
              Track institutional impact, measure student success, and demonstrate ROI with data-driven insights.
            </p>
          </Link>

          <Link
            href="/for-students"
            className="group relative p-8 rounded-2xl border border-purple-100 dark:border-purple-900/50 hover:border-purple-200 dark:hover:border-purple-700 bg-gradient-to-br from-white dark:from-gray-900 to-purple-50/30 dark:to-purple-950/30 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            aria-label="Learn about CoStudy for students"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/5 dark:bg-purple-400/10 rounded-bl-[100px] rounded-tr-2xl group-hover:bg-purple-500/10 dark:group-hover:bg-purple-400/20 transition-colors"></div>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-100/0 via-purple-100/0 to-purple-100/0 dark:from-purple-900/0 dark:via-purple-900/0 dark:to-purple-900/0 group-hover:from-purple-100/10 dark:group-hover:from-purple-900/20 group-hover:via-purple-50/5 dark:group-hover:via-purple-900/10 transition-all duration-300 pointer-events-none"></div>
            <h3 className="text-2xl font-bold mb-4 text-purple-600 dark:text-purple-300 relative">For Students</h3>
            <p className="text-[#5E6E76] dark:text-gray-300 relative leading-relaxed">
              Build teamwork skills, set clear goals, and give meaningful feedback to teammates.
            </p>
          </Link>
        </div>
        </div>
      </section>

      {/* Transition element between sections */}
      <div className="relative h-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white dark:from-[#0a0a0a] via-blue-50/10 dark:via-blue-900/10 to-white dark:to-[#0a0a0a]"></div>
        <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-blue-300/20 dark:via-blue-600/30 to-transparent"></div>
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-purple-300/20 dark:via-purple-600/30 to-transparent"></div>
      </div>

      {/* Features Preview */}
      <section className="py-20 relative overflow-hidden bg-white dark:bg-[#0a0a0a]" aria-labelledby="features-heading">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-50/20 dark:from-purple-900/10 via-transparent to-transparent pointer-events-none"></div>
        {/* Additional geometric elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-1/4 w-28 h-28 bg-gradient-to-br from-lavender/15 to-transparent rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-1/4 w-36 h-36 bg-gradient-to-tl from-purple-200/15 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-10 w-20 h-20 bg-gradient-to-tr from-blue-200/10 to-transparent border border-blue-200/20 rounded-2xl -rotate-12 backdrop-blur-sm"></div>
        </div>
        <div className="container mx-auto px-4 relative">
          <h2 id="features-heading" className="text-3xl md:text-4xl font-bold text-center mb-16 text-[#6B3DCB] dark:text-[#C4B5FD]">
            Powerful Tools for Better Teamwork
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-purple-100 dark:from-purple-900/50 to-purple-50 dark:to-purple-800/30 w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-sm group-hover:shadow-lg group-hover:shadow-purple-200/50 dark:group-hover:shadow-purple-600/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-200/0 to-purple-200/0 dark:from-purple-400/0 dark:to-purple-400/0 group-hover:from-purple-200/30 dark:group-hover:from-purple-400/20 group-hover:to-transparent rounded-2xl transition-all duration-300"></div>
                <span className="text-4xl relative">📋</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#374045] dark:text-gray-100">Team Charters</h3>
              <p className="text-[#5E6E76] dark:text-gray-300 leading-relaxed">
                Help teams establish clear expectations and working agreements from day one.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-purple-100 dark:from-purple-900/50 to-purple-50 dark:to-purple-800/30 w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-sm group-hover:shadow-lg group-hover:shadow-purple-200/50 dark:group-hover:shadow-purple-600/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-200/0 to-purple-200/0 dark:from-purple-400/0 dark:to-purple-400/0 group-hover:from-purple-200/30 dark:group-hover:from-purple-400/20 group-hover:to-transparent rounded-2xl transition-all duration-300"></div>
                <span className="text-4xl relative">📈</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#374045] dark:text-gray-100">Growth-Goal Scales</h3>
              <p className="text-[#5E6E76] dark:text-gray-300 leading-relaxed">
                Track individual development and measure progress toward collaboration goals.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-purple-100 dark:from-purple-900/50 to-purple-50 dark:to-purple-800/30 w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-sm group-hover:shadow-lg group-hover:shadow-purple-200/50 dark:group-hover:shadow-purple-600/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-200/0 to-purple-200/0 dark:from-purple-400/0 dark:to-purple-400/0 group-hover:from-purple-200/30 dark:group-hover:from-purple-400/20 group-hover:to-transparent rounded-2xl transition-all duration-300"></div>
                <span className="text-4xl relative">💬</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#374045] dark:text-gray-100">Peer Feedback</h3>
              <p className="text-[#5E6E76] dark:text-gray-300 leading-relaxed">
                Facilitate constructive feedback that helps students grow and improve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Transition element between sections */}
      <div className="relative h-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white dark:from-[#0a0a0a] via-lavender/5 dark:via-purple-900/5 to-white dark:to-[#0a0a0a]"></div>
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-300/20 dark:via-purple-600/30 to-transparent"></div>
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-2 h-2 bg-purple-400/40 dark:bg-purple-500/60 rounded-full"></div>
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-2 h-2 bg-blue-400/40 dark:bg-blue-500/60 rounded-full"></div>
      </div>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden bg-white dark:bg-[#0a0a0a]" aria-labelledby="cta-heading">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 dark:from-blue-950/20 via-purple-50/20 dark:via-purple-950/10 to-transparent pointer-events-none"></div>
        {/* Geometric accents for visual interest */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-20 w-32 h-32 bg-gradient-to-br from-purple-300/20 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute bottom-1/4 left-20 w-40 h-40 bg-gradient-to-tl from-blue-300/20 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute top-10 left-1/3 w-24 h-24 bg-gradient-to-br from-lavender/10 to-transparent border border-purple-200/20 rounded-3xl rotate-45 backdrop-blur-sm"></div>
          <div className="absolute bottom-10 right-1/3 w-20 h-20 bg-gradient-to-tl from-blue-200/10 to-transparent border border-blue-200/20 rounded-2xl -rotate-12 backdrop-blur-sm"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative">
          <div className="max-w-3xl mx-auto">
            <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold mb-6 text-[#374045] dark:text-gray-50">
              Ready to Transform Student Collaboration?
            </h2>
            <p className="text-xl text-[#5E6E76] dark:text-gray-300 mb-10 leading-relaxed">
              Join leading educators who are using CoStudy to build essential teamwork skills.
            </p>
            <Link
              href="/contact"
              className="group relative bg-blue-600 text-white px-10 py-5 rounded-xl font-semibold hover:bg-blue-700 hover:shadow-lg hover:scale-105 transition-all duration-300 inline-block shadow-md overflow-hidden"
              aria-label="Get started with CoStudy today"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative">Get Started Today</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
