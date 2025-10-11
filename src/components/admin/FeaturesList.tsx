"use client";

import { useState } from "react";
import type { Feature } from "@/db/schema";

interface FeaturesListProps {
  features: Feature[];
}

export default function FeaturesList({ features }: FeaturesListProps) {
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isBulkUpdating, setIsBulkUpdating] = useState(false);

  const filteredFeatures = features.filter(feature => {
    const matchesFilter = filter === "all" || feature.status === filter;
    const matchesSearch = feature.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         feature.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const allSelected = filteredFeatures.length > 0 &&
    filteredFeatures.every(f => selectedIds.has(f.id));

  const someSelected = selectedIds.size > 0;

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredFeatures.map(f => f.id)));
    }
  };

  const handleToggleFeature = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const handleBulkAction = async (action: string, status?: string) => {
    if (selectedIds.size === 0) return;

    const confirmed = confirm(
      `Are you sure you want to ${action} ${selectedIds.size} feature(s)?`
    );

    if (!confirmed) return;

    setIsBulkUpdating(true);

    try {
      const response = await fetch("/api/admin/features/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          featureIds: Array.from(selectedIds),
          action,
          status,
        }),
      });

      if (response.ok) {
        window.location.reload();
      } else {
        const data = await response.json();
        alert(`Failed: ${data.error}`);
      }
    } catch (error) {
      console.error("Bulk action error:", error);
      alert("An error occurred");
    } finally {
      setIsBulkUpdating(false);
    }
  };

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
      {/* Bulk Action Toolbar */}
      {someSelected && (
        <div className="bg-purple-50 dark:bg-purple-900/20 border-b border-purple-200 dark:border-purple-800 p-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-purple-900 dark:text-purple-100">
                {selectedIds.size} feature(s) selected
              </span>
              <button
                onClick={() => setSelectedIds(new Set())}
                className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
              >
                Clear selection
              </button>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => handleBulkAction("update_status", "approved")}
                disabled={isBulkUpdating}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
              >
                Approve
              </button>
              <button
                onClick={() => handleBulkAction("update_status", "in-progress")}
                disabled={isBulkUpdating}
                className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
              >
                In Progress
              </button>
              <button
                onClick={() => handleBulkAction("update_status", "completed")}
                disabled={isBulkUpdating}
                className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
              >
                Complete
              </button>
              <button
                onClick={() => handleBulkAction("update_status", "declined")}
                disabled={isBulkUpdating}
                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
              >
                Decline
              </button>
              <button
                onClick={() => handleBulkAction("delete")}
                disabled={isBulkUpdating}
                className="px-3 py-1.5 bg-gray-700 hover:bg-gray-800 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={handleSelectAll}
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Select All
              </span>
            </label>
          </div>
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
            <FeatureCard
              key={feature.id}
              feature={feature}
              isSelected={selectedIds.has(feature.id)}
              onToggle={() => handleToggleFeature(feature.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}

interface FeatureCardProps {
  feature: Feature;
  isSelected: boolean;
  onToggle: () => void;
}

function FeatureCard({ feature, isSelected, onToggle }: FeatureCardProps) {
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
      <div className="flex items-start gap-4">
        <div className="pt-1">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onToggle}
            className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 cursor-pointer"
          />
        </div>
        <div className="flex-1 min-w-0">
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
          <a
            href={`/admin/features/${feature.id}/edit`}
            className="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Edit
          </a>
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
    </div>
  </div>
  );
}
