import Batch_section from "../Batch_Section/Batch_section";
import Course from "../Course/Course";
import CourseType from "../CourseType/CourseType";
import DatePickerField from "../DatePicker/DatePickerField";
import Semester from "../Semester/Semester";
import StudentInfo from "../StudentInfo/StudentInfo";
import TeacherInfo from "../TeacherInfo/TeacherInfo";

function InputForm ({ inputData, setInputData }) {
    const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData(prev => ({ ...prev, [name]: value }));
     };
  return (
    <form className="flex flex-col items-center text-sm text-slate-800">
      {/* Headding of the Inpute filed for generate Cover Page */}
      <h1 className="text-xl font-bold">Fill up the form</h1>

      <div className="max-w-96 w-full px-4">
        {/* Semester SELECTION */}
        <CourseType inputData={inputData} handleChange={handleChange} />
        <Semester inputData={inputData} handleChange={handleChange} />
        <StudentInfo inputData={inputData} handleChange={handleChange} />
        {/* Batch and Section */}
        <Batch_section inputData={inputData} handleChange={handleChange} />
        {/* Course Name */}
        <Course inputData={inputData} handleChange={handleChange} />
        {/* Teacher Info */}
        <TeacherInfo inputData={inputData} handleChange={handleChange}  />
        {/* Date Picker */}
        <DatePickerField inputData={inputData} handleChange={handleChange} />
      </div>
    </form>
  );
};
export default InputForm;
