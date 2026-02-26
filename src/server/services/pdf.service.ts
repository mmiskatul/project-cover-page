import puppeteer from "puppeteer";
import { PDFDocument } from "pdf-lib";

type GeneratePdfPayload = {
  html?: string;
};

export async function generateCoverPdf(payload: GeneratePdfPayload) {
  const html = payload.html;
  if (!html) {
    throw new Error("HTML content required");
  }

  let browser;
  try {
    browser = await puppeteer.launch({
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || puppeteer.executablePath(),
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 1 });
    await page.setContent(html, { waitUntil: "networkidle0" });
    await page.evaluateHandle("document.fonts.ready");

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "20px", bottom: "20px", left: "20px", right: "20px" }
    });

    return Buffer.from(pdfBuffer);
  } finally {
    if (browser) {
      await browser.close().catch(() => {});
    }
  }
}

export async function mergePdfs(coverFile: File | null, files: File[]) {
  if (!coverFile || files.length === 0) {
    throw new Error("Cover and files required");
  }

  const mergedPdf = await PDFDocument.create();

  const coverBytes = new Uint8Array(await coverFile.arrayBuffer());
  const coverDoc = await PDFDocument.load(coverBytes);
  const coverPages = await mergedPdf.copyPages(coverDoc, coverDoc.getPageIndices());
  coverPages.forEach((page) => mergedPdf.addPage(page));

  for (const file of files) {
    const bytes = new Uint8Array(await file.arrayBuffer());
    const doc = await PDFDocument.load(bytes);
    const pages = await mergedPdf.copyPages(doc, doc.getPageIndices());
    pages.forEach((page) => mergedPdf.addPage(page));
  }

  const mergedBytes = await mergedPdf.save();
  return Buffer.from(mergedBytes);
}
