import { FaGraduationCap } from "react-icons/fa";

export default function Level({ inputData, handleChange }) {
  return (
    <div>
      <label htmlFor="level" className="font-medium">Level-term</label>
      <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-indigo-400 transition-all overflow-hidden">
        <FaGraduationCap className="text-gray-500" />
        <input
          type="text"
          id="level"
          name="level"
          value={inputData.level}
          onChange={handleChange}
          className="h-full px-2 w-full outline-none bg-transparent"
          placeholder="Enter level-term"
          required
        />
      </div>
    </div>
  );
}
