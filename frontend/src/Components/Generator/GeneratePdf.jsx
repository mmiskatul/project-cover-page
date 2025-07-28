import React, { useState } from "react";
import InputForm from "../InputForm/InputForm";
import PreviewPDF from "../PreviewPDF/PreviewPDF";
import BackButton from "../BackButton/BackButton";

function GeneratePdf() {
  const [inputData, setInputData] = useState({
    studentName: "",
    studentId: "",
    courseName: "",
    teacherName: "",
    teacherDesignation: "",
    semester: "",
    batch: "",
    section: "",
    courseType: "",
    date: "",
  });

  return (
    <div className="w-full mt-28 px-4">
      {/* Styled Back Button */}
      <div className="mb-6">
        <BackButton className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition duration-200" />
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-center my-8">Generate Your PDF</h1>

      {/* Form and Preview Layout */}
      <div className="flex flex-col lg:flex-row gap-8 justify-center items-start">
        {/* Input Form */}
        <div className="w-full lg:w-2/5">
          <InputForm inputData={inputData} setInputData={setInputData} />
        </div>

        {/* PDF Preview */}
        <div className="w-full lg:w-3/5">
          <PreviewPDF data={inputData} />
        </div>

        {/* Generate button */}
       
      </div>
       <div className="w-full text-center mt-6">
          <button
            className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
            onClick={() => {
              alert("PDF generation logic goes here!");
            }}
          >
            Generate PDF
          </button>
          </div>
    </div>
  );
}

export default GeneratePdf;
