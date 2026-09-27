"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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
import { FiEdit3, FiEye, FiColumns, FiDownload } from "react-icons/fi";

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
  const router = useRouter();

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

  const handleGenerate = async () => {
    setIsGenerating(true);
    const html = getHtmlFromPreview();
    if (!html) {
      alert("Preview not found. Please try again.");
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
    const fileName = `${typePart}_${coursePart}_(${studentIdForFileName})`.replace(/\s+/g, "_") || "document";

    try {
      const pendingDocument = {
        html,
        fileName,
        templateName: selectedTemplate?.name || "default",
        formData: inputData,
      };

      sessionStorage.setItem("pendingDocument", JSON.stringify(pendingDocument));
      router.push("/download");
    } catch (error) {
      console.error("Generation error:", error);
      alert("An error occurred while generating the PDF. Please try again.");
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
                  ? "bg-blue-400 text-white cursor-not-allowed"
                  : !isFormValid() || !isAssetPreparationComplete
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
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
                  <span>Generating PDF...</span>
                </>
              ) : (
                <>
                  <FiDownload className="w-5 h-5" />
                  <span>
                    {isAssetPreparationComplete ? "Generate Cover PDF" : "Preparing assets..."}
                  </span>
                </>
              )}
            </button>
            <p className="mt-3 text-center text-xs text-slate-400">
              High-resolution print-ready A4 document • Instant PDF Download
            </p>
          </div>
        </div>

        {/* Floating Quick Action Dock on Mobile Screens (< sm) */}
        <div className="sm:hidden fixed bottom-3 inset-x-3 z-40 bg-slate-900/95 backdrop-blur-md text-white p-2 rounded-2xl shadow-2xl flex items-center justify-between gap-2 border border-slate-700/60">
          <button
            type="button"
            onClick={() => setMobileTab(mobileTab === "preview" ? "form" : "preview")}
            className="px-3.5 py-2.5 rounded-xl bg-slate-800 text-slate-100 hover:bg-slate-700 font-semibold text-xs flex items-center gap-1.5 transition-colors border border-slate-700"
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
                : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 shadow-indigo-500/25"
            }`}
          >
            {isGenerating ? (
              <span>Generating...</span>
            ) : (
              <>
                <FiDownload className="w-3.5 h-3.5" />
                <span>Generate PDF</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default GeneratePdf;
