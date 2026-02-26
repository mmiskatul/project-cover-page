import { NextResponse } from "next/server";
import { createFeedback, validateFeedback } from "@/server/services/feedback.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const body = await request.json();
    const validation = validateFeedback(body || {});

    if (!validation.valid) {
      return NextResponse.json(
        { success: false, errors: validation.errors },
        { status: 400 }
      );
    }
    const newFeedback = await createFeedback(body || {});

    return NextResponse.json(
      {
        success: true,
        message: "Feedback submitted successfully",
        data: { id: newFeedback._id, createdAt: newFeedback.createdAt },
      },
      { status: 201 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to submit feedback";
    const isConfigError = message === "MONGODB_URI is not configured";
    console.error("Feedback submission error:", error);
    return NextResponse.json(
      { success: false, error: message },
      { status: isConfigError ? 503 : 500 }
    );
  }
}
