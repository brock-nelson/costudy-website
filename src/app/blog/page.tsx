import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - CoStudy",
  description: "Insights, research, and best practices for student collaboration and team-based learning.",
};

export default function Blog() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#121212]">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-50/30 via-transparent to-transparent dark:from-purple-900/10 pointer-events-none"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 text-[#2D3748] dark:text-[#E9EEFF]">
              Blog & Insights
            </h1>
            <p className="text-xl text-[#4A5568] dark:text-[#A0AEC0]">
              Research-backed strategies, success stories, and best practices for fostering
              effective student collaboration.
            </p>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center p-12 border-2 border-dashed border-purple-200 dark:border-[#404040] rounded-2xl bg-purple-50/30 dark:bg-purple-900/20">
            <div className="text-6xl mb-6">📝</div>
            <h2 className="text-3xl font-bold mb-4 text-[#6B3DCB] dark:text-[#E9EEFF]">
              Coming Soon
            </h2>
            <p className="text-lg text-[#4A5568] dark:text-[#A0AEC0] mb-8 max-w-2xl mx-auto">
              We&apos;re working on bringing you insightful articles about team-based learning,
              collaboration best practices, and success stories from educators using CoStudy.
            </p>
            <Link
              href="/contact"
              className="bg-[#4A12C0] dark:bg-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#3a0e99] dark:hover:bg-purple-700 hover:shadow-lg hover:scale-105 transition-all duration-300 inline-block shadow-md"
            >
              Get Notified When We Launch
            </Link>
          </div>
        </div>
      </section>

      {/* Topics Preview */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#6B3DCB] dark:text-[#E9EEFF]">
          What We&apos;ll Be Covering
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-900/50 dark:to-purple-800/30 w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-sm">
              <span className="text-3xl">🎓</span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-[#2D3748] dark:text-[#E9EEFF]">Teaching Strategies</h3>
            <p className="text-[#4A5568] dark:text-[#A0AEC0]">
              Evidence-based approaches to facilitate better teamwork in the classroom.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-900/50 dark:to-purple-800/30 w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-sm">
              <span className="text-3xl">📊</span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-[#2D3748] dark:text-[#E9EEFF]">Research Insights</h3>
            <p className="text-[#4A5568] dark:text-[#A0AEC0]">
              Latest findings in collaborative learning and student development.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-900/50 dark:to-purple-800/30 w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-sm">
              <span className="text-3xl">✨</span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-[#2D3748] dark:text-[#E9EEFF]">Success Stories</h3>
            <p className="text-[#4A5568] dark:text-[#A0AEC0]">
              Real examples of how educators are transforming student collaboration.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
