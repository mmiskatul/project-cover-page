import { MdApartment } from 'react-icons/md'; // Department-like icon

function Departments({ inputData, handleChange }) {
  return (
    <div>
      <label htmlFor="department" className="font-medium">Department</label>
      <div className="flex items-center mt-2 mb-4 h-10 pl-3 pr-2 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-indigo-400 transition-all overflow-hidden">
        <MdApartment className="text-gray-500 text-xl" />
        <select
          id="department"
          name="department"
          value={inputData.department}
          onChange={handleChange}
          className="h-full px-2 w-full outline-none bg-transparent"
          required
        >
          <option value="" disabled>Select Department</option>
          <option value="cse">Computer Science & Engineering (CSE)</option>
          <option value="eee">Electrical & Electronic Engineering (EEE)</option>
          <option value="bba">Business Administration (BBA)</option>
          <option value="llb">Law (LLB)</option>
          <option value="eng">English</option>
        </select>
      </div>
    </div>
  );
}

export default Departments;
