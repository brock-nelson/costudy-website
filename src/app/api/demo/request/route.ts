import { NextResponse } from "next/server";
import { z } from "zod";
import { db, demoRequests } from "@/db";
import { sendDemoRequestConfirmation, sendDemoRequestSalesNotification } from "@/lib/email-service";
import { sendDemoRequestToSlack } from "@/lib/slack";

// Validation schema for university demo requests
const demoRequestSchema = z.object({
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

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate the data
    const validatedData = demoRequestSchema.parse(body);

    // Get client information
    const ipAddress =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";

    // Save to database
    const [demoRequest] = await db.insert(demoRequests).values({
      universityName: validatedData.universityName,
      universityWebsite: validatedData.universityWebsite || null,
      studentCount: validatedData.studentCount,
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      email: validatedData.email,
      phoneNumber: validatedData.phone || null,
      role: validatedData.role,
      department: validatedData.department || null,
      goals: validatedData.goals,
      timeline: validatedData.timeline,
      message: validatedData.message || null,
      referralSource: validatedData.referralSource || null,
      status: "pending",
      ipAddress,
      userAgent,
    }).returning();

    console.log("Demo request saved to database:", {
      id: demoRequest.id,
      email: validatedData.email,
      university: validatedData.universityName,
    });

    // Send confirmation email to requester
    const confirmationResult = await sendDemoRequestConfirmation({
      to: validatedData.email,
      firstName: validatedData.firstName,
      universityName: validatedData.universityName,
    });

    if (!confirmationResult.success) {
      console.error("Failed to send confirmation email:", confirmationResult.error);
    }

    // Send notification email to sales team
    const salesNotificationResult = await sendDemoRequestSalesNotification({
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      email: validatedData.email,
      phone: validatedData.phone,
      universityName: validatedData.universityName,
      universityWebsite: validatedData.universityWebsite,
      studentCount: validatedData.studentCount,
      role: validatedData.role,
      department: validatedData.department,
      goals: validatedData.goals,
      timeline: validatedData.timeline,
      message: validatedData.message,
      referralSource: validatedData.referralSource,
    });

    if (!salesNotificationResult.success) {
      console.error("Failed to send sales notification:", salesNotificationResult.error);
    }

    // Send notification to Slack
    const slackResult = await sendDemoRequestToSlack({
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      email: validatedData.email,
      phone: validatedData.phone,
      universityName: validatedData.universityName,
      universityWebsite: validatedData.universityWebsite,
      studentCount: validatedData.studentCount,
      role: validatedData.role,
      department: validatedData.department,
      goals: validatedData.goals,
      timeline: validatedData.timeline,
      message: validatedData.message,
      referralSource: validatedData.referralSource,
    });

    if (!slackResult.success) {
      console.error("Failed to send Slack notification:", slackResult.error);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your interest! We'll reach out within 24 hours to schedule your demo.",
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.issues },
        { status: 400 }
      );
    }

    console.error("Demo request error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
