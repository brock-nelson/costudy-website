import { auth } from "@/auth";
import { db, features } from "@/db";
import { desc } from "drizzle-orm";
import FeaturesList from "@/components/admin/FeaturesList";

export default async function FeaturesPage() {
  const session = await auth();

  if (!session) {
    return null;
  }

  // Fetch all features
  const allFeatures = await db
    .select()
    .from(features)
    .orderBy(desc(features.createdAt));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Feature Requests
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage user-submitted features and roadmap items
          </p>
        </div>
        <a
          href="/admin/features/new"
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all shadow-lg"
        >
          + New Feature
        </a>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Total"
          value={allFeatures.length}
          color="purple"
        />
        <StatCard
          title="Proposed"
          value={allFeatures.filter(f => f.status === "proposed").length}
          color="blue"
        />
        <StatCard
          title="In Progress"
          value={allFeatures.filter(f => f.status === "in-progress").length}
          color="cyan"
        />
        <StatCard
          title="Completed"
          value={allFeatures.filter(f => f.status === "completed").length}
          color="green"
        />
      </div>

      {/* Features List */}
      <FeaturesList features={allFeatures} />
    </div>
  );
}

function StatCard({ title, value, color }: { title: string; value: number; color: string }) {
  const colorClasses = {
    purple: "from-purple-500 to-purple-600",
    blue: "from-blue-500 to-blue-600",
    cyan: "from-cyan-500 to-cyan-600",
    green: "from-green-500 to-green-600",
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center gap-4">
        <div
          className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} flex items-center justify-center text-white font-bold text-xl`}
        >
          {value}
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}
