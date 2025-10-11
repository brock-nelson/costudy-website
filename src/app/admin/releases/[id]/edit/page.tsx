import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { db, releases } from "@/db";
import { eq } from "drizzle-orm";
import EditReleaseForm from "@/components/admin/EditReleaseForm";

export default async function EditReleasePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const { id } = await params;

  // Fetch the release
  const release = await db
    .select()
    .from(releases)
    .where(eq(releases.id, id))
    .limit(1)
    .then((rows) => rows[0]);

  if (!release) {
    redirect("/admin/releases");
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Edit Release
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {release.version} - {release.title}
          </p>
        </div>
        <a
          href="/admin/releases"
          className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg font-medium transition-all"
        >
          ← Back to Releases
        </a>
      </div>

      {/* Form */}
      <EditReleaseForm release={release} />
    </div>
  );
}
