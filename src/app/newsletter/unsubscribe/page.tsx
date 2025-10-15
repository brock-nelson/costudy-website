"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function UnsubscribePage() {
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email") || "";

  const [email, setEmail] = useState(emailParam);
  const [reason, setReason] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch("/api/newsletter/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          reason: reason || undefined,
          feedback: feedback || undefined,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: data.message });
        setEmail("");
        setReason("");
        setFeedback("");
      } else {
        setMessage({ type: "error", text: data.error || "Failed to unsubscribe" });
      }
    } catch (err) {
      setMessage({ type: "error", text: "An error occurred. Please try again." });
      console.error("Unsubscribe error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#121212]">
      {/* Hero Section */}
      <section className="bg-[#EDE7F9] dark:bg-[#1a1a1a] py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#2D3748] dark:text-[#E9EEFF]">
              Unsubscribe from Newsletter
            </h1>
            <p className="text-xl text-[#4A5568] dark:text-[#A0AEC0]">
              We&apos;re sorry to see you go. You can unsubscribe from our newsletter below.
            </p>
          </div>
        </div>
      </section>

      {/* Unsubscribe Form Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {message && (
              <div
                className={`p-4 rounded-lg ${
                  message.type === "success"
                    ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800"
                    : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800"
                }`}
              >
                {message.text}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address *
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="reason" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Reason for unsubscribing (optional)
              </label>
              <select
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Select a reason</option>
                <option value="too_frequent">Emails are too frequent</option>
                <option value="not_relevant">Content is not relevant</option>
                <option value="never_signed_up">I never signed up</option>
                <option value="privacy_concerns">Privacy concerns</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Additional feedback (optional)
              </label>
              <textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Let us know how we can improve..."
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Unsubscribing..." : "Unsubscribe"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Changed your mind?{" "}
              <a href="/newsletter" className="text-purple-600 dark:text-purple-400 hover:underline">
                Re-subscribe here
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Preference Center Info */}
      <section className="bg-[#EAEDEF] dark:bg-[#1a1a1a] py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4 text-[#2D3748] dark:text-[#E9EEFF]">
              Not ready to unsubscribe completely?
            </h2>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] mb-6">
              We value your inbox. If our emails are too frequent or the content isn&apos;t quite right,
              we&apos;d love to hear your feedback so we can improve.
            </p>
            <p className="text-sm text-[#718096] dark:text-[#A0AEC0]">
              You can always re-subscribe at any time from our{" "}
              <a href="/newsletter" className="text-purple-600 dark:text-purple-400 hover:underline">
                newsletter page
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
