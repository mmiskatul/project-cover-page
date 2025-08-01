const express = require("express");
const puppeteer = require("puppeteer");
const multer = require("multer");
const { PDFDocument } = require("pdf-lib");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "uploads/";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname) || ".pdf";
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

// PDF Generation Endpoint (existing unchanged)
app.post("/generate-pdf", async (req, res) => {
  const { html } = req.body;
  if (!html) return res.status(400).send("Missing HTML content");

  try {
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    await page.setViewport({
      width: 794,   // 8.27 inch × 96 DPI
      height: 1123, // 11.69 inch × 96 DPI
      deviceScaleFactor: 1,
    });

    await page.setContent(html, { waitUntil: "networkidle0" });

    // Ensure fonts and images are fully loaded
    await page.evaluateHandle("document.fonts.ready");

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20px",
        bottom: "20px",
        left: "20px",
        right: "20px",
      },
    });

    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="cover-${Date.now()}.pdf"`,
    });

    res.send(pdfBuffer);
  } catch (error) {
    console.error("PDF Generation Error:", error);
    res.status(500).send("Failed to generate PDF");
  }
});

// PDF Merging Endpoint (new addition)
app.post("/merge-auto", upload.fields([
  { name: "cover", maxCount: 1 },
  { name: "file", maxCount: 1 },
]), async (req, res) => {
  const coverFile = req.files?.cover?.[0];
  const uploadedFile = req.files?.file?.[0];

  if (!coverFile || !uploadedFile) {
    return res.status(400).send("Both files are required");
  }

  try {
    const coverDoc = await PDFDocument.load(fs.readFileSync(coverFile.path));
    const uploadedDoc = await PDFDocument.load(fs.readFileSync(uploadedFile.path));

    const mergedPdf = await PDFDocument.create();

    const coverPages = await mergedPdf.copyPages(coverDoc, coverDoc.getPageIndices());
    coverPages.forEach((p) => mergedPdf.addPage(p));

    const uploadedPages = await mergedPdf.copyPages(uploadedDoc, uploadedDoc.getPageIndices());
    uploadedPages.forEach((p) => mergedPdf.addPage(p));

    const finalPdf = await mergedPdf.save();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=merged.pdf");
    res.send(finalPdf);

    // Clean up
    fs.unlinkSync(coverFile.path);
    fs.unlinkSync(uploadedFile.path);
  } catch (err) {
    console.error("Merge error:", err);
    res.status(500).send("Failed to merge files");
  }
});

app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
  console.log("Available endpoints:");
  console.log("- POST /generate-pdf");
  console.log("- POST /merge-auto");
});