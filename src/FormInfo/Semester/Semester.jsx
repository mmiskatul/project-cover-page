import React from "react";
import { MdDateRange } from "react-icons/md"; // Icon for semester (calendar/date)

function Semester({ inputData, handleChange }) {
  const currentYear = new Date().getFullYear();

 

  return (
    <div>
      <label htmlFor="semester" className="font-medium">Semester</label>
      <div className="flex items-center mt-2 mb-4 h-10 pl-3 pr-2 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-indigo-400 transition-all overflow-hidden">
        <MdDateRange className="text-gray-500" />
        <select
          id="semester"
          name="semester"
          value={inputData.semester}
          onChange={handleChange}
          className="h-full px-2 w-full outline-none bg-transparent"
          required
        >
          <option value="">Select Semester</option>
          <option value={`Spring ${currentYear}`}>Spring {currentYear}</option>
          <option value={`Summer ${currentYear}`}>Summer {currentYear}</option>
          <option value={`Fall ${currentYear}`}>Fall {currentYear}</option>
        </select>
      </div>
    </div>
  );
}

export default Semester;
