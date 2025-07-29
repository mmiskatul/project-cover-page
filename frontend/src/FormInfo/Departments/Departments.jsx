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
            <option value="business_admin">Business Administration</option>
            <option value="management">Management</option>
            <option value="real_estate">Real Estate</option>
            <option value="tourism">Tourism & Hospitality Management</option>
            <option value="innovation">Innovation & Entrepreneurship</option>
            <option value="finance">Finance and Banking</option>
            <option value="accounting">Accounting</option>
            <option value="marketing">Marketing</option>
          </optgroup>

          <optgroup label="Faculty of Science and Information Technology (FSIT)">
            <option value="cse">Computer Science & Engineering (CSE)</option>
            <option value="cis">Computing & Information System (CIS)</option>
            <option value="swe">Software Engineering</option>
            <option value="env_sci">Environmental Science and Disaster Management</option>
            <option value="mct">Multimedia & Creative Technology (MCT)</option>
            <option value="itm">Information Technology and Management</option>
            <option value="pess">Physical Education & Sports Science (PESS)</option>
          </optgroup>

          <optgroup label="Faculty of Engineering (FE)">
            <option value="ice">Information and Communication Engineering</option>
            <option value="textile">Textile Engineering</option>
            <option value="eee">Electrical & Electronic Engineering (EEE)</option>
            <option value="architecture">Architecture</option>
            <option value="civil">Civil Engineering</option>
          </optgroup>

          <optgroup label="Faculty of Health and Life Sciences (FHLS)">
            <option value="pharmacy">Pharmacy</option>
            <option value="public_health">Public Health</option>
            <option value="nutrition">Nutrition & Food Engineering</option>
            <option value="ags">Agricultural Science (AGS)</option>
            <option value="genetics">Genetic Engineering and Biotechnology</option>
          </optgroup>

          <optgroup label="Faculty of Humanities and Social Sciences (FHSS)">
            <option value="english">English</option>
            <option value="law">Law</option>
            <option value="journalism">Journalism & Mass Communication</option>
            <option value="dev_studies">Development Studies</option>
            <option value="library_sci">Information Science and Library Management</option>
          </optgroup>
        </select>
      </div>
    </div>
  );
}

export default Departments;
