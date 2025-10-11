"use client";

import { useState } from "react";
import type { Feature } from "@/db/schema";

interface FeaturesListProps {
  features: Feature[];
}

export default function FeaturesList({ features }: FeaturesListProps) {
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFeatures = features.filter(feature => {
    const matchesFilter = filter === "all" || feature.status === filter;
    const matchesSearch = feature.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         feature.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const statusOptions = [
    { value: "all", label: "All Features" },
    { value: "proposed", label: "Proposed" },
    { value: "approved", label: "Approved" },
    { value: "in-progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
    { value: "declined", label: "Declined" },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      {/* Filters */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Features List */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {filteredFeatures.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              No features found matching your criteria
            </p>
          </div>
        ) : (
          filteredFeatures.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))
        )}
      </div>
    </div>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    setIsUpdating(true);
    try {
      const response = await fetch(`/api/admin/features/${feature.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        window.location.reload();
      } else {
        alert("Failed to update feature status");
      }
    } catch (error) {
      console.error("Error updating feature:", error);
      alert("An error occurred");
    } finally {
      setIsUpdating(false);
    }
  };

  const statusColors = {
    proposed: "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300",
    approved: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
    "in-progress": "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300",
    completed: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
    declined: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300",
  };

  return (
    <div className="p-6 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {feature.title}
            </h3>
            {feature.isUserSubmitted && (
              <span className="px-2 py-1 text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full">
                User Submitted
              </span>
            )}
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-3">
            {feature.description}
          </p>
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="text-gray-500 dark:text-gray-400">
              🗳️ {feature.voteCount} votes
            </span>
            {feature.submitterEmail && (
              <span className="text-gray-500 dark:text-gray-400">
                📧 {feature.submitterEmail}
              </span>
            )}
            {feature.category && (
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs">
                {feature.category}
              </span>
            )}
            <span className="text-gray-400 dark:text-gray-500">
              Created {new Date(feature.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2 items-end">
          <span className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${statusColors[feature.status as keyof typeof statusColors]}`}>
            {feature.status}
          </span>
          <select
            value={feature.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            disabled={isUpdating}
            className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
          >
            <option value="proposed">Proposed</option>
            <option value="approved">Approved</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="declined">Declined</option>
          </select>
        </div>
      </div>
    </div>
  );
}
