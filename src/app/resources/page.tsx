import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources - CoStudy",
  description: "Guides, templates, and tools to help you implement effective team-based learning with CoStudy.",
};

export default function Resources() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#121212]">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 via-transparent to-transparent dark:from-blue-900/10 pointer-events-none"></div>
        {/* Additional background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-blue-300/20 dark:from-blue-600/20 to-transparent rounded-full blur-2xl animate-pulse-slow"></div>
          <div className="absolute bottom-10 left-10 w-40 h-40 bg-gradient-to-tr from-purple-300/20 dark:from-purple-600/20 to-transparent rounded-full blur-2xl animate-float"></div>
          <div className="absolute top-1/2 right-1/4 w-20 h-20 border-2 border-blue-300/20 dark:border-blue-600/30 rounded-xl rotate-12 animate-morph"></div>
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#2D3748] dark:text-[#E9EEFF]">
              Resources & Guides
            </h1>
            <p className="text-xl text-[#4A5568] dark:text-[#A0AEC0] leading-relaxed">
              Everything you need to implement and optimize team-based learning in your courses.
            </p>
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="group relative p-8 rounded-2xl border border-blue-100 dark:border-[#404040] hover:border-blue-200 dark:hover:border-blue-700 bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-800 dark:to-blue-900/10 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/5 dark:bg-blue-500/10 rounded-bl-[100px] rounded-tr-2xl"></div>
            <div className="text-4xl mb-4">📖</div>
            <h3 className="text-xl font-bold mb-3 text-[#2D3748] dark:text-[#E9EEFF] relative">Getting Started Guide</h3>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] relative leading-relaxed">
              Step-by-step instructions for setting up CoStudy in your classroom.
            </p>
            <div className="mt-4 text-sm text-blue-600 dark:text-blue-400 font-semibold">Coming Soon</div>
          </div>

          <div className="group relative p-8 rounded-2xl border border-purple-100 dark:border-[#404040] hover:border-purple-200 dark:hover:border-purple-700 bg-gradient-to-br from-white to-purple-50/30 dark:from-gray-800 dark:to-purple-900/10 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
            <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/5 dark:bg-purple-500/10 rounded-bl-[100px] rounded-tr-2xl"></div>
            <div className="text-4xl mb-4">📋</div>
            <h3 className="text-xl font-bold mb-3 text-[#2D3748] dark:text-[#E9EEFF] relative">Team Charter Templates</h3>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] relative leading-relaxed">
              Ready-to-use templates for creating effective team agreements.
            </p>
            <div className="mt-4 text-sm text-purple-600 dark:text-purple-400 font-semibold">Coming Soon</div>
          </div>

          <div className="group relative p-8 rounded-2xl border border-green-100 dark:border-[#404040] hover:border-green-200 dark:hover:border-green-700 bg-gradient-to-br from-white to-green-50/30 dark:from-gray-800 dark:to-green-900/10 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
            <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/5 dark:bg-green-500/10 rounded-bl-[100px] rounded-tr-2xl"></div>
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold mb-3 text-[#2D3748] dark:text-[#E9EEFF] relative">Assessment Rubrics</h3>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] relative leading-relaxed">
              Rubrics for evaluating teamwork and collaboration skills.
            </p>
            <div className="mt-4 text-sm text-green-600 dark:text-green-400 font-semibold">Coming Soon</div>
          </div>

          <div className="group relative p-8 rounded-2xl border border-blue-100 dark:border-[#404040] hover:border-blue-200 dark:hover:border-blue-700 bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-800 dark:to-blue-900/10 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/5 dark:bg-blue-500/10 rounded-bl-[100px] rounded-tr-2xl"></div>
            <div className="text-4xl mb-4">🎬</div>
            <h3 className="text-xl font-bold mb-3 text-[#2D3748] dark:text-[#E9EEFF] relative">Video Tutorials</h3>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] relative leading-relaxed">
              Watch demos and learn best practices from expert educators.
            </p>
            <div className="mt-4 text-sm text-blue-600 dark:text-blue-400 font-semibold">Coming Soon</div>
          </div>

          <div className="group relative p-8 rounded-2xl border border-purple-100 dark:border-[#404040] hover:border-purple-200 dark:hover:border-purple-700 bg-gradient-to-br from-white to-purple-50/30 dark:from-gray-800 dark:to-purple-900/10 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
            <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/5 dark:bg-purple-500/10 rounded-bl-[100px] rounded-tr-2xl"></div>
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold mb-3 text-[#2D3748] dark:text-[#E9EEFF] relative">Case Studies</h3>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] relative leading-relaxed">
              Real-world examples of successful team-based learning implementations.
            </p>
            <div className="mt-4 text-sm text-purple-600 dark:text-purple-400 font-semibold">Coming Soon</div>
          </div>

          <div className="group relative p-8 rounded-2xl border border-green-100 dark:border-[#404040] hover:border-green-200 dark:hover:border-green-700 bg-gradient-to-br from-white to-green-50/30 dark:from-gray-800 dark:to-green-900/10 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
            <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/5 dark:bg-green-500/10 rounded-bl-[100px] rounded-tr-2xl"></div>
            <div className="text-4xl mb-4">💡</div>
            <h3 className="text-xl font-bold mb-3 text-[#2D3748] dark:text-[#E9EEFF] relative">Best Practices</h3>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] relative leading-relaxed">
              Tips and strategies from experienced educators in the CoStudy community.
            </p>
            <div className="mt-4 text-sm text-green-600 dark:text-green-400 font-semibold">Coming Soon</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-blue-50/20 to-transparent dark:from-purple-900/10 dark:via-blue-900/10 pointer-events-none"></div>
        {/* Additional background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-purple-300/20 dark:from-purple-600/20 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-28 h-28 bg-gradient-to-tl from-blue-300/20 dark:from-blue-600/20 to-transparent rounded-full blur-2xl"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#2D3748] dark:text-[#E9EEFF]">
              Need Help Getting Started?
            </h2>
            <p className="text-xl text-[#4A5568] dark:text-[#A0AEC0] mb-10 leading-relaxed">
              Our team is here to support you every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/demo"
                className="bg-blue-600 dark:bg-blue-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-md"
              >
                Schedule a Demo
              </Link>
              <Link
                href="/contact"
                className="bg-white dark:bg-[#1a1a1a] text-blue-600 dark:text-blue-300 px-8 py-4 rounded-xl font-semibold border-2 border-blue-600 dark:border-[#404040] hover:bg-blue-50 dark:hover:bg-[#2e2e2e] hover:scale-105 transition-all duration-300"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
