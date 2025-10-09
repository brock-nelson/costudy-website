import { NextResponse } from "next/server";
import { z } from "zod";

// Validation schema
const demoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  institution: z.string().min(1, "Institution is required"),
  role: z.string().min(1, "Please select a role"),
  teamSize: z.string().optional(),
  notes: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate the data
    const validatedData = demoSchema.parse(body);

    // TODO: In production, send email via service like SendGrid, Resend, or AWS SES
    // TODO: Optionally integrate with calendar booking service (Calendly, Cal.com, etc.)
    // For now, we'll just log it and return success
    console.log("Demo Request Submission:", {
      ...validatedData,
      submittedAt: new Date().toISOString(),
    });

    // Simulate email sending delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your interest! We'll contact you within 1 business day to schedule your personalized demo."
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.errors },
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
