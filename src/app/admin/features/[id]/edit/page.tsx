import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { db, features } from "@/db";
import { eq } from "drizzle-orm";
import EditFeatureForm from "@/components/admin/EditFeatureForm";

export default async function EditFeaturePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const { id } = await params;

  // Fetch the feature
  const feature = await db
    .select()
    .from(features)
    .where(eq(features.id, id))
    .limit(1)
    .then(rows => rows[0]);

  if (!feature) {
    redirect("/admin/features");
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Edit Feature
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Refine the feature details before publishing
          </p>
        </div>
        <a
          href="/admin/features"
          className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg font-medium transition-all"
        >
          ← Back to Features
        </a>
      </div>

      {/* Feature Info */}
      {feature.isUserSubmitted && (
        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <div>
              <h3 className="text-sm font-semibold text-purple-900 dark:text-purple-100">
                User-Submitted Feature
              </h3>
              <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">
                This feature was submitted by a user. Review and refine it before approval.
              </p>
              {(feature.submitterName || feature.submitterEmail) && (
                <p className="text-xs text-purple-600 dark:text-purple-400 mt-2">
                  Submitted by: {feature.submitterName || "Anonymous"}{" "}
                  {feature.submitterEmail && `(${feature.submitterEmail})`}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      <EditFeatureForm feature={feature} />
    </div>
  );
}
