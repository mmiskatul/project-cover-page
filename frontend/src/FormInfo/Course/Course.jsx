import React from 'react';
import { FaIdCard } from 'react-icons/fa';
import { MdLibraryBooks } from 'react-icons/md';

function Course ({inputData, handleChange})  {
  return (
    <div>
      {/* Course Name */}
      <div>
        <label htmlFor="courseName" className="font-medium">Course Name</label>
        <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-indigo-400 transition-all overflow-hidden">
          <MdLibraryBooks className="text-gray-500" />
          <input
            type="text"
            id="courseName"
            name="courseName"
            value={inputData.courseName}
            onChange={handleChange}
            className="h-full px-2 w-full outline-none bg-transparent"
            placeholder="Enter course name"
            required
          />
        </div>
      </div>

      {/* Course ID */}
      <div>
        <label htmlFor="courseId" className="font-medium">Course ID</label>
        <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-indigo-400 transition-all overflow-hidden">
          <FaIdCard className="text-gray-500" />
          <input
            type="text"
            id="courseId"
            name="courseId"
            value={inputData.courseId}
            onChange={handleChange}
            className="h-full px-2 w-full outline-none bg-transparent"
            placeholder="Enter course ID"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default Course;
