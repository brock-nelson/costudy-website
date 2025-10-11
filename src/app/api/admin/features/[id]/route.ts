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
    const { status } = body;

    if (!status) {
      return NextResponse.json({ error: "Status is required" }, { status: 400 });
    }

    // Update feature status
    await db
      .update(features)
      .set({
        status,
        updatedAt: new Date(),
        ...(status === "completed" ? { completedAt: new Date() } : {}),
      })
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
