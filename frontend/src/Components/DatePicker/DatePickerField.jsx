// components/DatePickerField.jsx
import { MdDateRange } from "react-icons/md";

function DatePickerField({ inputData, handleChange }) {
  

  return (
    <div>
      <label htmlFor="datepicker" className="font-medium">Select Date</label>
      <div className="flex items-center mt-2 mb-4 h-10 px-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-indigo-400 transition-all overflow-hidden bg-white">
        <MdDateRange className="text-gray-500 mr-2" />
        <input
          type="Date"
          id="datepicker"
          name="date"
          value={inputData.date}
          onChange={handleChange}
          className="w-full h-full bg-transparent outline-none"
          placeholder="Select Date"
        />
      </div>
    </div>
  );
}

export default DatePickerField;
