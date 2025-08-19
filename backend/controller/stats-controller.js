// controller/stats-controller.js

const Stats = require('../models/Stats.js');

// Initialize Stats
async function initializeStats() {
  try {
    let stats = await Stats.findOne();
    if (!stats) {
      await Stats.create({});
      console.log('✅ Initialized stats document');
    }
    await resetDailyIfNeeded();
  } catch (err) {
    console.error('Stats initialization error:', err);
  }
}

async function resetDailyIfNeeded() {
  const stats = await Stats.findOne();
  if (stats && new Date().toDateString() !== stats.lastUpdated.toDateString()) {
    stats.dailyGenerations = { date: new Date(), count: 0 };
    await stats.save();
  }
}

// Increment stats counter
async function incrementCount() {
  try {
    await Stats.updateOne({}, {
      $inc: { totalCoverPages: 1, 'dailyGenerations.count': 1 },
      $set: { lastUpdated: new Date(), 'dailyGenerations.date': new Date() }
    });
  } catch (error) {
    console.error('Count increment error:', error);
  }
}

// Stats Endpoint
const getStats = async (req, res) => {
  try {
    const stats = await Stats.findOne();
    res.json({
      templates: stats?.templates || 12,
      users: stats?.totalUsers || 0,
      coverPagesGenerated: stats?.totalCoverPages || 0,
      dailyGenerations: stats?.dailyGenerations?.count || 0
    });
  } catch (error) {
    console.error('Stats fetch error:', error);
    res.status(500).json({
      error: 'Failed to fetch stats',
      fallback: { templates: 12, users: 1250, coverPagesGenerated: 3842 }
    });
  }
};

module.exports = { initializeStats, resetDailyIfNeeded, incrementCount, getStats };