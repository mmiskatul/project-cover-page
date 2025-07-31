const express = require("express");
const puppeteer = require("puppeteer");
const cors = require("cors");
const htmlDocx = require("html-docx-js"); // ⬅️ DOCX generator

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

// ✅ PDF generation route
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

// ✅ DOCX generation route
app.post("/generate-docx", (req, res) => {
  const { html } = req.body;
  if (!html) return res.status(400).send("Missing HTML content");

  try {
    const docxBuffer = htmlDocx.asBlob(html); // Convert HTML to .docx Buffer

    res.set({
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": `attachment; filename="cover-${Date.now()}.docx"`,
    });

    res.send(docxBuffer);
  } catch (error) {
    console.error("DOCX Generation Error:", error);
    res.status(500).send("Failed to generate DOCX");
  }
});

app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});
