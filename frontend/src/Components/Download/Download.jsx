import React from "react";

function Download({ html, fileName }) {
  const handleDownload = async (type) => {
    const endpoint =
      type === "pdf"
        ? "http://localhost:5000/generate-pdf"
        : "http://localhost:5000/generate-docx";

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
    return <p className="text-red-500 text-center">Missing file data</p>;
  }

  return (
    <div className="flex flex-col items-center gap-4 mt-10">
      <h2 className="text-xl font-semibold">Download Your File</h2>
      <div className="flex gap-4">
        <button
          onClick={() => handleDownload("pdf")}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Download as PDF
        </button>
        <button
          onClick={() => handleDownload("docx")}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Download as DOCX
        </button>
      </div>
    </div>
  );
}

export default Download;
