import { PDFDocument } from "pdf-lib";

/**
 * Searches for the standard PDF header bytes (%PDF-) within the first 1KB of data.
 * Helps skip any UTF-8 BOM, HTML wrappers, or leading whitespace.
 */
function findPdfHeaderOffset(bytes: Uint8Array): number {
  const header = [0x25, 0x50, 0x44, 0x46, 0x2d]; // '%PDF-'
  const limit = Math.min(bytes.length - 4, 1024);
  for (let i = 0; i < limit; i++) {
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

/**
 * Client-safe & server-safe PDF merger using pdf-lib.
 * Merges a cover PDF (Blob or ArrayBuffer) with one or more attached report PDFs (Blob, File, or ArrayBuffer).
 * Runs directly in the browser to avoid Vercel 4.5MB payload limits, network latency, and server 500 errors.
 */
export async function mergePdfBlobs(
  coverInput: Blob | File | ArrayBuffer | Uint8Array,
  reportInputs: (Blob | File | ArrayBuffer | Uint8Array)[]
): Promise<Blob> {
  if (!coverInput) {
    throw new Error("Cover PDF document is required.");
  }
  if (!reportInputs || reportInputs.length === 0) {
    throw new Error("At least one report PDF file is required to merge.");
  }

  const mergedDoc = await PDFDocument.create();

  // 1. Process Cover
  let coverBytes: Uint8Array;
  if (coverInput instanceof Uint8Array) {
    coverBytes = coverInput;
  } else if (coverInput instanceof ArrayBuffer) {
    coverBytes = new Uint8Array(coverInput);
  } else {
    coverBytes = new Uint8Array(await coverInput.arrayBuffer());
  }

  if (coverBytes.length === 0) {
    throw new Error("The cover PDF is empty (0 bytes). Please regenerate or re-select the cover.");
  }

  const coverHeaderOffset = findPdfHeaderOffset(coverBytes);
  if (coverHeaderOffset === -1) {
    throw new Error("The cover page is not a valid PDF (missing %PDF- header).");
  }
  if (coverHeaderOffset > 0) {
    coverBytes = coverBytes.subarray(coverHeaderOffset);
  }

  let coverDoc: PDFDocument;
  try {
    coverDoc = await PDFDocument.load(coverBytes, { ignoreEncryption: true });
  } catch (err) {
    throw new Error(`Failed to read cover PDF: ${err instanceof Error ? err.message : String(err)}`);
  }

  const coverPages = await mergedDoc.copyPages(coverDoc, coverDoc.getPageIndices());
  coverPages.forEach((page) => mergedDoc.addPage(page));

  // 2. Process Reports
  for (let i = 0; i < reportInputs.length; i++) {
    const item = reportInputs[i];
    const fileName =
      item && typeof item === "object" && "name" in item && typeof item.name === "string"
        ? item.name
        : `Attachment ${i + 1}`;

    let fileBytes: Uint8Array;
    if (item instanceof Uint8Array) {
      fileBytes = item;
    } else if (item instanceof ArrayBuffer) {
      fileBytes = new Uint8Array(item);
    } else {
      fileBytes = new Uint8Array(await item.arrayBuffer());
    }

    if (fileBytes.length === 0) {
      throw new Error(`The file "${fileName}" is empty (0 bytes).`);
    }

    const headerOffset = findPdfHeaderOffset(fileBytes);
    if (headerOffset === -1) {
      throw new Error(
        `The file "${fileName}" is not a valid PDF (missing %PDF- header). Please ensure you selected a real PDF document.`
      );
    }
    if (headerOffset > 0) {
      fileBytes = fileBytes.subarray(headerOffset);
    }

    let reportDoc: PDFDocument;
    try {
      reportDoc = await PDFDocument.load(fileBytes, { ignoreEncryption: true });
    } catch (err) {
      throw new Error(`Could not read "${fileName}": ${err instanceof Error ? err.message : String(err)}`);
    }

    const reportPages = await mergedDoc.copyPages(reportDoc, reportDoc.getPageIndices());
    reportPages.forEach((page) => mergedDoc.addPage(page));
  }

  const mergedPdfBytes = await mergedDoc.save();
  return new Blob([mergedPdfBytes.buffer as ArrayBuffer], { type: "application/pdf" });
}
