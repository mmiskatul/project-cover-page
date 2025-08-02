import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import InputForm from "../InputForm/InputForm";
import PreviewPDF from "../SWEPdf/PreviewPDF";
import PreviewPDFNFE from "../NFEPdf/PreviewPDF";
import DefaultPreview from "../DefaultPdf/DefaultPreviewPDF";
import BackButton from "../BackButton/BackButton";
import Default2PreviewPDF from "../BBAPdf/Default2PreviewPDF";
import diulogo from "../../assets/daffodil-international-university-seeklogo.png";
import bglogo from "../../assets/BgImage.png";

const getHtmlFromPreview = () => {
  const preview = document.getElementById("cover-preview");
  if (!preview) return null;
  return preview.outerHTML;
};

function GeneratePdf() {
  const { templateName } = useParams();
  const [inputData, setInputData] = useState({
    studentName: "",
    studentId: "",
    courseName: "",
    courseId: "",
    teacherName: "",
    teacherDesignation: "",
    semester: "",
    batch: "",
    section: "",
    courseType: "",
    date: "",
    department: "",
    topicname: "",
    logo: "",
    bglogo: "",
    level: "",
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const convertToBase64 = async (imgPath, key) => {
      const response = await fetch(imgPath);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        setInputData((prev) => ({ ...prev, [key]: reader.result }));
      };
      reader.readAsDataURL(blob);
    };

    convertToBase64(diulogo, "logo");
    convertToBase64(bglogo, "bglogo");
  }, []);

  const handleGenerate = async () => {
    setIsGenerating(true);
    const html = getHtmlFromPreview();
    if (!html) {
      alert("Preview not found");
      setIsGenerating(false);
      return;
    }

    const fileName = `${inputData.courseName} Assignment (${inputData.studentId})`;

    try {
      // Track the PDF generation
      await fetch('/api/increment-count', { method: 'POST' });
      
      navigate("/download", {
        state: { 
          html: `<!DOCTYPE html><html><head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
            <style>
              * { box-sizing: border-box; }
              html, body { margin: 0; padding: 0; width: 794px; height: 1123px; }
            </style>
          </head><body>${html}</body></html>`, 
          fileName 
        },
      });
    } catch (error) {
      console.error("Generation error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full mt-28 px-4 py-10">
      <div className="mb-6">
        <BackButton className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition duration-200" />
      </div>

      <h1 className="text-3xl font-bold text-center my-8">Generate Your PDF</h1>

      <div className="flex flex-col lg:flex-row gap-8 justify-center items-start">
        <div className="w-full lg:w-2/5">
          <InputForm inputData={inputData} setInputData={setInputData} />
        </div>

        <div className="w-full lg:w-3/5">
          {templateName === "swe" && <PreviewPDF data={inputData} />}
          {templateName === "bba" && <Default2PreviewPDF data={inputData} />}
          {templateName === "nfe" && <PreviewPDFNFE data={inputData} />}
          {(!templateName || (templateName !== "swe" && templateName !== "bba" && templateName !== "nfe")) && (
            <DefaultPreview data={inputData} />
          )}
        </div>
      </div>

      <div className="w-full text-center mt-6">
        <button 
          onClick={handleGenerate}
          disabled={isGenerating}
          className={`px-6 py-3 text-white rounded transition duration-200 hover:scale-105 active:scale-95 ${
            isGenerating ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isGenerating ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </span>
          ) : 'Generate PDF'}
        </button>
      </div>
    </div>
  );
}

export default GeneratePdf;