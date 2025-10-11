import { auth } from "@/auth";
import { db, releases } from "@/db";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const updateReleaseSchema = z.object({
  version: z.string().min(1, "Version is required").optional(),
  title: z.string().min(1, "Title is required").optional(),
  description: z.string().min(1, "Description is required").optional(),
  type: z.enum(["feature", "improvement", "bugfix", "security"]).optional(),
  isPublished: z.boolean().optional(),
  featuredImageUrl: z.string().url().optional().or(z.literal("")),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();

    // Validate the data
    const validatedData = updateReleaseSchema.parse(body);

    // Build update object
    const updateData: Record<string, unknown> = {
      updatedAt: new Date(),
    };

    // Only include fields that were provided
    if (validatedData.version !== undefined) updateData.version = validatedData.version;
    if (validatedData.title !== undefined) updateData.title = validatedData.title;
    if (validatedData.description !== undefined) updateData.description = validatedData.description;
    if (validatedData.type !== undefined) updateData.type = validatedData.type;
    if (validatedData.featuredImageUrl !== undefined) {
      updateData.featuredImageUrl = validatedData.featuredImageUrl || null;
    }

    // Handle publish status with publishedAt timestamp
    if (validatedData.isPublished !== undefined) {
      updateData.isPublished = validatedData.isPublished;
      updateData.publishedAt = validatedData.isPublished ? new Date() : null;
    }

    // Update release
    await db
      .update(releases)
      .set(updateData)
      .where(eq(releases.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", issues: error.issues },
        { status: 400 }
      );
    }

    console.error("Error updating release:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
