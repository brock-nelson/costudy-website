import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { resources } from "@/db/schema";
import { eq, and, desc } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get("type"); // filter by type
    const category = searchParams.get("category"); // filter by category

    // Build where conditions
    const conditions = [eq(resources.isPublished, true)];

    if (type) {
      conditions.push(eq(resources.type, type));
    }

    if (category) {
      conditions.push(eq(resources.category, category));
    }

    // Fetch published resources
    const allResources = await db.query.resources.findMany({
      where: conditions.length > 1 ? and(...conditions) : conditions[0],
      orderBy: [desc(resources.publishedAt)],
    });

    return NextResponse.json({
      success: true,
      resources: allResources,
    });
  } catch (error) {
    console.error("Resources fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch resources" },
      { status: 500 }
    );
  }
}
