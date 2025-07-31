import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InputForm from "../InputForm/InputForm";
import PreviewPDF from "../SWEPdf/PreviewPDF";
import DefaultPreview from "../DefaultPdf/DefaultPreviewPDF";
import BackButton from "../BackButton/BackButton";
import Default2PreviewPDF from "../DeafultPdf2/Default2PreviewPDF";
import diulogo from "../../assets/daffodil-international-university-seeklogo.png";
import bglogo from "../../assets/BgImage.png";

const getHtmlFromPreview = () => {
  const preview = document.getElementById("cover-preview");
  if (!preview) return null;

  const content = preview.outerHTML;

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>PDF</title>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        <style>
          * {
            box-sizing: border-box;
          }
          html, body {
            margin: 0;
            padding: 0;
            width: 794px;
            height: 1123px;
            font-family: sans-serif;
            background-color: white;
          }
        </style>
      </head>
      <body>
        ${content}
      </body>
    </html>
  `;
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
    logo: "", // set later after loading base64
    bglogo: "", // optional
  });

  // Convert image to base64 and set in state
  useEffect(() => {
    const convertToBase64 = async (imgPath, key) => {
      const response = await fetch(imgPath);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        setInputData(prev => ({ ...prev, [key]: reader.result }));
      };
      reader.readAsDataURL(blob);
    };

    convertToBase64(diulogo, "logo");
    convertToBase64(bglogo, "bglogo");
  }, []);

  return (
    <div className="w-full mt-28 px-4 py-10">
      {/* Back Button */}
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
          {!templateName && <DefaultPreview data={inputData} />}
          {templateName !== "swe" && templateName !== "bba" && templateName && (
            <DefaultPreview data={inputData} />
          )}
        </div>
      </div>

      {/* Generate Button */}
      <div className="w-full text-center mt-6">
        <button
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
          onClick={async () => {
            const html = getHtmlFromPreview();
            if (!html) {
              alert("Preview not found!");
              return;
            }

            try {
              const res = await fetch("http://localhost:5000/generate-pdf", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ html }),
              });

              const blob = await res.blob();
              const url = URL.createObjectURL(blob);

              const link = document.createElement("a");
              link.href = url;
              link.download = `${inputData.courseName} Assignemet (${inputData.studentId}) .pdf`;
              link.click();
            } catch (err) {
              console.error("PDF generation failed", err);
              alert("Failed to generate PDF");
            }
          }}
        >
          Generate PDF
        </button>
      </div>
    </div>
  );
}

export default GeneratePdf;
