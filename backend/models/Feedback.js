// models/Feedback.js

const mongoose = require('mongoose');

// Feedback Schema
const feedbackSchema = new mongoose.Schema({
  email: { type: String, trim: true },
  feedback: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;