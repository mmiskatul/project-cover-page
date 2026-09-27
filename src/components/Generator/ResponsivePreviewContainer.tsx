"use client";

import React, { useState, useEffect, useRef, ReactNode } from "react";
import { FiZoomIn, FiZoomOut, FiMaximize2, FiMinimize2 } from "react-icons/fi";

interface ResponsivePreviewContainerProps {
  children: ReactNode;
  onGenerate?: () => void;
  isGenerating?: boolean;
}

// A4 width in px at 96dpi
const A4_W = 794;

export default function ResponsivePreviewContainer({
  children,
}: ResponsivePreviewContainerProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [previewHeight, setPreviewHeight] = useState<number>(1123);
  const [zoomMode, setZoomMode] = useState<"fit" | "actual" | "custom">("fit");
  const [customZoom, setCustomZoom] = useState<number>(1);

  useEffect(() => {
    const updateDimensions = () => {
      if (wrapperRef.current) {
        setContainerWidth(wrapperRef.current.clientWidth);
      }
      const previewEl = document.getElementById("cover-preview");
      if (previewEl) {
        setPreviewHeight(previewEl.scrollHeight || 1123);
      }
    };

    updateDimensions();
    const ro = new ResizeObserver(updateDimensions);
    if (wrapperRef.current) ro.observe(wrapperRef.current);
    window.addEventListener("resize", updateDimensions, { passive: true });
    const t = setTimeout(updateDimensions, 400);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateDimensions);
      clearTimeout(t);
    };
  }, []);

  const fitScale = () => {
    if (!containerWidth || containerWidth <= 0) return 0.4;
    // On mobile use just 8px buffer each side; on larger screens 16px
    const isMobile = containerWidth < 520;
    const buffer = isMobile ? 8 : 16;
    const available = Math.max(containerWidth - buffer * 2, 120);
    return Math.min(1, Math.max(0.2, available / A4_W));
  };

  const effectiveScale =
    zoomMode === "fit"
      ? fitScale()
      : zoomMode === "actual"
      ? 1
      : customZoom;

  const scaledW = Math.round(A4_W * effectiveScale);
  const scaledH = Math.round(previewHeight * effectiveScale);
  const displayPercent = Math.round(effectiveScale * 100);

  const handleZoomIn = () => {
    setZoomMode("custom");
    setCustomZoom((p) => Math.min(1.5, +(p + 0.1).toFixed(2)));
  };

  const handleZoomOut = () => {
    setZoomMode("custom");
    setCustomZoom((p) => Math.max(0.2, +(p - 0.1).toFixed(2)));
  };

  return (
    <div className="w-full flex flex-col gap-2" ref={wrapperRef}>
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-1.5 bg-slate-100 rounded-xl border border-slate-200 px-2.5 py-1.5 text-xs">
        <div className="flex items-center gap-1.5 font-medium text-slate-600 shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>A4</span>
          <span className="text-slate-400 font-mono text-[10px] hidden sm:inline">
            &nbsp;{scaledW}&times;{scaledH}px
          </span>
        </div>

        <div className="flex items-center gap-1 ml-auto">
          <button
            type="button"
            onClick={handleZoomOut}
            className="p-1 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
            aria-label="Zoom Out"
          >
            <FiZoomOut className="w-3.5 h-3.5" />
          </button>

          <span className="px-1.5 py-0.5 bg-white border border-slate-200 rounded-md font-mono text-[11px] font-semibold text-slate-800 min-w-[36px] text-center">
            {displayPercent}%
          </span>

          <button
            type="button"
            onClick={handleZoomIn}
            className="p-1 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
            aria-label="Zoom In"
          >
            <FiZoomIn className="w-3.5 h-3.5" />
          </button>

          <div className="h-4 w-px bg-slate-300 mx-0.5" />

          <button
            type="button"
            onClick={() => setZoomMode("fit")}
            className={`px-1.5 sm:px-2 py-1 rounded-md text-[11px] font-medium transition-all flex items-center gap-1 ${
              zoomMode === "fit"
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
            }`}
            title="Fit to width"
          >
            <FiMinimize2 className="w-3 h-3" />
            <span className="hidden sm:inline">Fit</span>
          </button>

          <button
            type="button"
            onClick={() => { setZoomMode("actual"); setCustomZoom(1); }}
            className={`px-1.5 sm:px-2 py-1 rounded-md text-[11px] font-medium transition-all flex items-center gap-1 ${
              zoomMode === "actual" || (zoomMode === "custom" && customZoom === 1)
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
            }`}
            title="100% actual size"
          >
            <FiMaximize2 className="w-3 h-3" />
            <span className="hidden sm:inline">100%</span>
          </button>
        </div>
      </div>

      {/* Preview viewport — height tracks scaled document exactly */}
      <div
        className="w-full overflow-x-auto overflow-y-hidden rounded-xl bg-slate-200 shadow-inner border border-slate-300"
        style={{ padding: containerWidth < 520 ? "4px" : "12px" }}
      >
        <div
          className="mx-auto relative"
          style={{
            width: `${scaledW}px`,
            height: `${scaledH}px`,
            backgroundColor: "#ffffff",
            borderRadius: "3px",
            boxShadow:
              "0 4px 20px -4px rgba(0,0,0,0.15), 0 2px 8px -2px rgba(0,0,0,0.08)",
            overflow: "hidden",
            transition: "width 0.15s ease-out, height 0.15s ease-out",
          }}
        >
          <div
            style={{
              width: `${A4_W}px`,
              minHeight: `${previewHeight}px`,
              transform: `scale(${effectiveScale})`,
              transformOrigin: "top left",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          >
            {children}
          </div>
        </div>
      </div>

      {/* Hint on very small scales */}
      {effectiveScale < 0.45 && (
        <p className="text-center text-[10px] text-slate-400 leading-snug">
          Use zoom buttons to enlarge &bull; PDF exports at full quality
        </p>
      )}
    </div>
  );
}

