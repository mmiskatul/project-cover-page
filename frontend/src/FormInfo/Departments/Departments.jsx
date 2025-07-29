import { MdApartment } from 'react-icons/md';

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

          <optgroup label="Faculty of Business and Entrepreneurship (FBE)">
            <option value="Business Administration">BBA</option>
            <option value="Management">Management</option>
            <option value="Real Estate">Real Estate</option>
            <option value="Tourism & Hospitality Management">Tourism</option>
            <option value="Innovation & Entrepreneurship">Innovation</option>
            <option value="Finance and Banking">Finance</option>
            <option value="Accounting">Accounting</option>
            <option value="Marketing">Marketing</option>
          </optgroup>

          <optgroup label="Faculty of Science and Information Technology (FSIT)">
            <option value="Computer Science & Engineering">CSE</option>
            <option value="Computing & Information System">CIS</option>
            <option value="Software Engineering">SWE</option>
            <option value="Environmental Science and Disaster Management">ESDM</option>
            <option value="Multimedia & Creative Technology">MCT</option>
            <option value="Information Technology and Management">ITM</option>
            <option value="Physical Education & Sports Science">PESS</option>
          </optgroup>

          <optgroup label="Faculty of Engineering (FE)">
            <option value="Information and Communication Engineering">ICE</option>
            <option value="Textile Engineering">Textile</option>
            <option value="Electrical & Electronic Engineering">EEE</option>
            <option value="Architecture">Architecture</option>
            <option value="Civil Engineering">Civil</option>
          </optgroup>

          <optgroup label="Faculty of Health and Life Sciences (FHLS)">
            <option value="Pharmacy">Pharmacy</option>
            <option value="Public Health">Public Health</option>
            <option value="Nutrition & Food Engineering">NFE</option>
            <option value="Agricultural Science">AGRI</option>
            <option value="Genetic Engineering and Biotechnology">Genetics</option>
          </optgroup>

          <optgroup label="Faculty of Humanities and Social Sciences (FHSS)">
            <option value="English">English</option>
            <option value="Law">Law</option>
            <option value="Journalism & Mass Communication">Journalism</option>
            <option value="Development Studies">Development</option>
            <option value="Information Science and Library Management">ISLM</option>
          </optgroup>
        </select>
      </div>
    </div>
  );
}

export default Departments;
