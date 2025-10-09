import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources - CoStudy",
  description: "Guides, templates, and tools to help you implement effective team-based learning with CoStudy.",
};

export default function Resources() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 via-transparent to-transparent pointer-events-none"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 text-[#374045]">
              Resources & Guides
            </h1>
            <p className="text-xl text-[#5E6E76]">
              Everything you need to implement and optimize team-based learning in your courses.
            </p>
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="group relative p-8 rounded-2xl border border-blue-100 hover:border-blue-200 bg-gradient-to-br from-white to-blue-50/30 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/5 rounded-bl-[100px] rounded-tr-2xl"></div>
            <div className="text-4xl mb-4">📖</div>
            <h3 className="text-xl font-bold mb-3 text-[#374045] relative">Getting Started Guide</h3>
            <p className="text-[#5E6E76] relative">
              Step-by-step instructions for setting up CoStudy in your classroom.
            </p>
            <div className="mt-4 text-sm text-blue-600 font-semibold">Coming Soon</div>
          </div>

          <div className="group relative p-8 rounded-2xl border border-purple-100 hover:border-purple-200 bg-gradient-to-br from-white to-purple-50/30 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
            <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/5 rounded-bl-[100px] rounded-tr-2xl"></div>
            <div className="text-4xl mb-4">📋</div>
            <h3 className="text-xl font-bold mb-3 text-[#374045] relative">Team Charter Templates</h3>
            <p className="text-[#5E6E76] relative">
              Ready-to-use templates for creating effective team agreements.
            </p>
            <div className="mt-4 text-sm text-purple-600 font-semibold">Coming Soon</div>
          </div>

          <div className="group relative p-8 rounded-2xl border border-green-100 hover:border-green-200 bg-gradient-to-br from-white to-green-50/30 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
            <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/5 rounded-bl-[100px] rounded-tr-2xl"></div>
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold mb-3 text-[#374045] relative">Assessment Rubrics</h3>
            <p className="text-[#5E6E76] relative">
              Rubrics for evaluating teamwork and collaboration skills.
            </p>
            <div className="mt-4 text-sm text-green-600 font-semibold">Coming Soon</div>
          </div>

          <div className="group relative p-8 rounded-2xl border border-blue-100 hover:border-blue-200 bg-gradient-to-br from-white to-blue-50/30 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/5 rounded-bl-[100px] rounded-tr-2xl"></div>
            <div className="text-4xl mb-4">🎬</div>
            <h3 className="text-xl font-bold mb-3 text-[#374045] relative">Video Tutorials</h3>
            <p className="text-[#5E6E76] relative">
              Watch demos and learn best practices from expert educators.
            </p>
            <div className="mt-4 text-sm text-blue-600 font-semibold">Coming Soon</div>
          </div>

          <div className="group relative p-8 rounded-2xl border border-purple-100 hover:border-purple-200 bg-gradient-to-br from-white to-purple-50/30 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
            <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/5 rounded-bl-[100px] rounded-tr-2xl"></div>
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold mb-3 text-[#374045] relative">Case Studies</h3>
            <p className="text-[#5E6E76] relative">
              Real-world examples of successful team-based learning implementations.
            </p>
            <div className="mt-4 text-sm text-purple-600 font-semibold">Coming Soon</div>
          </div>

          <div className="group relative p-8 rounded-2xl border border-green-100 hover:border-green-200 bg-gradient-to-br from-white to-green-50/30 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
            <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/5 rounded-bl-[100px] rounded-tr-2xl"></div>
            <div className="text-4xl mb-4">💡</div>
            <h3 className="text-xl font-bold mb-3 text-[#374045] relative">Best Practices</h3>
            <p className="text-[#5E6E76] relative">
              Tips and strategies from experienced educators in the CoStudy community.
            </p>
            <div className="mt-4 text-sm text-green-600 font-semibold">Coming Soon</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-blue-50/20 to-transparent pointer-events-none"></div>
        <div className="container mx-auto px-4 text-center relative">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-[#374045]">
              Need Help Getting Started?
            </h2>
            <p className="text-xl text-[#5E6E76] mb-10">
              Our team is here to support you every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/demo"
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-md"
              >
                Schedule a Demo
              </Link>
              <Link
                href="/contact"
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold border-2 border-blue-600 hover:bg-blue-50 hover:scale-105 transition-all duration-300"
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
