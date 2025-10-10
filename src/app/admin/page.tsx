import { auth } from "@/auth";
import { db, features, votes, releases, emailSubscriptions } from "@/db";
import { eq, desc, count } from "drizzle-orm";

export default async function AdminDashboard() {
  const session = await auth();

  // Fetch dashboard stats
  const [featuresCount, votesCount, releasesCount, subscribersCount] =
    await Promise.all([
      db
        .select({ count: count() })
        .from(features)
        .then((res) => res[0]?.count || 0),
      db
        .select({ count: count() })
        .from(votes)
        .then((res) => res[0]?.count || 0),
      db
        .select({ count: count() })
        .from(releases)
        .where(eq(releases.isPublished, true))
        .then((res) => res[0]?.count || 0),
      db
        .select({ count: count() })
        .from(emailSubscriptions)
        .where(eq(emailSubscriptions.isActive, true))
        .then((res) => res[0]?.count || 0),
    ]);

  // Fetch recent features with top votes
  const topFeatures = await db
    .select()
    .from(features)
    .orderBy(desc(features.voteCount))
    .limit(5);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome back, {session?.user.name}!
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Here&apos;s what&apos;s happening with CoStudy
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Features"
          value={featuresCount}
          description="Feature requests"
          gradient="from-purple-500 to-purple-600"
        />
        <StatCard
          title="Total Votes"
          value={votesCount}
          description="User votes"
          gradient="from-blue-500 to-blue-600"
        />
        <StatCard
          title="Published Releases"
          value={releasesCount}
          description="Release notes"
          gradient="from-cyan-500 to-cyan-600"
        />
        <StatCard
          title="Newsletter Subscribers"
          value={subscribersCount}
          description="Active subscribers"
          gradient="from-green-500 to-green-600"
        />
      </div>

      {/* Top Features */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Top Requested Features
        </h2>
        {topFeatures.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            No features yet. Create your first feature!
          </p>
        ) : (
          <div className="space-y-3">
            {topFeatures.map((feature, index) => (
              <div
                key={feature.id}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-sm">
                    #{index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {feature.description.substring(0, 80)}
                      {feature.description.length > 80 ? "..." : ""}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-semibold">
                    {feature.voteCount} votes
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      feature.status === "completed"
                        ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                        : feature.status === "in-progress"
                        ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {feature.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <QuickActionCard
          title="Manage Features"
          description="Review and approve feature requests"
          href="/admin/features"
          gradient="from-purple-600 to-purple-700"
        />
        <QuickActionCard
          title="Create Release"
          description="Publish a new release note"
          href="/admin/releases"
          gradient="from-blue-600 to-blue-700"
        />
        <QuickActionCard
          title="View Analytics"
          description="See detailed user analytics"
          href="/admin/analytics"
          gradient="from-cyan-600 to-cyan-700"
        />
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  description,
  gradient,
}: {
  title: string;
  value: number;
  description: string;
  gradient: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center gap-4">
        <div
          className={`w-12 h-12 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-xl`}
        >
          {value > 999 ? "999+" : value}
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {value.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

function QuickActionCard({
  title,
  description,
  href,
  gradient,
}: {
  title: string;
  description: string;
  href: string;
  gradient: string;
}) {
  return (
    <a
      href={href}
      className="block bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
    >
      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${gradient} mb-4`}></div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
      <div className="mt-4 text-sm font-semibold text-purple-600 dark:text-purple-400">
        Go to {title} →
      </div>
    </a>
  );
}
