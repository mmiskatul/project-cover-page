import { MdOutlineGroups } from "react-icons/md";      // Batch icon
import { PiNotebookFill } from "react-icons/pi";      // Section icon
function Batch_section({ inputData, handleChange  }) {
  return (
    <div>
       {/* Batch */}
      <div>
        <label htmlFor="batch" className="font-medium">Batch</label>
        <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-indigo-400 transition-all overflow-hidden">
          <MdOutlineGroups className="text-gray-500" />
          <input
            type="text"
            id="batch"
            name="batch"
            value={inputData.batch}
            onChange={handleChange}
            className="h-full px-2 w-full outline-none bg-transparent"
            placeholder="Enter your Batch"
            required
          />
        </div>
      </div>

      {/* Section */}
      <div>
        <label htmlFor="section" className="font-medium">Section</label>
        <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-indigo-400 transition-all overflow-hidden">
          <PiNotebookFill className="text-gray-500" />
          <input
            type="text"
            id="section"
            name="section"
            value={inputData.section}
            onChange={handleChange}
            className="h-full px-2 w-full outline-none bg-transparent"
            placeholder="Enter your Section"
            required
          />
        </div>
      </div>
    </div>
  )
}

export default Batch_section
