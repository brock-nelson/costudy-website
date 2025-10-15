"use client";

import { useState } from "react";
import type { Feature } from "@/db/schema";
import { trackFeatureVote } from "@/lib/analytics";

interface FeatureVotingListProps {
  features: Feature[];
}

export default function FeatureVotingList({ features }: FeatureVotingListProps) {
  const [filter, setFilter] = useState<string>("all");

  const filteredFeatures = features.filter((feature) => {
    if (filter === "all") return true;
    return feature.status === filter;
  });

  // Group by status
  const inProgress = filteredFeatures.filter((f) => f.status === "in-progress");
  const approved = filteredFeatures.filter((f) => f.status === "approved");
  const completed = filteredFeatures.filter((f) => f.status === "completed");

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            filter === "all"
              ? "bg-purple-600 text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          All Features
        </button>
        <button
          onClick={() => setFilter("in-progress")}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            filter === "in-progress"
              ? "bg-purple-600 text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          In Progress ({inProgress.length})
        </button>
        <button
          onClick={() => setFilter("approved")}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            filter === "approved"
              ? "bg-purple-600 text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          Planned ({approved.length})
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            filter === "completed"
              ? "bg-purple-600 text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          Completed ({completed.length})
        </button>
      </div>

      {/* Features Grid */}
      {filteredFeatures.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            No features found in this category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFeatures.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      )}
    </div>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  const [isVoting, setIsVoting] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [voteCount, setVoteCount] = useState(feature.voteCount);
  const [showVoteForm, setShowVoteForm] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleVote = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVoting(true);
    setError(null);

    try {
      const response = await fetch("/api/features/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          featureId: feature.id,
          userEmail: email,
          userName: name || undefined,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Track successful feature vote
        try {
          trackFeatureVote({
            featureId: feature.id,
            featureName: feature.title,
          });
        } catch (error) {
          // Silent fail - don't break user flow if analytics fails
          if (process.env.NODE_ENV === "development") {
            console.error("Analytics tracking error:", error);
          }
        }

        setHasVoted(true);
        setVoteCount(data.voteCount);
        setShowVoteForm(false);
        setEmail("");
        setName("");
      } else {
        setError(data.error || "Failed to submit vote");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      if (process.env.NODE_ENV === "development") {
        console.error("Error voting:", err);
      }
    } finally {
      setIsVoting(false);
    }
  };

  const statusColors = {
    approved: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
    "in-progress":
      "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300",
    completed:
      "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
  };

  const statusLabels = {
    approved: "Planned",
    "in-progress": "In Progress",
    completed: "Completed",
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex-1">
          {feature.title}
        </h3>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ml-2 ${
            statusColors[feature.status as keyof typeof statusColors]
          }`}
        >
          {statusLabels[feature.status as keyof typeof statusLabels]}
        </span>
      </div>

      {/* Category */}
      {feature.category && (
        <div className="mb-3">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
            {feature.category}
          </span>
        </div>
      )}

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-400 mb-4 flex-1">
        {feature.description}
      </p>

      {/* Vote Section */}
      <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
        {feature.status === "completed" ? (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-green-600 dark:text-green-400">
              ✓ Completed
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {voteCount} {voteCount === 1 ? "vote" : "votes"}
            </span>
          </div>
        ) : hasVoted ? (
          <div className="text-center py-2">
            <p className="text-sm font-medium text-green-600 dark:text-green-400">
              ✓ Thanks for voting!
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {voteCount} {voteCount === 1 ? "vote" : "votes"} total
            </p>
          </div>
        ) : !showVoteForm ? (
          <button
            onClick={() => setShowVoteForm(true)}
            className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-lg transition-all"
          >
            ↑ Vote ({voteCount})
          </button>
        ) : (
          <form onSubmit={handleVote} className="space-y-3">
            {error && (
              <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
            )}
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name (optional)"
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email *"
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            />
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={isVoting}
                className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-all disabled:opacity-50"
              >
                {isVoting ? "..." : "Submit Vote"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowVoteForm(false);
                  setError(null);
                }}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
