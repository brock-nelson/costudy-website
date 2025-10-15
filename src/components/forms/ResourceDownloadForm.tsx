"use client";

import { useState } from "react";

interface ResourceDownloadFormProps {
  resourceId: string;
  resourceTitle: string;
  resourceType: string;
  onSuccess?: (downloadUrl: string) => void;
  onCancel?: () => void;
}

export default function ResourceDownloadForm({
  resourceId,
  resourceTitle,
  resourceType,
  onSuccess,
  onCancel,
}: ResourceDownloadFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    university: "",
    role: "",
    subscribeToNewsletter: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/resources/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resourceId,
          ...formData,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Call success callback with download URL
        if (onSuccess && data.downloadUrl) {
          onSuccess(data.downloadUrl);
        }
        // Automatically download the resource
        if (data.downloadUrl) {
          window.open(data.downloadUrl, "_blank");
        }
      } else {
        setError(data.error || "Failed to access resource");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Resource download error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl max-w-md w-full p-8 relative">
        {onCancel && (
          <button
            onClick={onCancel}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        <div className="mb-6">
          <div className="text-sm text-blue-600 dark:text-blue-400 font-semibold mb-2 uppercase">
            {resourceType}
          </div>
          <h2 className="text-2xl font-bold text-[#2D3748] dark:text-[#E9EEFF] mb-2">
            Download Resource
          </h2>
          <p className="text-[#4A5568] dark:text-[#A0AEC0] text-sm">
            {resourceTitle}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg text-sm border border-red-200 dark:border-red-800">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[#2D3748] dark:text-[#E9EEFF] mb-2">
              Name *
            </label>
            <input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-[#404040] rounded-lg bg-white dark:bg-[#121212] text-[#2D3748] dark:text-[#E9EEFF] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#2D3748] dark:text-[#E9EEFF] mb-2">
              Email *
            </label>
            <input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-[#404040] rounded-lg bg-white dark:bg-[#121212] text-[#2D3748] dark:text-[#E9EEFF] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="you@university.edu"
            />
          </div>

          <div>
            <label htmlFor="university" className="block text-sm font-medium text-[#2D3748] dark:text-[#E9EEFF] mb-2">
              University / Institution
            </label>
            <input
              id="university"
              type="text"
              value={formData.university}
              onChange={(e) => setFormData({ ...formData, university: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-[#404040] rounded-lg bg-white dark:bg-[#121212] text-[#2D3748] dark:text-[#E9EEFF] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="University name"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-[#2D3748] dark:text-[#E9EEFF] mb-2">
              Role *
            </label>
            <select
              id="role"
              required
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-[#404040] rounded-lg bg-white dark:bg-[#121212] text-[#2D3748] dark:text-[#E9EEFF] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select your role</option>
              <option value="professor">Professor / Faculty</option>
              <option value="administrator">Administrator</option>
              <option value="student">Student</option>
              <option value="researcher">Researcher</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="flex items-start">
            <input
              id="newsletter"
              type="checkbox"
              checked={formData.subscribeToNewsletter}
              onChange={(e) => setFormData({ ...formData, subscribeToNewsletter: e.target.checked })}
              className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="newsletter" className="ml-2 text-sm text-[#4A5568] dark:text-[#A0AEC0]">
              Send me student success insights and resources via email
            </label>
          </div>

          <div className="flex gap-3 pt-2">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-[#404040] text-[#2D3748] dark:text-[#E9EEFF] font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-[#2e2e2e] transition-all"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Processing..." : "Download"}
            </button>
          </div>

          <p className="text-xs text-[#4A5568] dark:text-[#A0AEC0] text-center">
            By downloading, you agree to receive emails from CoStudy. Unsubscribe anytime.
          </p>
        </form>
      </div>
    </div>
  );
}
