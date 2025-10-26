import { Metadata } from "next";
import { db, releases } from "@/db";
import { desc, eq } from "drizzle-orm";

// Force dynamic rendering to avoid database queries during build
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "CoStudy Changelog - Latest Updates & Release Notes",
  description: "Stay up to date with the latest features, improvements, and bug fixes in CoStudy. View our complete release history.",
};

export default async function ChangelogPage() {
  // Get all published releases
  const publishedReleases = await db
    .select()
    .from(releases)
    .where(eq(releases.isPublished, true))
    .orderBy(desc(releases.publishedAt));

  return (
    <div className="min-h-screen bg-white dark:bg-[#121212]">
      {/* Hero Section */}
      <section className="bg-[#EDE7F9] dark:bg-[#1a1a1a] py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#2D3748] dark:text-[#E9EEFF]">
              Changelog
            </h1>
            <p className="text-xl text-[#4A5568] dark:text-[#A0AEC0]">
              Track our progress as we continuously improve CoStudy with new
              features, enhancements, and fixes.
            </p>
          </div>
        </div>
      </section>

      {/* Releases Timeline */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {publishedReleases.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No releases published yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {publishedReleases.map((release, index) => (
                <ReleaseCard key={release.id} release={release} isLatest={index === 0} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#EAEDEF] dark:bg-[#1a1a1a] py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-[#2D3748] dark:text-[#E9EEFF]">
              Have Feedback on Our Updates?
            </h2>
            <p className="text-lg text-[#4A5568] dark:text-[#A0AEC0] mb-8">
              We&apos;d love to hear your thoughts on our latest features and improvements.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a
                href="/features"
                className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all shadow-lg"
              >
                Vote on Features
              </a>
              <a
                href="/contact"
                className="inline-block px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 font-semibold rounded-lg transition-all shadow-lg border border-gray-200 dark:border-gray-700"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ReleaseCard({ release, isLatest }: { release: typeof releases.$inferSelect; isLatest: boolean }) {
  const typeIcons = {
    feature: "✨",
    improvement: "🚀",
    bugfix: "🐛",
    security: "🔒",
  };

  const typeColors = {
    feature: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800",
    improvement: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
    bugfix: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800",
    security: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800",
  };

  const typeLabels = {
    feature: "New Feature",
    improvement: "Improvement",
    bugfix: "Bug Fix",
    security: "Security Update",
  };

  return (
    <div className={`relative pl-8 border-l-2 ${isLatest ? 'border-purple-600' : 'border-gray-200 dark:border-gray-700'}`}>
      {/* Timeline Dot */}
      <div
        className={`absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full ${
          isLatest
            ? 'bg-purple-600 ring-4 ring-purple-100 dark:ring-purple-900/30'
            : 'bg-gray-300 dark:bg-gray-600'
        }`}
      />

      {/* Release Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
        {/* Header */}
        <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {release.version}
              </h2>
              {isLatest && (
                <span className="px-2 py-1 bg-purple-600 text-white text-xs font-bold rounded-full">
                  LATEST
                </span>
              )}
            </div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
              {release.title}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${
                typeColors[release.type as keyof typeof typeColors]
              }`}
            >
              <span>{typeIcons[release.type as keyof typeof typeIcons]}</span>
              {typeLabels[release.type as keyof typeof typeLabels]}
            </span>
          </div>
        </div>

        {/* Featured Image */}
        {release.featuredImageUrl && (
          <div className="mb-4 rounded-lg overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={release.featuredImageUrl}
              alt={release.title}
              className="w-full h-auto"
            />
          </div>
        )}

        {/* Description */}
        <div className="prose dark:prose-invert max-w-none mb-4">
          <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
            {release.description}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
          <span>
            Released on {new Date(release.publishedAt!).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
