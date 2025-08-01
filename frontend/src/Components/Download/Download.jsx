import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useLocation } from "react-router-dom";
import BackButton from "../BackButton/BackButton";

// Toast notification for DOCX support
function notifyDocxComingSoon() {
  toast.info("📄 DOCX support is coming soon!", {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  });
}

function Download() {
  const { state } = useLocation();
  const { html, fileName } = state || {};

  const handleDownload = async (type) => {
  const endpoint =
    type === "pdf"
      ? "http://localhost:5000/generate-pdf"
      : "http://localhost:5000/generate-docx";

  // Show loading toast
  const loadingToastId = toast.loading(`Generating ${type.toUpperCase()} file...`, {
    position: "top-center",
  });

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ html }),
    });

    if (!res.ok) {
      throw new Error("Server error");
    }

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${fileName}.${type}`;
    link.click();

    // Update loading toast to success
    toast.update(loadingToastId, {
      render: `${type.toUpperCase()} downloaded successfully!`,
      type: "success",
      isLoading: false,
      autoClose: 3000,
    });
  } catch (err) {
    console.error(`${type.toUpperCase()} generation failed`, err);

    // Update loading toast to error
    toast.update(loadingToastId, {
      render: `❌ Failed to generate ${type.toUpperCase()}`,
      type: "error",
      isLoading: false,
      autoClose: 3000,
    });
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
      <h2 className="text-xl font-semibold my-5">Download Your File</h2>

      <div className="flex gap-4">
        <button
          onClick={() => handleDownload("pdf")}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition hover:scale-105 active:scale-95"
        >
          Download as PDF
        </button>

        <button
          onClick={notifyDocxComingSoon}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 hover:scale-105 transition active:scale-95"
        >
          Download as DOCX
        </button>
      </div>

      <div className="mt-6">
        <Link
          to="/merge"
          state={{ html, fileName }}
          className="px-6 py-3 bg-purple-600 text-white rounded hover:bg-purple-700 transition active:scale-95"
        >
          Download Merged File
        </Link>
      </div>

      {/* Toast container */}
      <ToastContainer />
    </div>
  );
}

export default Download;
