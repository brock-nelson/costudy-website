import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community - CoStudy",
  description: "Join the CoStudy community of educators passionate about transforming student collaboration.",
};

export default function Community() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-50/30 via-transparent to-transparent pointer-events-none"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 text-[#374045]">
              Join the CoStudy Community
            </h1>
            <p className="text-xl text-[#5E6E76]">
              Connect with educators, share best practices, and learn from others who are
              transforming student collaboration.
            </p>
          </div>
        </div>
      </section>

      {/* Community Benefits */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#6B3DCB]">
          Why Join Our Community?
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="bg-gradient-to-br from-purple-100 to-purple-50 w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-sm">
              <span className="text-4xl">🤝</span>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-[#374045]">Connect & Collaborate</h3>
            <p className="text-[#5E6E76]">
              Network with like-minded educators and share your experiences implementing
              team-based learning.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-gradient-to-br from-blue-100 to-blue-50 w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-sm">
              <span className="text-4xl">💡</span>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-[#374045]">Learn & Grow</h3>
            <p className="text-[#5E6E76]">
              Access exclusive webinars, workshops, and resources to enhance your teaching practice.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-gradient-to-br from-green-100 to-green-50 w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-sm">
              <span className="text-4xl">🎯</span>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-[#374045]">Shape the Future</h3>
            <p className="text-[#5E6E76]">
              Provide feedback on new features and help shape the future of CoStudy.
            </p>
          </div>
        </div>
      </section>

      {/* Community Platforms */}
      <section className="py-16 bg-gradient-to-b from-purple-50/20 to-transparent">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#6B3DCB]">
            Connect With Us
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="group relative p-8 rounded-2xl border border-purple-100 hover:border-purple-200 bg-gradient-to-br from-white to-purple-50/30 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
              <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/5 rounded-bl-[100px] rounded-tr-2xl"></div>
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-2xl font-bold mb-3 text-[#374045] relative">Discussion Forum</h3>
              <p className="text-[#5E6E76] mb-4 relative">
                Ask questions, share strategies, and discuss challenges with fellow educators.
              </p>
              <div className="text-sm text-purple-600 font-semibold">Coming Soon</div>
            </div>

            <div className="group relative p-8 rounded-2xl border border-blue-100 hover:border-blue-200 bg-gradient-to-br from-white to-blue-50/30 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/5 rounded-bl-[100px] rounded-tr-2xl"></div>
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-2xl font-bold mb-3 text-[#374045] relative">Events & Webinars</h3>
              <p className="text-[#5E6E76] mb-4 relative">
                Join live sessions, workshops, and conferences focused on collaborative learning.
              </p>
              <div className="text-sm text-blue-600 font-semibold">Coming Soon</div>
            </div>

            <div className="group relative p-8 rounded-2xl border border-green-100 hover:border-green-200 bg-gradient-to-br from-white to-green-50/30 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
              <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/5 rounded-bl-[100px] rounded-tr-2xl"></div>
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-2xl font-bold mb-3 text-[#374045] relative">Success Stories</h3>
              <p className="text-[#5E6E76] mb-4 relative">
                Read inspiring stories from educators who have transformed their classrooms.
              </p>
              <div className="text-sm text-green-600 font-semibold">Coming Soon</div>
            </div>

            <div className="group relative p-8 rounded-2xl border border-purple-100 hover:border-purple-200 bg-gradient-to-br from-white to-purple-50/30 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
              <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/5 rounded-bl-[100px] rounded-tr-2xl"></div>
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-2xl font-bold mb-3 text-[#374045] relative">Resource Library</h3>
              <p className="text-[#5E6E76] mb-4 relative">
                Access shared templates, guides, and materials created by the community.
              </p>
              <div className="text-sm text-purple-600 font-semibold">Coming Soon</div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-transparent pointer-events-none"></div>
        <div className="container mx-auto px-4 text-center relative">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-[#374045]">
              Stay in the Loop
            </h2>
            <p className="text-xl text-[#5E6E76] mb-10 leading-relaxed">
              Be the first to know about community events, new resources, and product updates.
            </p>
            <Link
              href="/contact"
              className="bg-[#4A12C0] text-white px-10 py-5 rounded-xl font-semibold hover:bg-[#3a0e99] hover:shadow-lg hover:scale-105 transition-all duration-300 inline-block shadow-md"
            >
              Join the Community
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
