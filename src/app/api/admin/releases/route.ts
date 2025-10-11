import { auth } from "@/auth";
import { db, releases } from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createReleaseSchema = z.object({
  version: z.string().min(1, "Version is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  type: z.enum(["feature", "improvement", "bugfix", "security"]),
  isPublished: z.boolean().default(false),
  featuredImageUrl: z.string().url().optional().or(z.literal("")),
});

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const validatedData = createReleaseSchema.parse(body);

    // Insert new release
    const [newRelease] = await db
      .insert(releases)
      .values({
        version: validatedData.version,
        title: validatedData.title,
        description: validatedData.description,
        type: validatedData.type,
        isPublished: validatedData.isPublished,
        featuredImageUrl: validatedData.featuredImageUrl || null,
        createdBy: session.user.id,
        ...(validatedData.isPublished ? { publishedAt: new Date() } : { publishedAt: null }),
      })
      .returning();

    return NextResponse.json({ success: true, release: newRelease });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", issues: error.issues },
        { status: 400 }
      );
    }

    console.error("Error creating release:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
