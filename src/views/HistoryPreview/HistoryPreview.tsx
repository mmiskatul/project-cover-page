"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FiFileText,
  FiTrash2,
  FiDownload,
  FiSearch,
  FiX,
  FiEdit3,
  FiEye,
  FiGrid,
  FiList,
  FiClock,
  FiPlus,
  FiLayers,
  FiAlertTriangle,
  FiCheck,
} from "react-icons/fi";
import { AiOutlineMergeCells, AiOutlineFilePdf } from "react-icons/ai";
import BackButton from "../../components/BackButton/BackButton";
import type { AssignmentFormData } from "@/components/forms/types";

export type HistoryItem = {
  id: string | number;
  html?: string;
  fileName?: string;
  timestamp?: string | number;
  templateName?: string;
  formData?: AssignmentFormData;
};

// Helper for relative timestamps
function formatTimeAgo(dateInput?: string | number) {
  if (!dateInput) return "Recently";
  const date = new Date(dateInput);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getTemplateLabel(templateName?: string) {
  switch (templateName?.toLowerCase()) {
    case "swe":
      return "Software Engineering";
    case "bba":
      return "Business Administration";
    case "nfe":
      return "Nutrition & Food Eng.";
    case "agri":
      return "Agricultural Science";
    case "eng":
      return "Department of English";
    case "txt":
      return "Textile Engineering";
    case "civil":
      return "Civil Engineering";
    case "thm":
      return "Tourism & Hospitality";
    default:
      return "Classic Academic";
  }
}

function getTemplateBadgeColor(templateName?: string) {
  switch (templateName?.toLowerCase()) {
    case "swe":
      return "bg-indigo-50 text-indigo-700 border-indigo-200";
    case "bba":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "nfe":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "agri":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "eng":
      return "bg-purple-50 text-purple-700 border-purple-200";
    case "txt":
      return "bg-rose-50 text-rose-700 border-rose-200";
    case "civil":
      return "bg-orange-50 text-orange-700 border-orange-200";
    case "thm":
      return "bg-teal-50 text-teal-700 border-teal-200";
    default:
      return "bg-slate-100 text-slate-700 border-slate-200";
  }
}

export default function HistoryPreview() {
  const router = useRouter();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTemplateFilter, setSelectedTemplateFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
  const [modalPreviewUrl, setModalPreviewUrl] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | number | null>(null);

  // Custom confirmation modal state
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    type: "delete" | "clear";
    targetId?: string | number;
    title: string;
    description: string;
  }>({
    isOpen: false,
    type: "delete",
    title: "",
    description: "",
  });

  // Load history from localStorage
  useEffect(() => {
    try {
      const savedHistory = JSON.parse(
        localStorage.getItem("coverHistory") || "[]"
      ) as HistoryItem[];
      setHistory(savedHistory);
    } catch (error) {
      console.error("Failed to load cover history:", error);
    }
  }, []);

  // Update modal preview URL when selected item changes
  useEffect(() => {
    let url = "";
    if (selectedItem?.html) {
      try {
        const blob = new Blob([selectedItem.html], { type: "text/html" });
        url = URL.createObjectURL(blob);
        setModalPreviewUrl(url);
      } catch (error) {
        console.error("Error creating modal preview url:", error);
      }
    } else {
      setModalPreviewUrl(null);
    }

    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [selectedItem]);

  // Filtered & sorted history items
  const filteredHistory = useMemo(() => {
    return history.filter((item) => {
      const search = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !search ||
        (item.fileName || "").toLowerCase().includes(search) ||
        (item.formData?.courseName || "").toLowerCase().includes(search) ||
        (item.formData?.courseId || "").toLowerCase().includes(search) ||
        (item.formData?.studentName || "").toLowerCase().includes(search) ||
        (item.formData?.studentId || "").toLowerCase().includes(search) ||
        getTemplateLabel(item.templateName).toLowerCase().includes(search);

      const matchesTemplate =
        selectedTemplateFilter === "all" ||
        (item.templateName || "default").toLowerCase() ===
          selectedTemplateFilter.toLowerCase();

      return matchesSearch && matchesTemplate;
    });
  }, [history, searchTerm, selectedTemplateFilter]);

  // Unique template filters available in the current history
  const templateFilterOptions = useMemo(() => {
    const templates = new Set<string>();
    history.forEach((item) => {
      templates.add(item.templateName?.toLowerCase() || "default");
    });
    return Array.from(templates);
  }, [history]);

  // Edit Feature: Loads data back into generatorDraft and redirects to template editor
  const handleEdit = (item: HistoryItem) => {
    const template = item.templateName || "default";
    const draftKey = `generatorDraft:${template}`;

    if (item.formData) {
      // Remove heavy embedded base64 if present so state is clean
      const { logo, bglogo, ...sanitizedFormData } = item.formData;
      sessionStorage.setItem(draftKey, JSON.stringify(sanitizedFormData));
    }

    if (item.html) {
      sessionStorage.setItem(
        "pendingDocument",
        JSON.stringify({
          html: item.html,
          fileName: item.fileName,
          templateName: template,
          formData: item.formData,
        })
      );
    }

    toast.info(`Opening ${getTemplateLabel(template)} editor...`, {
      autoClose: 1500,
    });

    router.push(`/template/${template}`);
  };

  // Merge Feature: Prepares pendingDocument and navigates to /merge
  const handleMerge = (item: HistoryItem) => {
    if (!item.html) {
      toast.error("Document content missing for merge");
      return;
    }

    sessionStorage.setItem(
      "pendingDocument",
      JSON.stringify({
        html: item.html,
        fileName: item.fileName || "Cover Document",
        templateName: item.templateName || "default",
        formData: item.formData,
      })
    );

    router.push("/merge");
  };

  // Direct Re-download Feature
  const handleDownload = async (item: HistoryItem) => {
    if (!item.html) {
      toast.error("Document content unavailable");
      return;
    }

    setDownloadingId(item.id);
    const toastId = toast.loading("Generating your PDF...", {
      position: "top-center",
    });

    try {
      const res = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ html: item.html }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.message || "Failed to generate PDF");
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${item.fileName || "cover-page"}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.update(toastId, {
        render: "PDF downloaded successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (err) {
      console.error("PDF download error:", err);
      toast.update(toastId, {
        render: err instanceof Error ? err.message : "Download failed",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setDownloadingId(null);
    }
  };

  // Prompt confirmation for single item delete
  const promptDelete = (id: string | number, name?: string) => {
    setConfirmModal({
      isOpen: true,
      type: "delete",
      targetId: id,
      title: "Delete this cover page?",
      description: `"${name || "This document"}" will be permanently removed from your recent generation history.`,
    });
  };

  // Prompt confirmation for clear all
  const promptClearAll = () => {
    setConfirmModal({
      isOpen: true,
      type: "clear",
      title: "Clear all generation history?",
      description:
        "All saved cover pages will be deleted from your browser history. This action cannot be undone.",
    });
  };

  // Execute confirmed action
  const executeConfirmAction = () => {
    if (confirmModal.type === "delete" && confirmModal.targetId !== undefined) {
      const updated = history.filter((item) => item.id !== confirmModal.targetId);
      localStorage.setItem("coverHistory", JSON.stringify(updated));
      setHistory(updated);
      if (selectedItem?.id === confirmModal.targetId) {
        setSelectedItem(null);
      }
      toast.success("Document removed from history");
    } else if (confirmModal.type === "clear") {
      localStorage.removeItem("coverHistory");
      setHistory([]);
      setSelectedItem(null);
      toast.success("History cleared successfully");
    }
    setConfirmModal((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="min-h-screen pt-16 sm:pt-20 bg-slate-50/60 pb-20 text-slate-800">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950 text-white pt-8 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800 shadow-lg">
        {/* Subtle decorative lights */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center justify-between gap-4 mb-6">
            <BackButton className="text-white border-slate-700 bg-slate-800/80 hover:bg-indigo-600 hover:border-indigo-600 hover:text-white" />

            <Link
              href="/template"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 shadow-md shadow-indigo-600/25 transition-all active:scale-95"
            >
              <FiPlus className="w-4 h-4" />
              <span>Create New Cover</span>
            </Link>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 mb-3">
                <FiClock className="w-3.5 h-3.5" />
                <span>Generated Cover Archives</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
                Recent Cover Pages
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                Browse, preview, re-download, or <strong className="text-indigo-300 font-semibold">re-edit</strong> any previously generated cover page with all original data restored.
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
              <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/80 rounded-xl px-4 py-2.5 min-w-[110px]">
                <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                  Total Saved
                </p>
                <p className="text-xl sm:text-2xl font-black text-white mt-0.5">
                  {history.length}
                </p>
              </div>

              {history.length > 0 && (
                <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/80 rounded-xl px-4 py-2.5 min-w-[130px]">
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                    Latest Activity
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-indigo-300 mt-1">
                    {formatTimeAgo(history[0]?.timestamp)}
                  </p>
                </div>
              )}

              {history.length > 0 && (
                <button
                  type="button"
                  onClick={promptClearAll}
                  className="px-3.5 py-2.5 rounded-xl border border-red-500/40 text-red-300 hover:bg-red-500/20 hover:text-red-200 transition-colors text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  title="Clear all saved history"
                >
                  <FiTrash2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Clear All</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 relative z-20">
        {/* Controls Bar Card */}
        <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-sm border border-slate-200/90 mb-6 flex flex-col md:flex-row gap-3 items-center justify-between">
          {/* Search Field */}
          <div className="relative w-full md:max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <FiSearch className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search by course, student, ID, or file name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-9 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition-all"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <FiX className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Pills & View Switcher */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end flex-wrap">
            {/* Template Filter Pills */}
            {templateFilterOptions.length > 1 && (
              <div className="flex items-center gap-1 overflow-x-auto max-w-full pb-1 md:pb-0">
                <button
                  type="button"
                  onClick={() => setSelectedTemplateFilter("all")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedTemplateFilter === "all"
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  All ({history.length})
                </button>
                {templateFilterOptions.map((tmpl) => (
                  <button
                    key={tmpl}
                    type="button"
                    onClick={() => setSelectedTemplateFilter(tmpl)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      selectedTemplateFilter === tmpl
                        ? "bg-indigo-600 text-white shadow-sm"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {tmpl.toUpperCase()}
                  </button>
                ))}
              </div>
            )}

            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 ml-auto">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                  viewMode === "grid"
                    ? "bg-white text-indigo-700 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
                title="Grid view"
                aria-label="Grid view"
              >
                <FiGrid className="w-4 h-4" />
                <span className="hidden sm:inline">Grid</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                  viewMode === "list"
                    ? "bg-white text-indigo-700 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
                title="List view"
                aria-label="List view"
              >
                <FiList className="w-4 h-4" />
                <span className="hidden sm:inline">List</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Section: Empty vs Grid vs List */}
        {filteredHistory.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 sm:p-14 text-center border border-slate-200 shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mx-auto mb-4">
              {searchTerm || selectedTemplateFilter !== "all" ? (
                <FiSearch className="w-8 h-8" />
              ) : (
                <FiLayers className="w-8 h-8" />
              )}
            </div>

            <h3 className="text-lg font-bold text-slate-900">
              {searchTerm || selectedTemplateFilter !== "all"
                ? "No matching cover pages"
                : "No cover history yet"}
            </h3>

            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
              {searchTerm || selectedTemplateFilter !== "all"
                ? "We couldn't find any saved covers matching your search or filters. Try clearing the filter."
                : "Your downloaded and generated cover pages will automatically be archived here for instant preview, editing, and re-downloading."}
            </p>

            <div className="mt-6 flex items-center justify-center gap-3">
              {searchTerm || selectedTemplateFilter !== "all" ? (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedTemplateFilter("all");
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                >
                  Clear Filters
                </button>
              ) : (
                <Link
                  href="/template"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 shadow-md transition-all active:scale-95"
                >
                  <FiPlus className="w-4 h-4" />
                  <span>Choose a Template to Generate</span>
                </Link>
              )}
            </div>
          </div>
        ) : viewMode === "grid" ? (
          /* Grid View */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHistory.map((item) => {
              const tmplLabel = getTemplateLabel(item.templateName);
              const badgeClass = getTemplateBadgeColor(item.templateName);
              const studentName =
                item.formData?.studentName ||
                item.formData?.teamName?.[0]?.studentName ||
                "";
              const studentId =
                item.formData?.studentId ||
                item.formData?.teamName?.[0]?.studentId ||
                "";
              const courseTitle =
                item.formData?.courseName || item.formData?.courseId || "";

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden group"
                >
                  {/* Top Bar: Template Badge & Timestamp */}
                  <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between gap-2 bg-slate-50/50">
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${badgeClass} uppercase tracking-wider truncate max-w-[65%]`}
                    >
                      {tmplLabel}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap flex items-center gap-1">
                      <FiClock className="w-3 h-3 text-slate-300" />
                      {formatTimeAgo(item.timestamp)}
                    </span>
                  </div>

                  {/* Thumbnail Preview Area */}
                  <div
                    onClick={() => setSelectedItem(item)}
                    className="relative aspect-[1/1.05] sm:aspect-[1/1.1] bg-slate-100/70 border-b border-slate-100 p-3 flex items-center justify-center cursor-pointer group-hover:bg-slate-100 transition-colors overflow-hidden"
                  >
                    {/* Mock paper frame */}
                    <div className="w-[84%] h-[92%] bg-white rounded-md shadow-md border border-slate-200/80 p-3.5 flex flex-col justify-between transition-transform duration-200 group-hover:scale-[1.02]">
                      <div>
                        {/* Header bar representation */}
                        <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
                          <div className="w-8 h-2 rounded bg-indigo-500/70" />
                          <div className="w-12 h-1.5 rounded bg-slate-200" />
                        </div>

                        {/* Title preview */}
                        <div className="space-y-1.5 mt-3">
                          <div className="h-3 w-3/4 bg-slate-800 rounded font-bold" />
                          <div className="h-2 w-1/2 bg-slate-300 rounded" />
                        </div>

                        {/* Middle lines */}
                        <div className="space-y-1.5 mt-5">
                          <div className="h-1.5 w-full bg-slate-100 rounded" />
                          <div className="h-1.5 w-5/6 bg-slate-100 rounded" />
                          <div className="h-1.5 w-2/3 bg-slate-100 rounded" />
                        </div>
                      </div>

                      {/* Footer representation */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[9px] text-slate-400">
                        <span className="truncate max-w-[110px]">
                          {studentName || "DIU Student"}
                        </span>
                        <span>{studentId || "A4 Cover"}</span>
                      </div>
                    </div>

                    {/* Hover Quick-Preview Overlay */}
                    <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <span className="px-3.5 py-1.5 rounded-xl bg-white text-slate-800 text-xs font-bold shadow-lg flex items-center gap-1.5">
                        <FiEye className="w-3.5 h-3.5 text-indigo-600" />
                        Quick Preview
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                    <div>
                      <h4
                        className="text-sm font-bold text-slate-800 line-clamp-1 group-hover:text-indigo-600 transition-colors"
                        title={item.fileName || "Cover Document"}
                      >
                        {item.fileName || "Untitled Document"}
                      </h4>

                      <div className="text-xs text-slate-500 mt-1 space-y-0.5">
                        {courseTitle && (
                          <p className="truncate font-medium text-slate-700">
                            Course: {courseTitle}
                          </p>
                        )}
                        {studentName && (
                          <p className="truncate">
                            Student: {studentName} {studentId ? `(${studentId})` : ""}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                      {/* Edit Button - User Request #2 */}
                      <button
                        type="button"
                        onClick={() => handleEdit(item)}
                        className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-95 cursor-pointer"
                        title="Edit this cover page in the generator"
                      >
                        <FiEdit3 className="w-3.5 h-3.5" />
                        <span>Edit Cover</span>
                      </button>

                      {/* Download Button */}
                      <button
                        type="button"
                        onClick={() => handleDownload(item)}
                        disabled={downloadingId === item.id}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200 transition-colors disabled:opacity-50 cursor-pointer"
                        title="Download PDF"
                        aria-label="Download PDF"
                      >
                        <FiDownload className="w-4 h-4 text-emerald-600" />
                      </button>

                      {/* Merge Button */}
                      <button
                        type="button"
                        onClick={() => handleMerge(item)}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200 transition-colors cursor-pointer"
                        title="Merge with other PDFs"
                        aria-label="Merge with other PDFs"
                      >
                        <AiOutlineMergeCells className="w-4 h-4 text-blue-600" />
                      </button>

                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={() => promptDelete(item.id, item.fileName)}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-400 hover:text-red-600 border border-slate-200 hover:border-red-200 transition-colors cursor-pointer"
                        title="Delete from history"
                        aria-label="Delete from history"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* List / Table View */
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
            <div className="divide-y divide-slate-100">
              {filteredHistory.map((item) => {
                const tmplLabel = getTemplateLabel(item.templateName);
                const badgeClass = getTemplateBadgeColor(item.templateName);
                const studentName =
                  item.formData?.studentName ||
                  item.formData?.teamName?.[0]?.studentName ||
                  "";
                const courseTitle =
                  item.formData?.courseName || item.formData?.courseId || "";

                return (
                  <div
                    key={item.id}
                    className="p-4 sm:px-6 hover:bg-slate-50/80 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div
                      className="flex items-start gap-3.5 flex-1 min-w-0 cursor-pointer"
                      onClick={() => setSelectedItem(item)}
                    >
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                        <AiOutlineFilePdf className="w-5 h-5 text-red-500" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-sm font-bold text-slate-900 truncate">
                            {item.fileName || "Untitled Document"}
                          </h4>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded border ${badgeClass} uppercase`}
                          >
                            {tmplLabel}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-xs text-slate-500 mt-1 flex-wrap">
                          {courseTitle && <span>Course: {courseTitle}</span>}
                          {studentName && <span>Student: {studentName}</span>}
                          <span className="text-slate-400">
                            {formatTimeAgo(item.timestamp)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions on List Row */}
                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        type="button"
                        onClick={() => handleEdit(item)}
                        className="px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold border border-indigo-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                        title="Edit in form"
                      >
                        <FiEdit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedItem(item)}
                        className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                        title="Preview"
                        aria-label="Preview"
                      >
                        <FiEye className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDownload(item)}
                        disabled={downloadingId === item.id}
                        className="p-1.5 rounded-lg text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors disabled:opacity-50"
                        title="Download PDF"
                        aria-label="Download PDF"
                      >
                        <FiDownload className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleMerge(item)}
                        className="p-1.5 rounded-lg text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-colors"
                        title="Merge PDF"
                        aria-label="Merge PDF"
                      >
                        <AiOutlineMergeCells className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => promptDelete(item.id, item.fileName)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete"
                        aria-label="Delete"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* Modal: Interactive Document Preview */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden border border-slate-200">
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between gap-3 bg-slate-50/70">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                  <AiOutlineFilePdf className="w-5 h-5 text-red-500" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 truncate">
                    {selectedItem.fileName || "Cover Preview"}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {getTemplateLabel(selectedItem.templateName)} &bull;{" "}
                    {formatTimeAgo(selectedItem.timestamp)}
                  </p>
                </div>
              </div>

              {/* Header Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    handleEdit(selectedItem);
                    setSelectedItem(null);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all active:scale-95 cursor-pointer"
                >
                  <FiEdit3 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Edit Cover</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDownload(selectedItem)}
                  disabled={downloadingId === selectedItem.id}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all active:scale-95 cursor-pointer"
                >
                  <FiDownload className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Download</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    handleMerge(selectedItem);
                    setSelectedItem(null);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <AiOutlineMergeCells className="w-3.5 h-3.5 text-blue-600" />
                  <span className="hidden sm:inline">Merge</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors ml-1 cursor-pointer"
                  aria-label="Close modal"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body: A4 Iframe Preview */}
            <div className="flex-1 bg-slate-200 p-4 sm:p-6 overflow-y-auto flex items-center justify-center">
              {modalPreviewUrl ? (
                <div className="w-full max-w-[794px] bg-white shadow-xl rounded-md overflow-hidden border border-slate-300">
                  <iframe
                    src={modalPreviewUrl}
                    className="w-full h-[65vh] border-0"
                    title="Document Preview"
                  />
                </div>
              ) : (
                <div className="text-center py-20 text-slate-500">
                  <FiClock className="w-8 h-8 animate-spin mx-auto mb-2 text-indigo-500" />
                  <p className="text-sm">Rendering document preview...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 border border-slate-200 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
              <FiAlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="text-base font-bold text-slate-900">
              {confirmModal.title}
            </h3>

            <p className="text-xs text-slate-500 mt-2">
              {confirmModal.description}
            </p>

            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setConfirmModal((prev) => ({ ...prev, isOpen: false }))}
                className="flex-1 py-2 px-3 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={executeConfirmAction}
                className="flex-1 py-2 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer
        position="top-center"
        autoClose={3000}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
