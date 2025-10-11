"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AnalyticsFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [dateRange, setDateRange] = useState(searchParams.get("range") || "30");
  const [eventType, setEventType] = useState(searchParams.get("event") || "all");

  const handleApplyFilters = () => {
    const params = new URLSearchParams();
    if (dateRange !== "30") params.set("range", dateRange);
    if (eventType !== "all") params.set("event", eventType);

    const queryString = params.toString();
    router.push(`/admin/analytics${queryString ? `?${queryString}` : ""}`);
  };

  const handleReset = () => {
    setDateRange("30");
    setEventType("all");
    router.push("/admin/analytics");
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
        Filters
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Date Range */}
        <div>
          <label
            htmlFor="dateRange"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Date Range
          </label>
          <select
            id="dateRange"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          >
            <option value="7">Last 7 days</option>
            <option value="14">Last 14 days</option>
            <option value="30">Last 30 days</option>
            <option value="60">Last 60 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
            <option value="all">All time</option>
          </select>
        </div>

        {/* Event Type */}
        <div>
          <label
            htmlFor="eventType"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Event Type
          </label>
          <select
            id="eventType"
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          >
            <option value="all">All Events</option>
            <option value="page_view">Page Views</option>
            <option value="button_click">Button Clicks</option>
            <option value="form_submit">Form Submissions</option>
            <option value="scroll_depth">Scroll Depth</option>
          </select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleApplyFilters}
          className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-all"
        >
          Apply Filters
        </button>
        <button
          onClick={handleReset}
          className="px-6 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 font-medium rounded-lg transition-all"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
