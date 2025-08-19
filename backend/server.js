// server.js (clean fixed version)

require('dotenv').config();
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
const { generatePDF } = require('./controller/generate-pdf-controlller.js');
const { mergePdf } = require('./controller/pdf-merge-controller.js');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('✅ Connected to MongoDB');
  await initializeStats();
  startServer();
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

// Feedback Schema
const feedbackSchema = new mongoose.Schema({
  email: { type: String, trim: true },
  feedback: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
const Feedback = mongoose.model('Feedback', feedbackSchema);

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
app.get('/api/stats', async (req, res) => {
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
});

// Feedback Endpoint
app.post('/api/feedback', [
  body('email').optional().isEmail().withMessage('Please provide a valid email').normalizeEmail(),
  body('feedback').trim().notEmpty().withMessage('Feedback is required')
    .isLength({ min: 10 }).withMessage('Feedback must be at least 10 characters long')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map(err => ({
          field: err.param,
          message: err.msg
        }))
      });
    }

    const { email, feedback } = req.body;
    const newFeedback = await Feedback.create({ email: email || undefined, feedback });

    res.status(201).json({
      success: true,
      message: 'Feedback submitted successfully',
      data: { id: newFeedback._id, createdAt: newFeedback.createdAt }
    });

  } catch (error) {
    console.error('Feedback submission error:', error);
    res.status(500).json({ success: false, error: 'Failed to submit feedback' });
  }
});

// Multer memory storage
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 50 * 1024 * 1024, files: 10 } });

// PDF Generation Endpoint
app.post("/generate-pdf", generatePDF(incrementCount));

// Merge PDFs Endpoint
app.post("/merge-auto", upload.fields([{ name: "cover", maxCount: 1 }, { name: "files", maxCount: 10 }]), mergePdf);

function startServer() {
  const PORT = process.env.PORT || 5000;
  app.get('/', (req, res) => res.send('API is working'));
  app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
}
