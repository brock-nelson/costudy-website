"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { trackConversion, EXPERIMENTS } from "@/lib/experiments";

const demoSchemaShort = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  institution: z.string().min(1, "Institution is required"),
});

type DemoFormDataShort = z.infer<typeof demoSchemaShort>;

export default function DemoFormShort() {
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
  } = useForm<DemoFormDataShort>({
    resolver: zodResolver(demoSchemaShort),
  });

  const onSubmit = async (data: DemoFormDataShort) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/demo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, formVariant: "short" }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Track conversion for demo form experiment
        trackConversion(EXPERIMENTS.DEMO_FORM_LENGTH, "demo_request");
        trackConversion(EXPERIMENTS.HOMEPAGE_HEADLINE, "demo_request");

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
      <h2 className="text-3xl font-bold text-center mb-8 text-[#374045] dark:text-[#E9EEFF]">
        Schedule Your Demo
      </h2>

      {submitStatus && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            submitStatus.type === "success"
              ? "bg-green-50 border border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200"
              : "bg-red-50 border border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200"
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-[#1a1a1a] p-8 rounded-lg shadow-md space-y-6"
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-[#374045] dark:text-[#E9EEFF] mb-2"
            >
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              {...register("firstName")}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A12C0] focus:border-transparent bg-white dark:bg-[#0a0a0a] text-[#374045] dark:text-[#E9EEFF] ${
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
              className="block text-sm font-medium text-[#374045] dark:text-[#E9EEFF] mb-2"
            >
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              {...register("lastName")}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A12C0] focus:border-transparent bg-white dark:bg-[#0a0a0a] text-[#374045] dark:text-[#E9EEFF] ${
                errors.lastName ? "border-red-500" : "border-[#92A2AA] dark:border-[#404040]"
              }`}
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-[#374045] dark:text-[#E9EEFF] mb-2"
          >
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A12C0] focus:border-transparent bg-white dark:bg-[#0a0a0a] text-[#374045] dark:text-[#E9EEFF] ${
              errors.email ? "border-red-500" : "border-[#92A2AA] dark:border-[#404040]"
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="institution"
            className="block text-sm font-medium text-[#374045] dark:text-[#E9EEFF] mb-2"
          >
            Institution / Organization *
          </label>
          <input
            type="text"
            id="institution"
            {...register("institution")}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A12C0] focus:border-transparent bg-white dark:bg-[#0a0a0a] text-[#374045] dark:text-[#E9EEFF] ${
              errors.institution ? "border-red-500" : "border-[#92A2AA] dark:border-[#404040]"
            }`}
          />
          {errors.institution && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.institution.message}</p>
          )}
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

        <p className="text-sm text-[#5E6E76] dark:text-[#A0AEC0] text-center">
          We&apos;ll get back to you within 1 business day to schedule a time that works
          for you.
        </p>
      </form>
    </div>
  );
}
