import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db, emailSubscriptions } from "@/db";
import { eq } from "drizzle-orm";

const unsubscribeSchema = z.object({
  email: z.string().email("Invalid email address"),
  reason: z.string().optional(),
  feedback: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = unsubscribeSchema.parse(body);

    // Find the subscription
    const existing = await db
      .select()
      .from(emailSubscriptions)
      .where(eq(emailSubscriptions.email, validatedData.email))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json(
        { error: "Email not found in our newsletter list" },
        { status: 404 }
      );
    }

    const subscription = existing[0];

    // If already unsubscribed
    if (!subscription.isActive) {
      return NextResponse.json({
        success: true,
        message: "You were already unsubscribed from our newsletter.",
      });
    }

    // Unsubscribe
    await db
      .update(emailSubscriptions)
      .set({
        isActive: false,
        unsubscribedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(emailSubscriptions.email, validatedData.email));

    // Log feedback if provided (could store in a separate table)
    if (validatedData.reason || validatedData.feedback) {
      console.log("Unsubscribe feedback:", {
        email: validatedData.email,
        reason: validatedData.reason,
        feedback: validatedData.feedback,
      });
    }

    return NextResponse.json({
      success: true,
      message: "You've been successfully unsubscribed from our newsletter.",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid email address", issues: error.issues },
        { status: 400 }
      );
    }

    console.error("Newsletter unsubscribe error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
