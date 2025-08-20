import { MdMenuBook } from 'react-icons/md'; 

function CourseType({inputData,handleChange}) {
  return (
    <div>
      <label htmlFor="courseType" className="font-medium">Course Type</label>
      <div className="flex items-center mt-2 mb-4 h-10 pl-3 pr-2 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-indigo-400 transition-all overflow-hidden">
        <MdMenuBook className="text-gray-500" />
        <select
          id="courseType"
          name="courseType"
          value={inputData.courseType}
          onChange={handleChange}
          placeholder="Select course type"
          className="h-full px-2 w-full outline-none bg-transparent"
          required
        >
          <option value="" disabled>Select course type</option>
          <option value="theory">Theory</option>
          <option value="lab assignment">Lab Assignment</option>
          <option value="project">Project</option>
          <option value="lab report">lab Report</option>
          <option value="lab final">Lab final </option>

        </select>
      </div>
    </div>
  );
}

export default CourseType;
