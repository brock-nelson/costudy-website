import { auth } from "@/auth";
import { db, features } from "@/db";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Fetch all features
    const allFeatures = await db
      .select()
      .from(features)
      .orderBy(desc(features.createdAt));

    // Convert to CSV-friendly format
    const csvData = allFeatures.map(feature => ({
      id: feature.id,
      title: feature.title,
      description: feature.description,
      status: feature.status,
      category: feature.category || "",
      voteCount: feature.voteCount,
      isUserSubmitted: feature.isUserSubmitted ? "Yes" : "No",
      submitterName: feature.submitterName || "",
      submitterEmail: feature.submitterEmail || "",
      createdAt: feature.createdAt.toISOString(),
      updatedAt: feature.updatedAt.toISOString(),
      completedAt: feature.completedAt?.toISOString() || "",
    }));

    return NextResponse.json({ data: csvData });
  } catch (error) {
    console.error("Error exporting features:", error);
    return NextResponse.json(
      { error: "Failed to export features" },
      { status: 500 }
    );
  }
}
