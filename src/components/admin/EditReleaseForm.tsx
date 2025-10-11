"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Release } from "@/db/schema";

interface EditReleaseFormProps {
  release: Release;
}

export default function EditReleaseForm({ release }: EditReleaseFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    version: release.version,
    title: release.title,
    description: release.description,
    type: release.type,
    isPublished: release.isPublished,
    featuredImageUrl: release.featuredImageUrl || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`/api/admin/releases/${release.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/admin/releases");
        router.refresh();
      } else {
        const data = await response.json();
        setError(data.error || "Failed to update release");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Error updating release:", err);
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
          {/* Version */}
          <div>
            <label
              htmlFor="version"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Version *
            </label>
            <input
              id="version"
              type="text"
              required
              value={formData.version}
              onChange={(e) =>
                setFormData({ ...formData, version: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="e.g., v1.2.0"
            />
          </div>

          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Release Title *
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
              placeholder="e.g., Enhanced Collaboration Features"
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
              rows={6}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Describe what's new in this release..."
            />
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Supports markdown formatting
            </p>
          </div>

          {/* Type */}
          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Release Type *
            </label>
            <select
              id="type"
              required
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="feature">Feature - New functionality</option>
              <option value="improvement">Improvement - Enhanced existing feature</option>
              <option value="bugfix">Bug Fix - Fixed issue</option>
              <option value="security">Security - Security update</option>
            </select>
          </div>

          {/* Featured Image URL */}
          <div>
            <label
              htmlFor="featuredImageUrl"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Featured Image URL
            </label>
            <input
              id="featuredImageUrl"
              type="url"
              value={formData.featuredImageUrl}
              onChange={(e) =>
                setFormData({ ...formData, featuredImageUrl: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Is Published */}
          <div className="flex items-start">
            <input
              id="isPublished"
              type="checkbox"
              checked={formData.isPublished}
              onChange={(e) =>
                setFormData({ ...formData, isPublished: e.target.checked })
              }
              className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <label
              htmlFor="isPublished"
              className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
            >
              Published (visible to public)
            </label>
          </div>

          {/* Created/Updated Info */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <p>
                Created: {new Date(release.createdAt).toLocaleString()}
              </p>
              {release.publishedAt && (
                <p>
                  Published: {new Date(release.publishedAt).toLocaleString()}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
        <a
          href="/admin/releases"
          className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 font-medium rounded-lg transition-all"
        >
          Cancel
        </a>
      </div>
    </form>
  );
}
