import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";

function Merge() {
  const { state } = useLocation();
  const { html, fileName } = state || {};

  const [coverBlob, setCoverBlob] = useState(null);
  const [coverURL, setCoverURL] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isMerging, setIsMerging] = useState(false);

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
        console.error(error);
        toast.error("❌ Failed to generate cover PDF");
      }
    };

    generateCover();

    // Clean up object URLs when component unmounts
    return () => {
      if (coverURL) URL.revokeObjectURL(coverURL);
      uploadedFiles.forEach(file => {
        if (file.previewURL) URL.revokeObjectURL(file.previewURL);
      });
    };
  }, [html]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => file.type === "application/pdf");
    
    if (validFiles.length === 0) {
      toast.error("Please upload PDF files only");
      return;
    }

    if (validFiles.length !== files.length) {
      toast.warning("Some files were not PDFs and were ignored");
    }

    const newFiles = validFiles.map(file => ({
      file,
      previewURL: URL.createObjectURL(file),
      name: file.name,
      id: Date.now() + Math.random().toString(36).substr(2, 9)
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (id) => {
    setUploadedFiles(prev => {
      const fileToRemove = prev.find(f => f.id === id);
      if (fileToRemove && fileToRemove.previewURL) {
        URL.revokeObjectURL(fileToRemove.previewURL);
      }
      return prev.filter(f => f.id !== id);
    });
  };

  const handleMerge = async () => {
    if (!coverBlob || uploadedFiles.length === 0) {
      toast.error("Cover and at least one PDF file are required");
      return;
    }

    setIsMerging(true);
    const toastId = toast.loading("Merging PDFs...");

    try {
      const formData = new FormData();
      formData.append("cover", coverBlob, "cover.pdf");
      uploadedFiles.forEach(file => {
        formData.append("files", file.file);
      });

      const res = await fetch("http://localhost:5000/merge-auto", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Merge failed");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${fileName || "merged"}_merged.pdf`;
      link.click();

      // Clean up the URL after download
      setTimeout(() => URL.revokeObjectURL(url), 100);

      toast.update(toastId, {
        render: "✅ Merge successful!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (err) {
      console.error(err);
      toast.update(toastId, {
        render: `❌ ${err.message}`,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setIsMerging(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-10 gap-6 px-4">
      <h2 className="text-3xl font-bold mb-4">Merge Cover with PDF Files</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl">
        {/* Cover Preview */}
        <div className="w-full bg-white rounded-lg shadow p-4 border border-gray-300">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">
            📄 Generated Cover Preview
          </h3>
          {coverURL ? (
            <object
              data={coverURL}
              type="application/pdf"
              width="100%"
              height="400px"
              className="border rounded"
            >
              <p>Your browser does not support PDF preview. <a href={coverURL}>Download PDF</a></p>
            </object>
          ) : (
            <div className="flex items-center justify-center h-40 bg-gray-100 rounded">
              <p className="text-gray-500">Cover generating...</p>
            </div>
          )}
        </div>

        {/* Uploaded Files Section */}
        <div className="w-full bg-white rounded-lg shadow p-4 border border-gray-300">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
            📎 Uploaded Files ({uploadedFiles.length})
          </h3>
          
          {/* Files List with Previews */}
          <div className="space-y-4 max-h-[500px] overflow-y-auto">
            {uploadedFiles.length > 0 ? (
              uploadedFiles.map((file) => (
                <div key={file.id} className="border rounded-lg overflow-hidden">
                  <div className="flex justify-between items-center bg-gray-100 p-2">
                    <span className="text-sm font-medium truncate">{file.name}</span>
                    <button
                      onClick={() => removeFile(file.id)}
                      className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100"
                      disabled={isMerging}
                    >
                      <AiOutlineClose size={16} />
                    </button>
                  </div>
                  <div className="p-2">
                    <object
                      data={file.previewURL}
                      type="application/pdf"
                      width="100%"
                      height="300px"
                      className="border rounded"
                    >
                      <p>Preview not available. <a href={file.previewURL}>Download</a></p>
                    </object>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-40 bg-gray-100 rounded">
                <p className="text-gray-500 mb-2">No files uploaded yet</p>
                <label
                  htmlFor="file-upload"
                  className="inline-flex items-center gap-1 px-3 py-1 bg-gray-200 text-gray-800 border border-gray-300 rounded hover:bg-gray-300 cursor-pointer text-sm"
                >
                  <AiOutlinePlus size={14} />
                  Upload PDFs
                </label>
              </div>
            )}
          </div>

          {/* Upload Button (when files exist) */}
          {uploadedFiles.length > 0 && (
            <label
              htmlFor="file-upload"
              className="inline-flex items-center gap-2 px-4 py-2 mt-4 w-full justify-center bg-gray-100 text-gray-800 border border-gray-300 rounded hover:bg-gray-200 cursor-pointer transition"
            >
              <AiOutlinePlus size={18} />
              Add More PDFs
            </label>
          )}
        </div>
      </div>

      <input
        id="file-upload"
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="hidden"
        multiple
      />

      <button
        onClick={handleMerge}
        disabled={!coverBlob || uploadedFiles.length === 0 || isMerging}
        className={`px-6 py-3 rounded-lg transition ${
          coverBlob && uploadedFiles.length > 0 && !isMerging
            ? "bg-purple-600 text-white hover:bg-purple-700"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        } font-medium`}
      >
        {isMerging ? "Merging..." : "Merge and Download"}
      </button>

      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}

export default Merge;