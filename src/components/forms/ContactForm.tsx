"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  role: z.string().min(1, "Please select a role"),
  institution: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const searchParams = useSearchParams();
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
    setValue,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  // Pre-fill message field if subject query parameter is present
  useEffect(() => {
    const subject = searchParams.get("subject");
    if (subject) {
      const decodedSubject = decodeURIComponent(subject.replace(/\+/g, " "));
      setValue("message", `Regarding: ${decodedSubject}\n\n`);
    }
  }, [searchParams, setValue]);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/contact", {
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
            htmlFor="role"
            className="block text-sm font-medium text-[#374045] mb-2"
          >
            I am a... *
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
            <option value="student">Student</option>
            <option value="researcher">Researcher</option>
            <option value="other">Other</option>
          </select>
          {errors.role && (
            <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="institution"
            className="block text-sm font-medium text-[#374045] mb-2"
          >
            Institution / Organization
          </label>
          <input
            type="text"
            id="institution"
            {...register("institution")}
            className="w-full px-4 py-3 border border-[#92A2AA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A12C0] focus:border-transparent"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-[#374045] mb-2"
          >
            Message *
          </label>
          <textarea
            id="message"
            {...register("message")}
            rows={6}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A12C0] focus:border-transparent ${
              errors.message ? "border-red-500" : "border-[#92A2AA]"
            }`}
            placeholder="Tell us how we can help..."
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
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </div>
      </form>
    </div>
  );
}
