import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  email: { type: String, trim: true },
  feedback: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Feedback = mongoose.models.Feedback || mongoose.model("Feedback", feedbackSchema);

export default Feedback;
