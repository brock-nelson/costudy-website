"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { trackDemoRequest, getStoredUTMParameters } from "@/lib/analytics";

const demoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  institution: z.string().min(1, "Institution is required"),
  role: z.string().min(1, "Please select a role"),
  teamSize: z.string().optional(),
  notes: z.string().optional(),
});

type DemoFormData = z.infer<typeof demoSchema>;

export default function DemoForm() {
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
  } = useForm<DemoFormData>({
    resolver: zodResolver(demoSchema),
  });

  const onSubmit = async (data: DemoFormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/demo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Track successful demo request conversion
        try {
          const utmParams = getStoredUTMParameters();
          trackDemoRequest({
            role: data.role,
            institution: data.institution,
            teamSize: data.teamSize,
            value: 500, // Estimated lead value
            ...utmParams,
          });
        } catch (error) {
          // Silent fail - don't break user flow if analytics fails
          if (process.env.NODE_ENV === "development") {
            console.error("Analytics tracking error:", error);
          }
        }

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
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-[#374045]">
        Schedule Your Demo
      </h2>

      {submitStatus && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            submitStatus.type === "success"
              ? "bg-green-50 border border-green-200 text-green-800"
              : "bg-red-50 border border-red-200 text-red-800"
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md space-y-6"
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-[#374045] mb-2"
            >
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              {...register("firstName")}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A12C0] focus:border-transparent ${
                errors.firstName ? "border-red-500" : "border-[#92A2AA]"
              }`}
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-[#374045] mb-2"
            >
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              {...register("lastName")}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A12C0] focus:border-transparent ${
                errors.lastName ? "border-red-500" : "border-[#92A2AA]"
              }`}
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-[#374045] mb-2"
          >
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A12C0] focus:border-transparent ${
              errors.email ? "border-red-500" : "border-[#92A2AA]"
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="institution"
            className="block text-sm font-medium text-[#374045] mb-2"
          >
            Institution / Organization *
          </label>
          <input
            type="text"
            id="institution"
            {...register("institution")}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A12C0] focus:border-transparent ${
              errors.institution ? "border-red-500" : "border-[#92A2AA]"
            }`}
          />
          {errors.institution && (
            <p className="mt-1 text-sm text-red-600">{errors.institution.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="role"
            className="block text-sm font-medium text-[#374045] mb-2"
          >
            Your Role *
          </label>
          <select
            id="role"
            {...register("role")}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A12C0] focus:border-transparent ${
              errors.role ? "border-red-500" : "border-[#92A2AA]"
            }`}
          >
            <option value="">Select your role</option>
            <option value="professor">Professor / Instructor</option>
            <option value="administrator">Administrator</option>
            <option value="instructional-designer">Instructional Designer</option>
            <option value="other">Other</option>
          </select>
          {errors.role && (
            <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="teamSize"
            className="block text-sm font-medium text-[#374045] mb-2"
          >
            Estimated Number of Students
          </label>
          <select
            id="teamSize"
            {...register("teamSize")}
            className="w-full px-4 py-3 border border-[#92A2AA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A12C0] focus:border-transparent"
          >
            <option value="">Select a range</option>
            <option value="1-50">1-50</option>
            <option value="51-200">51-200</option>
            <option value="201-500">201-500</option>
            <option value="501-1000">501-1000</option>
            <option value="1000+">1000+</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="notes"
            className="block text-sm font-medium text-[#374045] mb-2"
          >
            Anything specific you&apos;d like to discuss?
          </label>
          <textarea
            id="notes"
            {...register("notes")}
            rows={4}
            className="w-full px-4 py-3 border border-[#92A2AA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A12C0] focus:border-transparent"
            placeholder="Tell us about your goals and questions..."
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-[#4A12C0] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#3a0e99] transition-colors ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Submitting..." : "Request Demo"}
          </button>
        </div>

        <p className="text-sm text-[#5E6E76] text-center">
          We&apos;ll get back to you within 1 business day to schedule a time that works
          for you.
        </p>
      </form>
    </div>
  );
}
