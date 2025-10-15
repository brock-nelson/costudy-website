import { Metadata } from "next";
import { db, features } from "@/db";
import { desc, inArray } from "drizzle-orm";
import FeatureVotingList from "@/components/features/FeatureVotingList";
import PageViewTracker from "@/components/analytics/PageViewTracker";

export const metadata: Metadata = {
  title: "CoStudy Feature Roadmap - Vote on Upcoming Features",
  description: "See what's coming to CoStudy and vote on features you'd like to see next. Help shape the future of student collaboration.",
};

export default async function FeaturesPage() {
  // Only show approved, in-progress, or completed features (not proposed or declined)
  const publicFeatures = await db
    .select()
    .from(features)
    .where(inArray(features.status, ["approved", "in-progress", "completed"]))
    .orderBy(desc(features.voteCount));

  return (
    <div className="min-h-screen bg-white dark:bg-[#121212]">
      <PageViewTracker
        eventName="feature_view"
        eventParams={{
          event_category: "engagement",
          event_label: "features_page",
        }}
      />
      {/* Hero Section */}
      <section className="bg-[#EDE7F9] dark:bg-[#1a1a1a] py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#2D3748] dark:text-[#E9EEFF]">
              Feature Roadmap
            </h1>
            <p className="text-xl text-[#4A5568] dark:text-[#A0AEC0]">
              Help us prioritize features by voting on what matters most to you.
              Your feedback shapes CoStudy&apos;s future.
            </p>
          </div>
        </div>
      </section>

      {/* Features List */}
      <section className="container mx-auto px-4 py-16">
        <FeatureVotingList features={publicFeatures} />
      </section>

      {/* Submit Feature CTA */}
      <section className="bg-[#EAEDEF] dark:bg-[#1a1a1a] py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-[#2D3748] dark:text-[#E9EEFF]">
              Have a Feature Idea?
            </h2>
            <p className="text-lg text-[#4A5568] dark:text-[#A0AEC0] mb-8">
              We&apos;d love to hear your suggestions for improving CoStudy.
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all shadow-lg"
            >
              Submit Feature Request
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
