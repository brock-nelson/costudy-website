"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewFeatureForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "proposed",
    category: "",
    isUserSubmitted: false,
    submitterName: "",
    submitterEmail: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/features", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/admin/features");
        router.refresh();
      } else {
        const data = await response.json();
        setError(data.error || "Failed to create feature");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Error creating feature:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        {error && (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Feature Title *
            </label>
            <input
              id="title"
              type="text"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="e.g., Real-time collaboration"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Description *
            </label>
            <textarea
              id="description"
              required
              rows={4}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Describe the feature in detail..."
            />
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Category
            </label>
            <input
              id="category"
              type="text"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="e.g., Collaboration, UI/UX, Performance"
            />
          </div>

          {/* Status */}
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Status *
            </label>
            <select
              id="status"
              required
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="proposed">Proposed</option>
              <option value="approved">Approved</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="declined">Declined</option>
            </select>
          </div>

          {/* Is User Submitted */}
          <div className="flex items-start">
            <input
              id="isUserSubmitted"
              type="checkbox"
              checked={formData.isUserSubmitted}
              onChange={(e) =>
                setFormData({ ...formData, isUserSubmitted: e.target.checked })
              }
              className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <label
              htmlFor="isUserSubmitted"
              className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
            >
              This feature was submitted by a user (not created by admin)
            </label>
          </div>

          {/* Conditional submitter fields */}
          {formData.isUserSubmitted && (
            <>
              <div>
                <label
                  htmlFor="submitterName"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Submitter Name
                </label>
                <input
                  id="submitterName"
                  type="text"
                  value={formData.submitterName}
                  onChange={(e) =>
                    setFormData({ ...formData, submitterName: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="User's name"
                />
              </div>

              <div>
                <label
                  htmlFor="submitterEmail"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Submitter Email
                </label>
                <input
                  id="submitterEmail"
                  type="email"
                  value={formData.submitterEmail}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      submitterEmail: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="user@example.com"
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Creating..." : "Create Feature"}
        </button>
        <a
          href="/admin/features"
          className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 font-medium rounded-lg transition-all"
        >
          Cancel
        </a>
      </div>
    </form>
  );
}
