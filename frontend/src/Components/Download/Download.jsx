import React from "react";
import { useLocation } from "react-router-dom";
import BackButton from "../BackButton/BackButton";

function Download() {
  const { state } = useLocation();
  const { html, fileName } = state || {};

  const handleDownload = async (type) => {
    const endpoint =
      type === "pdf"
        ? "http://localhost:5000/generate-pdf"
        : "http://localhost:5000/generate-docx"; // if you add DOCX support later

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ html }),
      });

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${fileName}.${type}`;
      link.click();
    } catch (err) {
      console.error(`${type.toUpperCase()} generation failed`, err);
      alert(`Failed to generate ${type.toUpperCase()}`);
    }
  };

  if (!html || !fileName) {
    return (
      <div className="mt-32 text-center text-red-600 font-semibold">
        Invalid data. Please go back and try again.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 mt-32">
      <BackButton />
      <h2 className="text-xl font-semibold">Download Your File</h2>
      <div className="flex gap-4">
        <button
          onClick={() => handleDownload("pdf")}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition active:scale-95"
        >
          Download as PDF
        </button>
        <button
          onClick={() => handleDownload("docx")}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition active:scale-95"
        >
          Download as DOCX
        </button>
      </div>
    </div>
  );
}

export default Download;
