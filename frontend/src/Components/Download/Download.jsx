import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useLocation } from "react-router-dom";
import BackButton from "../BackButton/BackButton";

function Download() {
  const { state } = useLocation();
  const { html, fileName } = state || {};

  const notifyDocxComingSoon = () => {
    toast.info("📄 DOCX support is coming soon!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  };

  const handleDownload = async (type) => {
    if (type === "docx") {
      notifyDocxComingSoon();
      return;
    }

    const loadingToastId = toast.loading(`Generating PDF file...`, {
      position: "top-center",
    });

    try {
      const res = await fetch("http://localhost:5000/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ html }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to generate PDF");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      // Create download link and trigger click
      const link = document.createElement("a");
      link.href = url;
      link.download = `${fileName || "document"}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Revoke the object URL to avoid memory leaks
      setTimeout(() => URL.revokeObjectURL(url), 100);

      toast.update(loadingToastId, {
        render: "✅ PDF downloaded successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (err) {
      console.error("PDF generation failed:", err);
      toast.update(loadingToastId, {
        render: `❌ ${err.message || "Failed to generate PDF"}`,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

 

  return (
    <div className="flex flex-col items-center gap-4 mt-20 px-4">
      <BackButton className="self-start" />
      
      <h2 className="text-4xl font-semibold my-6 text-center">
        Download Your File
      </h2>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 w-full max-w-md justify-center">
        <button
          onClick={() => handleDownload("pdf")}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all hover:scale-105 active:scale-95 shadow-md"
          aria-label="Download as PDF"
        >
          Download as PDF
        </button>

        <button
          onClick={() => handleDownload("docx")}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all hover:scale-105 active:scale-95 shadow-md"
          aria-label="Download as DOCX"
        >
          Download as DOCX
        </button>
      </div>

      <div className="mt-8 w-full max-w-md">
        <Link
          to="/merge"
          state={{ html, fileName }}
          className="block w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all active:scale-95 shadow-md text-center"
        >
          Merge Cover with File
        </Link>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default Download;