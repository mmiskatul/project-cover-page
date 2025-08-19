// models/Stats.js

const mongoose = require('mongoose');

// Stats Schema
const statsSchema = new mongoose.Schema({
  totalCoverPages: { type: Number, default: 0 },
  totalUsers: { type: Number, default: 0 },
  templates: { type: Number, default: 12 },
  lastUpdated: { type: Date, default: Date.now },
  dailyGenerations: {
    date: { type: Date, default: Date.now },
    count: { type: Number, default: 0 }
  }
}, { timestamps: true });

const Stats = mongoose.model('Stats', statsSchema);

module.exports = Stats;