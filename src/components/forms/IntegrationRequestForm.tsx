"use client";

import { useState } from "react";
import { useForm, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Validation schema matching the API route
const integrationRequestSchema = z.object({
  integrationName: z.string().min(1, "Integration name is required"),
  platform: z.string().optional(),
  institutionName: z.string().min(1, "Institution name is required"),
  contactName: z.string().min(1, "Your name is required"),
  contactEmail: z.string().email("Invalid email address"),
  contactRole: z.string().optional(),
  phoneNumber: z.string().optional(),
  numberOfUsers: z.coerce.number().int().positive().optional(),
  timeline: z.string().optional(),
  urgency: z.string().optional(),
  useCaseDescription: z
    .string()
    .min(10, "Please provide at least 10 characters describing your use case"),
  existingTechStack: z.string().optional(),
});

type IntegrationRequestFormData = z.infer<typeof integrationRequestSchema>;

interface IntegrationRequestFormProps {
  prefilledIntegration?: string;
}

export default function IntegrationRequestForm({
  prefilledIntegration,
}: IntegrationRequestFormProps) {
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
  } = useForm<IntegrationRequestFormData>({
    resolver: zodResolver(integrationRequestSchema) as Resolver<IntegrationRequestFormData>,
    defaultValues: {
      integrationName: prefilledIntegration || "",
    },
  });

  const onSubmit = async (data: IntegrationRequestFormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/integration-request", {
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
    <div className="max-w-3xl mx-auto">
      {submitStatus && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            submitStatus.type === "success"
              ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200"
              : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200"
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Integration Details Section */}
        <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
          <h3 className="text-xl font-semibold text-[#2D3748] dark:text-[#E9EEFF] mb-4">
            Integration Details
          </h3>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="integrationName"
                className="block text-sm font-medium text-[#374045] dark:text-[#CBD5E0] mb-2"
              >
                Integration Name *
              </label>
              <input
                type="text"
                id="integrationName"
                {...register("integrationName")}
                className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-[#0a0a0a] text-[#374045] dark:text-[#E9EEFF] focus:outline-none focus:ring-2 focus:ring-[#4A12C0] focus:border-transparent ${
                  errors.integrationName
                    ? "border-red-500"
                    : "border-[#92A2AA] dark:border-gray-700"
                }`}
                placeholder="e.g., Canvas LMS, Azure AD SSO, Banner SIS"
              />
              {errors.integrationName && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.integrationName.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="platform"
                className="block text-sm font-medium text-[#374045] dark:text-[#CBD5E0] mb-2"
              >
                Platform/Vendor (Optional)
              </label>
              <input
                type="text"
                id="platform"
                {...register("platform")}
                className="w-full px-4 py-3 border border-[#92A2AA] dark:border-gray-700 rounded-lg bg-white dark:bg-[#0a0a0a] text-[#374045] dark:text-[#E9EEFF] focus:outline-none focus:ring-2 focus:ring-[#4A12C0] focus:border-transparent"
                placeholder="e.g., Instructure, Microsoft, Ellucian"
              />
            </div>
          </div>
        </div>

        {/* Institution & Contact Information */}
        <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
          <h3 className="text-xl font-semibold text-[#2D3748] dark:text-[#E9EEFF] mb-4">
            Contact Information
          </h3>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="institutionName"
                className="block text-sm font-medium text-[#374045] dark:text-[#CBD5E0] mb-2"
              >
                Institution/Organization *
              </label>
              <input
                type="text"
                id="institutionName"
                {...register("institutionName")}
                className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-[#0a0a0a] text-[#374045] dark:text-[#E9EEFF] focus:outline-none focus:ring-2 focus:ring-[#4A12C0] focus:border-transparent ${
                  errors.institutionName
                    ? "border-red-500"
                    : "border-[#92A2AA] dark:border-gray-700"
                }`}
                placeholder="e.g., Stanford University"
              />
              {errors.institutionName && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.institutionName.message}
                </p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="contactName"
                  className="block text-sm font-medium text-[#374045] dark:text-[#CBD5E0] mb-2"
                >
                  Your Name *
                </label>
                <input
                  type="text"
                  id="contactName"
                  {...register("contactName")}
                  className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-[#0a0a0a] text-[#374045] dark:text-[#E9EEFF] focus:outline-none focus:ring-2 focus:ring-[#4A12C0] focus:border-transparent ${
                    errors.contactName
                      ? "border-red-500"
                      : "border-[#92A2AA] dark:border-gray-700"
                  }`}
                  placeholder="John Doe"
                />
                {errors.contactName && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.contactName.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contactEmail"
                  className="block text-sm font-medium text-[#374045] dark:text-[#CBD5E0] mb-2"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="contactEmail"
                  {...register("contactEmail")}
                  className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-[#0a0a0a] text-[#374045] dark:text-[#E9EEFF] focus:outline-none focus:ring-2 focus:ring-[#4A12C0] focus:border-transparent ${
                    errors.contactEmail
                      ? "border-red-500"
                      : "border-[#92A2AA] dark:border-gray-700"
                  }`}
                  placeholder="john@university.edu"
                />
                {errors.contactEmail && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.contactEmail.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="contactRole"
                  className="block text-sm font-medium text-[#374045] dark:text-[#CBD5E0] mb-2"
                >
                  Your Role
                </label>
                <select
                  id="contactRole"
                  {...register("contactRole")}
                  className="w-full px-4 py-3 border border-[#92A2AA] dark:border-gray-700 rounded-lg bg-white dark:bg-[#0a0a0a] text-[#374045] dark:text-[#E9EEFF] focus:outline-none focus:ring-2 focus:ring-[#4A12C0] focus:border-transparent"
                >
                  <option value="">Select your role</option>
                  <option value="IT Director">IT Director</option>
                  <option value="CIO">CIO</option>
                  <option value="Dean">Dean</option>
                  <option value="Professor">Professor</option>
                  <option value="Administrator">Administrator</option>
                  <option value="Developer">Developer</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-[#374045] dark:text-[#CBD5E0] mb-2"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  {...register("phoneNumber")}
                  className="w-full px-4 py-3 border border-[#92A2AA] dark:border-gray-700 rounded-lg bg-white dark:bg-[#0a0a0a] text-[#374045] dark:text-[#E9EEFF] focus:outline-none focus:ring-2 focus:ring-[#4A12C0] focus:border-transparent"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Request Details Section */}
        <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
          <h3 className="text-xl font-semibold text-[#2D3748] dark:text-[#E9EEFF] mb-4">
            Request Details
          </h3>

          <div className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="numberOfUsers"
                  className="block text-sm font-medium text-[#374045] dark:text-[#CBD5E0] mb-2"
                >
                  Number of Users
                </label>
                <input
                  type="number"
                  id="numberOfUsers"
                  {...register("numberOfUsers")}
                  className="w-full px-4 py-3 border border-[#92A2AA] dark:border-gray-700 rounded-lg bg-white dark:bg-[#0a0a0a] text-[#374045] dark:text-[#E9EEFF] focus:outline-none focus:ring-2 focus:ring-[#4A12C0] focus:border-transparent"
                  placeholder="e.g., 5000"
                  min="1"
                />
              </div>

              <div>
                <label
                  htmlFor="timeline"
                  className="block text-sm font-medium text-[#374045] dark:text-[#CBD5E0] mb-2"
                >
                  Timeline
                </label>
                <select
                  id="timeline"
                  {...register("timeline")}
                  className="w-full px-4 py-3 border border-[#92A2AA] dark:border-gray-700 rounded-lg bg-white dark:bg-[#0a0a0a] text-[#374045] dark:text-[#E9EEFF] focus:outline-none focus:ring-2 focus:ring-[#4A12C0] focus:border-transparent"
                >
                  <option value="">Select timeline</option>
                  <option value="Immediate">Immediate (ASAP)</option>
                  <option value="1-3 months">1-3 months</option>
                  <option value="3-6 months">3-6 months</option>
                  <option value="6+ months">6+ months</option>
                  <option value="Exploring">Just exploring</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="urgency"
                  className="block text-sm font-medium text-[#374045] dark:text-[#CBD5E0] mb-2"
                >
                  Urgency
                </label>
                <select
                  id="urgency"
                  {...register("urgency")}
                  className="w-full px-4 py-3 border border-[#92A2AA] dark:border-gray-700 rounded-lg bg-white dark:bg-[#0a0a0a] text-[#374045] dark:text-[#E9EEFF] focus:outline-none focus:ring-2 focus:ring-[#4A12C0] focus:border-transparent"
                >
                  <option value="">Select urgency</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="useCaseDescription"
                className="block text-sm font-medium text-[#374045] dark:text-[#CBD5E0] mb-2"
              >
                Use Case Description *
              </label>
              <textarea
                id="useCaseDescription"
                {...register("useCaseDescription")}
                rows={5}
                className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-[#0a0a0a] text-[#374045] dark:text-[#E9EEFF] focus:outline-none focus:ring-2 focus:ring-[#4A12C0] focus:border-transparent ${
                  errors.useCaseDescription
                    ? "border-red-500"
                    : "border-[#92A2AA] dark:border-gray-700"
                }`}
                placeholder="Please describe your use case, what you're trying to achieve, and any specific requirements..."
              />
              {errors.useCaseDescription && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.useCaseDescription.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="existingTechStack"
                className="block text-sm font-medium text-[#374045] dark:text-[#CBD5E0] mb-2"
              >
                Existing Tech Stack
              </label>
              <textarea
                id="existingTechStack"
                {...register("existingTechStack")}
                rows={3}
                className="w-full px-4 py-3 border border-[#92A2AA] dark:border-gray-700 rounded-lg bg-white dark:bg-[#0a0a0a] text-[#374045] dark:text-[#E9EEFF] focus:outline-none focus:ring-2 focus:ring-[#4A12C0] focus:border-transparent"
                placeholder="List other systems and tools you're currently using (LMS, SSO, SIS, etc.)"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Submitting Request..." : "Submit Integration Request"}
          </button>
          <p className="text-sm text-[#5E6E76] dark:text-gray-400 text-center mt-3">
            We&apos;ll review your request and contact you within 1-2 business days.
          </p>
        </div>
      </form>
    </div>
  );
}
