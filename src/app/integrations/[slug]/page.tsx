import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getIntegrationBySlug, integrations, getIntegrationsByCategory } from "@/lib/integrations";
import IntegrationCard from "@/components/integrations/IntegrationCard";

interface IntegrationPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return integrations.map((integration) => ({
    slug: integration.slug,
  }));
}

export async function generateMetadata({ params }: IntegrationPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const integration = getIntegrationBySlug(resolvedParams.slug);

  if (!integration) {
    return {
      title: "Integration Not Found - CoStudy",
    };
  }

  return {
    title: `${integration.name} Integration - CoStudy`,
    description: integration.description,
    openGraph: {
      title: `${integration.name} Integration - CoStudy`,
      description: integration.description,
      url: `https://costudy.co/integrations/${integration.slug}`,
    },
  };
}

export default async function IntegrationPage({ params }: IntegrationPageProps) {
  const resolvedParams = await params;
  const integration = getIntegrationBySlug(resolvedParams.slug);

  if (!integration || integration.status === "coming-soon") {
    notFound();
  }

  const relatedIntegrations = getIntegrationsByCategory(integration.category)
    .filter((i) => i.id !== integration.id && i.status === "available")
    .slice(0, 3);

  const difficultyColors = {
    Easy: "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30",
    Medium: "text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/30",
    Advanced: "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30",
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a]">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 pt-8">
        <nav className="flex items-center gap-2 text-sm text-[#4A5568] dark:text-[#A0AEC0]">
          <Link href="/" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/integrations"
            className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            Integrations
          </Link>
          <span>/</span>
          <span className="text-[#2D3748] dark:text-[#E9EEFF] font-medium">{integration.name}</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Logo */}
            <div className="text-8xl">{integration.logo}</div>

            {/* Header Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-sm font-medium rounded-full">
                  {integration.category}
                </span>
                {integration.setupDifficulty && (
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      difficultyColors[integration.setupDifficulty]
                    }`}
                  >
                    {integration.setupDifficulty}
                  </span>
                )}
                {integration.setupTime && (
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-sm font-medium rounded-full">
                    ⏱️ {integration.setupTime}
                  </span>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl font-black mb-4 text-[#2D3748] dark:text-[#E9EEFF]">
                {integration.name}
              </h1>

              <p className="text-xl text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed mb-6">
                {integration.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/demo?integration={integration.slug}"
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all"
                >
                  Schedule Setup Demo
                </Link>
                <Link
                  href="/contact?subject=Integration+Help"
                  className="px-6 py-3 bg-white dark:bg-[#1a1a1a] text-purple-600 dark:text-purple-400 font-semibold rounded-xl border-2 border-purple-200 dark:border-purple-800 hover:border-purple-300 dark:hover:border-purple-700 transition-all"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      {integration.features && integration.features.length > 0 && (
        <section className="bg-gray-50 dark:bg-[#0f0f0f] py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-[#2D3748] dark:text-[#E9EEFF]">Key Features</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {integration.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-white dark:bg-[#1a1a1a] rounded-xl border border-gray-200 dark:border-gray-800"
                  >
                    <svg
                      className="w-6 h-6 text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-[#2D3748] dark:text-[#E9EEFF]">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Prerequisites Section */}
      {integration.prerequisites && integration.prerequisites.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-[#2D3748] dark:text-[#E9EEFF]">Prerequisites</h2>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6">
              <div className="flex items-start gap-3 mb-4">
                <svg
                  className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-[#2D3748] dark:text-[#E9EEFF] font-medium">
                  Before you begin, make sure you have:
                </p>
              </div>
              <ul className="space-y-2 ml-9">
                {integration.prerequisites.map((prerequisite, index) => (
                  <li key={index} className="text-[#4A5568] dark:text-[#A0AEC0]">
                    • {prerequisite}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Setup Guide Section */}
      {integration.setupGuide && integration.setupGuide.length > 0 && (
        <section className="bg-gray-50 dark:bg-[#0f0f0f] py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-[#2D3748] dark:text-[#E9EEFF]">Setup Guide</h2>
              <div className="space-y-4">
                {integration.setupGuide.map((step, index) => (
                  <div
                    key={index}
                    className="flex gap-4 p-6 bg-white dark:bg-[#1a1a1a] rounded-2xl border border-gray-200 dark:border-gray-800"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-[#2D3748] dark:text-[#E9EEFF] leading-relaxed">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-[#2D3748] dark:text-[#E9EEFF]">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <details className="group bg-white dark:bg-[#1a1a1a] rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
              <summary className="cursor-pointer p-6 font-semibold text-[#2D3748] dark:text-[#E9EEFF] flex items-center justify-between">
                <span>How long does the integration take to set up?</span>
                <svg
                  className="w-5 h-5 group-open:rotate-180 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-6 text-[#4A5568] dark:text-[#A0AEC0]">
                {integration.setupTime
                  ? `The typical setup time is approximately ${integration.setupTime}. This includes configuration, testing, and initial sync.`
                  : "Setup time varies depending on your institution's requirements and existing infrastructure."}
              </div>
            </details>

            <details className="group bg-white dark:bg-[#1a1a1a] rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
              <summary className="cursor-pointer p-6 font-semibold text-[#2D3748] dark:text-[#E9EEFF] flex items-center justify-between">
                <span>Do you offer integration support?</span>
                <svg
                  className="w-5 h-5 group-open:rotate-180 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-6 text-[#4A5568] dark:text-[#A0AEC0]">
                Yes! Our integration specialists are available to help you through every step of the setup process.
                We offer both guided setup calls and hands-on implementation support.
              </div>
            </details>

            <details className="group bg-white dark:bg-[#1a1a1a] rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
              <summary className="cursor-pointer p-6 font-semibold text-[#2D3748] dark:text-[#E9EEFF] flex items-center justify-between">
                <span>What data is synchronized?</span>
                <svg
                  className="w-5 h-5 group-open:rotate-180 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-6 text-[#4A5568] dark:text-[#A0AEC0]">
                CoStudy syncs course information, student rosters, and grades (if grade passback is enabled). All
                data transfer is encrypted and FERPA compliant.
              </div>
            </details>

            <details className="group bg-white dark:bg-[#1a1a1a] rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
              <summary className="cursor-pointer p-6 font-semibold text-[#2D3748] dark:text-[#E9EEFF] flex items-center justify-between">
                <span>Can I test the integration before going live?</span>
                <svg
                  className="w-5 h-5 group-open:rotate-180 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-6 text-[#4A5568] dark:text-[#A0AEC0]">
                Absolutely! We recommend starting with a pilot course to test the integration before rolling it out
                institution-wide. This allows you to verify all features are working as expected.
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* Related Integrations */}
      {relatedIntegrations.length > 0 && (
        <section className="bg-gray-50 dark:bg-[#0f0f0f] py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-[#2D3748] dark:text-[#E9EEFF]">
                Related {integration.category} Integrations
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedIntegrations.map((related) => (
                  <IntegrationCard key={related.id} integration={related} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-center text-white shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Let our integration specialists help you connect {integration.name} with CoStudy.
          </p>
          <Link
            href="/demo"
            className="inline-block bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all"
          >
            Schedule Integration Demo
          </Link>
        </div>
      </section>
    </div>
  );
}
