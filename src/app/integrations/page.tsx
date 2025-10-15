import Link from "next/link";
import { Metadata } from "next";
import IntegrationsGrid from "@/components/integrations/IntegrationsGrid";
import GradientText from "@/components/ui/GradientText";

export const metadata: Metadata = {
  title: "Integrations - CoStudy Platform Integrations",
  description:
    "Connect CoStudy with your existing LMS, SSO, SIS, and productivity tools. Seamless integration with Canvas, Blackboard, Moodle, SAML, and more.",
  openGraph: {
    title: "CoStudy Integrations - LMS, SSO, SIS & More",
    description:
      "Seamlessly integrate CoStudy with Canvas, Blackboard, Moodle, SAML SSO, Azure AD, and other education platforms.",
    url: "https://costudy.co/integrations",
  },
};

export default function IntegrationsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a]">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 dark:from-purple-900/10 via-transparent to-blue-50/50 dark:to-blue-900/10 pointer-events-none"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
              <GradientText>Integrations That Work For You</GradientText>
            </h1>
            <p className="text-xl md:text-2xl text-[#5E6E76] dark:text-[#A0AEC0] mb-8 leading-relaxed">
              Connect CoStudy seamlessly with your existing learning management systems, authentication providers, and productivity tools.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-[#92A2AA] dark:text-[#A0AEC0]">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-green-500 dark:text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>LTI 1.3 Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-green-500 dark:text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>SAML 2.0 Compatible</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-green-500 dark:text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>RESTful API</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-16">
        <IntegrationsGrid />
      </section>

      {/* API & Developer Section */}
      <section className="bg-gradient-to-br from-purple-50 dark:from-purple-900/20 to-blue-50 dark:to-blue-900/20 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-[#1a1a1a] p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg">
                <div className="text-4xl mb-4">🔧</div>
                <h3 className="text-2xl font-bold mb-3 text-[#2D3748] dark:text-[#E9EEFF]">
                  API Documentation
                </h3>
                <p className="text-[#4A5568] dark:text-[#A0AEC0] mb-6 leading-relaxed">
                  Build custom integrations with our comprehensive REST API. Access real-time data, automate workflows, and create tailored experiences.
                </p>
                <Link
                  href="/contact?subject=API+Access"
                  className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold hover:gap-3 transition-all"
                >
                  Request API Access
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
              </div>

              <div className="bg-white dark:bg-[#1a1a1a] p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg">
                <div className="text-4xl mb-4">🔔</div>
                <h3 className="text-2xl font-bold mb-3 text-[#2D3748] dark:text-[#E9EEFF]">
                  Webhooks
                </h3>
                <p className="text-[#4A5568] dark:text-[#A0AEC0] mb-6 leading-relaxed">
                  Receive real-time notifications about team activities, submissions, and feedback through customizable webhooks.
                </p>
                <Link
                  href="/contact?subject=Webhook+Setup"
                  className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold hover:gap-3 transition-all"
                >
                  Learn More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Request CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-center text-white shadow-2xl">
            <div className="text-5xl mb-6">💡</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Need a Different Integration?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Let us know which platforms you use, and we&apos;ll work to add them to our roadmap.
            </p>
            <Link
              href="/contact?subject=Integration+Request"
              className="inline-block bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all"
            >
              Request an Integration
            </Link>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-[#2D3748] dark:text-[#E9EEFF]">
            Need Help Getting Started?
          </h2>
          <p className="text-lg text-[#4A5568] dark:text-[#A0AEC0] mb-8">
            Our integration specialists are here to help you connect CoStudy with your institution&apos;s technology stack.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/demo"
              className="px-8 py-4 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 hover:shadow-lg transition-all"
            >
              Schedule Integration Consultation
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-white dark:bg-[#1a1a1a] text-purple-600 dark:text-purple-400 font-semibold rounded-xl border-2 border-purple-200 dark:border-purple-800 hover:border-purple-300 dark:hover:border-purple-700 transition-all"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
