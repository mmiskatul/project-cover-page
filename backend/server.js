const express = require("express");
const puppeteer = require("puppeteer");
const cors = require("cors");
const fs = require("fs");
const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.post("/generate-pdf", async (req, res) => {
  const { html } = req.body;
  if (!html) return res.status(400).send("Missing HTML content");

  try {
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    // Force A4 size and standard DPI (optional but helpful)
    await page.setViewport({
      width: 794,   // 8.27 inch × 96 DPI
      height: 1123, // 11.69 inch × 96 DPI
      deviceScaleFactor: 1,
    });

    // Load HTML
    await page.setContent(html, { waitUntil: "networkidle0" });

    // Wait for all images to load (critical for logos in base64)
    await page.evaluateHandle("document.fonts.ready");

    const filePath = `cover-${Date.now()}.pdf`;

    // Generate PDF with accurate A4 size and background
    await page.pdf({
      path: filePath,
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

    // Download and remove after sending
    res.download(filePath, () => fs.unlinkSync(filePath));
  } catch (error) {
    console.error("PDF Generation Error:", error);
    res.status(500).send("Failed to generate PDF");
  }
});

app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});
  