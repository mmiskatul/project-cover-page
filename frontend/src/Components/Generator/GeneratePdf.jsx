import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import InputForm from "../InputForm/InputForm";
import PreviewPDF from "../SWEPdf/PreviewPDF";
import PreviewPDFNFE from "../NFEPdf/PreviewPDF";
import DefaultPreview from "../DefaultPdf/DefaultPreviewPDF";
import PreviewPDFAgri from '../AgiPdf/PreviewPDF'
import PreviewPDFENG from "../ENGPdf/PreviewPDF";
import PreviewPDFTxt from '../TextilePdf/PreviewPDF'
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
     teamName: [
    { studentId: "", studentName: "" }
  ],
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
    logo: "",
    bglogo: "",
    level: "",
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const convertToBase64 = async (imgPath, key) => {
      try {
        const response = await fetch(imgPath);
        const blob = await response.blob();
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            setInputData((prev) => ({ ...prev, [key]: reader.result }));
            resolve();
          };
          reader.readAsDataURL(blob);
        });
      } catch (error) {
        console.error(`Error loading image ${key}:`, error);
      }
    };

    Promise.all([
      convertToBase64(diulogo, "logo"),
      convertToBase64(bglogo, "bglogo")
    ]);
  }, []);

  const handleGenerate = async () => {
    setIsGenerating(true);
    const html = getHtmlFromPreview();
    if (!html) {
      alert("Preview not found. Please try again.");
      setIsGenerating(false);
      return;
    }

    // Use team leader's ID for project or individual student ID
    const studentIdForFileName = inputData.courseType === "project" 
      ? inputData.teamName[0]?.studentId || "team" 
      : inputData.studentId;

    const fileName = ` ${inputData.courseType} ${inputData.courseId}(${studentIdForFileName})`.trim() || "document";

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
              @page { size: A4; margin: 0; }
            </style>
          </head><body>${html}</body></html>`, 
          fileName 
        },
      });
    } catch (error) {
      console.error("Generation error:", error);
      alert("An error occurred while generating the PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Check if all required fields are filled
  const isFormValid = () => {
    if (!inputData.courseName) return false;
    
    if (inputData.courseType === "project") {
      // For projects: check if all team members have both ID and name
      return inputData.teamName && 
             inputData.teamName.length > 0 && 
             !inputData.teamName.some(member => !member.studentId || !member.studentName);
    } else {
      // For individual assignments: check student name
      return !!inputData.studentName;
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <BackButton className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2" />
          <h1 className="text-3xl font-bold text-gray-900">Generate Your Assignment</h1>
          <div className="w-10"></div> {/* Spacer for alignment */}
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Input Form Section - 35% width */}
              <div className="w-full lg:w-[35%] space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Assignment Details</h2>
                  <p className="text-gray-500 mt-1">Fill in your assignment information</p>
                </div>
                <InputForm inputData={inputData} setInputData={setInputData} />
              </div>

              {/* Preview Section - 65% width */}
              <div className="w-full lg:w-[65%] space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Preview</h2>
                  <p className="text-gray-500 mt-1">Your assignment will appear here</p>
                </div>
                <div className="flex justify-center border border-gray-200 rounded-lg p-4 bg-gray-50 h-full">
                  {templateName === "swe" && <PreviewPDF data={inputData} />}
                  {templateName === "bba" && <Default2PreviewPDF data={inputData} />}
                  {templateName === "nfe" && <PreviewPDFNFE data={inputData} />}
                  {templateName==='agri' && <PreviewPDFAgri data={inputData}/>}
                  {templateName ==='default' && <DefaultPreview data={inputData} />}
                  {templateName ==='eng' && <PreviewPDFENG data={inputData} />}
                  {templateName==='txt' && <PreviewPDFTxt data={inputData}/>}
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <div className="mt-30 flex justify-center">
              <button 
                onClick={handleGenerate}
                disabled={isGenerating || !isFormValid()}
                className={`px-8 py-3 rounded-lg shadow-md transition-all duration-200 flex items-center justify-center gap-2 w-full max-w-md ${
                  isGenerating 
                    ? 'bg-blue-400 cursor-not-allowed' 
                    : !isFormValid()
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:shadow-lg hover:from-blue-700 hover:to-indigo-800'
                }`}
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Generating PDF...</span>
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <span>Generate PDF</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Your document will be generated as a high-quality PDF file ready for submission.</p>
        </div>
      </div>
    </div>
  );
}

export default GeneratePdf;