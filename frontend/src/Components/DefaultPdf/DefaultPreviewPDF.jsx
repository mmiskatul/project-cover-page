import logo from "../../assets/daffodil-international-university-seeklogo.png";
import bglogo from "../../assets/BgImage.png";

// Capitalize each word
function capitalizeEachWord(str) {
  if (!str) return "";
  return str
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Placeholder for empty fields
function Placeholder() {
  return (
    <span className="text-2xl font-bold">....................................................</span>
  );
}

export default function DefaultPreview({ data }) {
  if (!data)
    return (
      <h3 className="text-center text-lg font-semibold mt-5">
        No data submitted yet.
      </h3>
    );

  return (
    <div className="w-full flex justify-center items-center min-h-screen bg-gray-100">
      {/* Fixed-size container */}
      <div className="relative bg-white shadow-lg overflow-hidden border-2 border-gray-500">
        <div
        className="relative  bg-white shadow-lg overflow-hidden border-2 border-gray-500"
        style={{
          width: "794px", // A4 size width
          height: "1123px", // A4 size height
          padding: "60px",
          boxSizing: "border-box",
        }}
      >
        {/* ✅ Background Watermark */}
        <div
          className="absolute top-1/2 left-1/2 pointer-events-none"
          style={{
            transform: "translate(-50%, -50%)",
            backgroundImage: `url(${bglogo})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "contain",
            width: "400px",
            height: "500px",
            opacity: 0.13,
            zIndex: 0,
          }}
        ></div>

        {/* ✅ Foreground Content */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-start">
          <img src={logo} alt="DIU Logo" style={{ width: "400px", marginTop: "20px" }} />
          <h3 className="text-3xl font-bold underline mt-10">
            {data.courseType === "theory"
              ? "ASSIGNMENT"
              : data.courseType === "lab"
              ? "LAB REPORT"
              : data.courseType === "project"
              ? "Project Report"
              : "Select the type of report"}
          </h3>

          {/* Course Info */}
          <div className="w-full mt-10 ml-10 text-left text-xl font-medium space-y-2">
            <p><span className="font-bold">Course Code:</span> {data.courseId ? capitalizeEachWord(data.courseId) : <Placeholder />}</p>
            <p><span className="font-bold">Course Title:</span> {data.courseName ? capitalizeEachWord(data.courseName) : <Placeholder />}</p>
            <p><span className="font-bold">Topic Name:</span> {data.topicname ? capitalizeEachWord(data.topicname) : <Placeholder />}</p>
          </div>

          {/* Submitted To */}
          <div className="w-full text-purple-950 mt-10 text-left text-2xl font-bold underline">Submitted To:</div>
          <div className="w-full ml-60 text-left text-xl font-medium space-y-1 mt-2">
            <p><span className="font-bold">Name:</span> {data.teacherName ? capitalizeEachWord(data.teacherName) : <Placeholder />}</p>
            <p><span className="font-bold">Designation:</span> {data.teacherDesignation ? capitalizeEachWord(data.teacherDesignation) : <Placeholder />}</p>
            <p><span className="font-bold">Department:</span> {data.department ? capitalizeEachWord(data.department) : <Placeholder />}</p>
            <p className="text-2xl font-bold">Daffodil International University</p>
          </div>

          {/* Submitted By */}
          <div className="w-full text-purple-950 mt-8 text-left text-2xl font-bold underline">Submitted By:</div>
          <div className="w-full text-left ml-60 text-xl font-medium space-y-1 mt-2">
            <p><span className="font-bold">Name:</span> {data.studentName ? capitalizeEachWord(data.studentName) : <Placeholder />}</p>
            <p><span className="font-bold">ID:</span> {data.studentId ? capitalizeEachWord(data.studentId) : <Placeholder />}</p>
            <p><span className="font-bold">Section:</span> {data.section ? capitalizeEachWord(data.section) : <Placeholder />}</p>
            <p><span className="font-bold">Semester:</span> {data.semester ? capitalizeEachWord(data.semester) : <Placeholder />}</p>
            <p><span className="font-bold">Department:</span> {data.department ? capitalizeEachWord(data.department) : <Placeholder />}</p>
            <p className="text-2xl font-bold">Daffodil International University</p>
          </div>

          {/* Submission Date */}
          <div className="w-full text-purple-950 mt-10 text-left text-xl font-bold">
            <span className="underline text-2xl">Submission Date:</span>{" "}
            {data.date ? capitalizeEachWord(data.date) : <Placeholder />}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
