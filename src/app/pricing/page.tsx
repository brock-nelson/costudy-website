'use client';

import Link from "next/link";
import { useState } from "react";

// Note: This would normally be in layout/page, but since we need 'use client' for state, we'll handle SEO differently
// export const metadata: Metadata = {
//   title: "Pricing - CoStudy | Plans Starting at $7.99/mo",
//   description: "Choose the perfect plan for your study needs. Free forever for basic features. Pro from $7.99/month for students. Enterprise solutions starting at $3,000/year.",
// };

const pricingTiers = [
  {
    name: "Free",
    monthlyPrice: 0,
    annualPrice: 0,
    studentMonthlyPrice: 0,
    studentAnnualPrice: 0,
    description: "Perfect for getting started with study groups",
    features: [
      "Create up to 2 study groups",
      "Join unlimited groups",
      "Basic scheduling",
      "Group chat (30-day history)",
      "Study session reminders",
      "50MB storage per group",
      "Mobile app access",
      "Community support",
    ],
    limitations: [
      "No screen sharing",
      "No session recording",
      "Limited AI features",
    ],
    cta: "Get Started Free",
    ctaLink: "/signup",
    popular: false,
    highlight: false,
  },
  {
    name: "Pro",
    monthlyPrice: 9.99,
    annualPrice: 99,
    studentMonthlyPrice: 7.99,
    studentAnnualPrice: 79,
    description: "Everything you need to study smarter and achieve more",
    features: [
      "Everything in Free, plus:",
      "Unlimited study groups",
      "Screen sharing & video calls",
      "Session recording & playback",
      "AI study recommendations",
      "Advanced scheduling with calendar sync",
      "Unlimited storage & full chat history",
      "Shared whiteboard & note-taking",
      "Pomodoro timer & focus mode",
      "Notion, Drive & LMS integrations",
      "Advanced search across all content",
      "Priority support",
      "Ad-free experience",
    ],
    limitations: [],
    cta: "Start 14-Day Free Trial",
    ctaLink: "/signup?plan=pro",
    popular: true,
    highlight: true,
    badge: "Most Popular",
    savings: "2 months free",
  },
  {
    name: "Enterprise",
    monthlyPrice: null,
    annualPrice: null,
    studentMonthlyPrice: null,
    studentAnnualPrice: null,
    startingPrice: "Starting at $3,000/year",
    description: "Complete solution for universities and institutions",
    features: [
      "Everything in Pro, plus:",
      "Unlimited users & groups",
      "Single Sign-On (SSO)",
      "LMS auto-sync (Canvas, Blackboard)",
      "Custom branding & white-label",
      "Advanced analytics dashboard",
      "Admin controls & permissions",
      "FERPA compliance & SOC 2",
      "API access & webhooks",
      "Dedicated account manager",
      "Priority onboarding & training",
      "SLA guarantee (99.9% uptime)",
      "Custom integrations",
      "24/7 premium support",
    ],
    limitations: [],
    cta: "Contact Sales",
    ctaLink: "/demo",
    popular: false,
    highlight: false,
    badge: "Best for Universities",
  },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Computer Science, Stanford",
    avatar: "SC",
    quote: "CoStudy helped me find the perfect study group. My grades improved by a whole letter grade!",
  },
  {
    name: "Marcus Johnson",
    role: "Pre-Med, UCLA",
    avatar: "MJ",
    quote: "The AI recommendations saved me hours of searching. Found study partners who actually match my schedule.",
  },
  {
    name: "Emily Rodriguez",
    role: "Engineering, MIT",
    avatar: "ER",
    quote: "Best $8/month I&apos;ve ever spent. The screen sharing and recording features are game-changers.",
  },
];

const faqs = [
  {
    question: "Can I cancel anytime?",
    answer: "Yes! You can cancel your Pro subscription at any time. You&apos;ll continue to have access until the end of your billing period. No questions asked, no hassle.",
  },
  {
    question: "What's included in the 14-day free trial?",
    answer: "Full access to all Pro features—no credit card required to start. Try unlimited groups, screen sharing, AI recommendations, and everything else. If you love it, upgrade. If not, stay on Free forever.",
  },
  {
    question: "How does student verification work?",
    answer: "We use SheerID to verify your student status instantly with your .edu email or student ID. Get 20% off automatically—that&apos;s $7.99/month instead of $9.99. Verification takes less than 60 seconds.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, MasterCard, American Express, Discover) and debit cards through Stripe. Enterprise customers can arrange invoicing and purchase orders.",
  },
  {
    question: "Is there a money-back guarantee?",
    answer: "Yes! We offer a 14-day money-back guarantee for Pro subscriptions. If you&apos;re not satisfied within 14 days of purchase, contact support for a full refund. Zero risk.",
  },
  {
    question: "Can I upgrade or downgrade my plan?",
    answer: "Absolutely! Upgrade to Pro anytime and start using premium features immediately. Downgrading to Free will take effect at the end of your billing cycle, and you&apos;ll keep your data.",
  },
  {
    question: "How does Enterprise pricing work?",
    answer: "Enterprise plans are customized for your institution&apos;s needs and size. We offer tiered pricing based on student count: $3,000-5,000/year (500-2K students), $8,000-15,000/year (2K-10K students), and custom pricing for larger institutions. Start with a free 1-semester pilot!",
  },
  {
    question: "Do you offer group or team discounts?",
    answer: "Yes! For groups of 5+ students, we offer team pricing at $6/user/month (save 40%). Perfect for study groups, clubs, or project teams who want to study together.",
  },
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [isStudent, setIsStudent] = useState(true);

  const getPrice = (tier: typeof pricingTiers[0]) => {
    if (tier.startingPrice) return tier.startingPrice;

    let price: number | null = 0;
    if (billingCycle === 'monthly') {
      price = isStudent ? tier.studentMonthlyPrice : tier.monthlyPrice;
    } else {
      price = isStudent ? tier.studentAnnualPrice : tier.annualPrice;
    }

    if (price === null || price === 0) return "$0";
    if (billingCycle === 'annual') {
      return `$${Math.floor(price / 12)}`;
    }
    return `$${price}`;
  };

  const getPeriod = (tier: typeof pricingTiers[0]) => {
    if (tier.startingPrice) return "";
    if (tier.monthlyPrice === 0) return "forever";
    if (billingCycle === 'annual') return "per month, billed annually";
    return "per month";
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#121212]">
      {/* Hero Section */}
      <section className="pt-20 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-50/30 via-transparent to-transparent dark:from-purple-900/10 pointer-events-none"></div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-6xl font-bold mb-6 text-[#2D3748] dark:text-[#E9EEFF]">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-[#4A5568] dark:text-[#A0AEC0] mb-8">
              Join 10,000+ students studying smarter. Start free, upgrade when you&apos;re ready.
              <br />
              <span className="text-purple-600 dark:text-purple-400 font-semibold">
                No credit card required • 14-day money-back guarantee
              </span>
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 dark:bg-[#1E1E1E] text-[#4A5568] dark:text-[#A0AEC0]'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-6 py-2 rounded-lg font-semibold transition-all relative ${
                  billingCycle === 'annual'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 dark:bg-[#1E1E1E] text-[#4A5568] dark:text-[#A0AEC0]'
                }`}
              >
                Annual
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                  Save 17%
                </span>
              </button>
            </div>

            {/* Student Toggle */}
            <div className="flex items-center justify-center gap-3">
              <input
                type="checkbox"
                id="student-toggle"
                checked={isStudent}
                onChange={(e) => setIsStudent(e.target.checked)}
                className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
              />
              <label htmlFor="student-toggle" className="text-[#4A5568] dark:text-[#A0AEC0] cursor-pointer">
                I&apos;m a student (get 20% off with .edu email verification)
              </label>
            </div>
          </div>

          {/* Social Proof Bar */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-6 flex flex-wrap items-center justify-center gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">10,000+</div>
                <div className="text-sm text-[#4A5568] dark:text-[#A0AEC0]">Active Students</div>
              </div>
              <div className="h-8 w-px bg-purple-200 dark:bg-purple-800"></div>
              <div>
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">50+</div>
                <div className="text-sm text-[#4A5568] dark:text-[#A0AEC0]">Universities</div>
              </div>
              <div className="h-8 w-px bg-purple-200 dark:bg-purple-800"></div>
              <div>
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">4.9/5</div>
                <div className="text-sm text-[#4A5568] dark:text-[#A0AEC0]">Student Rating</div>
              </div>
              <div className="h-8 w-px bg-purple-200 dark:bg-purple-800"></div>
              <div>
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">98%</div>
                <div className="text-sm text-[#4A5568] dark:text-[#A0AEC0]">Would Recommend</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative bg-white dark:bg-[#1E1E1E] border-2 rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl ${
                  tier.popular
                    ? "border-purple-600 dark:border-purple-500 shadow-xl lg:scale-105"
                    : "border-gray-200 dark:border-[#404040] hover:border-purple-300 dark:hover:border-purple-700"
                }`}
              >
                {tier.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-[#4A12C0] dark:bg-[#8B5CF6] text-white px-4 py-1 rounded-full text-sm font-semibold">
                      {tier.badge}
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-[#2D3748] dark:text-[#E9EEFF] mb-2">
                    {tier.name}
                  </h2>
                  <div className="mb-4">
                    <span className="text-5xl font-bold text-purple-600 dark:text-purple-400">
                      {getPrice(tier)}
                    </span>
                    {!tier.startingPrice && tier.monthlyPrice !== 0 && billingCycle === 'annual' && tier.monthlyPrice !== null && tier.annualPrice !== null && (
                      <div className="text-sm text-green-600 dark:text-green-400 mt-1">
                        Save ${isStudent && tier.studentMonthlyPrice && tier.studentAnnualPrice ? tier.studentMonthlyPrice * 12 - tier.studentAnnualPrice : tier.monthlyPrice * 12 - tier.annualPrice}/year
                      </div>
                    )}
                    <div className="text-[#718096] dark:text-[#A0AEC0] mt-2">
                      {getPeriod(tier)}
                    </div>
                  </div>
                  <p className="text-[#4A5568] dark:text-[#A0AEC0] text-sm">
                    {tier.description}
                  </p>
                </div>

                <ul className="space-y-4 mb-8 min-h-[400px]">
                  {tier.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className={`flex items-start ${
                        feature.startsWith('Everything in')
                          ? 'text-[#2D3748] dark:text-[#E9EEFF] font-semibold'
                          : 'text-[#4A5568] dark:text-[#A0AEC0]'
                      }`}
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
                  className={`block w-full text-center py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                    tier.popular
                      ? "bg-purple-600 text-white hover:bg-purple-700 hover:shadow-lg hover:scale-105"
                      : "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900/50"
                  }`}
                >
                  {tier.cta}
                </Link>

                {tier.popular && (
                  <div className="mt-4 text-center text-sm text-[#718096] dark:text-[#A0AEC0]">
                    No credit card required for trial
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="bg-gray-50 dark:bg-[#1A1A1A] py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-semibold text-[#2D3748] dark:text-[#E9EEFF] mb-2">Bank-Level Security</h3>
              <p className="text-sm text-[#4A5568] dark:text-[#A0AEC0]">256-bit SSL encryption, FERPA compliant, SOC 2 certified</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-[#2D3748] dark:text-[#E9EEFF] mb-2">14-Day Money-Back</h3>
              <p className="text-sm text-[#4A5568] dark:text-[#A0AEC0]">Not satisfied? Get a full refund, no questions asked</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-[#2D3748] dark:text-[#E9EEFF] mb-2">24/7 Support</h3>
              <p className="text-sm text-[#4A5568] dark:text-[#A0AEC0]">Priority support for Pro, dedicated manager for Enterprise</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#2D3748] dark:text-[#E9EEFF]">
            Loved by Students Everywhere
          </h2>
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-white dark:bg-[#1E1E1E] rounded-xl p-6 border border-gray-200 dark:border-[#404040]">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold mr-3">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-[#2D3748] dark:text-[#E9EEFF]">{testimonial.name}</div>
                    <div className="text-sm text-[#718096] dark:text-[#A0AEC0]">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-[#4A5568] dark:text-[#A0AEC0] italic">&quot;{testimonial.quote}&quot;</p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="bg-gray-50 dark:bg-[#1A1A1A] py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#2D3748] dark:text-[#E9EEFF]">
            Compare Plans
          </h2>
          <div className="max-w-5xl mx-auto overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200 dark:border-[#404040]">
                  <th className="text-left py-4 px-4 text-[#2D3748] dark:text-[#E9EEFF]">Feature</th>
                  <th className="text-center py-4 px-4 text-[#2D3748] dark:text-[#E9EEFF]">Free</th>
                  <th className="text-center py-4 px-4 text-purple-600 dark:text-purple-400">Pro</th>
                  <th className="text-center py-4 px-4 text-[#2D3748] dark:text-[#E9EEFF]">Enterprise</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-gray-200 dark:border-[#404040]">
                  <td className="py-3 px-4 text-[#4A5568] dark:text-[#A0AEC0]">Study Groups</td>
                  <td className="text-center py-3 px-4 text-[#4A5568] dark:text-[#A0AEC0]">2</td>
                  <td className="text-center py-3 px-4 text-purple-600 dark:text-purple-400 font-semibold">Unlimited</td>
                  <td className="text-center py-3 px-4 text-[#4A5568] dark:text-[#A0AEC0]">Unlimited</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-[#404040]">
                  <td className="py-3 px-4 text-[#4A5568] dark:text-[#A0AEC0]">Screen Sharing</td>
                  <td className="text-center py-3 px-4">—</td>
                  <td className="text-center py-3 px-4">✓</td>
                  <td className="text-center py-3 px-4">✓</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-[#404040]">
                  <td className="py-3 px-4 text-[#4A5568] dark:text-[#A0AEC0]">Session Recording</td>
                  <td className="text-center py-3 px-4">—</td>
                  <td className="text-center py-3 px-4">✓</td>
                  <td className="text-center py-3 px-4">✓</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-[#404040]">
                  <td className="py-3 px-4 text-[#4A5568] dark:text-[#A0AEC0]">AI Recommendations</td>
                  <td className="text-center py-3 px-4">Limited</td>
                  <td className="text-center py-3 px-4">✓</td>
                  <td className="text-center py-3 px-4">✓</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-[#404040]">
                  <td className="py-3 px-4 text-[#4A5568] dark:text-[#A0AEC0]">Storage</td>
                  <td className="text-center py-3 px-4 text-[#4A5568] dark:text-[#A0AEC0]">50MB</td>
                  <td className="text-center py-3 px-4 text-purple-600 dark:text-purple-400 font-semibold">Unlimited</td>
                  <td className="text-center py-3 px-4 text-[#4A5568] dark:text-[#A0AEC0]">Unlimited</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-[#404040]">
                  <td className="py-3 px-4 text-[#4A5568] dark:text-[#A0AEC0]">LMS Integration</td>
                  <td className="text-center py-3 px-4">—</td>
                  <td className="text-center py-3 px-4">✓</td>
                  <td className="text-center py-3 px-4">Auto-Sync</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-[#404040]">
                  <td className="py-3 px-4 text-[#4A5568] dark:text-[#A0AEC0]">SSO & Admin Controls</td>
                  <td className="text-center py-3 px-4">—</td>
                  <td className="text-center py-3 px-4">—</td>
                  <td className="text-center py-3 px-4">✓</td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-[#404040]">
                  <td className="py-3 px-4 text-[#4A5568] dark:text-[#A0AEC0]">Support</td>
                  <td className="text-center py-3 px-4 text-[#4A5568] dark:text-[#A0AEC0]">Community</td>
                  <td className="text-center py-3 px-4 text-[#4A5568] dark:text-[#A0AEC0]">Priority</td>
                  <td className="text-center py-3 px-4 text-[#4A5568] dark:text-[#A0AEC0]">24/7 Dedicated</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#2D3748] dark:text-[#E9EEFF]">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-white dark:bg-[#1E1E1E] rounded-xl p-6 border border-gray-200 dark:border-[#404040]">
                  <h3 className="text-lg font-semibold text-[#2D3748] dark:text-[#E9EEFF] mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-[#4A5568] dark:text-[#A0AEC0]">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-700 dark:to-purple-900 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Study Smarter, Not Harder?
          </h2>
          <p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto">
            Join 10,000+ students achieving their academic goals with CoStudy.
            Start free, no credit card required.
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
          <p className="text-purple-200 text-sm mt-6">
            ✓ No credit card required  ✓ 14-day free trial  ✓ Cancel anytime
          </p>
        </div>
      </section>
    </div>
  );
}
