"use client";

import { useState, useMemo } from "react";
import IntegrationCard from "./IntegrationCard";
import { IntegrationCategory, integrations, integrationCategories } from "@/lib/integrations";

export default function IntegrationsGrid() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<IntegrationCategory | "all">("all");
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);

  const filteredIntegrations = useMemo(() => {
    let filtered = integrations;

    // Filter by search query
    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (integration) =>
          integration.name.toLowerCase().includes(lowercaseQuery) ||
          integration.description.toLowerCase().includes(lowercaseQuery) ||
          integration.category.toLowerCase().includes(lowercaseQuery)
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((integration) => integration.category === selectedCategory);
    }

    // Filter by availability
    if (showOnlyAvailable) {
      filtered = filtered.filter((integration) => integration.status === "available");
    }

    return filtered;
  }, [searchQuery, selectedCategory, showOnlyAvailable]);

  return (
    <div className="space-y-8">
      {/* Search and Filters */}
      <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search integrations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-12 bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 text-[#2D3748] dark:text-[#E9EEFF]"
            aria-label="Search integrations"
          />
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedCategory === "all"
                ? "bg-purple-600 text-white"
                : "bg-gray-100 dark:bg-[#0a0a0a] text-[#4A5568] dark:text-[#A0AEC0] hover:bg-gray-200 dark:hover:bg-gray-900"
            }`}
          >
            All
          </button>
          {integrationCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === category.id
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 dark:bg-[#0a0a0a] text-[#4A5568] dark:text-[#A0AEC0] hover:bg-gray-200 dark:hover:bg-gray-900"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Availability Toggle */}
        <div className="flex items-center gap-3">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={showOnlyAvailable}
              onChange={(e) => setShowOnlyAvailable(e.target.checked)}
              className="sr-only peer"
              aria-label="Show only available integrations"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
          </label>
          <span className="text-sm font-medium text-[#4A5568] dark:text-[#A0AEC0]">
            Show only available integrations
          </span>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-[#4A5568] dark:text-[#A0AEC0]">
        Showing {filteredIntegrations.length} integration{filteredIntegrations.length !== 1 ? "s" : ""}
      </div>

      {/* Integrations Grid */}
      {filteredIntegrations.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIntegrations.map((integration) => (
            <IntegrationCard key={integration.id} integration={integration} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold mb-2 text-[#2D3748] dark:text-[#E9EEFF]">No integrations found</h3>
          <p className="text-[#4A5568] dark:text-[#A0AEC0]">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
}
