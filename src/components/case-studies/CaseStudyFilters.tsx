"use client";

import { useState } from "react";

interface FilterOption {
  value: string;
  label: string;
}

interface CaseStudyFiltersProps {
  onFilterChange: (filters: {
    size: string;
    useCase: string;
    department: string;
  }) => void;
}

const universitySizes: FilterOption[] = [
  { value: "all", label: "All Sizes" },
  { value: "small", label: "Small (<5,000)" },
  { value: "medium", label: "Medium (5,000-15,000)" },
  { value: "large", label: "Large (15,000+)" },
];

const useCases: FilterOption[] = [
  { value: "all", label: "All Use Cases" },
  { value: "large-lectures", label: "Large Lecture Courses" },
  { value: "high-stakes", label: "High-Stakes Programs" },
  { value: "online-hybrid", label: "Online & Hybrid Learning" },
  { value: "stem", label: "STEM Courses" },
];

const departments: FilterOption[] = [
  { value: "all", label: "All Departments" },
  { value: "computer-science", label: "Computer Science" },
  { value: "pre-med", label: "Pre-Med / Health Sciences" },
  { value: "engineering", label: "Engineering" },
  { value: "system-wide", label: "System-Wide" },
];

export default function CaseStudyFilters({ onFilterChange }: CaseStudyFiltersProps) {
  const [selectedSize, setSelectedSize] = useState("all");
  const [selectedUseCase, setSelectedUseCase] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const handleFilterChange = (
    type: "size" | "useCase" | "department",
    value: string
  ) => {
    let newSize = selectedSize;
    let newUseCase = selectedUseCase;
    let newDepartment = selectedDepartment;

    if (type === "size") {
      newSize = value;
      setSelectedSize(value);
    } else if (type === "useCase") {
      newUseCase = value;
      setSelectedUseCase(value);
    } else {
      newDepartment = value;
      setSelectedDepartment(value);
    }

    onFilterChange({
      size: newSize,
      useCase: newUseCase,
      department: newDepartment,
    });
  };

  const resetFilters = () => {
    setSelectedSize("all");
    setSelectedUseCase("all");
    setSelectedDepartment("all");
    onFilterChange({
      size: "all",
      useCase: "all",
      department: "all",
    });
  };

  const hasActiveFilters =
    selectedSize !== "all" ||
    selectedUseCase !== "all" ||
    selectedDepartment !== "all";

  return (
    <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-800 rounded-xl p-6 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <h3 className="text-lg font-semibold text-[#2D3748] dark:text-[#E9EEFF]">
          Filter Case Studies
        </h3>
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="text-sm text-[#6B3DCB] dark:text-[#A78BFA] hover:underline font-medium"
          >
            Reset Filters
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {/* University Size Filter */}
        <div>
          <label className="block text-sm font-medium text-[#4A5568] dark:text-[#A0AEC0] mb-2">
            University Size
          </label>
          <select
            value={selectedSize}
            onChange={(e) => handleFilterChange("size", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-[#121212] text-[#2D3748] dark:text-[#E9EEFF] focus:ring-2 focus:ring-[#6B3DCB] focus:border-transparent"
          >
            {universitySizes.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Use Case Filter */}
        <div>
          <label className="block text-sm font-medium text-[#4A5568] dark:text-[#A0AEC0] mb-2">
            Use Case
          </label>
          <select
            value={selectedUseCase}
            onChange={(e) => handleFilterChange("useCase", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-[#121212] text-[#2D3748] dark:text-[#E9EEFF] focus:ring-2 focus:ring-[#6B3DCB] focus:border-transparent"
          >
            {useCases.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Department Filter */}
        <div>
          <label className="block text-sm font-medium text-[#4A5568] dark:text-[#A0AEC0] mb-2">
            Department
          </label>
          <select
            value={selectedDepartment}
            onChange={(e) => handleFilterChange("department", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-[#121212] text-[#2D3748] dark:text-[#E9EEFF] focus:ring-2 focus:ring-[#6B3DCB] focus:border-transparent"
          >
            {departments.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-sm text-[#4A5568] dark:text-[#A0AEC0]">
            Active filters:
          </span>
          {selectedSize !== "all" && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-full">
              {universitySizes.find((s) => s.value === selectedSize)?.label}
              <button
                onClick={() => handleFilterChange("size", "all")}
                className="hover:text-blue-900 dark:hover:text-blue-100"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </span>
          )}
          {selectedUseCase !== "all" && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm rounded-full">
              {useCases.find((u) => u.value === selectedUseCase)?.label}
              <button
                onClick={() => handleFilterChange("useCase", "all")}
                className="hover:text-purple-900 dark:hover:text-purple-100"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </span>
          )}
          {selectedDepartment !== "all" && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-sm rounded-full">
              {departments.find((d) => d.value === selectedDepartment)?.label}
              <button
                onClick={() => handleFilterChange("department", "all")}
                className="hover:text-emerald-900 dark:hover:text-emerald-100"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
