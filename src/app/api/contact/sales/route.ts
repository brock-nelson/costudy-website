import { NextResponse } from "next/server";
import { z } from "zod";
import { db, contactSubmissions } from "@/db";
import { contactFormLimiter, getIdentifier } from "@/lib/rate-limit";
import { sendSalesInquiryEmail } from "@/lib/email-service";

// Validation schema
const salesInquirySchema = z.object({
  inquiryType: z.string().min(1, "Inquiry type is required"),
  university: z.string().min(1, "University name is required"),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  role: z.string().min(1, "Role is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(request: Request) {
  try {
    // Rate limiting
    const identifier = getIdentifier(request);
    const { success } = await contactFormLimiter.limit(identifier);

    if (!success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Validate the data
    const validatedData = salesInquirySchema.parse(body);

    // Get client information
    const ipAddress =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";

    // Create subject from inquiry type
    const subjectMap: Record<string, string> = {
      demo: "Demo Request",
      pricing: "Pricing Inquiry",
      pilot: "Pilot Program Interest",
      other: "General Sales Inquiry",
    };
    const subject = `${subjectMap[validatedData.inquiryType] || "Sales Inquiry"} - ${validatedData.university}`;

    // Save to database
    await db.insert(contactSubmissions).values({
      name: validatedData.name,
      email: validatedData.email,
      subject: subject,
      message: validatedData.message,
      type: "sales",
      phoneNumber: validatedData.phone || null,
      status: "new",
      ipAddress: ipAddress,
      userAgent: userAgent,
      source: `sales-${validatedData.inquiryType}`,
    });

    console.log("Sales inquiry saved to database:", {
      email: validatedData.email,
      name: validatedData.name,
      inquiryType: validatedData.inquiryType,
      university: validatedData.university,
    });

    // Send email notification
    try {
      await sendSalesInquiryEmail({
        to: validatedData.email,
        salesEmail: "sales@costudy.co",
        name: validatedData.name,
        university: validatedData.university,
        inquiryType: validatedData.inquiryType,
        role: validatedData.role,
        phone: validatedData.phone,
        message: validatedData.message,
      });
    } catch (emailError) {
      console.error("Failed to send sales inquiry email:", emailError);
      // Don't fail the request if email fails - the submission is still saved
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you for your inquiry! Our sales team will contact you within 24 hours.",
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

    console.error("Sales inquiry error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}
