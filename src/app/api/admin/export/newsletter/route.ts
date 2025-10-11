import { auth } from "@/auth";
import { db, emailSubscriptions } from "@/db";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Fetch all email subscriptions
    const allSubscriptions = await db
      .select()
      .from(emailSubscriptions)
      .orderBy(desc(emailSubscriptions.createdAt));

    // Convert to CSV-friendly format
    const csvData = allSubscriptions.map(sub => ({
      id: sub.id,
      email: sub.email,
      name: sub.name || "",
      isActive: sub.isActive ? "Yes" : "No",
      source: sub.source,
      ipAddress: sub.ipAddress,
      createdAt: sub.createdAt.toISOString(),
      updatedAt: sub.updatedAt.toISOString(),
      confirmedAt: sub.confirmedAt?.toISOString() || "",
      unsubscribedAt: sub.unsubscribedAt?.toISOString() || "",
    }));

    return NextResponse.json({ data: csvData });
  } catch (error) {
    console.error("Error exporting newsletter subscriptions:", error);
    return NextResponse.json(
      { error: "Failed to export newsletter subscriptions" },
      { status: 500 }
    );
  }
}
