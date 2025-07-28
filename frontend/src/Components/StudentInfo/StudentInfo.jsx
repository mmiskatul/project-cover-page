import { FaIdCard } from "react-icons/fa";
import { BsPersonFill } from "react-icons/bs";

function StudentInfo({inputData, handleChange}) {
  return (
    <div>
      {/* Student Name */}
      <div>
        <label htmlFor="name" className="font-medium">Full Name</label>
        <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-indigo-400 transition-all overflow-hidden">
          <BsPersonFill className="text-gray-500" />
          <input
            type="text"
            id="name"
            name="studentName"
            value={inputData.studentName}
            onChange={handleChange}
            className="h-full px-2 w-full outline-none bg-transparent"
            placeholder="Enter your full name"
            required
          />
        </div>
      </div>

      {/* Student ID */}
      <div>
        <label htmlFor="studentId" className="font-medium">Student ID</label>
        <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-indigo-400 transition-all overflow-hidden">
          <FaIdCard className="text-gray-500" />
          <input
            type="text"
            id="studentId"
            name="studentId"
            value={inputData.studentId}
            onChange={handleChange}
            className="h-full px-2 w-full outline-none bg-transparent"
            placeholder="Enter your ID"
            required
          />
        </div>
      </div>
    </div>
  );
}

export default StudentInfo;
