import chromium from "@sparticuz/chromium-min";
import puppeteer from "puppeteer-core";
import { PDFDocument } from "pdf-lib";

type GeneratePdfPayload = {
  html?: string;
  chromiumPackUrl?: string;
};

export async function generateCoverPdf(payload: GeneratePdfPayload) {
  const html = payload.html;
  if (!html) {
    throw new Error("HTML content required");
  }

  const customExecutablePath = process.env.PUPPETEER_EXECUTABLE_PATH;
  const chromiumPackUrl = payload.chromiumPackUrl;
  if (!customExecutablePath && !chromiumPackUrl) {
    throw new Error("Chromium pack URL required");
  }

  let browser;
  try {
    chromium.setGraphicsMode = false;
    const headlessMode = customExecutablePath ? true : "shell";
    const executablePath = customExecutablePath
      ? customExecutablePath
      : await chromium.executablePath(chromiumPackUrl);

    browser = await puppeteer.launch({
      executablePath,
      headless: headlessMode,
      args: customExecutablePath
        ? ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"]
        : puppeteer.defaultArgs({ args: chromium.args, headless: headlessMode })
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 1 });
    await page.setContent(html, { waitUntil: "domcontentloaded" });
    await page.evaluate(async () => {
      const imageLoads = Array.from(document.images)
        .filter((image) => !image.complete)
        .map(
          (image) =>
            new Promise<void>((resolve) => {
              image.addEventListener("load", () => resolve(), { once: true });
              image.addEventListener("error", () => resolve(), { once: true });
            })
        );

      await Promise.all(imageLoads);
      if ("fonts" in document) {
        await document.fonts.ready;
      }
    });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: "0", bottom: "0", left: "0", right: "0" }
    });

    return Buffer.from(pdfBuffer);
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (/Could not find Chrome|Browser was not found|executable/i.test(message)) {
      throw new Error(
        "Chromium is not available on the server. Set PUPPETEER_EXECUTABLE_PATH for local Chrome or make sure chromium-pack.tar is deployed."
      );
    }
    if (/Chromium pack URL required/i.test(message)) {
      throw new Error("Chromium pack URL was not provided to the PDF service.");
    }

    throw error;
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
