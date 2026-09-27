"use client";

import React, { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AssignmentInputForm from "@/components/forms/AssignmentInputForm";
import type { AssignmentFormData } from "@/components/forms/types";
import BackButton from "../BackButton/BackButton";
import { TEMPLATE_PREVIEW_COMPONENTS } from "./template-preview-map";
import { getTemplateByName } from "@/lib/template-config";
import {
  createEmptySweCriteriaRows,
  getDefaultSweEvaluation,
} from "@/components/pdf/department/swe-evaluation-config";
import ResponsivePreviewContainer from "./ResponsivePreviewContainer";
import {
  FiEdit3,
  FiEye,
  FiColumns,
  FiDownload,
  FiTrash2,
  FiPaperclip,
  FiArrowRight,
} from "react-icons/fi";
import { AiOutlineFilePdf, AiOutlineMergeCells } from "react-icons/ai";
import { mergePdfBlobs } from "@/lib/pdf-merge";

const diulogo = "/assets/daffodil-international-university-seeklogo.png";
const bglogo = "/assets/BgImage.png";
const GENERATOR_DRAFT_STORAGE_KEY_PREFIX = "generatorDraft:";

function createInitialInputData(): AssignmentFormData {
  const defaultSweEvaluation = getDefaultSweEvaluation("theory");

  return {
    teamName: [{ studentId: "", studentName: "" }],
    studentName: "",
    studentId: "",
    courseName: "",
    courseId: "",
    teacherName: "",
    teacherDesignation: "",
    courseTeacherId: "",
    semester: "",
    batch: "",
    section: "",
    courseType: "",
    date: "",
    department: "",
    topicname: "",
    logo: diulogo,
    bglogo: bglogo,
    level: "",
    evaluationTitles: [
      "Idea with Focus (1)",
      "Organization (1)",
      "Content (2)",
      "Time Management (1)",
    ],
    presentationTitles: [
      "Content and Design (2)",
      "Knowledge and Interaction (2)",
      "Body language and Attire (1)",
      "Fluency (2)",
      "Time Management (1)",
    ],
    sweCriteriaRows: createEmptySweCriteriaRows(defaultSweEvaluation.rows),
    departmentHeadingText: "",
    reportTitleText: "",
    assignmentSectionTitle: "",
    presentationSectionTitle: "",
    courseCodeLabelText: "",
    courseTitleLabelText: "",
    topicLabelText: "",
    submittedToTitleText: "",
    submittedByTitleText: "",
    teacherNameLabelText: "",
    teacherDesignationLabelText: "",
    studentNameLabelText: "",
    studentIdLabelText: "",
    batchLabelText: "",
    sectionLabelText: "",
    semesterLabelText: "",
    yearLabelText: "",
    levelTermLabelText: "",
    departmentLabelText: "",
    teamMembersLabelText: "",
    submissionDateLabelText: "",
    universityNameText: "",
  };
}

// Cache inline styles and base64 assets to eliminate redundant work and UI latency
let cachedStyles: string | null = null;
let cachedLogoBase64: string | null = null;
let cachedBgLogoBase64: string | null = null;

const getInlineStyles = () => {
  if (cachedStyles) return cachedStyles;

  const collectedStyles: string[] = [];

  for (const sheet of Array.from(document.styleSheets)) {
    try {
      const rules = Array.from(sheet.cssRules || []).map((rule) => rule.cssText);
      if (rules.length > 0) {
        collectedStyles.push(rules.join("\n"));
      }
    } catch (error) {
      console.warn("Skipping inaccessible stylesheet while preparing PDF:", error);
    }
  }

  cachedStyles = collectedStyles.join("\n");
  return cachedStyles;
};

const getHtmlFromPreview = () => {
  const preview = document.getElementById("cover-preview");
  if (!preview) return null;

  const inlineStyles = getInlineStyles();

  return `<!DOCTYPE html><html><head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>${inlineStyles}</style>
    <style>
      * { box-sizing: border-box; }
      html, body { margin: 0; padding: 0; background: #ffffff; }
      @page { size: A4; margin: 0; }
      body { display: flex; justify-content: center; align-items: flex-start; }
    </style>
  </head><body>${preview.outerHTML}</body></html>`;
};

function GeneratePdf() {
  const { templateName } = useParams();
  const activeTemplateName = Array.isArray(templateName)
    ? templateName[0]
    : templateName;
  const selectedTemplate =
    getTemplateByName(activeTemplateName) || getTemplateByName("default");
  const PreviewComponent =
    TEMPLATE_PREVIEW_COMPONENTS[selectedTemplate?.name] ||
    TEMPLATE_PREVIEW_COMPONENTS.default;
  const storageKey = `${GENERATOR_DRAFT_STORAGE_KEY_PREFIX}${selectedTemplate?.name || "default"}`;

  const [inputData, setInputData] = useState<AssignmentFormData>(createInitialInputData);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAssetPreparationComplete, setIsAssetPreparationComplete] = useState(false);
  const [hasLoadedDraft, setHasLoadedDraft] = useState(false);
  const [mobileTab, setMobileTab] = useState<"form" | "preview" | "split">("form");
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleFileSelect = (files: FileList | File[]) => {
    const fileList = Array.from(files);
    let hasZeroByte = false;
    let hasNonPdf = false;

    const validPdfFiles = fileList.filter((f) => {
      const isPdf =
        f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf");
      if (!isPdf) {
        hasNonPdf = true;
        return false;
      }
      if (f.size === 0) {
        hasZeroByte = true;
        return false;
      }
      return true;
    });

    if (hasNonPdf) {
      toast.warning("Only PDF files are supported. Non-PDF files were ignored.", {
        position: "top-center",
        autoClose: 3000,
      });
    }

    if (hasZeroByte) {
      toast.error(
        "One or more attached files are empty (0 bytes). Please attach a valid PDF document.",
        {
          position: "top-center",
          autoClose: 4000,
        }
      );
    }

    if (validPdfFiles.length > 0) {
      setAttachedFiles((prev) => [...prev, ...validPdfFiles]);
      toast.success(
        `Attached ${validPdfFiles.length} file${validPdfFiles.length > 1 ? "s" : ""} for auto-merge!`,
        {
          position: "top-center",
          autoClose: 2500,
        }
      );
    }
  };

  const removeFile = (index: number) => {
    setAttachedFiles((prev) => prev.filter((_, idx) => idx !== index));
  };

  const saveToHistory = (
    html: string,
    fileName: string,
    templateName?: string,
    formData?: AssignmentFormData
  ) => {
    try {
      const history = JSON.parse(localStorage.getItem("coverHistory") || "[]");
      const sanitizedFormData = formData
        ? { ...formData, logo: "", bglogo: "" }
        : undefined;

      const newItem = {
        id: Date.now(),
        html,
        fileName: fileName || "Untitled Document",
        timestamp: new Date().toISOString(),
        templateName: templateName || "default",
        formData: sanitizedFormData,
      };

      let updatedHistory = [newItem, ...history].slice(0, 20);
      try {
        localStorage.setItem("coverHistory", JSON.stringify(updatedHistory));
      } catch {
        updatedHistory = [newItem, ...history].slice(0, 6);
        localStorage.setItem("coverHistory", JSON.stringify(updatedHistory));
      }
    } catch (error) {
      console.error("Failed to save to history:", error);
    }
  };

  useEffect(() => {
    const baseInputData = createInitialInputData();

    try {
      const savedDraft = sessionStorage.getItem(storageKey);
      if (savedDraft) {
        const parsedDraft = JSON.parse(savedDraft);
        setInputData({
          ...baseInputData,
          ...parsedDraft,
          logo: cachedLogoBase64 || parsedDraft?.logo || baseInputData.logo,
          bglogo: cachedBgLogoBase64 || parsedDraft?.bglogo || baseInputData.bglogo,
          teamName:
            Array.isArray(parsedDraft?.teamName) && parsedDraft.teamName.length > 0
              ? parsedDraft.teamName
              : baseInputData.teamName,
          evaluationTitles:
            Array.isArray(parsedDraft?.evaluationTitles) &&
            parsedDraft.evaluationTitles.length > 0
              ? parsedDraft.evaluationTitles
              : baseInputData.evaluationTitles,
          presentationTitles:
            Array.isArray(parsedDraft?.presentationTitles) &&
            parsedDraft.presentationTitles.length > 0
              ? parsedDraft.presentationTitles
              : baseInputData.presentationTitles,
          sweCriteriaRows:
            Array.isArray(parsedDraft?.sweCriteriaRows) &&
            parsedDraft.sweCriteriaRows.length > 0
              ? parsedDraft.sweCriteriaRows
              : baseInputData.sweCriteriaRows,
        });
      } else {
        setInputData((prev) => ({
          ...baseInputData,
          logo: cachedLogoBase64 || baseInputData.logo,
          bglogo: cachedBgLogoBase64 || baseInputData.bglogo,
        }));
      }
    } catch (error) {
      console.error("Failed to restore generator draft:", error);
      setInputData(baseInputData);
    } finally {
      setHasLoadedDraft(true);
    }
  }, [storageKey]);

  // Save lightweight draft without serializing heavy base64 images on every keystroke
  useEffect(() => {
    if (!hasLoadedDraft) return;

    try {
      const { logo, bglogo, ...textDraft } = inputData;
      sessionStorage.setItem(storageKey, JSON.stringify(textDraft));
    } catch (error) {
      console.error("Failed to persist generator draft:", error);
    }
  }, [hasLoadedDraft, inputData, storageKey]);

  // Asset conversion with global caching to eliminate redundant work
  useEffect(() => {
    if (cachedLogoBase64 && cachedBgLogoBase64) {
      setInputData((prev) => ({
        ...prev,
        logo: cachedLogoBase64!,
        bglogo: cachedBgLogoBase64!,
      }));
      setIsAssetPreparationComplete(true);
      return;
    }

    const convertToBase64 = async (imgPath: string): Promise<string | undefined> => {
      try {
        const response = await fetch(imgPath);
        if (!response.ok) throw new Error(`Failed to load ${imgPath}`);
        const blob = await response.blob();
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(blob);
        });
      } catch (error) {
        console.error(`Error loading asset ${imgPath}:`, error);
        return undefined;
      }
    };

    let isMounted = true;

    Promise.all([
      cachedLogoBase64 ? Promise.resolve(cachedLogoBase64) : convertToBase64(diulogo),
      cachedBgLogoBase64 ? Promise.resolve(cachedBgLogoBase64) : convertToBase64(bglogo),
    ]).then(([logoResult, bgResult]) => {
      if (!isMounted) return;
      if (logoResult) cachedLogoBase64 = logoResult;
      if (bgResult) cachedBgLogoBase64 = bgResult;

      setInputData((prev) => ({
        ...prev,
        logo: logoResult || prev.logo,
        bglogo: bgResult || prev.bglogo,
      }));
      setIsAssetPreparationComplete(true);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleOpenMergeStudio = () => {
    const html = getHtmlFromPreview();
    if (!html) {
      toast.error("Please fill in assignment details first.", { position: "top-center" });
      return;
    }
    const studentIdForFileName =
      inputData.teamName?.[0]?.studentId?.trim() ||
      inputData.studentId?.trim() ||
      "student";
    const coursePart = inputData.courseId?.trim() || inputData.courseName?.trim() || "Course";
    const typePart = inputData.courseType?.trim() || "Cover";
    const fileName = `${typePart}_${coursePart}_(${studentIdForFileName})`.replace(/\s+/g, "_") || "document";

    const pendingDocument = {
      html,
      fileName,
      templateName: selectedTemplate?.name || "default",
      formData: inputData,
    };
    sessionStorage.setItem("pendingDocument", JSON.stringify(pendingDocument));
    router.push("/merge");
  };

  const handleOpenDownloadPage = () => {
    const html = getHtmlFromPreview();
    if (!html) {
      toast.error("Please fill in assignment details first.", { position: "top-center" });
      return;
    }
    const studentIdForFileName =
      inputData.teamName?.[0]?.studentId?.trim() ||
      inputData.studentId?.trim() ||
      "student";
    const coursePart = inputData.courseId?.trim() || inputData.courseName?.trim() || "Course";
    const typePart = inputData.courseType?.trim() || "Cover";
    const fileName = `${typePart}_${coursePart}_(${studentIdForFileName})`.replace(/\s+/g, "_") || "document";

    const pendingDocument = {
      html,
      fileName,
      templateName: selectedTemplate?.name || "default",
      formData: inputData,
    };
    sessionStorage.setItem("pendingDocument", JSON.stringify(pendingDocument));
    router.push("/download");
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    const html = getHtmlFromPreview();
    if (!html) {
      toast.error("Preview not found. Please try again.", { position: "top-center" });
      setIsGenerating(false);
      return;
    }

    // Use team leader's ID or individual student ID
    const studentIdForFileName =
      inputData.teamName?.[0]?.studentId?.trim() ||
      inputData.studentId?.trim() ||
      "student";

    const coursePart = inputData.courseId?.trim() || inputData.courseName?.trim() || "Course";
    const typePart = inputData.courseType?.trim() || "Cover";
    const baseFileName = `${typePart}_${coursePart}_(${studentIdForFileName})`.replace(/\s+/g, "_") || "document";

    const loadingToastId = toast.loading(
      attachedFiles.length > 0
        ? "Generating cover & merging report..."
        : "Generating cover PDF...",
      { position: "top-center" }
    );

    try {
      // 1. Generate cover PDF
      const res = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ html }),
      });

      if (!res.ok) {
        let errorMessage = `Server error: ${res.status}`;
        try {
          const errorPayload = await res.json();
          if (errorPayload?.error) errorMessage = errorPayload.error;
        } catch {}
        throw new Error(errorMessage);
      }

      const coverBlob = await res.blob();

      // Persist pendingDocument in sessionStorage so user can still visit /download or /merge
      const pendingDocument = {
        html,
        fileName: baseFileName,
        templateName: selectedTemplate?.name || "default",
        formData: inputData,
      };
      sessionStorage.setItem("pendingDocument", JSON.stringify(pendingDocument));

      // Save cover to history
      saveToHistory(
        html,
        baseFileName,
        selectedTemplate?.name || "default",
        inputData
      );

      let finalBlob: Blob = coverBlob;
      let finalFileName = `${baseFileName}.pdf`;

      // 2. If files attached, merge immediately!
      if (attachedFiles.length > 0) {
        if (!coverBlob || coverBlob.size === 0) {
          throw new Error("The generated cover PDF is empty (0 bytes). Please regenerate.");
        }

        for (const file of attachedFiles) {
          if (!file || file.size === 0) {
            throw new Error(
              `The attached file "${file?.name || "report"}" is empty (0 bytes). Please attach a valid PDF document.`
            );
          }
        }

        try {
          // Direct client-side merge with pdf-lib: ultra-fast, zero-network latency, no 4.5MB Vercel upload limits
          finalBlob = await mergePdfBlobs(coverBlob, attachedFiles);
        } catch (clientMergeErr) {
          console.warn("Client-side merge failed, attempting server fallback:", clientMergeErr);
          const mergeFormData = new FormData();
          mergeFormData.append("cover", coverBlob, "cover.pdf");

          attachedFiles.forEach((file) => {
            mergeFormData.append("files", file, file.name);
          });

          const mergeRes = await fetch("/api/merge-auto", {
            method: "POST",
            body: mergeFormData,
          });

          if (!mergeRes.ok) {
            let mergeError = `Merge failed: ${mergeRes.status}`;
            try {
              const mergePayload = await mergeRes.json();
              if (mergePayload?.error) mergeError = mergePayload.error;
            } catch {}
            throw new Error(
              clientMergeErr instanceof Error ? clientMergeErr.message : mergeError
            );
          }

          finalBlob = await mergeRes.blob();
        }

        finalFileName = `${baseFileName}_merged.pdf`;
      }

      // 3. Trigger immediate browser download
      const url = window.URL.createObjectURL(finalBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = finalFileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.update(loadingToastId, {
        render:
          attachedFiles.length > 0
            ? "Cover and report merged & downloaded! 🎉"
            : "Cover PDF downloaded successfully! ✨",
        type: "success",
        isLoading: false,
        autoClose: 3500,
      });
    } catch (error) {
      console.error("Generation error:", error);
      toast.update(loadingToastId, {
        render: error instanceof Error ? error.message : "Failed to generate PDF. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // Check if all required fields are filled
  const isFormValid = () => {
    if (!inputData.courseName?.trim()) return false;

    const hasMultiple = Array.isArray(inputData.teamName) && inputData.teamName.length > 1;
    if (hasMultiple || inputData.courseType === "project") {
      return (
        Array.isArray(inputData.teamName) &&
        inputData.teamName.length > 0 &&
        inputData.teamName.every((member) => Boolean(member.studentName?.trim()))
      );
    }

    return Boolean(
      inputData.studentName?.trim() || inputData.teamName?.[0]?.studentName?.trim()
    );
  };

  return (
    <div className="min-h-screen pt-16 sm:pt-20 bg-gradient-to-b from-slate-50 via-gray-50 to-white py-6 sm:py-12 px-3 sm:px-6 lg:px-8 pb-28 sm:pb-12">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-8">
          <BackButton />
          <div className="text-center sm:text-left">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Assignment Cover Generator
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 hidden sm:block">
              {selectedTemplate?.fullName || "University Standard Template"}
            </p>
          </div>
          <div className="hidden sm:block w-10"></div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-4 sm:p-6 md:p-8">
          {/* Mobile / Tablet Segmented Control (< lg) */}
          <div className="lg:hidden mb-6 bg-slate-100 p-1.5 rounded-xl flex items-center justify-between gap-1 border border-slate-200">
            <button
              type="button"
              onClick={() => setMobileTab("form")}
              className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                mobileTab === "form"
                  ? "bg-white text-indigo-700 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <FiEdit3 className="w-3.5 h-3.5" />
              <span>Edit Form</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileTab("preview")}
              className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                mobileTab === "preview"
                  ? "bg-white text-indigo-700 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <FiEye className="w-3.5 h-3.5" />
              <span>Live Preview</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileTab("split")}
              className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                mobileTab === "split"
                  ? "bg-white text-indigo-700 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <FiColumns className="w-3.5 h-3.5" />
              <span>Both</span>
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Input Form Section - 36% width on desktop */}
            <div
              className={`w-full lg:w-[40%] xl:w-[37%] space-y-6 ${
                mobileTab === "preview" ? "hidden lg:block" : "block"
              }`}
            >
              <div className="border-b border-gray-200 pb-3 flex items-center justify-between">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                    Assignment Details
                  </h2>
                  <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
                    Fill in your course and student details
                  </p>
                </div>
              </div>

              <AssignmentInputForm
                inputData={inputData}
                setInputData={setInputData}
                templateName={selectedTemplate?.name}
              />

              {/* Optional Report PDF Auto-Merge Attachment Section */}
              <div className="pt-5 border-t border-slate-200/80">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                      <AiOutlineMergeCells className="w-4 h-4 text-indigo-600" />
                      Attach Report PDF
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                      Optional
                    </span>
                  </div>
                  {attachedFiles.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setAttachedFiles([])}
                      className="text-xs text-rose-600 hover:text-rose-700 font-medium hover:underline cursor-pointer"
                    >
                      Clear all
                    </button>
                  )}
                </div>
                <p className="text-xs text-slate-500 mb-3">
                  Attach your assignment or lab report PDF to automatically merge and download together.
                </p>

                {/* Hidden File Input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/pdf"
                  multiple
                  onChange={(e) => {
                    if (e.target.files) handleFileSelect(e.target.files);
                    e.target.value = "";
                  }}
                  className="hidden"
                />

                {/* Drag & Drop Area */}
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    if (e.dataTransfer.files) handleFileSelect(e.dataTransfer.files);
                  }}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all duration-200 ${
                    isDragging
                      ? "border-indigo-500 bg-indigo-50/80 scale-[1.01]"
                      : "border-slate-300 hover:border-indigo-400 bg-slate-50/70 hover:bg-indigo-50/20"
                  }`}
                >
                  <div className="flex flex-col items-center justify-center gap-1.5">
                    <div className="w-9 h-9 rounded-full bg-indigo-100/70 text-indigo-600 flex items-center justify-center">
                      <FiPaperclip className="w-4 h-4" />
                    </div>
                    <p className="text-xs font-semibold text-slate-700">
                      Click or drag & drop report PDF
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Supports .pdf files • Cover page becomes Page 1 automatically
                    </p>
                  </div>
                </div>

                {/* Attached Files List */}
                {attachedFiles.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {attachedFiles.map((file, idx) => (
                      <div
                        key={`${file.name}-${idx}`}
                        className="bg-indigo-50/40 border border-indigo-200/80 rounded-lg p-2.5 flex items-center justify-between gap-2 shadow-xs"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-7 h-7 rounded bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                            <AiOutlineFilePdf className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-slate-800 truncate" title={file.name}>
                              {file.name}
                            </p>
                            <p className="text-[10px] text-slate-500">
                              {formatFileSize(file.size)} • Follows Cover Page
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile(idx);
                          }}
                          className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors shrink-0 cursor-pointer"
                          title="Remove attachment"
                        >
                          <FiTrash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-1.5 flex items-center gap-2 text-[11px] text-emerald-800">
                      <span className="font-bold">✓ Ready:</span> Cover Page + {attachedFiles.length} file{attachedFiles.length > 1 ? "s" : ""} will be merged
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Preview Section - 64% width on desktop */}
            <div
              className={`w-full lg:w-[60%] xl:w-[63%] lg:sticky lg:top-24 self-start space-y-4 ${
                mobileTab === "form" ? "hidden lg:block" : "block"
              }`}
            >
              <div className="border-b border-gray-200 pb-3 flex items-center justify-between">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                    Cover Preview
                  </h2>
                  <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
                    Real-time, pixel-perfect document rendering
                  </p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  A4 Page
                </span>
              </div>

              <ResponsivePreviewContainer>
                {PreviewComponent && <PreviewComponent data={inputData} />}
              </ResponsivePreviewContainer>
            </div>
          </div>

          {/* Desktop & Tablet Generate Button */}
          <div className="mt-10 pt-6 border-t border-slate-100 flex flex-col items-center justify-center">
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !isFormValid() || !isAssetPreparationComplete}
              className={`px-8 py-3.5 rounded-xl shadow-md transition-all duration-200 flex items-center justify-center gap-2.5 w-full max-w-md font-bold text-sm sm:text-base ${
                isGenerating
                  ? "bg-indigo-400 text-white cursor-not-allowed"
                  : !isFormValid() || !isAssetPreparationComplete
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : attachedFiles.length > 0
                  ? "bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 text-white hover:shadow-lg hover:from-emerald-700 hover:to-indigo-700 active:scale-[0.99] cursor-pointer"
                  : "bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 text-white hover:shadow-lg hover:from-blue-700 hover:to-indigo-800 active:scale-[0.99] cursor-pointer"
              }`}
            >
              {isGenerating ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>
                    {attachedFiles.length > 0
                      ? "Generating & Merging PDF..."
                      : "Generating Cover PDF..."}
                  </span>
                </>
              ) : (
                <>
                  {attachedFiles.length > 0 ? (
                    <>
                      <AiOutlineMergeCells className="w-5 h-5" />
                      <span>Generate & Merge PDF ({attachedFiles.length})</span>
                    </>
                  ) : (
                    <>
                      <FiDownload className="w-5 h-5" />
                      <span>
                        {isAssetPreparationComplete
                          ? "Download Cover PDF"
                          : "Preparing assets..."}
                      </span>
                    </>
                  )}
                </>
              )}
            </button>
            <p className="mt-3 text-center text-xs text-slate-500">
              {attachedFiles.length > 0
                ? "Auto-merging: Cover page + attached report PDF into a single document"
                : "High-resolution print-ready A4 document • Instant PDF Download"}
            </p>

            {/* Quick secondary shortcuts */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-semibold text-slate-500">
              <button
                type="button"
                onClick={handleOpenMergeStudio}
                className="text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>Need custom page reordering? Open Merge Studio</span>
                <FiArrowRight className="w-3 h-3" />
              </button>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <button
                type="button"
                onClick={handleOpenDownloadPage}
                className="text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              >
                Dedicated Download Page →
              </button>
            </div>
          </div>
        </div>

        {/* Floating Quick Action Dock on Mobile Screens (< sm) */}
        <div className="sm:hidden fixed bottom-3 inset-x-3 z-40 bg-slate-900/95 backdrop-blur-md text-white p-2 rounded-2xl shadow-2xl flex items-center justify-between gap-2 border border-slate-700/60">
          <button
            type="button"
            onClick={() => setMobileTab(mobileTab === "preview" ? "form" : "preview")}
            className="px-3.5 py-2.5 rounded-xl bg-slate-800 text-slate-100 hover:bg-slate-700 font-semibold text-xs flex items-center gap-1.5 transition-colors border border-slate-700 cursor-pointer"
          >
            {mobileTab === "preview" ? (
              <>
                <FiEdit3 className="w-3.5 h-3.5 text-indigo-400" />
                <span>Edit Form</span>
              </>
            ) : (
              <>
                <FiEye className="w-3.5 h-3.5 text-indigo-400" />
                <span>View Preview</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating || !isFormValid() || !isAssetPreparationComplete}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold shadow-md flex items-center justify-center gap-1.5 transition-all ${
              isGenerating || !isFormValid() || !isAssetPreparationComplete
                ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                : attachedFiles.length > 0
                ? "bg-gradient-to-r from-emerald-600 to-indigo-600 text-white shadow-emerald-500/25 cursor-pointer"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 shadow-indigo-500/25 cursor-pointer"
            }`}
          >
            {isGenerating ? (
              <span>{attachedFiles.length > 0 ? "Merging..." : "Generating..."}</span>
            ) : attachedFiles.length > 0 ? (
              <>
                <AiOutlineMergeCells className="w-3.5 h-3.5" />
                <span>Merge & Download</span>
              </>
            ) : (
              <>
                <FiDownload className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </>
            )}
          </button>
        </div>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </div>
  );
}

export default GeneratePdf;
