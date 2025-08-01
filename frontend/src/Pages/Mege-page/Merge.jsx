import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Merge() {
  const { state } = useLocation();
  const { html, fileName } = state || {};

  const [coverBlob, setCoverBlob] = useState(null);
  const [coverURL, setCoverURL] = useState(null);

  const [uploadFile, setUploadFile] = useState(null);
  const [uploadFileURL, setUploadFileURL] = useState(null);

  useEffect(() => {
    const generateCover = async () => {
      if (!html) return;

      toast.info("Generating cover PDF...", { autoClose: 2000 });

      try {
        const res = await fetch("http://localhost:5000/generate-pdf", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ html }),
        });

        if (!res.ok) throw new Error("Cover generation failed");

        const blob = await res.blob();
        const url = URL.createObjectURL(blob);

        setCoverBlob(blob);
        setCoverURL(url);

        toast.success("✅ Cover PDF ready!", { autoClose: 2000 });
      } catch (error) {
        console.error(error)
        toast.error("❌ Failed to generate cover PDF");
      }
    };

    generateCover();
  }, [html]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setUploadFile(file);
      setUploadFileURL(URL.createObjectURL(file));
    } else {
      toast.error("Please upload a valid PDF file.");
    }
  };

  const handleMerge = async () => {
    if (!coverBlob || !uploadFile) {
      toast.error("Both cover and uploaded PDF are required.");
      return;
    }

    const formData = new FormData();
    formData.append("cover", coverBlob, "cover.pdf");
    formData.append("file", uploadFile);

    const toastId = toast.loading("Merging PDFs...");

    try {
      const res = await fetch("http://localhost:5000/merge-auto", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Merge failed");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${fileName || "merged"}_merged.pdf`;
      link.click();

      toast.update(toastId, {
        render: "✅ Merge successful!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (err) {
      console.error(err);
      toast.update(toastId, {
        render: "❌ Merge failed",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="flex flex-col items-center mt-10 gap-6 px-4">
      <h2 className="text-3xl font-bold mb-4">Merge Cover with Uploaded PDF</h2>

      {/* Preview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {coverURL && (
          <div className="w-full max-w-[400px] bg-white rounded-lg shadow p-4 border border-gray-300">
            <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">
              📄 Generated Cover Preview
            </h3>
            <object
              data={coverURL}
              type="application/pdf"
              width="100%"
              height="300px"
              className="border rounded"
            >
              <p>Your browser does not support preview. <a href={coverURL}>Download PDF</a></p>
            </object>
          </div>
        )}

        {uploadFileURL && (
          <div className="w-full max-w-[400px] bg-white rounded-lg shadow p-4 border border-gray-300">
            <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">
              📎 Uploaded File Preview
            </h3>
            <object
              data={uploadFileURL}
              type="application/pdf"
              width="100%"
              height="300px"
              className="border rounded"
            >
              <p>Your browser does not support preview. <a href={uploadFileURL}>Download PDF</a></p>
            </object>
          </div>
        )}
      </div>

      {/* File Upload Input */}
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="mt-4 border p-2 rounded w-full max-w-md"
      />

      {/* Merge Button */}
      <button
        onClick={handleMerge}
        className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
      >
        Merge and Download
      </button>

      <ToastContainer />
    </div>
  );
}

export default Merge;
