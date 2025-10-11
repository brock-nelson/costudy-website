import { auth } from "@/auth";
import { redirect } from "next/navigation";
import NewReleaseForm from "@/components/admin/NewReleaseForm";

export default async function NewReleasePage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Create New Release
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Publish a new release or update
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
      <NewReleaseForm />
    </div>
  );
}
