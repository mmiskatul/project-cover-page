import React from "react";
import { Link } from "react-router-dom";
import { FiFile, FiTrash2, FiDownload, FiSearch } from "react-icons/fi";
import { AiOutlineMergeCells } from "react-icons/ai";
import BackButton from "../../Components/BackButton/BackButton";

function HistoryPreview() {
  const [history, setHistory] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filteredHistory, setFilteredHistory] = React.useState([]);

  React.useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('coverHistory') || '[]');
    setHistory(savedHistory);
    setFilteredHistory(savedHistory);
  }, []);

  // Filter history based on search term
  React.useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredHistory(history);
    } else {
      const filtered = history.filter(item => {
        const fileName = item.fileName || "";
        const courseName = item.courseName || "";
        const courseId = item.courseId || "";
        const topicName = item.topicname || "";
        
        return fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
               courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
               courseId.toLowerCase().includes(searchTerm.toLowerCase()) ||
               topicName.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setFilteredHistory(filtered);
    }
  }, [searchTerm, history]);

  const clearHistory = () => {
    localStorage.removeItem('coverHistory');
    setHistory([]);
    setFilteredHistory([]);
  };

  const deleteItem = (id) => {
    const updatedHistory = history.filter(item => item.id !== id);
    localStorage.setItem('coverHistory', JSON.stringify(updatedHistory));
    setHistory(updatedHistory);
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <BackButton className="absolute left-4 top-4 text-gray-600 hover:text-gray-900" />
      
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Your Cover Page History</h1>
          {history.length > 0 && (
            <button
              onClick={clearHistory}
              className="text-sm text-red-500 hover:text-red-700 flex items-center"
            >
              <FiTrash2 className="mr-1" /> Clear All
            </button>
          )}
        </div>

        {/* Search Bar */}
        {history.length > 0 && (
          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by subject, course code, topic, or filename..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {searchTerm && (
              <p className="text-sm text-gray-500 mt-2">
                Showing {filteredHistory.length} of {history.length} items
              </p>
            )}
          </div>
        )}

        {filteredHistory.length === 0 ? (
          <div className="text-center py-12">
            {searchTerm ? (
              <>
                <FiSearch className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No matching results</h3>
                <p className="mt-1 text-sm text-gray-500">
                  No cover pages found matching "{searchTerm}"
                </p>
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
                <p className="mt-1 text-sm text-gray-500">
                  Your downloaded cover pages will appear here
                </p>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredHistory.map((item) => (
              <div key={item.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {item.fileName || "Untitled Document"}
                  </h3>
                  <div className="text-xs text-gray-500 space-y-1 mt-1">
                    <p>{new Date(item.timestamp).toLocaleString()}</p>
                    {item.courseName && (
                      <p className="truncate">Course: {item.courseName}</p>
                    )}
                    {item.courseId && (
                      <p>Code: {item.courseId}</p>
                    )}
                    {item.topicname && (
                      <p className="truncate">Topic: {item.topicname}</p>
                    )}
                  </div>
                </div>
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HistoryPreview;