import React from "react";
import { Link } from "react-router-dom";
import { FiFile, FiTrash2, FiDownload, FiSearch, FiX } from "react-icons/fi";
import { AiOutlineMergeCells, AiOutlineFilePdf } from "react-icons/ai";
import BackButton from "../../Components/BackButton/BackButton";

function HistoryPreview() {
  const [history, setHistory] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filteredHistory, setFilteredHistory] = React.useState([]);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [coverURL, setCoverURL] = React.useState(null);

  // Load history from localStorage
  React.useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("coverHistory") || "[]");
    setHistory(savedHistory);
    setFilteredHistory(savedHistory);
  }, []);

  // Generate preview URL when an item is selected
  React.useEffect(() => {
    if (selectedItem && selectedItem.html) {
      try {
        const blob = new Blob([selectedItem.html], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        setCoverURL(url);
      } catch (error) {
        console.error("Error generating preview:", error);
      }
    }
    return () => {
      if (coverURL) URL.revokeObjectURL(coverURL);
    };
  }, [selectedItem]);

  // Filter history
  React.useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredHistory(history);
    } else {
      const filtered = history.filter((item) =>
        (item.fileName || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      setFilteredHistory(filtered);
    }
  }, [searchTerm, history]);

  // Clear all history
  const clearHistory = () => {
    if (window.confirm("Are you sure you want to clear all history?")) {
      localStorage.removeItem("coverHistory");
      setHistory([]);
      setFilteredHistory([]);
      setSelectedItem(null);
    }
  };

  // Delete one item
  const deleteItem = (id) => {
    if (window.confirm("Delete this item?")) {
      const updatedHistory = history.filter((item) => item.id !== id);
      localStorage.setItem("coverHistory", JSON.stringify(updatedHistory));
      setHistory(updatedHistory);
      if (selectedItem && selectedItem.id === id) setSelectedItem(null);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <BackButton className="absolute left-4 top-4 text-gray-600 hover:text-gray-900" />

      {/* Main Box */}
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Your Cover Page History</h1>
          {history.length > 0 && (
            <button
              onClick={clearHistory}
              className="text-sm text-red-500 hover:text-red-700 flex items-center px-3 py-1 border border-red-200 rounded-md hover:bg-red-50"
            >
              <FiTrash2 className="mr-1" /> Clear All
            </button>
          )}
        </div>

        {/* Search */}
        {history.length > 0 && (
          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by filename..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {searchTerm && (
              <p className="text-sm text-gray-500 mt-2">
                Showing {filteredHistory.length} of {history.length} items
              </p>
            )}
          </div>
        )}

        {/* Empty state */}
        {filteredHistory.length === 0 ? (
          <div className="text-center py-12">
            {searchTerm ? (
              <>
                <FiSearch className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No matching results</h3>
                <p className="mt-1 text-sm text-gray-500">No cover pages found matching "{searchTerm}"</p>
                <button
                  onClick={() => setSearchTerm("")}
                  className="mt-4 text-sm text-blue-600 hover:text-blue-800"
                >
                  Clear search
                </button>
              </>
            ) : (
              <>
                <FiFile className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No history yet</h3>
                <p className="mt-1 text-sm text-gray-500">Your downloaded cover pages will appear here</p>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredHistory.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="flex justify-between items-center p-4">
                  <div
                    className="flex-1 min-w-0 cursor-pointer"
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className="flex items-center gap-2">
                      <FiFile className="text-blue-500" />
                      <h3 className="text-lg font-medium text-gray-900 truncate">
                        {item.fileName || "Untitled Document"}
                      </h3>
                      {item === selectedItem && (
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          Selected
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(item.timestamp).toLocaleString()}
                    </p>
                  </div>

                  {/* Row Actions */}
                  <div className="flex space-x-2 ml-4 flex-shrink-0">
                    <Link
                      to="/merge"
                      state={{ html: item.html, fileName: item.fileName }}
                      className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md"
                      title="Merge this cover"
                    >
                      <AiOutlineMergeCells />
                    </Link>
                    <Link
                      to="/download"
                      state={{ html: item.html, fileName: item.fileName }}
                      className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-md"
                      title="Download again"
                    >
                      <FiDownload />
                    </Link>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md"
                      title="Delete"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Preview */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <AiOutlineFilePdf className="text-red-500" />
                {selectedItem.fileName || "Untitled Document"}
              </h2>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            {/* Action Buttons at Top */}
            <div className="flex justify-end gap-3 px-6 py-4 border-b bg-gray-50 sticky top-[56px] z-10">
              <Link
                to="/merge"
                state={{ html: selectedItem.html, fileName: selectedItem.fileName }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
              >
                <AiOutlineMergeCells className="mr-2" /> Merge
              </Link>
              <Link
                to="/download"
                state={{ html: selectedItem.html, fileName: selectedItem.fileName }}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
              >
                <FiDownload className="mr-2" /> Download
              </Link>
              <button
                onClick={() => deleteItem(selectedItem.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
              >
                <FiTrash2 className="mr-2" /> Delete
              </button>
            </div>

            {/* Preview */}
            <div className="p-6">
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-100 p-2 text-center text-sm text-gray-600">Preview</div>
                {coverURL ? (
                  <iframe
                    src={coverURL}
                    width="100%"
                    height="600"
                    className="border-0"
                    title="Cover page preview"
                  />
                ) : (
                  <div className="flex items-center justify-center h-60 bg-gray-100 text-gray-500">
                    Loading preview...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HistoryPreview;
