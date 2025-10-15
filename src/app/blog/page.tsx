import Link from "next/link";
import { Metadata } from "next";
import { blogPosts } from "./blogData";

export const metadata: Metadata = {
  title: "Blog - CoStudy | Higher Education Insights & Student Success",
  description: "Expert insights on student retention, peer learning, LMS integration, and student success strategies for higher education institutions.",
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
              Higher Education Insights
            </h1>
            <p className="text-xl text-[#4A5568] dark:text-[#A0AEC0]">
              Research-backed strategies for student retention, peer learning, and institutional success.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#404040] rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {post.readingTime}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold mb-3 text-[#2D3748] dark:text-[#E9EEFF] group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2">
                    {post.title}
                  </h2>

                  <p className="text-[#4A5568] dark:text-[#A0AEC0] mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(post.publishDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                    <span className="text-purple-600 dark:text-purple-400 font-semibold group-hover:translate-x-1 transition-transform">
                      Read more →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-700 dark:to-purple-900 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Study Habits?
          </h2>
          <p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto">
            Join CoStudy to form study groups, coordinate schedules, and implement these strategies with your peers.
          </p>
          <Link
            href="/signup"
            className="bg-white text-purple-700 px-8 py-4 rounded-xl font-semibold hover:bg-purple-50 hover:shadow-lg hover:scale-105 transition-all duration-300 inline-block"
          >
            Get Started Free
          </Link>
        </div>
      </section>
    </div>
  );
}
