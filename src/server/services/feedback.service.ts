import connectDB, { isMongoConfigured } from "@/server/db";
import Feedback from "@/server/models/feedback";

type FeedbackPayload = {
  email?: string;
  feedback?: string;
};

type FeedbackValidationResult = {
  valid: boolean;
  errors: Array<{ field: "email" | "feedback"; message: string }>;
};

export function validateFeedback(payload: FeedbackPayload): FeedbackValidationResult {
  const errors: Array<{ field: "email" | "feedback"; message: string }> = [];
  const email = payload.email?.trim();
  const feedback = payload.feedback?.trim();

  if (!feedback) {
    errors.push({ field: "feedback", message: "Feedback is required" });
  } else if (feedback.length < 10) {
    errors.push({ field: "feedback", message: "Feedback must be at least 10 characters long" });
  }

  if (email) {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail) {
      errors.push({ field: "email", message: "Please provide a valid email" });
    }
  }

  return { valid: errors.length === 0, errors };
}

export async function createFeedback(payload: FeedbackPayload) {
  if (!isMongoConfigured()) {
    throw new Error("MONGODB_URI is not configured");
  }

  await connectDB();
  return Feedback.create({
    email: payload.email?.trim() || undefined,
    feedback: payload.feedback?.trim()
  });
}
