import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db, emailSubscriptions } from "@/db";
import { eq } from "drizzle-orm";
import { newsletterLimiter, getIdentifier } from "@/lib/rate-limit";
import sgClient from "@sendgrid/client";
import { sendNewsletterWelcomeEmail } from "@/lib/email-service";

// Initialize SendGrid client
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
if (SENDGRID_API_KEY) {
  sgClient.setApiKey(SENDGRID_API_KEY);
}

const subscribeSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().optional(),
  source: z.string().default("newsletter-form"),
  firstName: z.string().optional(),
  institution: z.string().optional(),
  role: z.string().optional(),
  interests: z.array(z.string()).optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const identifier = getIdentifier(request);
    const { success } = await newsletterLimiter.limit(identifier);

    if (!success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in an hour." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const validatedData = subscribeSchema.parse(body);

    // Get client information
    const ipAddress =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";

    // Check if email already exists
    const existing = await db
      .select()
      .from(emailSubscriptions)
      .where(eq(emailSubscriptions.email, validatedData.email))
      .limit(1);

    if (existing.length > 0) {
      const subscription = existing[0];

      // If they unsubscribed before, reactivate
      if (!subscription.isActive) {
        await db
          .update(emailSubscriptions)
          .set({
            isActive: true,
            unsubscribedAt: null,
            updatedAt: new Date(),
          })
          .where(eq(emailSubscriptions.email, validatedData.email));

        return NextResponse.json({
          success: true,
          message: "Welcome back! Your subscription has been reactivated.",
        });
      }

      return NextResponse.json({
        success: true,
        message: "You're already subscribed to our newsletter!",
      });
    }

    // Create new subscription
    await db.insert(emailSubscriptions).values({
      email: validatedData.email,
      name: validatedData.name || null,
      source: validatedData.source,
      ipAddress: ipAddress,
      userAgent: userAgent,
      isActive: true,
      confirmedAt: new Date(), // Auto-confirm for now, can add double opt-in later
    });

    // Add to SendGrid Marketing Campaigns contact list
    if (SENDGRID_API_KEY && process.env.SENDGRID_NEWSLETTER_LIST_ID) {
      try {
        const contactData = {
          list_ids: [process.env.SENDGRID_NEWSLETTER_LIST_ID],
          contacts: [
            {
              email: validatedData.email,
              first_name: validatedData.firstName || validatedData.name?.split(" ")[0] || "",
              last_name: validatedData.name?.split(" ").slice(1).join(" ") || "",
              custom_fields: {
                institution: validatedData.institution || "",
                role: validatedData.role || "",
                interests: validatedData.interests?.join(", ") || "",
                source: validatedData.source,
              },
            },
          ],
        };

        await sgClient.request({
          method: "PUT",
          url: "/v3/marketing/contacts",
          body: contactData,
        });

        console.log("✅ Contact added to SendGrid list:", validatedData.email);
      } catch (sgError) {
        console.error("SendGrid Marketing API error:", sgError);
        // Continue even if SendGrid fails - we still have the DB record
      }
    }

    // Send welcome email
    try {
      await sendNewsletterWelcomeEmail({
        to: validatedData.email,
        firstName: validatedData.firstName || validatedData.name?.split(" ")[0],
      });
    } catch (emailError) {
      console.error("Welcome email error:", emailError);
      // Continue even if email fails - subscription is still active
    }

    return NextResponse.json({
      success: true,
      message: "Thanks for subscribing! Check your email for a welcome message.",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid email address", issues: error.issues },
        { status: 400 }
      );
    }

    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
