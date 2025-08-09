import React, { useState, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

// Use pdfjs worker from CDN
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PdfEditor({ pdfFile }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.2);
  const [rotation, setRotation] = useState(0);
  const documentRef = useRef();

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.2, 3));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.5));
  const rotateLeft = () => setRotation((prev) => (prev - 90) % 360);
  const rotateRight = () => setRotation((prev) => (prev + 90) % 360);
  const goToPrevPage = () => setPageNumber((prev) => Math.max(1, prev - 1));
  const goToNextPage = () => setPageNumber((prev) => Math.min(numPages, prev + 1));

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between mb-4">
        <div className="space-x-2">
          <button onClick={zoomOut} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">-</button>
          <button onClick={zoomIn} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">+</button>
          <button onClick={rotateLeft} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">↺</button>
          <button onClick={rotateRight} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">↻</button>
        </div>
        <div className="space-x-2">
          <button onClick={goToPrevPage} disabled={pageNumber <= 1} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50">Prev</button>
          <span>Page {pageNumber} of {numPages || "-"}</span>
          <button onClick={goToNextPage} disabled={pageNumber >= numPages} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50">Next</button>
        </div>
      </div>
      <div className="flex-grow overflow-auto border rounded">
        <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess} className="select-text" inputRef={documentRef}>
          <Page
            pageNumber={pageNumber}
            scale={scale}
            rotate={rotation}
            renderTextLayer={true}
            renderAnnotationLayer={true}
          />
        </Document>
      </div>
    </div>
  );
}
