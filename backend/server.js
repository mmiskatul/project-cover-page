const express = require("express");
const puppeteer = require("puppeteer");
const multer = require("multer");
const { PDFDocument } = require("pdf-lib");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));




// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://masabimiskat:masabimiskat@cluster0.41p8umu.mongodb.net/ ", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Create feedback schema and model
const feedbackSchema = new mongoose.Schema({
  email: String,
  feedback: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

// Add this new endpoint before the error handling middleware
// Feedback Submission Endpoint
app.post('/api/feedback', async (req, res) => {
  try {
    const { email, feedback } = req.body;
    
    if (!feedback) {
      return res.status(400).json({ error: 'Feedback content is required' });
    }

    const newFeedback = new Feedback({
      email: email || 'anonymous',
      feedback
    });

    await newFeedback.save();
    
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Feedback submission error:', error);
    res.status(500).json({ error: 'Failed to submit feedback' });
  }
});






// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "uploads/";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname) || ".pdf";
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ 
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit per file
    files: 10 // Maximum 10 files
  }
});





// PDF Generation Endpoint
app.post("/generate-pdf", async (req, res) => {
  const { html } = req.body;
  if (!html) return res.status(400).json({ error: "Missing HTML content" });

  try {
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    await page.setViewport({
      width: 794,   // A4 width at 96 DPI
      height: 1123, // A4 height at 96 DPI
      deviceScaleFactor: 1,
    });

    await page.setContent(html, { waitUntil: "networkidle0" });
    await page.evaluateHandle("document.fonts.ready");

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "20px", bottom: "20px", left: "20px", right: "20px" },
    });

    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="cover-${Date.now()}.pdf"`,
    }).send(pdfBuffer);
  } catch (error) {
    console.error("PDF Generation Error:", error);
    res.status(500).json({ error: "Failed to generate PDF" });
  }
});




// PDF Merging Endpoint
app.post("/merge-auto", upload.fields([
  { name: "cover", maxCount: 1 },
  { name: "files", maxCount: 10 },
]), async (req, res) => {
  try {
    const coverFile = req.files?.cover?.[0];
    const uploadedFiles = req.files?.files || [];

    if (!coverFile || uploadedFiles.length === 0) {
      return res.status(400).json({ error: "Cover and at least one file are required" });
    }

    // Read all files in parallel
    const [coverData, ...filesData] = await Promise.all([
      fs.promises.readFile(coverFile.path),
      ...uploadedFiles.map(file => fs.promises.readFile(file.path))
    ]);

    // Load all PDFs in parallel
    const [coverDoc, ...fileDocs] = await Promise.all([
      PDFDocument.load(coverData),
      ...filesData.map(data => PDFDocument.load(data))
    ]);

    const mergedPdf = await PDFDocument.create();

    // Add cover pages
    const coverPages = await mergedPdf.copyPages(coverDoc, coverDoc.getPageIndices());
    coverPages.forEach(page => mergedPdf.addPage(page));

    // Add all other pages in order
    for (const doc of fileDocs) {
      const pages = await mergedPdf.copyPages(doc, doc.getPageIndices());
      pages.forEach(page => mergedPdf.addPage(page));
    }

    // Save the merged PDF
    const mergedPdfBytes = await mergedPdf.save();

    // Clean up temporary files in parallel
    await Promise.all([
      fs.promises.unlink(coverFile.path),
      ...uploadedFiles.map(file => fs.promises.unlink(file.path))
    ]);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=merged.pdf",
    }).send(Buffer.from(mergedPdfBytes));
  } catch (err) {
    console.error("Merge error:", err);
    res.status(500).json({ error: err.message || "Failed to merge files" });
  }
});




// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});