import { Metadata } from "next";
import CalEmbed from "@/components/ui/CalEmbed";

export const metadata: Metadata = {
  title: "Schedule a Demo - CoStudy",
  description: "See CoStudy in action. Schedule a personalized demo to explore how CoStudy can transform collaboration in your classroom.",
};

export default function Demo() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a]">
      {/* Hero Section */}
      <section className="bg-[#4A12C0] dark:bg-gradient-to-br dark:from-purple-900 dark:to-blue-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              See CoStudy in Action
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Schedule a personalized demo to explore how CoStudy can transform
              student collaboration in your classroom or institution.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits of Demo Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#6B3DCB] dark:text-[#C4B5FD]">
          What You&apos;ll Learn
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-[#EDE7F9] dark:bg-purple-900/50 rounded-full flex items-center justify-center">
                <span className="text-2xl">✓</span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-[#374045] dark:text-gray-100">
                Complete Platform Walkthrough
              </h3>
              <p className="text-[#5E6E76] dark:text-gray-200 leading-relaxed">
                See all features including team charters, peer feedback, and analytics dashboards.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-[#EDE7F9] dark:bg-purple-900/50 rounded-full flex items-center justify-center">
                <span className="text-2xl">✓</span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-[#374045] dark:text-gray-100">
                Customized to Your Needs
              </h3>
              <p className="text-[#5E6E76] dark:text-gray-200 leading-relaxed">
                Discuss your specific courses, goals, and how CoStudy can support them.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-[#EDE7F9] dark:bg-purple-900/50 rounded-full flex items-center justify-center">
                <span className="text-2xl">✓</span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-[#374045] dark:text-gray-100">
                Implementation Guidance
              </h3>
              <p className="text-[#5E6E76] dark:text-gray-200 leading-relaxed">
                Learn about onboarding, LMS integration, and getting started with your teams.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-[#EDE7F9] dark:bg-purple-900/50 rounded-full flex items-center justify-center">
                <span className="text-2xl">✓</span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-[#374045] dark:text-gray-100">
                Q&A with Our Team
              </h3>
              <p className="text-[#5E6E76] dark:text-gray-200 leading-relaxed">
                Get all your questions answered by our product and education specialists.
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
              <h2 className="text-3xl md:text-4xl font-bold mb-3 text-[#374045] dark:text-gray-100">
                Schedule Your Demo
              </h2>
              <p className="text-lg text-[#5E6E76] dark:text-gray-200 max-w-2xl mx-auto leading-relaxed">
                Choose a convenient time below. Our team will walk you through CoStudy&apos;s features
                and answer all your questions.
              </p>
            </div>

            {/* Calendar Embed Container */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-purple-100 dark:border-purple-800/50 overflow-hidden">
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
              <div className="p-4 bg-gray-50/50 dark:bg-gray-800/50">
                <CalEmbed
                  calLink="costudy-support-n8d1gq/30min"
                  className="min-h-[700px]"
                />
              </div>
            </div>

            {/* Trust elements below calendar */}
            <div className="mt-8 text-center">
              <p className="text-sm text-[#92A2AA] dark:text-gray-400 mb-4">
                🔒 Your information is secure and will never be shared
              </p>
              <div className="flex items-center justify-center gap-6 text-xs text-[#92A2AA] dark:text-gray-400">
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
