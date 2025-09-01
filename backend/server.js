require('dotenv').config();
const express = require("express");
const puppeteer = require("puppeteer");
const multer = require("multer");
const { PDFDocument } = require("pdf-lib");
const cors = require("cors");
const connectDB = require('./config/db.js');
const { generatePDF } = require('./controller/generate-pdf-controlller.js');
const { mergePdf } = require('./controller/pdf-merge-controller.js');
const { submitFeedback, validateFeedback } = require('./controller/feedback-controller.js');
const { initializeStats, incrementCount, getStats } = require('./controller/stats-controller.js'); 


const app = express();

// Middleware
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5000",
  "http://*.vercel.com"
];
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Connect to MongoDB and start the server
connectDB()
  .then(async () => {
    await initializeStats();
    startServer();
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// Stats Endpoint
app.get('/api/stats', getStats);

// Feedback Endpoint now uses the imported controller and validation middleware
app.post('/api/feedback', validateFeedback, submitFeedback);

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