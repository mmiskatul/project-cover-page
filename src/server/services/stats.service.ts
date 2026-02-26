import connectDB, { isMongoConfigured } from "@/server/db";
import Stats from "@/server/models/stats";

export type SiteStats = {
  templates: number;
  users: number;
  coverPagesGenerated: number;
  dailyGenerations: number;
};

export const FALLBACK_STATS: SiteStats = {
  templates: 12,
  users: 1250,
  coverPagesGenerated: 3842,
  dailyGenerations: 0
};

function isDifferentDay(a: Date, b: Date) {
  return a.toDateString() !== b.toDateString();
}

async function getOrCreateStats() {
  let stats = await Stats.findOne();
  if (!stats) {
    stats = await Stats.create({});
  }
  return stats;
}

export async function getSiteStats(): Promise<SiteStats> {
  if (!isMongoConfigured()) return FALLBACK_STATS;

  try {
    await connectDB();
    const stats = await getOrCreateStats();

    if (isDifferentDay(new Date(), new Date(stats.lastUpdated))) {
      stats.dailyGenerations = { date: new Date(), count: 0 };
      await stats.save();
    }

    return {
      templates: stats.templates || 12,
      users: stats.totalUsers || 0,
      coverPagesGenerated: stats.totalCoverPages || 0,
      dailyGenerations: stats.dailyGenerations?.count || 0
    };
  } catch (error) {
    console.error("Stats fetch error:", error);
    return FALLBACK_STATS;
  }
}

export async function incrementCoverCount() {
  if (!isMongoConfigured()) return;

  try {
    await connectDB();
    const stats = await getOrCreateStats();
    const now = new Date();

    if (isDifferentDay(now, new Date(stats.lastUpdated))) {
      stats.dailyGenerations = { date: now, count: 0 };
    }

    stats.totalCoverPages += 1;
    stats.lastUpdated = now;
    stats.dailyGenerations.date = now;
    stats.dailyGenerations.count += 1;
    await stats.save();
  } catch (error) {
    console.error("Count increment error:", error);
  }
}
