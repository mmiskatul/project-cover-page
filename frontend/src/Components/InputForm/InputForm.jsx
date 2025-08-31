import { useEffect } from "react";
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

function InputForm({ inputData, setInputData }) {
  const url = window.location.href;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTeamChange = (index, field, value) => {
    const updatedTeam = [...inputData.teamName];
    updatedTeam[index] = { ...updatedTeam[index], [field]: value };
    setInputData((prev) => ({ ...prev, teamName: updatedTeam }));
  };

  const addTeamMember = () => {
    setInputData((prev) => ({
      ...prev,
      teamName: [...prev.teamName, { studentId: "", studentName: "" }]
    }));
  };

  const removeTeamMember = (index) => {
    if (inputData.teamName.length <= 1) return;
    const updatedTeam = inputData.teamName.filter((_, i) => i !== index);
    setInputData((prev) => ({ ...prev, teamName: updatedTeam }));
  };

  // Initialize teamName if empty
  useEffect(() => {
    if (!inputData.teamName || inputData.teamName.length === 0) {
      setInputData((prev) => ({
        ...prev,
        teamName: [{ studentId: "", studentName: "" }]
      }));
    }
  }, [inputData.teamName, setInputData]);

  return (
    <form className="flex flex-col items-center text-sm text-slate-800">
      <h1 className="text-xl font-bold mb-4">Fill up the form</h1>

      <div className="max-w-96 w-full px-4 space-y-4">
        {/* Course Type */}
        {(!url.includes("eng") || !url.includes("txt")) && (
          <CourseType inputData={inputData} handleChange={handleChange} />
        )}

        {/* Semester */}
        {!url.includes("eng") && (
          <Semester inputData={inputData} handleChange={handleChange} />
        )}

        {/* Departments */}
        {(url.includes("default") || url.includes("bba") || url.includes("eng")) && (
          <Departments inputData={inputData} handleChange={handleChange} />
        )}

        {/* Topic Name */}
        {(url.includes("default") ||
          url.includes("bba") ||
          url.includes("nfe") ||
          url.includes("agri") ||
          url.includes("eng") ||
          url.includes("txt")) && <TopicName inputData={inputData} handleChange={handleChange} />}

        {/* Level */}
        {(url.includes("nfe") || url.includes("txt")) && <Level inputData={inputData} handleChange={handleChange} />}

        {/* Student Info / Team Members */}
        {inputData.courseType === "project" ? (
          <div className="space-y-3">
            <h2 className="font-semibold text-lg">Team Members</h2>
            {inputData.teamName?.map((member, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input
                  type="text"
                  placeholder="Student ID"
                  value={member.studentId}
                  onChange={(e) => handleTeamChange(index, "studentId", e.target.value)}
                  className="border p-2 rounded flex-1 text-sm"
                />
                <input
                  type="text"
                  placeholder="Student Name"
                  value={member.studentName}
                  onChange={(e) => handleTeamChange(index, "studentName", e.target.value)}
                  className="border p-2 rounded flex-1 text-sm"
                />
                {inputData.teamName.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTeamMember(index)}
                    className="px-2 py-1 bg-red-500 text-white rounded text-sm"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addTeamMember}
              className="px-3 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
            >
              + Add Member
            </button>
          </div>
        ) : (
          <StudentInfo inputData={inputData} handleChange={handleChange} />
        )}

        {/* Batch and Section */}
        <Batch_section inputData={inputData} handleChange={handleChange} />

        {/* Course Name */}
        <Course inputData={inputData} handleChange={handleChange} />

        {/* Teacher Info */}
        <TeacherInfo inputData={inputData} handleChange={handleChange} />

        {/* Date Picker */}
        <DatePickerField inputData={inputData} handleChange={handleChange} />
      </div>
    </form>
  );
}

export default InputForm;