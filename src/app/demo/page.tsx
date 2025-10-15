import { Metadata } from "next";
import dynamic from "next/dynamic";

// Lazy load the calendar embed to reduce initial bundle size
const CalEmbed = dynamic(() => import("@/components/ui/CalEmbed"), {
  loading: () => (
    <div className="min-h-[700px] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Loading calendar...</p>
      </div>
    </div>
  ),
});

export const metadata: Metadata = {
  title: "Schedule a Demo - CoStudy",
  description: "See CoStudy in action. Schedule a personalized demo to explore how CoStudy can transform collaboration in your classroom.",
};

export default function Demo() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a]">
      {/* Hero Section - Playful & Creative */}
      <section className="relative bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 dark:from-purple-700 dark:via-pink-700 dark:to-orange-600 text-white py-20 overflow-hidden">
        {/* Animated playful background elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Floating geometric shapes */}
          <div className="absolute top-10 left-10 w-20 h-20 border-4 border-white/30 rounded-full animate-float"></div>
          <div className="absolute top-20 right-20 w-16 h-16 bg-white/20 rotate-45 animate-spin-slow"></div>
          <div className="absolute bottom-20 left-1/4 w-24 h-24 border-4 border-white/30 rounded-lg rotate-12 animate-morph"></div>
          <div className="absolute top-1/3 right-1/3 w-12 h-12 bg-yellow-300/40 rounded-full animate-pulse-slow"></div>

          {/* Gradient orbs */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-cyan-400/30 to-transparent rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-gradient-to-tr from-yellow-400/30 to-transparent rounded-full blur-3xl animate-float"></div>

          {/* Playful icons */}
          <div className="absolute top-16 right-1/4 text-4xl opacity-20 animate-bounce">🎨</div>
          <div className="absolute bottom-24 right-16 text-3xl opacity-20 animate-pulse">💫</div>
          <div className="absolute top-1/2 left-12 text-4xl opacity-20 animate-spin-slow">🌈</div>
          <div className="absolute bottom-16 left-1/3 text-3xl opacity-20 animate-float">✏️</div>

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block mb-4">
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30 animate-pulse-slow">
                <span className="text-sm font-semibold">✨ Ready to be amazed?</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">
              See CoStudy in Action
            </h1>
            <p className="text-xl text-white/95 leading-relaxed drop-shadow-md">
              Schedule a personalized demo to explore how CoStudy can transform
              student collaboration in your classroom or institution! 🚀
            </p>
          </div>
        </div>
      </section>

      {/* Benefits of Demo Section - Playful & Animated */}
      <section className="container mx-auto px-4 py-16 relative overflow-hidden">
        {/* Playful background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-yellow-300/20 to-orange-300/20 rounded-full blur-2xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 left-10 w-40 h-40 bg-gradient-to-br from-pink-300/20 to-purple-300/20 rounded-full blur-2xl animate-float"></div>
          <div className="absolute top-1/2 right-1/4 text-6xl opacity-5 dark:opacity-10">✨</div>
          <div className="absolute top-1/4 left-1/4 text-5xl opacity-5 dark:opacity-10">🚀</div>

          {/* Additional geometric shapes */}
          <div className="absolute top-1/3 left-12 w-24 h-24 border-2 border-purple-300/30 dark:border-purple-600/30 rounded-2xl rotate-12 animate-morph"></div>
          <div className="absolute bottom-1/4 right-16 w-20 h-20 border-2 border-blue-300/30 dark:border-blue-600/30 rounded-full animate-pulse-slow"></div>

          {/* Accent lines */}
          <div className="absolute top-20 left-1/3 w-32 h-px bg-gradient-to-r from-transparent via-purple-300/40 dark:via-purple-600/40 to-transparent"></div>
          <div className="absolute bottom-32 right-1/4 w-40 h-px bg-gradient-to-r from-transparent via-pink-300/40 dark:via-pink-600/40 to-transparent"></div>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[#6B3DCB] dark:text-[#E9EEFF]">
          What You&apos;ll Learn
        </h2>
        <p className="text-center text-[#5E6E76] dark:text-[#A0AEC0] mb-12 max-w-2xl mx-auto">
          Get ready for an exciting journey through CoStudy&apos;s superpowers! 🎉
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12 relative">
          {/* Card 1 - Rocket */}
          <div className="group flex gap-4 p-6 rounded-2xl hover:bg-gradient-to-br hover:from-purple-50/50 dark:hover:from-purple-900/20 hover:to-transparent transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <div className="flex-shrink-0">
              <div className="relative w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 dark:from-purple-500 dark:to-purple-700 rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 shadow-lg group-hover:shadow-xl">
                <span className="text-3xl animate-bounce">🚀</span>
                <div className="absolute inset-0 bg-white/20 rounded-2xl animate-pulse"></div>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-2 text-[#374045] dark:text-[#E9EEFF] group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                Complete Platform Walkthrough
              </h3>
              <p className="text-[#5E6E76] dark:text-[#A0AEC0] leading-relaxed">
                Blast off through all features including team charters, peer feedback, and analytics dashboards!
              </p>
            </div>
          </div>

          {/* Card 2 - Sparkles */}
          <div className="group flex gap-4 p-6 rounded-2xl hover:bg-gradient-to-br hover:from-blue-50/50 dark:hover:from-blue-900/20 hover:to-transparent transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <div className="flex-shrink-0">
              <div className="relative w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 dark:from-blue-500 dark:to-cyan-600 rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 shadow-lg group-hover:shadow-xl">
                <span className="text-3xl group-hover:animate-spin">✨</span>
                <div className="absolute inset-0 bg-white/20 rounded-2xl animate-pulse"></div>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-2 text-[#374045] dark:text-[#E9EEFF] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Customized to Your Needs
              </h3>
              <p className="text-[#5E6E76] dark:text-[#A0AEC0] leading-relaxed">
                Discover how CoStudy sparkles with your specific courses, goals, and teaching style!
              </p>
            </div>
          </div>

          {/* Card 3 - Light Bulb */}
          <div className="group flex gap-4 p-6 rounded-2xl hover:bg-gradient-to-br hover:from-amber-50/50 dark:hover:from-amber-900/20 hover:to-transparent transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <div className="flex-shrink-0">
              <div className="relative w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 dark:from-amber-500 dark:to-orange-600 rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 shadow-lg group-hover:shadow-xl">
                <span className="text-3xl group-hover:animate-pulse">💡</span>
                <div className="absolute inset-0 bg-white/20 rounded-2xl animate-pulse"></div>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-2 text-[#374045] dark:text-[#E9EEFF] group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                Implementation Guidance
              </h3>
              <p className="text-[#5E6E76] dark:text-[#A0AEC0] leading-relaxed">
                Illuminate your path to success with onboarding, LMS integration, and team setup tips!
              </p>
            </div>
          </div>

          {/* Card 4 - Party Popper */}
          <div className="group flex gap-4 p-6 rounded-2xl hover:bg-gradient-to-br hover:from-pink-50/50 dark:hover:from-pink-900/20 hover:to-transparent transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <div className="flex-shrink-0">
              <div className="relative w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-500 dark:from-pink-500 dark:to-rose-600 rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 shadow-lg group-hover:shadow-xl">
                <span className="text-3xl group-hover:scale-125 transition-transform">🎉</span>
                <div className="absolute inset-0 bg-white/20 rounded-2xl animate-pulse"></div>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-2 text-[#374045] dark:text-[#E9EEFF] group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                Q&A with Our Team
              </h3>
              <p className="text-[#5E6E76] dark:text-[#A0AEC0] leading-relaxed">
                Celebrate your curiosity! Get all your questions answered by our amazing team!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Scheduling Calendar */}
      <section className="py-16 bg-gradient-to-b from-white dark:from-[#0a0a0a] via-purple-50/20 dark:via-purple-900/10 to-white dark:to-[#0a0a0a]">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-purple-50 dark:from-purple-900/30 to-blue-50 dark:to-blue-900/30 border border-purple-200/50 dark:border-purple-700/50">
                <svg className="w-4 h-4 text-purple-500 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium text-[#4A12C0] dark:text-purple-300">Pick a Time That Works for You</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-3 text-[#374045] dark:text-[#E9EEFF]">
                Schedule Your Demo
              </h2>
              <p className="text-lg text-[#5E6E76] dark:text-[#A0AEC0] max-w-2xl mx-auto leading-relaxed">
                Choose a convenient time below. Our team will walk you through CoStudy&apos;s features
                and answer all your questions.
              </p>
            </div>

            {/* Calendar Embed Container */}
            <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-xl border border-purple-100 dark:border-[#404040]/50 overflow-hidden">
              {/* Professional header bar */}
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">30-Minute Product Demo</h3>
                      <p className="text-white/80 text-sm">with the CoStudy Team</p>
                    </div>
                  </div>
                  <div className="hidden md:flex items-center gap-2 text-white/90 text-sm">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span>30 min</span>
                  </div>
                </div>
              </div>

              {/* Cal.com Embed */}
              <div className="p-4 bg-gray-50/50 dark:bg-[#1a1a1a]/50">
                <CalEmbed
                  calLink="costudy-support-n8d1gq/30min"
                  className="min-h-[700px]"
                />
              </div>
            </div>

            {/* Trust elements below calendar */}
            <div className="mt-8 text-center">
              <p className="text-sm text-[#92A2AA] dark:text-[#A0AEC0] mb-4">
                🔒 Your information is secure and will never be shared
              </p>
              <div className="flex items-center justify-center gap-6 text-xs text-[#92A2AA] dark:text-[#A0AEC0]">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Cancel anytime</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Quick & easy setup</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
