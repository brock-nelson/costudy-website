import { auth } from "@/auth";
import { db, features } from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createFeatureSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  status: z.enum(["proposed", "approved", "in-progress", "completed", "declined"]).default("proposed"),
  category: z.string().optional(),
  isUserSubmitted: z.boolean().default(false),
  submitterEmail: z.string().email().optional().or(z.literal("")),
  submitterName: z.string().optional(),
});

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const validatedData = createFeatureSchema.parse(body);

    // Insert new feature
    const [newFeature] = await db
      .insert(features)
      .values({
        title: validatedData.title,
        description: validatedData.description,
        status: validatedData.status,
        category: validatedData.category || null,
        isUserSubmitted: validatedData.isUserSubmitted,
        submitterEmail: validatedData.submitterEmail || null,
        submitterName: validatedData.submitterName || null,
        createdBy: session.user.id,
        voteCount: 0,
      })
      .returning();

    return NextResponse.json({ success: true, feature: newFeature });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", issues: error.issues },
        { status: 400 }
      );
    }

    console.error("Error creating feature:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
