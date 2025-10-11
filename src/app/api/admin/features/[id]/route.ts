import { auth } from "@/auth";
import { db, features } from "@/db";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

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
    const { title, description, status, category } = body;

    // Build update object dynamically based on provided fields
    const updateData: Record<string, unknown> = {
      updatedAt: new Date(),
    };

    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (category !== undefined) updateData.category = category;
    if (status !== undefined) {
      updateData.status = status;
      // Set completedAt when status changes to completed
      if (status === "completed") {
        updateData.completedAt = new Date();
      }
    }

    // Validate that at least one field is being updated
    if (Object.keys(updateData).length === 1) {
      return NextResponse.json(
        { error: "No fields to update" },
        { status: 400 }
      );
    }

    // Update feature
    await db
      .update(features)
      .set(updateData)
      .where(eq(features.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating feature:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
