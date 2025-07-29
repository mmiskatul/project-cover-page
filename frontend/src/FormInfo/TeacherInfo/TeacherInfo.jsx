import { BsPersonFill } from 'react-icons/bs';
import { MdWork } from 'react-icons/md';

function TeacherInfo  ({ inputData, handleChange })  {
  return (
    <div>
      {/* Teacher Name */}
      <div>
        <label htmlFor="teacherName" className="font-medium">Teacher Name</label>
        <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-indigo-400 transition-all overflow-hidden">
          <BsPersonFill className="text-gray-500" />
          <input
            type="text"
            id="teacherName"
            name="teacherName"
            value={inputData.teacherName}
            onChange={handleChange}
            className="h-full px-2 w-full outline-none bg-transparent"
            placeholder="Enter teacher name"
            required
          />
        </div>
      </div>

      {/* Designation */}
      <div>
        <label htmlFor="designation" className="font-medium">Designation</label>
        <div className="flex items-center mt-2 mb-4 h-10 pl-3 pr-2 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-indigo-400 transition-all overflow-hidden">
          <MdWork className="text-gray-500" />
          <select
            id="designation"
            name="teacherDesignation"
            value={inputData.teacherDesignation}
            onChange={handleChange}
            className="h-full px-2 w-full outline-none bg-transparent"
            required
          >
            <option value="" disabled>Select designation</option>
            <option value="Professor & Head">Professor & Head</option>
            <option value="Professor">Professor</option>
            <option value="Associate Professor">Associate Professor</option>
            <option value="Assistant Professor">Assistant Professor</option>
            <option value="Senior Lecturer">Senior Lecturer</option>
            <option value="Lecturer">Lecturer</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TeacherInfo;
