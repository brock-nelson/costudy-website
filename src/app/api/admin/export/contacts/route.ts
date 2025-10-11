import { auth } from "@/auth";
import { db, contactSubmissions } from "@/db";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Fetch all contact submissions
    const allContacts = await db
      .select()
      .from(contactSubmissions)
      .orderBy(desc(contactSubmissions.createdAt));

    // Convert to CSV-friendly format
    const csvData = allContacts.map(contact => ({
      id: contact.id,
      name: contact.name,
      email: contact.email,
      subject: contact.subject || "",
      message: contact.message,
      type: contact.type,
      status: contact.status,
      phoneNumber: contact.phoneNumber || "",
      ipAddress: contact.ipAddress,
      source: contact.source || "",
      notes: contact.notes || "",
      createdAt: contact.createdAt.toISOString(),
      updatedAt: contact.updatedAt.toISOString(),
      respondedAt: contact.respondedAt?.toISOString() || "",
      closedAt: contact.closedAt?.toISOString() || "",
    }));

    return NextResponse.json({ data: csvData });
  } catch (error) {
    console.error("Error exporting contacts:", error);
    return NextResponse.json(
      { error: "Failed to export contacts" },
      { status: 500 }
    );
  }
}
