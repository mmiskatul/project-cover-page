import React, { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AiOutlinePlus,
  AiOutlineClose,
  AiOutlineFilePdf,
  AiOutlineCloudUpload,
} from "react-icons/ai";
import { FiUpload, FiDownload } from "react-icons/fi";
import urlbackend from "../../config/url";

function Merge() {
  const { state } = useLocation();
  const { html, fileName } = state || {};

  const [coverBlob, setCoverBlob] = useState(null);
  const [coverURL, setCoverURL] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isMerging, setIsMerging] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [showDropZone, setShowDropZone] = useState(false);

  // Generate cover PDF
  useEffect(() => {
    const generateCover = async () => {
      if (!html) return;

      const toastId = toast.loading(
        <div className="flex items-center">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
          </svg>
          <span>Preparing your cover...</span>
        </div>,
        { position: "bottom-right" }
      );

      try {
        const res = await fetch(`${urlbackend}/generate-pdf`, {
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

        setCoverBlob(blob);
        setCoverURL(url);

        toast.update(toastId, {
          render: (
            <div className="flex items-center">
              {/* <svg
                className="w-5 h-5 mr-2 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg> */}
              <span>Cover PDF ready!</span>
            </div>
          ),
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      } catch (error) {
        console.error(error);
        toast.update(toastId, {
          render: (
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <span>Failed to generate cover</span>
            </div>
          ),
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    };

    generateCover();

    return () => {
      if (coverURL) URL.revokeObjectURL(coverURL);
      uploadedFiles.forEach((file) => {
        if (file.previewURL) URL.revokeObjectURL(file.previewURL);
      });
    };
  }, [html]);

  // Handle file processing
  const processFiles = useCallback((files) => {
    const validFiles = Array.from(files).filter(
      (file) => file.type === "application/pdf"
    );

    if (validFiles.length === 0) {
      toast.error("Please upload PDF files only");
      return;
    }

    if (validFiles.length !== files.length) {
      toast.warning("Some files were not PDFs and were ignored");
    }

    const newFiles = validFiles.map((file) => ({
      file,
      previewURL: URL.createObjectURL(file),
      name: file.name,
      id: Date.now() + Math.random().toString(36).substr(2, 9),
    }));

    setUploadedFiles((prev) => [...prev, ...newFiles]);
    setShowDropZone(false);
  }, []);

  // Handle file input change
  const handleFileChange = (e) => {
    processFiles(e.target.files);
    e.target.value = "";
  };

  // Global drag event handlers
  useEffect(() => {
    const handleGlobalDragEnter = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
        setIsDragging(true);
        setShowDropZone(true);
      }
    };

    const handleGlobalDragOver = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleGlobalDragLeave = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!e.relatedTarget || e.relatedTarget.nodeName === "HTML") {
        setIsDragging(false);
        setShowDropZone(false);
      }
    };

    const handleGlobalDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      setShowDropZone(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        processFiles(e.dataTransfer.files);
        e.dataTransfer.clearData();
      }
    };

    document.addEventListener("dragenter", handleGlobalDragEnter);
    document.addEventListener("dragover", handleGlobalDragOver);
    document.addEventListener("dragleave", handleGlobalDragLeave);
    document.addEventListener("drop", handleGlobalDrop);

    return () => {
      document.removeEventListener("dragenter", handleGlobalDragEnter);
      document.removeEventListener("dragover", handleGlobalDragOver);
      document.removeEventListener("dragleave", handleGlobalDragLeave);
      document.removeEventListener("drop", handleGlobalDrop);
    };
  }, [processFiles]);

  // Remove file
  const removeFile = (id) => {
    setUploadedFiles((prev) => {
      const fileToRemove = prev.find((f) => f.id === id);
      if (fileToRemove && fileToRemove.previewURL) {
        URL.revokeObjectURL(fileToRemove.previewURL);
      }
      return prev.filter((f) => f.id !== id);
    });
  };

  // Merge files
  const handleMerge = async () => {
    if (!coverBlob || uploadedFiles.length === 0) {
      toast.error("Please add both a cover and at least one PDF file");
      return;
    }

    setIsMerging(true);
    const toastId = toast.loading(
      <div className="flex items-center">
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500"
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
        <span>Merging documents...</span>
      </div>,
      { position: "bottom-right" }
    );

    try {
      const formData = new FormData();
      formData.append("cover", coverBlob, "cover.pdf");
      uploadedFiles.forEach((file) => {
        formData.append("files", file.file);
      });

      const res = await fetch(`${urlbackend}/merge-auto`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Merge failed");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${fileName || "merged"}_merged.pdf`;
      link.click();

      setTimeout(() => URL.revokeObjectURL(url), 100);

      toast.update(toastId, {
        render: (
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-2 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>Merge successful! Download started</span>
          </div>
        ),
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (err) {
      console.error(err);
      toast.update(toastId, {
        render: (
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-2 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <span>{err.message}</span>
          </div>
        ),
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setIsMerging(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Global Drop Zone Overlay */}
      {showDropZone && (
        <div className="fixed inset-0 bg-blue-500 bg-opacity-20 z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-xl shadow-2xl border-4 border-dashed border-blue-500 text-center max-w-md">
            <AiOutlineCloudUpload className="text-blue-500 text-5xl mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Drop to Upload
            </h3>
            <p className="text-gray-600">
              Release your PDF files to add them to the merge queue
            </p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Merge Documents
          </h1>
          <p className="text-lg text-gray-600">
            Drag and drop PDF files anywhere on the page to add them
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Cover Preview Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <AiOutlineFilePdf className="text-red-500" />
                Cover Page
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Your generated cover page
              </p>
            </div>
            <div className="p-4">
              {coverURL ? (
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <object
                    data={coverURL}
                    type="application/pdf"
                    width="100%"
                    height="400px"
                    className="block"
                    aria-label="Cover page preview"
                  >
                    <div className="flex items-center justify-center h-40 bg-gray-100 text-gray-500">
                      Preview not available
                    </div>
                  </object>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-40 bg-gray-100 rounded-lg">
                  <svg
                    className="animate-spin h-8 w-8 text-gray-400 mb-2"
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
                  <p className="text-gray-500">Generating cover...</p>
                </div>
              )}
            </div>
          </div>

          {/* Upload Section Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <FiUpload className="text-blue-500" />
                Uploaded PDFs ({uploadedFiles.length})
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Drag files anywhere on the page or use the button below
              </p>
            </div>
            <div className="p-4">
              {/* Upload Button */}
              <div className="mb-6 text-center">
                <label
                  htmlFor="file-upload"
                  className="inline-flex items-center gap-2 px-4 py-3 bg-blue-50 text-blue-700 rounded-lg cursor-pointer transition-colors hover:bg-blue-100 border border-blue-200"
                >
                  <AiOutlinePlus size={16} />
                  Select PDF Files
                </label>
                <p className="text-sm text-gray-500 mt-2">
                  or drag and drop files anywhere on the page
                </p>
              </div>

              {/* Files List */}
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {uploadedFiles.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <AiOutlineCloudUpload className="text-3xl mx-auto mb-2 text-gray-400" />
                    <p>No files uploaded yet</p>
                  </div>
                ) : (
                  uploadedFiles.map((file) => (
                    <div
                      key={file.id}
                      className="border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <div className="flex justify-between items-center bg-gray-50 p-3">
                        <div className="flex items-center gap-2 truncate">
                          <AiOutlineFilePdf className="flex-shrink-0 text-red-500" />
                          <span className="text-sm font-medium truncate">
                            {file.name}
                          </span>
                        </div>
                        <button
                          onClick={() => removeFile(file.id)}
                          className="text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-gray-100 transition-colors"
                          disabled={isMerging}
                          aria-label={`Remove ${file.name}`}
                        >
                          <AiOutlineClose size={16} />
                        </button>
                      </div>
                      <div className="p-2">
                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                          <object
                            data={file.previewURL}
                            type="application/pdf"
                            width="100%"
                            height="300px"
                            className="block"
                            aria-label={`Preview of ${file.name}`}
                          >
                            <div className="flex items-center justify-center h-40 bg-gray-100 text-gray-500 text-sm">
                              Preview not available
                            </div>
                          </object>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Merge Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleMerge}
            disabled={!coverBlob || uploadedFiles.length === 0 || isMerging}
            className={`inline-flex items-center gap-2 px-8 py-3 rounded-lg font-medium transition-all ${
              coverBlob && uploadedFiles.length > 0 && !isMerging
                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isMerging ? (
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
                <span>Merging...</span>
              </>
            ) : (
              <>
                <FiDownload size={18} />
                <span>Merge and Download</span>
              </>
            )}
          </button>
        </div>

        <input
          id="file-upload"
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
          multiple
        />
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        toastClassName="shadow-lg"
      />
    </div>
  );
}

export default Merge;