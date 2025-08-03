require("dotenv").config();
const express = require("express");
const puppeteer = require("puppeteer");
const multer = require("multer");
const { PDFDocument } = require("pdf-lib");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
const rateLimit = require("express-rate-limit");

const app = express();

// Constants
const PORT = process.env.PORT || 5000;
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const UPLOAD_DIR = "uploads/";

// Rate limiting for API endpoints
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later"
});

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Database Models
const statsSchema = new mongoose.Schema(
  {
    totalCoverPages: { type: Number, default: 0 },
    totalUsers: { type: Number, default: 0 },
    templates: { type: Number, default: 12 },
    lastUpdated: { type: Date, default: Date.now },
    dailyGenerations: {
      date: { type: Date, default: Date.now },
      count: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);
const Stats = mongoose.model("Stats", statsSchema);

const feedbackSchema = new mongoose.Schema({
  email: { 
    type: String, 
    trim: true, 
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  feedback: { 
    type: String, 
    required: [true, 'Feedback is required'],
    minlength: [10, 'Feedback must be at least 10 characters long']
  },
}, { timestamps: true });
const Feedback = mongoose.model('Feedback', feedbackSchema);

// Initialize Stats
const initializeStats = async () => {
  try {
    let stats = await Stats.findOne();
    if (!stats) {
      stats = await Stats.create({});
      console.log("✅ Initialized stats document");
    }

    const today = new Date().toDateString();
    const lastUpdatedDate = stats.lastUpdated.toDateString();
    if (today !== lastUpdatedDate) {
      stats.dailyGenerations = { date: new Date(), count: 0 };
      await stats.save();
    }
  } catch (err) {
    console.error("Stats initialization error:", err);
  }
};

// File Upload Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || ".pdf";
    cb(null, `${file.fieldname}-${Date.now()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE, files: 10 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  }
});

// Puppeteer Browser Launcher
const getBrowser = async () => {
  const launchOptions = {
    headless: "new",
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--single-process',
      '--disable-gpu'
    ],
    timeout: 30000 // 30 seconds timeout
  };

  // Render.com specific configuration
  if (process.env.RENDER) {
    launchOptions.executablePath = 
      process.env.CHROME_PATH || 
      '/opt/render/.cache/puppeteer/chrome/linux-*/chrome-linux/chrome';
  } else {
    // Local development
    launchOptions.executablePath = 
      process.env.CHROME_PATH || 
      puppeteer.executablePath();
  }

  return await puppeteer.launch(launchOptions);
};

// API Routes

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Stats Endpoints
app.get("/api/stats", apiLimiter, async (req, res) => {
  try {
    const stats = await Stats.findOne();
    res.json({
      templates: stats?.templates || 12,
      users: stats?.totalUsers || 0,
      coverPagesGenerated: stats?.totalCoverPages || 0,
      dailyGenerations: stats?.dailyGenerations?.count || 0,
    });
  } catch (error) {
    console.error("Stats fetch error:", error);
    res.status(500).json({
      error: "Failed to fetch stats",
      fallback: { templates: 12, users: 1250, coverPagesGenerated: 3842 },
    });
  }
});

app.post("/api/increment-count", apiLimiter, async (req, res) => {
  try {
    await Stats.updateOne(
      {},
      {
        $inc: {
          totalCoverPages: 1,
          "dailyGenerations.count": 1,
        },
        $set: {
          lastUpdated: new Date(),
          "dailyGenerations.date": new Date(),
        },
      },
      { upsert: true }
    );
    res.status(200).send();
  } catch (error) {
    console.error("Count increment error:", error);
    res.status(500).json({ error: "Failed to update count" });
  }
});

// Feedback Endpoint
app.post(
  "/api/feedback",
  apiLimiter,
  [
    body("email")
      .optional()
      .isEmail()
      .withMessage("Please provide a valid email")
      .normalizeEmail(),
    body("feedback")
      .trim()
      .notEmpty()
      .withMessage("Feedback is required")
      .isLength({ min: 10 })
      .withMessage("Feedback must be at least 10 characters long"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array().map((err) => ({
            field: err.param,
            message: err.msg,
          })),
        });
      }

      const { email, feedback } = req.body;
      const newFeedback = await Feedback.create({
        email: email || undefined,
        feedback,
      });

      res.status(201).json({
        success: true,
        message: "Feedback submitted successfully",
        data: {
          id: newFeedback._id,
          createdAt: newFeedback.createdAt,
        },
      });
    } catch (error) {
      console.error("Feedback submission error:", error);

      if (error.name === "ValidationError") {
        return res.status(400).json({
          success: false,
          error: "Validation failed",
          details: Object.values(error.errors).map((err) => ({
            field: err.path,
            message: err.message,
          })),
        });
      }

      res.status(500).json({
        success: false,
        error: "Failed to submit feedback",
        message:
          process.env.NODE_ENV === "development"
            ? error.message
            : "Please try again later",
      });
    }
  }
);

// PDF Generation Endpoint
app.post("/generate-pdf", apiLimiter, async (req, res) => {
  try {
    const { html } = req.body;
    if (!html || typeof html !== 'string') {
      return res.status(400).json({ error: "Valid HTML content required" });
    }

    let browser;
    try {
      browser = await getBrowser();
      const page = await browser.newPage();
      
      await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 1 });
      await page.setContent(html, { 
        waitUntil: ["networkidle0", "domcontentloaded"] 
      });
      await page.evaluateHandle("document.fonts.ready");

      const pdfBuffer = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: { top: "20px", bottom: "20px", left: "20px", right: "20px" },
        timeout: 60000 // 60 seconds timeout
      });

      // Track generation
      await fetch(
        `http://localhost:${PORT}/api/increment-count`,
        {
          method: "POST",
        }
      ).catch((err) => console.error("Tracking error:", err));

      res
        .set({
          "Content-Type": "application/pdf",
          "Content-Disposition": `inline; filename="cover-${Date.now()}.pdf"`,
        })
        .send(pdfBuffer);
    } finally {
      if (browser) await browser.close();
    }
  } catch (error) {
    console.error("PDF Generation Error:", error);
    res.status(500).json({ 
      error: "Failed to generate PDF",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// PDF Merging Endpoint
app.post(
  "/merge-auto",
  apiLimiter,
  upload.fields([
    { name: "cover", maxCount: 1 },
    { name: "files", maxCount: 10 },
  ]),
  async (req, res) => {
    try {
      const { cover, files } = req.files;
      if (!cover?.[0] || !files?.length) {
        return res.status(400).json({ error: "Cover and files required" });
      }

      // Read all files in parallel
      const [coverData, ...filesData] = await Promise.all([
        fs.promises.readFile(cover[0].path),
        ...files.map((file) => fs.promises.readFile(file.path)),
      ]);

      // Load all PDFs in parallel
      const [coverDoc, ...fileDocs] = await Promise.all([
        PDFDocument.load(coverData),
        ...filesData.map((data) => PDFDocument.load(data)),
      ]);

      const mergedPdf = await PDFDocument.create();
      
      // Add cover pages
      const coverPages = await mergedPdf.copyPages(
        coverDoc,
        coverDoc.getPageIndices()
      );
      coverPages.forEach((page) => mergedPdf.addPage(page));

      // Add document pages
      for (const doc of fileDocs) {
        const pages = await mergedPdf.copyPages(doc, doc.getPageIndices());
        pages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();

      // Cleanup files
      await Promise.all([
        fs.promises.unlink(cover[0].path),
        ...files.map((file) => fs.promises.unlink(file.path)),
      ]);

      res
        .set({
          "Content-Type": "application/pdf",
          "Content-Disposition": "attachment; filename=merged.pdf",
        })
        .send(Buffer.from(mergedPdfBytes));
    } catch (err) {
      console.error("Merge error:", err);
      
      // Attempt to clean up files even if merge failed
      if (req.files) {
        const { cover, files } = req.files;
        try {
          await Promise.all([
            cover && fs.promises.unlink(cover[0].path),
            ...(files || []).map(file => fs.promises.unlink(file.path))
          ]);
        } catch (cleanupErr) {
          console.error("Cleanup error:", cleanupErr);
        }
      }

      res.status(500).json({ 
        error: "Merge failed",
        details: process.env.NODE_ENV === 'development' ? err.message : undefined
      });
    }
  }
);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: "Internal server error",
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  initializeStats();
})
.on("error", (err) => {
  console.error("Server error:", err);
  process.exit(1);
});

// Cleanup on exit
process.on('SIGINT', async () => {
  console.log('Shutting down server...');
  try {
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
    process.exit(0);
  } catch (err) {
    console.error('Shutdown error:', err);
    process.exit(1);
  }
});