import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing - CoStudy | Affordable Plans for Students",
  description: "Choose the perfect plan for your study needs. Free forever for basic features. Pro features for $9/month. Enterprise solutions for universities.",
};

const pricingTiers = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started with study groups",
    features: [
      "Create up to 3 study groups",
      "Join unlimited groups",
      "Basic scheduling",
      "Group chat",
      "Study session reminders",
      "Mobile app access",
      "Community support",
    ],
    cta: "Get Started Free",
    ctaLink: "/signup",
    popular: false,
    color: "purple",
  },
  {
    name: "Pro",
    price: "$9",
    period: "per month",
    description: "Unlock powerful features to maximize your success",
    features: [
      "Everything in Free",
      "Unlimited study groups",
      "Advanced scheduling with calendar sync",
      "AI study recommendations",
      "Priority support",
      "Custom study analytics",
      "Shared note-taking",
      "Video call integration",
      "Export study reports",
      "Ad-free experience",
    ],
    cta: "Start Pro Trial",
    ctaLink: "/signup?plan=pro",
    popular: true,
    color: "purple",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "pricing",
    description: "Complete solution for universities and institutions",
    features: [
      "Everything in Pro",
      "Unlimited users",
      "Dedicated account manager",
      "Custom branding",
      "Advanced analytics dashboard",
      "SSO integration",
      "Priority onboarding",
      "API access",
      "Custom integrations",
      "SLA guarantee",
      "Training sessions",
    ],
    cta: "Contact Sales",
    ctaLink: "/demo",
    popular: false,
    color: "purple",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#121212]">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-50/30 via-transparent to-transparent dark:from-purple-900/10 pointer-events-none"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 text-[#2D3748] dark:text-[#E9EEFF]">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-[#4A5568] dark:text-[#A0AEC0]">
              Start free, upgrade when you need more. No hidden fees, cancel anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative bg-white dark:bg-[#1E1E1E] border-2 rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl ${
                  tier.popular
                    ? "border-purple-600 dark:border-purple-500 shadow-xl scale-105"
                    : "border-gray-200 dark:border-[#404040] hover:border-purple-300 dark:hover:border-purple-700"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-[#2D3748] dark:text-[#E9EEFF] mb-2">
                    {tier.name}
                  </h2>
                  <div className="mb-4">
                    <span className="text-5xl font-bold text-purple-600 dark:text-purple-400">
                      {tier.price}
                    </span>
                    {tier.price !== "Custom" && (
                      <span className="text-[#718096] dark:text-[#A0AEC0] ml-2">
                        /{tier.period}
                      </span>
                    )}
                    {tier.price === "Custom" && (
                      <span className="text-[#718096] dark:text-[#A0AEC0] ml-2">
                        {tier.period}
                      </span>
                    )}
                  </div>
                  <p className="text-[#4A5568] dark:text-[#A0AEC0] text-sm">
                    {tier.description}
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start text-[#4A5568] dark:text-[#A0AEC0]"
                    >
                      <svg
                        className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-3 mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={tier.ctaLink}
                  className={`block w-full text-center py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                    tier.popular
                      ? "bg-purple-600 text-white hover:bg-purple-700 hover:shadow-lg"
                      : "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900/50"
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 dark:bg-[#1A1A1A] py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#2D3748] dark:text-[#E9EEFF]">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <div className="bg-white dark:bg-[#1E1E1E] rounded-xl p-6 border border-gray-200 dark:border-[#404040]">
                <h3 className="text-lg font-semibold text-[#2D3748] dark:text-[#E9EEFF] mb-2">
                  Can I cancel anytime?
                </h3>
                <p className="text-[#4A5568] dark:text-[#A0AEC0]">
                  Yes! You can cancel your Pro subscription at any time. You'll continue to have access until the end of your billing period.
                </p>
              </div>

              <div className="bg-white dark:bg-[#1E1E1E] rounded-xl p-6 border border-gray-200 dark:border-[#404040]">
                <h3 className="text-lg font-semibold text-[#2D3748] dark:text-[#E9EEFF] mb-2">
                  Is there a student discount?
                </h3>
                <p className="text-[#4A5568] dark:text-[#A0AEC0]">
                  CoStudy is built for students, so our pricing is already student-friendly! The Free plan includes all essential features, and Pro is just $9/month.
                </p>
              </div>

              <div className="bg-white dark:bg-[#1E1E1E] rounded-xl p-6 border border-gray-200 dark:border-[#404040]">
                <h3 className="text-lg font-semibold text-[#2D3748] dark:text-[#E9EEFF] mb-2">
                  What payment methods do you accept?
                </h3>
                <p className="text-[#4A5568] dark:text-[#A0AEC0]">
                  We accept all major credit cards (Visa, MasterCard, American Express) and debit cards through Stripe. Enterprise customers can arrange invoicing.
                </p>
              </div>

              <div className="bg-white dark:bg-[#1E1E1E] rounded-xl p-6 border border-gray-200 dark:border-[#404040]">
                <h3 className="text-lg font-semibold text-[#2D3748] dark:text-[#E9EEFF] mb-2">
                  Can I upgrade or downgrade my plan?
                </h3>
                <p className="text-[#4A5568] dark:text-[#A0AEC0]">
                  Absolutely! You can upgrade to Pro anytime and start using premium features immediately. Downgrading to Free will take effect at the end of your billing cycle.
                </p>
              </div>

              <div className="bg-white dark:bg-[#1E1E1E] rounded-xl p-6 border border-gray-200 dark:border-[#404040]">
                <h3 className="text-lg font-semibold text-[#2D3748] dark:text-[#E9EEFF] mb-2">
                  What's included in Enterprise?
                </h3>
                <p className="text-[#4A5568] dark:text-[#A0AEC0]">
                  Enterprise plans are customized for your institution's needs. This includes unlimited users, custom branding, SSO integration, dedicated support, and more. Contact our sales team to discuss your requirements.
                </p>
              </div>

              <div className="bg-white dark:bg-[#1E1E1E] rounded-xl p-6 border border-gray-200 dark:border-[#404040]">
                <h3 className="text-lg font-semibold text-[#2D3748] dark:text-[#E9EEFF] mb-2">
                  Do you offer refunds?
                </h3>
                <p className="text-[#4A5568] dark:text-[#A0AEC0]">
                  We offer a 14-day money-back guarantee for Pro subscriptions. If you're not satisfied, contact support within 14 days of your purchase for a full refund.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-700 dark:to-purple-900 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Study Habits?
          </h2>
          <p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of students who are studying smarter, not harder, with CoStudy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="bg-white text-purple-700 px-8 py-4 rounded-xl font-semibold hover:bg-purple-50 hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Start Free Today
            </Link>
            <Link
              href="/demo"
              className="bg-purple-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-purple-400 hover:shadow-lg hover:scale-105 transition-all duration-300 border-2 border-white/30"
            >
              Schedule a Demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
