require('dotenv').config();
const express = require('express');
const puppeteer = require('puppeteer');
const { PDFDocument } = require('pdf-lib');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();

// Enhanced CORS configuration
app.use(cors({
  origin: ['https://diupagecrafter.vercel.app', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname) || '.pdf'}`);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 50 * 1024 * 1024, files: 10 }
});

// PDF Generation Endpoint
app.post('/api/generate-pdf', async (req, res) => {
  try {
    const { html } = req.body;
    if (!html) return res.status(400).json({ error: 'HTML content required' });

    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '20px', bottom: '20px', left: '20px', right: '20px' },
    });

    await browser.close();

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="cover-${Date.now()}.pdf"`,
    }).send(pdfBuffer);
  } catch (error) {
    console.error('PDF Generation Error:', error);
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
});

// PDF Merging Endpoint
app.post('/api/merge-auto', upload.fields([
  { name: 'cover', maxCount: 1 },
  { name: 'files', maxCount: 10 }
]), async (req, res) => {
  try {
    const { cover, files } = req.files;
    if (!cover?.[0] || !files?.length) {
      return res.status(400).json({ error: 'Cover and files required' });
    }

    const [coverDoc, ...fileDocs] = await Promise.all([
      PDFDocument.load(await fs.promises.readFile(cover[0].path)),
      ...files.map(file => PDFDocument.load(fs.promises.readFile(file.path)))
    ]);

    const mergedPdf = await PDFDocument.create();
    
    // Add cover pages
    const coverPages = await mergedPdf.copyPages(coverDoc, coverDoc.getPageIndices());
    coverPages.forEach(page => mergedPdf.addPage(page));
    
    // Add other pages
    for (const doc of fileDocs) {
      const pages = await mergedPdf.copyPages(doc, doc.getPageIndices());
      pages.forEach(page => mergedPdf.addPage(page));
    }

    const mergedPdfBytes = await mergedPdf.save();
    
    // Cleanup files
    await Promise.all([
      fs.promises.unlink(cover[0].path),
      ...files.map(file => fs.promises.unlink(file.path))
    ]);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=merged.pdf',
    }).send(mergedPdfBytes);
  } catch (err) {
    console.error('Merge error:', err);
    res.status(500).json({ error: err.message || 'Merge failed' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});