import logo from "../../assets/daffodil-international-university-seeklogo.png";
import TeacherEvaluation from "./TeacherEvaluation";

// Capitalize first letter of each word
function capitalizeEachWord(str) {
  if (!str) return "";
  return str
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function Placeholder() {
  return <span className="text-2xl font-bold">..................................</span>;
}

export default function PreviewPDF({ data }) {
  if (!data)
    return (
      <h3 className="text-center text-lg font-semibold mt-5">
        No data submitted yet.
      </h3>
    );

  return (
    <div className="flex flex-col items-center w-full p-4 mt-3 bg-white rounded">
      {/* Header & Logo */}
      <div className="flex flex-col items-center w-full max-w-4xl">
        <img src={logo} alt="DIU Logo" className="w-80 mb-4" />
        <h3 className="text-3xl font-bold mb-6">
          {data.courseType === "theory"
            ? "Theory Assignment Report"
            : data.courseType === "lab"
            ? "Lab Assignment Report"
            : data.courseType === "project"
            ? "Project Report"
            : ""}
        </h3>

        {/* Mark Distribution Table */}
        <TeacherEvaluation data={data} />

        {/* Metadata Section */}
        <div className="w-full px-4 mt-6 space-y-3 text-left text-xl font-medium">
          <p>
            <span className="font-bold">Semester:</span>{" "}
            {data.semester === "" ? <Placeholder /> : capitalizeEachWord(data.semester)}
          </p>
          <p>
            <span className="font-bold">Student Name:</span>{" "}
            {data.studentName === "" ? <Placeholder /> : capitalizeEachWord(data.studentName)}
          </p>
          <p>
            <span className="font-bold">Student ID:</span>{" "}
            {data.studentId === "" ? <Placeholder /> : data.studentId}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>
              <span className="font-bold">Batch:</span>{" "}
              {data.batch === "" ? <Placeholder /> : capitalizeEachWord(data.batch)}
            </p>
            <p>
              <span className="font-bold">Section:</span>{" "}
              {data.section === "" ? <Placeholder /> : capitalizeEachWord(data.section)}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p>
              <span className="font-bold">Course Code:</span>{" "}
              {data.courseId === "" ? <Placeholder /> : data.courseId}
            </p>
            <p>
              <span className="font-bold">Course Name:</span>{" "}
              {data.courseName === "" ? <Placeholder /> : capitalizeEachWord(data.courseName)}
            </p>
          </div>

          <p>
            <span className="font-bold">Teacher Name:</span>{" "}
            {data.teacherName === "" ? <Placeholder /> : capitalizeEachWord(data.teacherName)}
          </p>
          <p>
            <span className="font-bold">Designation:</span>{" "}
            {data.teacherDesignation === "" ? <Placeholder /> : capitalizeEachWord(data.teacherDesignation)}
          </p>
          <p>
            <span className="font-bold">Date:</span>{" "}
            {data.date === "" ? <Placeholder /> : data.date}
          </p>
        </div>
      </div>
    </div>
  );
}
