import { NextResponse } from "next/server";
import { z } from "zod";
import { db, integrationRequests } from "@/db";
import { integrationRequestLimiter, getIdentifier } from "@/lib/rate-limit";
import { sgMail, emailConfig } from "@/lib/sendgrid";

// Validation schema matching the integrationRequests table
const integrationRequestSchema = z.object({
  // Integration details
  integrationName: z.string().min(1, "Integration name is required"),
  platform: z.string().optional(),

  // Institution/Organization
  institutionName: z.string().min(1, "Institution name is required"),

  // Contact person
  contactName: z.string().min(1, "Contact name is required"),
  contactEmail: z.string().email("Invalid email address"),
  contactRole: z.string().optional(),
  phoneNumber: z.string().optional(),

  // Request details
  numberOfUsers: z.number().int().positive().optional(),
  timeline: z.string().optional(),
  urgency: z.string().optional(),
  useCaseDescription: z
    .string()
    .min(10, "Please provide at least 10 characters describing your use case"),
  existingTechStack: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    // Rate limiting - 2 requests per hour per IP
    const identifier = getIdentifier(request);
    const { success } = await integrationRequestLimiter.limit(identifier);

    if (!success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Validate the data
    const validatedData = integrationRequestSchema.parse(body);

    // Get client information for tracking
    const ipAddress =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";

    // Save to database
    const [insertedRequest] = await db
      .insert(integrationRequests)
      .values({
        integrationName: validatedData.integrationName,
        platform: validatedData.platform,
        institutionName: validatedData.institutionName,
        contactName: validatedData.contactName,
        contactEmail: validatedData.contactEmail,
        contactRole: validatedData.contactRole,
        phoneNumber: validatedData.phoneNumber,
        numberOfUsers: validatedData.numberOfUsers,
        timeline: validatedData.timeline,
        urgency: validatedData.urgency,
        useCaseDescription: validatedData.useCaseDescription,
        existingTechStack: validatedData.existingTechStack,
        status: "pending",
        ipAddress: ipAddress,
        userAgent: userAgent,
      })
      .returning();

    console.log("Integration request saved to database:", {
      id: insertedRequest.id,
      email: validatedData.contactEmail,
      integration: validatedData.integrationName,
    });

    // Send notification email to admin team
    if (process.env.SENDGRID_API_KEY) {
      try {
        const adminEmail = process.env.ADMIN_EMAIL || "support@costudy.co";

        const adminHtml = `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #7C3AED; padding: 30px 20px; text-align: center;">
              <h1 style="color: white; margin: 0;">New Integration Request</h1>
            </div>

            <div style="padding: 30px 20px;">
              <h2 style="color: #2D3748;">Integration Details</h2>
              <div style="background-color: #F7FAFC; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 8px 0;"><strong>Integration:</strong> ${validatedData.integrationName}</p>
                ${
                  validatedData.platform
                    ? `<p style="margin: 8px 0;"><strong>Platform:</strong> ${validatedData.platform}</p>`
                    : ""
                }
                <p style="margin: 8px 0;"><strong>Institution:</strong> ${validatedData.institutionName}</p>
              </div>

              <h2 style="color: #2D3748;">Contact Information</h2>
              <div style="background-color: #F7FAFC; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 8px 0;"><strong>Name:</strong> ${validatedData.contactName}</p>
                <p style="margin: 8px 0;"><strong>Email:</strong> ${validatedData.contactEmail}</p>
                ${
                  validatedData.contactRole
                    ? `<p style="margin: 8px 0;"><strong>Role:</strong> ${validatedData.contactRole}</p>`
                    : ""
                }
                ${
                  validatedData.phoneNumber
                    ? `<p style="margin: 8px 0;"><strong>Phone:</strong> ${validatedData.phoneNumber}</p>`
                    : ""
                }
              </div>

              <h2 style="color: #2D3748;">Request Details</h2>
              <div style="background-color: #F7FAFC; padding: 20px; border-radius: 8px; margin: 20px 0;">
                ${
                  validatedData.numberOfUsers
                    ? `<p style="margin: 8px 0;"><strong>Number of Users:</strong> ${validatedData.numberOfUsers}</p>`
                    : ""
                }
                ${
                  validatedData.timeline
                    ? `<p style="margin: 8px 0;"><strong>Timeline:</strong> ${validatedData.timeline}</p>`
                    : ""
                }
                ${
                  validatedData.urgency
                    ? `<p style="margin: 8px 0;"><strong>Urgency:</strong> ${validatedData.urgency}</p>`
                    : ""
                }
                <p style="margin: 8px 0;"><strong>Use Case:</strong></p>
                <p style="margin: 8px 0; white-space: pre-wrap;">${validatedData.useCaseDescription}</p>
                ${
                  validatedData.existingTechStack
                    ? `<p style="margin: 8px 0;"><strong>Existing Tech Stack:</strong></p><p style="margin: 8px 0; white-space: pre-wrap;">${validatedData.existingTechStack}</p>`
                    : ""
                }
              </div>

              <div style="margin-top: 30px; padding: 15px; background-color: #EEF2FF; border-left: 4px solid #7C3AED; border-radius: 4px;">
                <p style="margin: 0; font-size: 14px;">
                  <strong>Request ID:</strong> ${insertedRequest.id}<br />
                  <strong>Submitted:</strong> ${new Date().toLocaleString()}<br />
                  <strong>IP Address:</strong> ${ipAddress}
                </p>
              </div>
            </div>
          </div>
        `;

        await sgMail.send({
          to: adminEmail,
          from: emailConfig.from,
          replyTo: validatedData.contactEmail,
          subject: `New Integration Request: ${validatedData.integrationName} - ${validatedData.institutionName}`,
          html: adminHtml,
        });

        console.log("Admin notification email sent successfully");
      } catch (emailError) {
        console.error("Error sending admin notification email:", emailError);
        // Don't fail the request if email fails
      }

      // Send confirmation email to requester
      try {
        const confirmationHtml = `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #7C3AED; padding: 30px 20px; text-align: center;">
              <h1 style="color: white; margin: 0;">Integration Request Received</h1>
            </div>

            <div style="padding: 30px 20px;">
              <p style="font-size: 16px;">Hi ${validatedData.contactName},</p>

              <p style="font-size: 16px;">
                Thank you for your interest in integrating CoStudy with ${validatedData.integrationName}!
              </p>

              <p style="font-size: 16px;">
                We've received your request and our team will review it shortly. We'll reach out within 1-2 business days to discuss:
              </p>

              <ul style="font-size: 16px; line-height: 1.6;">
                <li>Technical requirements and feasibility</li>
                <li>Implementation timeline</li>
                <li>Pricing and licensing options</li>
                <li>Next steps for ${validatedData.institutionName}</li>
              </ul>

              <div style="background-color: #F7FAFC; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #2D3748;">Your Request Summary</h3>
                <p style="margin: 8px 0;"><strong>Integration:</strong> ${validatedData.integrationName}</p>
                <p style="margin: 8px 0;"><strong>Institution:</strong> ${validatedData.institutionName}</p>
                ${
                  validatedData.timeline
                    ? `<p style="margin: 8px 0;"><strong>Timeline:</strong> ${validatedData.timeline}</p>`
                    : ""
                }
              </div>

              <p style="font-size: 14px; color: #718096; margin-top: 30px;">
                In the meantime, if you have any questions, feel free to reply to this email or contact us at support@costudy.co.
              </p>

              <p style="font-size: 16px;">Best regards,<br/>The CoStudy Team</p>
            </div>
          </div>
        `;

        await sgMail.send({
          to: validatedData.contactEmail,
          from: emailConfig.from,
          replyTo: emailConfig.replyTo,
          subject: "We've received your integration request - CoStudy",
          html: confirmationHtml,
        });

        console.log(
          "Confirmation email sent successfully to:",
          validatedData.contactEmail
        );
      } catch (emailError) {
        console.error("Error sending confirmation email:", emailError);
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you for your integration request! We'll contact you within 1-2 business days to discuss next steps.",
      },
      { status: 200 }
    );
  } catch (error) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.issues },
        { status: 400 }
      );
    }

    // Handle all other errors
    console.error("Integration request error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}
