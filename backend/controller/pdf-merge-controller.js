const { PDFDocument } = require("pdf-lib");

async function mergePdf (req, res) {
  try {
    const { cover, files } = req.files;
    if (!cover?.[0] || !files?.length) {
      return res.status(400).json({ error: "Cover and files required" });
    }

    const coverDoc = await PDFDocument.load(cover[0].buffer);
    const mergedPdf = await PDFDocument.create();
    const coverPages = await mergedPdf.copyPages(coverDoc, coverDoc.getPageIndices());
    coverPages.forEach(page => mergedPdf.addPage(page));

    for (const file of files) {
      const doc = await PDFDocument.load(file.buffer);
      const pages = await mergedPdf.copyPages(doc, doc.getPageIndices());
      pages.forEach(page => mergedPdf.addPage(page));
    }

    const mergedPdfBytes = await mergedPdf.save();
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=merged.pdf",
    }).send(Buffer.from(mergedPdfBytes));
  } catch (err) {
    console.error("Merge error:", err);
    res.status(500).json({ error: err.message || "Merge failed" });
  }
}
module.exports={mergePdf}