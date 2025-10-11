import { auth } from "@/auth";
import { db, features } from "@/db";
import { inArray } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { featureIds, action, status } = body;

    if (!featureIds || !Array.isArray(featureIds) || featureIds.length === 0) {
      return NextResponse.json(
        { error: "Feature IDs are required" },
        { status: 400 }
      );
    }

    if (!action) {
      return NextResponse.json(
        { error: "Action is required" },
        { status: 400 }
      );
    }

    // Handle different bulk actions
    switch (action) {
      case "update_status":
        if (!status) {
          return NextResponse.json(
            { error: "Status is required for update_status action" },
            { status: 400 }
          );
        }

        // Validate status
        const validStatuses = ["proposed", "approved", "in-progress", "completed", "declined"];
        if (!validStatuses.includes(status)) {
          return NextResponse.json(
            { error: "Invalid status value" },
            { status: 400 }
          );
        }

        // Update all selected features
        await db
          .update(features)
          .set({
            status,
            updatedAt: new Date(),
            completedAt: status === "completed" ? new Date() : null,
          })
          .where(inArray(features.id, featureIds));

        return NextResponse.json({
          success: true,
          message: `Updated ${featureIds.length} feature(s) to ${status}`,
          count: featureIds.length,
        });

      case "delete":
        // Delete selected features
        await db
          .delete(features)
          .where(inArray(features.id, featureIds));

        return NextResponse.json({
          success: true,
          message: `Deleted ${featureIds.length} feature(s)`,
          count: featureIds.length,
        });

      default:
        return NextResponse.json(
          { error: "Invalid action" },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Error performing bulk action:", error);
    return NextResponse.json(
      { error: "Failed to perform bulk action" },
      { status: 500 }
    );
  }
}
