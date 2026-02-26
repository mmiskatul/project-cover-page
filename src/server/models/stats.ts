import mongoose from "mongoose";

const statsSchema = new mongoose.Schema(
  {
    totalCoverPages: { type: Number, default: 0 },
    totalUsers: { type: Number, default: 0 },
    templates: { type: Number, default: 12 },
    lastUpdated: { type: Date, default: Date.now },
    dailyGenerations: {
      date: { type: Date, default: Date.now },
      count: { type: Number, default: 0 }
    }
  },
  { timestamps: true }
);

const Stats = mongoose.models.Stats || mongoose.model("Stats", statsSchema);

export default Stats;
