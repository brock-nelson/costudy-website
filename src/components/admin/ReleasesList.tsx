"use client";

import { useState } from "react";
import type { Release } from "@/db/schema";

interface ReleasesListProps {
  releases: Release[];
}

export default function ReleasesList({ releases }: ReleasesListProps) {
  const [filter, setFilter] = useState<string>("all");

  const filteredReleases = releases.filter(release => {
    if (filter === "all") return true;
    if (filter === "published") return release.isPublished;
    if (filter === "draft") return !release.isPublished;
    return true;
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      {/* Filters */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === "all"
                ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("published")}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === "published"
                ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            Published
          </button>
          <button
            onClick={() => setFilter("draft")}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === "draft"
                ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            Drafts
          </button>
        </div>
      </div>

      {/* Releases List */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {filteredReleases.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              No releases found
            </p>
          </div>
        ) : (
          filteredReleases.map((release) => (
            <ReleaseCard key={release.id} release={release} />
          ))
        )}
      </div>
    </div>
  );
}

function ReleaseCard({ release }: { release: Release }) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleTogglePublish = async () => {
    setIsUpdating(true);
    try {
      const response = await fetch(`/api/admin/releases/${release.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: !release.isPublished }),
      });

      if (response.ok) {
        window.location.reload();
      } else {
        alert("Failed to update release");
      }
    } catch (error) {
      console.error("Error updating release:", error);
      alert("An error occurred");
    } finally {
      setIsUpdating(false);
    }
  };

  const typeColors = {
    feature: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300",
    improvement: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
    bugfix: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300",
    security: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300",
  };

  return (
    <div className="p-6 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {release.version} - {release.title}
            </h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeColors[release.type as keyof typeof typeColors]}`}>
              {release.type}
            </span>
            {release.isPublished ? (
              <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs font-medium">
                Published
              </span>
            ) : (
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium">
                Draft
              </span>
            )}
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-3">
            {release.description}
          </p>
          <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
            <span>
              Created {new Date(release.createdAt).toLocaleDateString()}
            </span>
            {release.publishedAt && (
              <span>
                Published {new Date(release.publishedAt).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={handleTogglePublish}
            disabled={isUpdating}
            className={`px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-50 ${
              release.isPublished
                ? "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/50"
            }`}
          >
            {isUpdating ? "..." : release.isPublished ? "Unpublish" : "Publish"}
          </button>
          <a
            href={`/admin/releases/${release.id}/edit`}
            className="px-4 py-2 text-center bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900/50 rounded-lg font-medium transition-all"
          >
            Edit
          </a>
        </div>
      </div>
    </div>
  );
}
