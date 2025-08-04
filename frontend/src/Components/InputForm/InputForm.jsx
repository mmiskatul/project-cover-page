import Batch_section from "../../FormInfo/Batch_Section/Batch_section";
import Course from "../../FormInfo/Course/Course";
import CourseType from "../../FormInfo/CourseType/CourseType";
import DatePickerField from "../../FormInfo/DatePicker/DatePickerField";
import Departments from "../../FormInfo/Departments/Departments";
import Level from "../../FormInfo/level-term/Level-term";
import Semester from "../../FormInfo/Semester/Semester";
import StudentInfo from "../../FormInfo/StudentInfo/StudentInfo";
import TeacherInfo from "../../FormInfo/TeacherInfo/TeacherInfo";
import TopicName from "../../FormInfo/TopicName/TopicName";

function InputForm ({ inputData, setInputData }) {
    const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData(prev => ({ ...prev, [name]: value }));
     };
     const url = window.location.href;
  return (
    <form className="flex flex-col items-center text-sm text-slate-800">
      {/* Headding of the Inpute filed for generate Cover Page */}
      <h1 className="text-xl font-bold">Fill up the form</h1>

      <div className="max-w-96 w-full px-4">
        {/* Semester SELECTION */}
        { !url.includes("eng") &&
        <CourseType inputData={inputData} handleChange={handleChange} />

        }
        { !url.includes("eng") &&
        <Semester inputData={inputData} handleChange={handleChange} />

        }
        <Semester inputData={inputData} handleChange={handleChange} />
        
        {
         (url.includes("default") || url.includes("bba") ||url.includes('eng')) && (
            <Departments inputData={inputData} handleChange={handleChange} />
          )
        }{
          (url.includes("default") || url.includes("bba") || url.includes("nfe") || url.includes('agri')|| url.includes('eng'))&& (
            <TopicName inputData={inputData} handleChange={handleChange} />
          )
        }
        {
          url.includes("nfe") && (
           <Level inputData={inputData} handleChange={handleChange}/>
          )
        }
        
        <StudentInfo inputData={inputData} handleChange={handleChange} />
        {/* Batch and Section */}
        <Batch_section inputData={inputData} handleChange={handleChange} />
        {/* Course Name */}
        <Course inputData={inputData} handleChange={handleChange} />
        {/* Course teacher ID */}
      
        {/* Teacher Info */}
        <TeacherInfo inputData={inputData} handleChange={handleChange}  />
        {/* Date Picker */}
        <DatePickerField inputData={inputData} handleChange={handleChange} />
      </div>
    </form>
  );
};
export default InputForm;
