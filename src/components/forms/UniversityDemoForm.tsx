"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const universityDemoSchema = z.object({
  // University Info
  universityName: z.string().min(1, "University name is required"),
  universityWebsite: z.string().url("Please enter a valid website URL").optional().or(z.literal("")),
  studentCount: z.enum(["<5K", "5-10K", "10-20K", "20K+"], {
    message: "Please select a student count range",
  }),

  // Contact Info
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  role: z.enum(["Dean", "IT Director", "Student Success", "Other"], {
    message: "Please select a role",
  }),
  department: z.string().optional(),

  // Use Case
  goals: z.array(z.string()).min(1, "Please select at least one goal"),
  timeline: z.enum(["This semester", "Next semester", "Exploring"], {
    message: "Please select a timeline",
  }),

  // Optional
  message: z.string().optional(),
  referralSource: z.string().optional(),
});

type UniversityDemoFormData = z.infer<typeof universityDemoSchema>;

const goalOptions = [
  "Improve retention",
  "Increase engagement",
  "Support remote learning",
];

export default function UniversityDemoForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UniversityDemoFormData>({
    resolver: zodResolver(universityDemoSchema),
    defaultValues: {
      goals: [],
    },
  });

  const onSubmit = async (data: UniversityDemoFormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/demo/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus({
          type: "success",
          message: result.message,
        });
        reset();
        // Scroll to success message
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setSubmitStatus({
          type: "error",
          message: result.message || "Something went wrong. Please try again.",
        });
      }
    } catch {
      setSubmitStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {submitStatus && (
        <div
          className={`mb-8 p-6 rounded-xl ${
            submitStatus.type === "success"
              ? "bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-700 text-green-800 dark:text-green-200"
              : "bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-700 text-red-800 dark:text-red-200"
          }`}
        >
          <p className="text-lg font-semibold">{submitStatus.message}</p>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-[#1a1a1a] p-8 md:p-10 rounded-2xl shadow-xl border border-purple-100 dark:border-[#404040]/50 space-y-8"
      >
        {/* University Information Section */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-[#374045] dark:text-[#E9EEFF] border-b-2 border-purple-200 dark:border-purple-800 pb-3">
            University Information
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="universityName"
                className="block text-sm font-semibold text-[#374045] dark:text-[#E9EEFF] mb-2"
              >
                University Name *
              </label>
              <input
                type="text"
                id="universityName"
                {...register("universityName")}
                className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-[#0a0a0a] text-[#374045] dark:text-[#E9EEFF] focus:outline-none focus:ring-2 focus:ring-[#4A12C0] focus:border-transparent transition-colors ${
                  errors.universityName ? "border-red-500" : "border-[#92A2AA] dark:border-[#404040]"
                }`}
                placeholder="e.g., Stanford University"
              />
              {errors.universityName && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.universityName.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="universityWebsite"
                className="block text-sm font-semibold text-[#374045] dark:text-[#E9EEFF] mb-2"
              >
                University Website
              </label>
              <input
                type="url"
                id="universityWebsite"
                {...register("universityWebsite")}
                className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-[#0a0a0a] text-[#374045] dark:text-[#E9EEFF] focus:outline-none focus:ring-2 focus:ring-[#4A12C0] focus:border-transparent transition-colors ${
                  errors.universityWebsite ? "border-red-500" : "border-[#92A2AA] dark:border-[#404040]"
                }`}
                placeholder="https://www.university.edu"
              />
              {errors.universityWebsite && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.universityWebsite.message}</p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="studentCount"
              className="block text-sm font-semibold text-[#374045] dark:text-[#E9EEFF] mb-2"
            >
              Total Student Count *
            </label>
            <select
              id="studentCount"
              {...register("studentCount")}
              className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-[#0a0a0a] text-[#374045] dark:text-[#E9EEFF] focus:outline-none focus:ring-2 focus:ring-[#4A12C0] focus:border-transparent transition-colors ${
                errors.studentCount ? "border-red-500" : "border-[#92A2AA] dark:border-[#404040]"
              }`}
            >
              <option value="">Select student count</option>
              <option value="<5K">Less than 5,000</option>
              <option value="5-10K">5,000 - 10,000</option>
              <option value="10-20K">10,000 - 20,000</option>
              <option value="20K+">20,000+</option>
            </select>
            {errors.studentCount && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.studentCount.message}</p>
            )}
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-[#374045] dark:text-[#E9EEFF] border-b-2 border-purple-200 dark:border-purple-800 pb-3">
            Contact Information
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-semibold text-[#374045] dark:text-[#E9EEFF] mb-2"
              >
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                {...register("firstName")}
                className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-[#0a0a0a] text-[#374045] dark:text-[#E9EEFF] focus:outline-none focus:ring-2 focus:ring-[#4A12C0] focus:border-transparent transition-colors ${
                  errors.firstName ? "border-red-500" : "border-[#92A2AA] dark:border-[#404040]"
                }`}
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.firstName.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-semibold text-[#374045] dark:text-[#E9EEFF] mb-2"
              >
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                {...register("lastName")}
                className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-[#0a0a0a] text-[#374045] dark:text-[#E9EEFF] focus:outline-none focus:ring-2 focus:ring-[#4A12C0] focus:border-transparent transition-colors ${
                  errors.lastName ? "border-red-500" : "border-[#92A2AA] dark:border-[#404040]"
                }`}
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-[#374045] dark:text-[#E9EEFF] mb-2"
              >
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                {...register("email")}
                className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-[#0a0a0a] text-[#374045] dark:text-[#E9EEFF] focus:outline-none focus:ring-2 focus:ring-[#4A12C0] focus:border-transparent transition-colors ${
                  errors.email ? "border-red-500" : "border-[#92A2AA] dark:border-[#404040]"
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-semibold text-[#374045] dark:text-[#E9EEFF] mb-2"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                {...register("phone")}
                className="w-full px-4 py-3 border border-[#92A2AA] dark:border-[#404040] rounded-lg bg-white dark:bg-[#0a0a0a] text-[#374045] dark:text-[#E9EEFF] focus:outline-none focus:ring-2 focus:ring-[#4A12C0] focus:border-transparent transition-colors"
                placeholder="(555) 123-4567"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-semibold text-[#374045] dark:text-[#E9EEFF] mb-2"
              >
                Your Role *
              </label>
              <select
                id="role"
                {...register("role")}
                className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-[#0a0a0a] text-[#374045] dark:text-[#E9EEFF] focus:outline-none focus:ring-2 focus:ring-[#4A12C0] focus:border-transparent transition-colors ${
                  errors.role ? "border-red-500" : "border-[#92A2AA] dark:border-[#404040]"
                }`}
              >
                <option value="">Select your role</option>
                <option value="Dean">Dean</option>
                <option value="IT Director">IT Director</option>
                <option value="Student Success">Student Success</option>
                <option value="Other">Other</option>
              </select>
              {errors.role && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.role.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="department"
                className="block text-sm font-semibold text-[#374045] dark:text-[#E9EEFF] mb-2"
              >
                Department
              </label>
              <input
                type="text"
                id="department"
                {...register("department")}
                className="w-full px-4 py-3 border border-[#92A2AA] dark:border-[#404040] rounded-lg bg-white dark:bg-[#0a0a0a] text-[#374045] dark:text-[#E9EEFF] focus:outline-none focus:ring-2 focus:ring-[#4A12C0] focus:border-transparent transition-colors"
                placeholder="e.g., Academic Affairs"
              />
            </div>
          </div>
        </div>

        {/* Use Case Section */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-[#374045] dark:text-[#E9EEFF] border-b-2 border-purple-200 dark:border-purple-800 pb-3">
            Use Case
          </h3>

          <div>
            <label className="block text-sm font-semibold text-[#374045] dark:text-[#E9EEFF] mb-3">
              What are your primary goals? * (Select all that apply)
            </label>
            <div className="space-y-3">
              {goalOptions.map((goal) => (
                <label key={goal} className="flex items-center group cursor-pointer">
                  <input
                    type="checkbox"
                    value={goal}
                    {...register("goals")}
                    className="w-5 h-5 text-[#4A12C0] border-[#92A2AA] dark:border-[#404040] rounded focus:ring-2 focus:ring-[#4A12C0] cursor-pointer"
                  />
                  <span className="ml-3 text-[#374045] dark:text-[#E9EEFF] group-hover:text-[#4A12C0] dark:group-hover:text-purple-400 transition-colors">
                    {goal}
                  </span>
                </label>
              ))}
            </div>
            {errors.goals && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.goals.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="timeline"
              className="block text-sm font-semibold text-[#374045] dark:text-[#E9EEFF] mb-2"
            >
              Implementation Timeline *
            </label>
            <select
              id="timeline"
              {...register("timeline")}
              className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-[#0a0a0a] text-[#374045] dark:text-[#E9EEFF] focus:outline-none focus:ring-2 focus:ring-[#4A12C0] focus:border-transparent transition-colors ${
                errors.timeline ? "border-red-500" : "border-[#92A2AA] dark:border-[#404040]"
              }`}
            >
              <option value="">Select a timeline</option>
              <option value="This semester">This semester</option>
              <option value="Next semester">Next semester</option>
              <option value="Exploring">Just exploring</option>
            </select>
            {errors.timeline && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.timeline.message}</p>
            )}
          </div>
        </div>

        {/* Optional Information Section */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-[#374045] dark:text-[#E9EEFF] border-b-2 border-purple-200 dark:border-purple-800 pb-3">
            Additional Information
          </h3>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-semibold text-[#374045] dark:text-[#E9EEFF] mb-2"
            >
              Tell us about your needs
            </label>
            <textarea
              id="message"
              {...register("message")}
              rows={4}
              className="w-full px-4 py-3 border border-[#92A2AA] dark:border-[#404040] rounded-lg bg-white dark:bg-[#0a0a0a] text-[#374045] dark:text-[#E9EEFF] focus:outline-none focus:ring-2 focus:ring-[#4A12C0] focus:border-transparent transition-colors"
              placeholder="Any specific challenges or requirements we should know about?"
            />
          </div>

          <div>
            <label
              htmlFor="referralSource"
              className="block text-sm font-semibold text-[#374045] dark:text-[#E9EEFF] mb-2"
            >
              How did you hear about us?
            </label>
            <input
              type="text"
              id="referralSource"
              {...register("referralSource")}
              className="w-full px-4 py-3 border border-[#92A2AA] dark:border-[#404040] rounded-lg bg-white dark:bg-[#0a0a0a] text-[#374045] dark:text-[#E9EEFF] focus:outline-none focus:ring-2 focus:ring-[#4A12C0] focus:border-transparent transition-colors"
              placeholder="e.g., Conference, referral, search engine"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] ${
              isSubmitting ? "opacity-50 cursor-not-allowed scale-100" : ""
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </span>
            ) : (
              "Request Demo"
            )}
          </button>
          <p className="mt-4 text-sm text-[#5E6E76] dark:text-[#A0AEC0] text-center">
            We&apos;ll reach out within 24 hours to schedule your personalized demo
          </p>
        </div>
      </form>
    </div>
  );
}
