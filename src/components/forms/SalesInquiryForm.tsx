"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const salesInquirySchema = z.object({
  inquiryType: z.string().min(1, "Please select an inquiry type"),
  university: z.string().min(1, "University name is required"),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  role: z.string().min(1, "Please select your role"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type SalesInquiryFormData = z.infer<typeof salesInquirySchema>;

interface SalesInquiryFormProps {
  onSuccess?: () => void;
}

export default function SalesInquiryForm({ onSuccess }: SalesInquiryFormProps) {
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
  } = useForm<SalesInquiryFormData>({
    resolver: zodResolver(salesInquirySchema),
  });

  const onSubmit = async (data: SalesInquiryFormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/contact/sales", {
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
          message: result.message || "Thank you for your inquiry! Our sales team will contact you within 24 hours.",
        });
        reset();

        // Call onSuccess callback after a short delay
        setTimeout(() => {
          if (onSuccess) {
            onSuccess();
          }
        }, 2000);
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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label
            htmlFor="inquiryType"
            className="block text-sm font-medium text-[#374045] dark:text-[#E9EEFF] mb-2"
          >
            Inquiry Type *
          </label>
          <select
            id="inquiryType"
            {...register("inquiryType")}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A12C0] focus:border-transparent bg-white dark:bg-[#1a1a1a] dark:text-[#E9EEFF] ${
              errors.inquiryType ? "border-red-500" : "border-[#92A2AA]"
            }`}
          >
            <option value="">Select inquiry type</option>
            <option value="demo">Demo Request</option>
            <option value="pricing">Pricing</option>
            <option value="pilot">Pilot Program</option>
            <option value="other">Other</option>
          </select>
          {errors.inquiryType && (
            <p className="mt-1 text-sm text-red-600">{errors.inquiryType.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="university"
            className="block text-sm font-medium text-[#374045] dark:text-[#E9EEFF] mb-2"
          >
            University / Institution *
          </label>
          <input
            type="text"
            id="university"
            {...register("university")}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A12C0] focus:border-transparent bg-white dark:bg-[#1a1a1a] dark:text-[#E9EEFF] ${
              errors.university ? "border-red-500" : "border-[#92A2AA]"
            }`}
          />
          {errors.university && (
            <p className="mt-1 text-sm text-red-600">{errors.university.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-[#374045] dark:text-[#E9EEFF] mb-2"
          >
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            {...register("name")}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A12C0] focus:border-transparent bg-white dark:bg-[#1a1a1a] dark:text-[#E9EEFF] ${
              errors.name ? "border-red-500" : "border-[#92A2AA]"
            }`}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
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
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A12C0] focus:border-transparent bg-white dark:bg-[#1a1a1a] dark:text-[#E9EEFF] ${
              errors.email ? "border-red-500" : "border-[#92A2AA]"
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-[#374045] dark:text-[#E9EEFF] mb-2"
          >
            Phone Number (optional)
          </label>
          <input
            type="tel"
            id="phone"
            {...register("phone")}
            className="w-full px-4 py-3 border border-[#92A2AA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A12C0] focus:border-transparent bg-white dark:bg-[#1a1a1a] dark:text-[#E9EEFF]"
          />
        </div>

        <div>
          <label
            htmlFor="role"
            className="block text-sm font-medium text-[#374045] dark:text-[#E9EEFF] mb-2"
          >
            Your Role *
          </label>
          <select
            id="role"
            {...register("role")}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A12C0] focus:border-transparent bg-white dark:bg-[#1a1a1a] dark:text-[#E9EEFF] ${
              errors.role ? "border-red-500" : "border-[#92A2AA]"
            }`}
          >
            <option value="">Select your role</option>
            <option value="professor">Professor / Instructor</option>
            <option value="administrator">Administrator</option>
            <option value="decision-maker">Decision Maker</option>
            <option value="it-manager">IT Manager</option>
            <option value="other">Other</option>
          </select>
          {errors.role && (
            <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-[#374045] dark:text-[#E9EEFF] mb-2"
          >
            Message *
          </label>
          <textarea
            id="message"
            {...register("message")}
            rows={6}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A12C0] focus:border-transparent bg-white dark:bg-[#1a1a1a] dark:text-[#E9EEFF] ${
              errors.message ? "border-red-500" : "border-[#92A2AA]"
            }`}
            placeholder="Tell us about your needs, number of students, timeline, etc."
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
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
            {isSubmitting ? "Sending..." : "Submit Inquiry"}
          </button>
        </div>
      </form>
    </div>
  );
}
