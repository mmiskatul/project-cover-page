import React from "react";
import { Link } from "react-router-dom";
import { FiFile, FiTrash2, FiDownload, FiGitMerge } from "react-icons/fi";
import BackButton from "../../Components/BackButton/BackButton";


function HistoryPreview() {
  const [history, setHistory] = React.useState([]);

  React.useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('coverHistory') || '[]');
    setHistory(savedHistory);
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('coverHistory');
    setHistory([]);
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

        {history.length === 0 ? (
          <div className="text-center py-12">
            <FiFile className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No history yet</h3>
            <p className="mt-1 text-sm text-gray-500">
              Your downloaded cover pages will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {history.map((item) => (
              <div key={item.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="truncate">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {item.fileName || "Untitled Document"}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {new Date(item.timestamp).toLocaleString()}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Link
                    to="/merge"
                    state={{ html: item.html, fileName: item.fileName }}
                    className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md"
                    title="Merge this cover"
                  >
                    <FiGitMerge />
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