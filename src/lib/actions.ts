"use server";

import { createFeedback, validateFeedback } from "@/server/services/feedback.service";
import { revalidatePath } from "next/cache";

export type FeedbackActionState = {
  success: boolean;
  message: string;
  errors?: {
    email?: string;
    feedback?: string;
  };
};

const initialState: FeedbackActionState = {
  success: false,
  message: "",
};

export async function submitFeedbackAction(
  _prevState: FeedbackActionState = initialState,
  formData: FormData
): Promise<FeedbackActionState> {
  const email = String(formData.get("email") || "").trim();
  const feedback = String(formData.get("feedback") || "").trim();
  const validation = validateFeedback({ email, feedback });

  if (!validation.valid) {
    return {
      success: false,
      message: "Validation failed",
      errors: {
        email: validation.errors.find((err) => err.field === "email")?.message,
        feedback: validation.errors.find((err) => err.field === "feedback")?.message
      }
    };
  }

  try {
    await createFeedback({ email, feedback });

    revalidatePath("/");
    return { success: true, message: "Feedback submitted successfully" };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to submit feedback";
    console.error("Feedback action error:", error);
    return { success: false, message };
  }
}
