import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community - CoStudy",
  description: "Join the CoStudy community of educators passionate about transforming student collaboration.",
};

export default function Community() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#121212]">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-50/30 via-transparent to-transparent dark:from-purple-900/10 pointer-events-none"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 text-[#2D3748] dark:text-white">
              Join the CoStudy Community
            </h1>
            <p className="text-xl text-[#4A5568] dark:text-gray-200">
              Connect with educators, share best practices, and learn from others who are
              transforming student collaboration.
            </p>
          </div>
        </div>
      </section>

      {/* Community Benefits */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#6B3DCB] dark:text-[#C4B5FD]">
          Why Join Our Community?
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-900/50 dark:to-purple-800/30 w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-sm">
              <span className="text-4xl">🤝</span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-[#2D3748] dark:text-white">Connect & Collaborate</h3>
            <p className="text-[#4A5568] dark:text-gray-200">
              Network with like-minded educators and share your experiences implementing
              team-based learning.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/50 dark:to-blue-800/30 w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-sm">
              <span className="text-4xl">💡</span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-[#2D3748] dark:text-white">Learn & Grow</h3>
            <p className="text-[#4A5568] dark:text-gray-200">
              Access exclusive webinars, workshops, and resources to enhance your teaching practice.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/50 dark:to-green-800/30 w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-sm">
              <span className="text-4xl">🎯</span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-[#2D3748] dark:text-white">Shape the Future</h3>
            <p className="text-[#4A5568] dark:text-gray-200">
              Provide feedback on new features and help shape the future of CoStudy.
            </p>
          </div>
        </div>
      </section>

      {/* Community Platforms */}
      <section className="py-16 bg-gradient-to-b from-purple-50/20 to-transparent dark:from-purple-900/10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#6B3DCB] dark:text-[#C4B5FD]">
            Connect With Us
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="group relative p-8 rounded-2xl border border-purple-100 dark:border-[#404040] hover:border-purple-200 dark:hover:border-purple-700 bg-gradient-to-br from-white to-purple-50/30 dark:from-gray-800 dark:to-purple-900/10 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
              <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/5 dark:bg-purple-500/10 rounded-bl-[100px] rounded-tr-2xl"></div>
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-2xl font-bold mb-3 text-[#2D3748] dark:text-white relative">Discussion Forum</h3>
              <p className="text-[#4A5568] dark:text-gray-200 mb-4 relative">
                Ask questions, share strategies, and discuss challenges with fellow educators.
              </p>
              <div className="text-sm text-purple-600 dark:text-purple-400 font-semibold">Coming Soon</div>
            </div>

            <div className="group relative p-8 rounded-2xl border border-blue-100 dark:border-[#404040] hover:border-blue-200 dark:hover:border-blue-700 bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-800 dark:to-blue-900/10 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/5 dark:bg-blue-500/10 rounded-bl-[100px] rounded-tr-2xl"></div>
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-2xl font-bold mb-3 text-[#2D3748] dark:text-white relative">Events & Webinars</h3>
              <p className="text-[#4A5568] dark:text-gray-200 mb-4 relative">
                Join live sessions, workshops, and conferences focused on collaborative learning.
              </p>
              <div className="text-sm text-blue-600 dark:text-blue-400 font-semibold">Coming Soon</div>
            </div>

            <div className="group relative p-8 rounded-2xl border border-green-100 dark:border-[#404040] hover:border-green-200 dark:hover:border-green-700 bg-gradient-to-br from-white to-green-50/30 dark:from-gray-800 dark:to-green-900/10 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
              <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/5 dark:bg-green-500/10 rounded-bl-[100px] rounded-tr-2xl"></div>
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-2xl font-bold mb-3 text-[#2D3748] dark:text-white relative">Success Stories</h3>
              <p className="text-[#4A5568] dark:text-gray-200 mb-4 relative">
                Read inspiring stories from educators who have transformed their classrooms.
              </p>
              <div className="text-sm text-green-600 dark:text-green-400 font-semibold">Coming Soon</div>
            </div>

            <div className="group relative p-8 rounded-2xl border border-purple-100 dark:border-[#404040] hover:border-purple-200 dark:hover:border-purple-700 bg-gradient-to-br from-white to-purple-50/30 dark:from-gray-800 dark:to-purple-900/10 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
              <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/5 dark:bg-purple-500/10 rounded-bl-[100px] rounded-tr-2xl"></div>
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-2xl font-bold mb-3 text-[#2D3748] dark:text-white relative">Resource Library</h3>
              <p className="text-[#4A5568] dark:text-gray-200 mb-4 relative">
                Access shared templates, guides, and materials created by the community.
              </p>
              <div className="text-sm text-purple-600 dark:text-purple-400 font-semibold">Coming Soon</div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-transparent dark:from-blue-900/10 dark:via-purple-900/10 pointer-events-none"></div>
        <div className="container mx-auto px-4 text-center relative">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-[#2D3748] dark:text-white">
              Stay in the Loop
            </h2>
            <p className="text-xl text-[#4A5568] dark:text-gray-200 mb-10 leading-relaxed">
              Be the first to know about community events, new resources, and product updates.
            </p>
            <Link
              href="/contact"
              className="bg-[#4A12C0] dark:bg-purple-600 text-white px-10 py-5 rounded-xl font-semibold hover:bg-[#3a0e99] dark:hover:bg-purple-700 hover:shadow-lg hover:scale-105 transition-all duration-300 inline-block shadow-md"
            >
              Join the Community
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
