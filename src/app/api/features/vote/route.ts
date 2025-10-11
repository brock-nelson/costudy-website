import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db, features, votes } from "@/db";
import { eq, and, or } from "drizzle-orm";

const voteSchema = z.object({
  featureId: z.string().uuid(),
  userEmail: z.string().email(),
  userName: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = voteSchema.parse(body);

    // Get client information
    const ipAddress =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";

    // Check if user has already voted for this feature (by email or IP)
    const existingVote = await db
      .select()
      .from(votes)
      .where(
        and(
          eq(votes.featureId, validatedData.featureId),
          or(
            eq(votes.userEmail, validatedData.userEmail),
            eq(votes.ipAddress, ipAddress)
          )
        )
      )
      .limit(1);

    if (existingVote.length > 0) {
      return NextResponse.json(
        { error: "You have already voted for this feature" },
        { status: 400 }
      );
    }

    // Create vote
    await db.insert(votes).values({
      featureId: validatedData.featureId,
      userEmail: validatedData.userEmail,
      userName: validatedData.userName || null,
      ipAddress: ipAddress,
      userAgent: userAgent,
      metadata: {},
    });

    // Get current feature to increment vote count
    const [currentFeature] = await db
      .select()
      .from(features)
      .where(eq(features.id, validatedData.featureId))
      .limit(1);

    // Increment vote count on feature
    const [updatedFeature] = await db
      .update(features)
      .set({
        voteCount: (currentFeature?.voteCount || 0) + 1,
        updatedAt: new Date(),
      })
      .where(eq(features.id, validatedData.featureId))
      .returning();

    return NextResponse.json({
      success: true,
      voteCount: updatedFeature.voteCount,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", issues: error.issues },
        { status: 400 }
      );
    }

    console.error("Error processing vote:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
