import { NextResponse } from "next/server";
import { z } from "zod";
import { db, contactSubmissions } from "@/db";

// Validation schema
const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  role: z.string().min(1, "Please select a role"),
  institution: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate the data
    const validatedData = contactSchema.parse(body);

    // Get client information
    const ipAddress =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";

    // Combine first and last name
    const fullName = `${validatedData.firstName} ${validatedData.lastName}`;

    // Create subject from role and institution
    const subjectParts = [validatedData.role];
    if (validatedData.institution) {
      subjectParts.push(`from ${validatedData.institution}`);
    }
    const subject = subjectParts.join(" ");

    // Save to database
    await db.insert(contactSubmissions).values({
      name: fullName,
      email: validatedData.email,
      subject: subject,
      message: validatedData.message,
      type: "general",
      status: "new",
      ipAddress: ipAddress,
      userAgent: userAgent,
    });

    console.log("Contact submission saved to database:", {
      email: validatedData.email,
      name: fullName,
    });

    // TODO: In production, send email via service like SendGrid, Resend, or AWS SES
    return NextResponse.json(
      {
        success: true,
        message: "Thank you for contacting us! We'll get back to you within 1 business day."
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

    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
