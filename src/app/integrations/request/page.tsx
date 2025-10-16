import { Metadata } from "next";
import Link from "next/link";
import IntegrationRequestForm from "@/components/forms/IntegrationRequestForm";

export const metadata: Metadata = {
  title: "Request an Integration - CoStudy",
  description:
    "Need a custom integration or want to connect CoStudy with your existing systems? Let us know your requirements and our team will help make it happen.",
  openGraph: {
    title: "Request an Integration - CoStudy",
    description:
      "Need a custom integration or want to connect CoStudy with your existing systems? Let us know your requirements and our team will help make it happen.",
    url: "https://costudy.co/integrations/request",
  },
};

export default function IntegrationRequestPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a]">
      {/* Breadcrumbs */}
      <div className="bg-gray-50 dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link
              href="/"
              className="text-[#5E6E76] dark:text-gray-400 hover:text-[#4A12C0] dark:hover:text-purple-400 transition-colors"
            >
              Home
            </Link>
            <span className="text-[#92A2AA] dark:text-gray-600">/</span>
            <Link
              href="/integrations"
              className="text-[#5E6E76] dark:text-gray-400 hover:text-[#4A12C0] dark:hover:text-purple-400 transition-colors"
            >
              Integrations
            </Link>
            <span className="text-[#92A2AA] dark:text-gray-600">/</span>
            <span className="text-[#374045] dark:text-[#E9EEFF] font-medium">
              Request Integration
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-white dark:from-purple-950/20 dark:via-blue-950/20 dark:to-[#0a0a0a]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#2D3748] dark:text-[#E9EEFF] mb-6">
              Request an Integration
            </h1>
            <p className="text-xl text-[#4A5568] dark:text-[#A0AEC0] mb-8">
              Don&apos;t see the integration you need? Let us know your requirements and
              we&apos;ll work with you to make it happen.
            </p>

            {/* Feature Highlights */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white dark:bg-[#1a1a1a] rounded-xl border border-gray-200 dark:border-gray-800 p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#2D3748] dark:text-[#E9EEFF] mb-2">
                  Fast Response
                </h3>
                <p className="text-sm text-[#4A5568] dark:text-[#A0AEC0]">
                  We&apos;ll review your request and respond within 1-2 business days
                </p>
              </div>

              <div className="bg-white dark:bg-[#1a1a1a] rounded-xl border border-gray-200 dark:border-gray-800 p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#2D3748] dark:text-[#E9EEFF] mb-2">
                  Expert Support
                </h3>
                <p className="text-sm text-[#4A5568] dark:text-[#A0AEC0]">
                  Our integration specialists will guide you through the process
                </p>
              </div>

              <div className="bg-white dark:bg-[#1a1a1a] rounded-xl border border-gray-200 dark:border-gray-800 p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#2D3748] dark:text-[#E9EEFF] mb-2">
                  Custom Solutions
                </h3>
                <p className="text-sm text-[#4A5568] dark:text-[#A0AEC0]">
                  Tailored integrations to fit your specific needs and workflows
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <IntegrationRequestForm />
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-gray-50 dark:bg-[#1a1a1a]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-[#2D3748] dark:text-[#E9EEFF] text-center mb-8">
              What Happens Next?
            </h2>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#2D3748] dark:text-[#E9EEFF] mb-2">
                    Initial Review
                  </h3>
                  <p className="text-[#4A5568] dark:text-[#A0AEC0]">
                    Our team will review your integration request and assess
                    technical feasibility, requirements, and timeline.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#2D3748] dark:text-[#E9EEFF] mb-2">
                    Discovery Call
                  </h3>
                  <p className="text-[#4A5568] dark:text-[#A0AEC0]">
                    We&apos;ll schedule a call to discuss your specific needs, technical
                    architecture, and integration goals in detail.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#2D3748] dark:text-[#E9EEFF] mb-2">
                    Proposal & Timeline
                  </h3>
                  <p className="text-[#4A5568] dark:text-[#A0AEC0]">
                    You&apos;ll receive a detailed proposal including scope, timeline,
                    pricing, and technical specifications.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#2D3748] dark:text-[#E9EEFF] mb-2">
                    Development & Testing
                  </h3>
                  <p className="text-[#4A5568] dark:text-[#A0AEC0]">
                    Our engineering team will build, test, and deploy your
                    integration with ongoing communication and updates.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  5
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#2D3748] dark:text-[#E9EEFF] mb-2">
                    Launch & Support
                  </h3>
                  <p className="text-[#4A5568] dark:text-[#A0AEC0]">
                    We&apos;ll help you launch the integration and provide ongoing
                    support to ensure everything works seamlessly.
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Help */}
            <div className="mt-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Questions? We&apos;re Here to Help
              </h3>
              <p className="text-white/90 mb-6">
                Not sure which integration you need? Want to discuss your use case
                before submitting a request? Our team is happy to help!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Contact Us
                </Link>
                <Link
                  href="/demo"
                  className="inline-block bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-800 transition-colors"
                >
                  Schedule a Demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
