import { auth } from "@/auth";
import { db, releases } from "@/db";
import { desc } from "drizzle-orm";
import ReleasesList from "@/components/admin/ReleasesList";
import ExportButton from "@/components/admin/ExportButton";

export default async function ReleasesPage() {
  const session = await auth();

  if (!session) {
    return null;
  }

  // Fetch all releases
  const allReleases = await db
    .select()
    .from(releases)
    .orderBy(desc(releases.publishedAt), desc(releases.createdAt));

  const publishedCount = allReleases.filter(r => r.isPublished).length;
  const draftCount = allReleases.filter(r => !r.isPublished).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Release Notes
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Publish product updates and release notes
          </p>
        </div>
        <div className="flex gap-3">
          <ExportButton
            endpoint="/api/admin/export/releases"
            filename="releases"
            label="Export"
          />
          <a
            href="/admin/releases/new"
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all shadow-lg"
          >
            + New Release
          </a>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
              {allReleases.length}
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Releases
              </h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {allReleases.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white font-bold text-xl">
              {publishedCount}
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Published
              </h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {publishedCount}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gray-500 to-gray-600 flex items-center justify-center text-white font-bold text-xl">
              {draftCount}
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Drafts
              </h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {draftCount}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Releases List */}
      <ReleasesList releases={allReleases} />
    </div>
  );
}
