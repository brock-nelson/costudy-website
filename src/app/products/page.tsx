import Link from "next/link";
import { Metadata } from "next";
import DemoPlaceholder from "@/components/ui/DemoPlaceholder";

export const metadata: Metadata = {
  title: "Products - CoStudy",
  description: "Explore CoStudy's suite of tools for team-based learning, from team charters to analytics dashboards.",
};

export default function Products() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-50/30 via-transparent to-transparent dark:from-purple-900/10 pointer-events-none"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#374045] dark:text-gray-100">
              CoStudy Products
            </h1>
            <p className="text-xl text-[#5E6E76] dark:text-gray-200 leading-relaxed">
              Comprehensive tools to support every aspect of student collaboration and team-based learning.
            </p>
          </div>
        </div>
      </section>

      {/* Core Products */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#6B3DCB] dark:text-[#C4B5FD]">
          Core Features
        </h2>
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Team Charters */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-block bg-purple-100 dark:bg-purple-900/30 px-4 py-1 rounded-full text-sm font-semibold text-purple-600 dark:text-purple-300 mb-4">
                Foundation
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#374045] dark:text-gray-100">Team Charters</h3>
              <p className="text-lg text-[#5E6E76] dark:text-gray-200 mb-6 leading-relaxed">
                Help students establish clear expectations, roles, and working agreements from day one.
                Our guided charter creation process ensures teams start strong and stay aligned.
              </p>
              <ul className="space-y-3 text-[#5E6E76] dark:text-gray-200">
                <li className="flex items-start gap-3">
                  <span className="text-purple-600 dark:text-purple-400 mt-1">✓</span>
                  <span>Customizable templates for different project types</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-600 dark:text-purple-400 mt-1">✓</span>
                  <span>Guided prompts to surface potential conflicts early</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-600 dark:text-purple-400 mt-1">✓</span>
                  <span>Version history and mid-semester updates</span>
                </li>
              </ul>
            </div>
            <DemoPlaceholder
              title="Team Charter Demo"
              description="See how students create collaborative team agreements"
              iconEmoji="📋"
              className="h-80"
            />
          </div>

          {/* Growth-Goal Scales */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <DemoPlaceholder
                title="Growth Tracking Demo"
                description="Watch students track their collaboration skills over time"
                iconEmoji="📈"
                className="h-80 from-blue-100 to-blue-50"
              />
            </div>
            <div className="order-1 md:order-2">
              <div className="inline-block bg-blue-100 dark:bg-blue-900/30 px-4 py-1 rounded-full text-sm font-semibold text-blue-600 dark:text-blue-300 mb-4">
                Growth Tracking
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#374045] dark:text-gray-100">Growth-Goal Scales</h3>
              <p className="text-lg text-[#5E6E76] dark:text-gray-200 mb-6 leading-relaxed">
                Help students set personal collaboration goals and track their progress throughout
                the semester with our evidence-based assessment framework.
              </p>
              <ul className="space-y-3 text-[#5E6E76] dark:text-gray-200">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 dark:text-blue-400 mt-1">✓</span>
                  <span>Research-backed collaboration competencies</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 dark:text-blue-400 mt-1">✓</span>
                  <span>Self-assessment and peer feedback integration</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 dark:text-blue-400 mt-1">✓</span>
                  <span>Visual progress tracking and reflection prompts</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Peer Feedback */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-block bg-green-100 dark:bg-green-900/30 px-4 py-1 rounded-full text-sm font-semibold text-green-600 dark:text-green-300 mb-4">
                Continuous Improvement
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#374045] dark:text-gray-100">Peer Feedback</h3>
              <p className="text-lg text-[#5E6E76] dark:text-gray-200 mb-6 leading-relaxed">
                Structured peer feedback that promotes accountability, constructive criticism,
                and continuous improvement throughout team projects.
              </p>
              <ul className="space-y-3 text-[#5E6E76] dark:text-gray-200">
                <li className="flex items-start gap-3">
                  <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                  <span>Guided prompts for constructive feedback</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                  <span>Anonymous and identified feedback options</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                  <span>Aggregated insights for instructors</span>
                </li>
              </ul>
            </div>
            <DemoPlaceholder
              title="Peer Feedback Demo"
              description="Experience the guided feedback process"
              iconEmoji="💬"
              className="h-80 from-green-100 to-green-50"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-transparent dark:from-blue-900/10 dark:via-purple-900/10 pointer-events-none"></div>
        <div className="container mx-auto px-4 text-center relative">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#374045] dark:text-gray-100">
              See CoStudy in Action
            </h2>
            <p className="text-xl text-[#5E6E76] dark:text-gray-200 mb-10 leading-relaxed">
              Schedule a personalized demo to explore all features and see how CoStudy
              can transform collaboration in your classroom.
            </p>
            <Link
              href="/demo"
              className="bg-blue-600 dark:bg-blue-500 text-white px-10 py-5 rounded-xl font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 hover:shadow-lg hover:scale-105 transition-all duration-300 inline-block shadow-md"
            >
              Schedule a Demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
