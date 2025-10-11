import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db, emailSubscriptions } from "@/db";
import { eq } from "drizzle-orm";
import { newsletterLimiter, getIdentifier } from "@/lib/rate-limit";

const subscribeSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().optional(),
  source: z.string().default("newsletter-form"),
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

    return NextResponse.json({
      success: true,
      message: "Thanks for subscribing! You'll receive our latest updates.",
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
