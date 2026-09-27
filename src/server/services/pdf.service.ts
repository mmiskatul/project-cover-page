import chromium from "@sparticuz/chromium";
import puppeteer, { type Browser } from "puppeteer-core";
import { PDFDocument } from "pdf-lib";
import { existsSync } from "node:fs";
import path from "node:path";

type GeneratePdfPayload = {
  html?: string;
};

function getLocalBrowserExecutable(): string | undefined {
  if (process.env.PUPPETEER_EXECUTABLE_PATH && existsSync(/*turbopackIgnore: true*/ process.env.PUPPETEER_EXECUTABLE_PATH)) {
    return process.env.PUPPETEER_EXECUTABLE_PATH;
  }

  if (process.platform === "win32") {
    const winPaths = [
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
      "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
      "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
      process.env.LOCALAPPDATA
        ? path.join(process.env.LOCALAPPDATA, "Google\\Chrome\\Application\\chrome.exe")
        : "",
      process.env.LOCALAPPDATA
        ? path.join(process.env.LOCALAPPDATA, "Microsoft\\Edge\\Application\\msedge.exe")
        : "",
    ];
    for (const p of winPaths) {
      if (p && existsSync(/*turbopackIgnore: true*/ p)) return p;
    }
  } else if (process.platform === "darwin") {
    const macPaths = [
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    ];
    for (const p of macPaths) {
      if (existsSync(/*turbopackIgnore: true*/ p)) return p;
    }
  } else if (process.platform === "linux") {
    const linuxPaths = [
      "/usr/bin/chromium",
      "/usr/bin/chromium-browser",
      "/usr/bin/google-chrome",
      "/usr/bin/google-chrome-stable",
      "/snap/bin/chromium",
    ];
    for (const p of linuxPaths) {
      if (existsSync(/*turbopackIgnore: true*/ p)) return p;
    }
  }

  return undefined;
}

// Reusable browser instance for fast, memory-efficient PDF rendering
let cachedBrowser: Browser | null = null;
let browserLaunchPromise: Promise<Browser> | null = null;
let idleCloseTimer: NodeJS.Timeout | null = null;

const IDLE_TIMEOUT_MS = 60_000; // Auto-close browser after 60s of inactivity to reclaim RAM

function resetIdleTimer() {
  if (idleCloseTimer) {
    clearTimeout(idleCloseTimer);
    idleCloseTimer = null;
  }
  idleCloseTimer = setTimeout(async () => {
    if (cachedBrowser) {
      try {
        await cachedBrowser.close();
      } catch {
        // Ignore close errors
      } finally {
        cachedBrowser = null;
        browserLaunchPromise = null;
      }
    }
  }, IDLE_TIMEOUT_MS);
}

async function getBrowser(): Promise<Browser> {
  if (cachedBrowser && cachedBrowser.connected) {
    resetIdleTimer();
    return cachedBrowser;
  }

  if (browserLaunchPromise) {
    return browserLaunchPromise;
  }

  browserLaunchPromise = (async () => {
    const localBrowser = getLocalBrowserExecutable();
    let executablePath: string;
    let headlessMode: boolean | "shell";
    let launchArgs: string[];

    if (localBrowser) {
      executablePath = localBrowser;
      headlessMode = true;
      launchArgs = [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--disable-extensions",
        "--disable-software-rasterizer",
        "--disable-background-networking",
        "--disable-default-apps",
        "--disable-sync",
        "--disable-translate",
        "--metrics-recording-only",
        "--mute-audio",
        "--no-first-run",
        "--safebrowsing-disable-auto-update",
        "--font-render-hinting=none",
        "--js-flags=--max-old-space-size=128",
      ];
    } else {
      chromium.setGraphicsMode = false;
      headlessMode = "shell";
      const bundledChromiumBinPath = path.join(
        process.cwd(),
        "node_modules",
        "@sparticuz",
        "chromium",
        "bin"
      );
      executablePath = existsSync(bundledChromiumBinPath)
        ? await chromium.executablePath(bundledChromiumBinPath)
        : await chromium.executablePath();
      launchArgs = puppeteer.defaultArgs({ args: chromium.args, headless: headlessMode });
    }

    const browser = await puppeteer.launch({
      executablePath,
      headless: headlessMode,
      args: launchArgs,
    });

    browser.once("disconnected", () => {
      cachedBrowser = null;
      browserLaunchPromise = null;
      if (idleCloseTimer) {
        clearTimeout(idleCloseTimer);
        idleCloseTimer = null;
      }
    });

    cachedBrowser = browser;
    resetIdleTimer();
    return browser;
  })().catch((err) => {
    browserLaunchPromise = null;
    cachedBrowser = null;
    throw err;
  });

  return browserLaunchPromise;
}

export async function generateCoverPdf(payload: GeneratePdfPayload) {
  const html = payload.html;
  if (!html) {
    throw new Error("HTML content required");
  }

  const browser = await getBrowser();
  resetIdleTimer();

  const page = await browser.newPage();
  try {
    await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 1 });
    await page.setContent(html, { waitUntil: "domcontentloaded", timeout: 20000 });

    await page.evaluate(async () => {
      const imageLoads = Array.from(document.images)
        .filter((image) => !image.complete)
        .map(
          (image) =>
            new Promise<void>((resolve) => {
              image.addEventListener("load", () => resolve(), { once: true });
              image.addEventListener("error", () => resolve(), { once: true });
              setTimeout(resolve, 2000);
            })
        );

      await Promise.all(imageLoads);
      if ("fonts" in document) {
        await Promise.race([
          document.fonts.ready,
          new Promise((r) => setTimeout(r, 1500)),
        ]);
      }
    });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: "0", bottom: "0", left: "0", right: "0" },
    });

    return Buffer.from(pdfBuffer);
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (/Could not find Chrome|Browser was not found|executable/i.test(message)) {
      throw new Error(
        "Chromium is not available on the server. Set PUPPETEER_EXECUTABLE_PATH for local Chrome or make sure Docker/Vercel includes Chromium."
      );
    }

    throw error;
  } finally {
    await page.close().catch(() => {});
    resetIdleTimer();
  }
}

function findPdfHeaderOffset(bytes: Uint8Array): number {
  const header = [0x25, 0x50, 0x44, 0x46, 0x2d]; // '%PDF-'
  for (let i = 0; i < Math.min(bytes.length - 4, 1024); i++) {
    if (
      bytes[i] === header[0] &&
      bytes[i + 1] === header[1] &&
      bytes[i + 2] === header[2] &&
      bytes[i + 3] === header[3] &&
      bytes[i + 4] === header[4]
    ) {
      return i;
    }
  }
  return -1;
}

export async function mergePdfs(
  coverFile: Blob | File | null,
  files: (Blob | File)[]
) {
  if (!coverFile) {
    throw new Error("Cover PDF file is missing.");
  }
  if (!files || files.length === 0) {
    throw new Error("At least one report PDF file is required to merge.");
  }

  const mergedPdf = await PDFDocument.create();

  // 1. Process cover file
  let coverBuffer = new Uint8Array(await coverFile.arrayBuffer());
  if (coverBuffer.length === 0) {
    throw new Error("The generated cover PDF is empty (0 bytes). Please regenerate the cover.");
  }

  const coverHeaderOffset = findPdfHeaderOffset(coverBuffer);
  if (coverHeaderOffset === -1) {
    throw new Error("The cover page does not contain a valid PDF header.");
  }
  if (coverHeaderOffset > 0) {
    coverBuffer = coverBuffer.subarray(coverHeaderOffset);
  }

  let coverDoc: PDFDocument;
  try {
    coverDoc = await PDFDocument.load(coverBuffer, { ignoreEncryption: true });
  } catch (err) {
    throw new Error(`Failed to parse cover PDF: ${err instanceof Error ? err.message : String(err)}`);
  }

  const coverPages = await mergedPdf.copyPages(coverDoc, coverDoc.getPageIndices());
  coverPages.forEach((page) => mergedPdf.addPage(page));

  // 2. Process attached report files
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fileName = "name" in file && typeof file.name === "string" ? file.name : `Report ${i + 1}`;
    let fileBuffer = new Uint8Array(await file.arrayBuffer());

    if (fileBuffer.length === 0) {
      throw new Error(`The attached file "${fileName}" is empty (0 bytes). Please attach a valid PDF document.`);
    }

    const headerOffset = findPdfHeaderOffset(fileBuffer);
    if (headerOffset === -1) {
      throw new Error(
        `The attached file "${fileName}" is not a valid PDF document (missing %PDF- header). Please ensure you uploaded a real PDF, not a renamed Word document or image.`
      );
    }
    if (headerOffset > 0) {
      fileBuffer = fileBuffer.subarray(headerOffset);
    }

    let doc: PDFDocument;
    try {
      doc = await PDFDocument.load(fileBuffer, { ignoreEncryption: true });
    } catch (err) {
      throw new Error(`Could not parse attached PDF "${fileName}": ${err instanceof Error ? err.message : String(err)}`);
    }

    const pages = await mergedPdf.copyPages(doc, doc.getPageIndices());
    pages.forEach((page) => mergedPdf.addPage(page));
  }

  const mergedBytes = await mergedPdf.save();
  return Buffer.from(mergedBytes);
}
