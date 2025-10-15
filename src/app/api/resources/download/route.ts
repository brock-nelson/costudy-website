import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { resources, resourceDownloads, emailSubscriptions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { resourceId, name, email, university, role, subscribeToNewsletter } = body;

    // Validate required fields
    if (!resourceId || !name || !email || !role) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Rate limiting
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    const rateLimitResult = await checkRateLimit(email, "resource-download", 10, 3600000); // 10 downloads per hour

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Get resource details
    const resource = await db.query.resources.findFirst({
      where: eq(resources.id, resourceId),
    });

    if (!resource) {
      return NextResponse.json(
        { error: "Resource not found" },
        { status: 404 }
      );
    }

    if (!resource.isPublished) {
      return NextResponse.json(
        { error: "Resource is not available" },
        { status: 403 }
      );
    }

    // Record the download
    await db.insert(resourceDownloads).values({
      resourceId,
      name,
      email,
      university: university || null,
      role,
      subscribeToNewsletter,
      ipAddress: ip,
      userAgent: request.headers.get("user-agent") || null,
      source: request.headers.get("referer") || "direct",
    });

    // Update download count
    await db
      .update(resources)
      .set({ downloadCount: resource.downloadCount + 1 })
      .where(eq(resources.id, resourceId));

    // Handle newsletter subscription
    if (subscribeToNewsletter) {
      try {
        // Check if email already exists
        const existingSubscription = await db.query.emailSubscriptions.findFirst({
          where: eq(emailSubscriptions.email, email),
        });

        if (!existingSubscription) {
          await db.insert(emailSubscriptions).values({
            email,
            name,
            isActive: true,
            source: "resource-download",
            ipAddress: ip,
            userAgent: request.headers.get("user-agent") || null,
          });
        } else if (!existingSubscription.isActive) {
          // Reactivate if previously unsubscribed
          await db
            .update(emailSubscriptions)
            .set({ isActive: true, unsubscribedAt: null })
            .where(eq(emailSubscriptions.email, email));
        }
      } catch (error) {
        console.error("Newsletter subscription error:", error);
        // Don't fail the download if newsletter subscription fails
      }
    }

    // TODO: Send email with download link and nurture sequence
    // For now, return the file URL directly
    return NextResponse.json({
      success: true,
      message: "Resource access granted",
      downloadUrl: resource.fileUrl,
      resourceTitle: resource.title,
    });
  } catch (error) {
    console.error("Resource download error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
