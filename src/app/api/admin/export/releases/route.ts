import { auth } from "@/auth";
import { db, releases } from "@/db";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Fetch all releases
    const allReleases = await db
      .select()
      .from(releases)
      .orderBy(desc(releases.createdAt));

    // Convert to CSV-friendly format
    const csvData = allReleases.map(release => ({
      id: release.id,
      version: release.version,
      title: release.title,
      description: release.description,
      type: release.type,
      isPublished: release.isPublished ? "Yes" : "No",
      featuredImageUrl: release.featuredImageUrl || "",
      createdAt: release.createdAt.toISOString(),
      updatedAt: release.updatedAt.toISOString(),
      publishedAt: release.publishedAt?.toISOString() || "",
    }));

    return NextResponse.json({ data: csvData });
  } catch (error) {
    console.error("Error exporting releases:", error);
    return NextResponse.json(
      { error: "Failed to export releases" },
      { status: 500 }
    );
  }
}
