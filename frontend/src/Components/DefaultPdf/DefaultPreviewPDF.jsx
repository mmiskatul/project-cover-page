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
    <span className="text-xl font-bold">....................................................</span>
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
    <div
      id="cover-preview"
      className="flex EB justify-center items-center w-full min-h-screen bg-gray-100"
    >
      <div
        className="relative bg-white text-black shadow border border-gray-400"
        style={{
          width: "794px", // A4 width
          height: "1123px", // A4 height
          padding: "50px 40px",
          boxSizing: "border-box",
          overflow: "hidden",
          fontFamily: "Gupter, sans-serif",
        }}
      >
        {/* ✅ Background Watermark */}
        <div
          className="absolute top-1/2 left-1/2 pointer-events-none mt-10 ml-"
          style={{
            transform: "translate(-50%, -50%)",
            backgroundImage: `url(${data.bglogo})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "contain",
            width: "370px",
            height: "440px",
            opacity: 0.13,
            zIndex: 0,
          }}
        ></div>

        {/* ✅ Foreground Content */}
        <div className="relative p-5 px-10 z-10 w-full h-full flex flex-col items-center">
          {/* Logo */}
          <img src={data.logo} alt="DIU Logo" style={{ width: "300px", marginTop: "10px" }} />

          {/* Report Title */}
          <h3 className="text-2xl font-bold underline mt-6 mb-8">
            {data.courseType === "theory"
              ? "ASSIGNMENT"
              : data.courseType === "lab"
              ? "LAB REPORT"
              : data.courseType === "project"
              ? "PROJECT REPORT"
              : "SELECT THE TYPE OF REPORT"}
          </h3>

          {/* Course Info */}
          <div className="w-full text-left text-[17px] font-medium space-y-2 mb-6">
            <p><span className="font-bold">Course Code:</span> {data.courseId ? capitalizeEachWord(data.courseId) : <Placeholder />}</p>
            <p><span className="font-bold">Course Title:</span> {data.courseName ? capitalizeEachWord(data.courseName) : <Placeholder />}</p>
            <p><span className="font-bold">Topic Name:</span> {data.topicname ? capitalizeEachWord(data.topicname) : <Placeholder />}</p>
          </div>

          {/* Submitted To */}
          <div className="w-full text-purple-900 text-left text-[18px] font-bold underline mb-2">Submitted To:</div>
          <div className="w-full pl-32 text-left text-[16px] font-medium space-y-1 mb-6">
            <p><span className="font-bold">Name:</span> {data.teacherName ? capitalizeEachWord(data.teacherName) : <Placeholder />}</p>
            <p><span className="font-bold">Designation:</span> {data.teacherDesignation ? capitalizeEachWord(data.teacherDesignation) : <Placeholder />}</p>
            <p><span className="font-bold">Department:</span> {data.department ? capitalizeEachWord(data.department) : <Placeholder />}</p>
            <p className="text-lg font-bold">Daffodil International University</p>
          </div>

          {/* Submitted By */}
          <div className="w-full text-purple-900 text-left text-[18px] font-bold underline mb-2">Submitted By:</div>
          <div className="w-full pl-32 text-left text-[16px] font-medium space-y-1 mb-6">
            <p><span className="font-bold">Name:</span> {data.studentName ? capitalizeEachWord(data.studentName) : <Placeholder />}</p>
            <p><span className="font-bold">ID:</span> {data.studentId ? data.studentId : <Placeholder />}</p>
            <p><span className="font-bold">Section:</span> {data.section ? capitalizeEachWord(data.section) : <Placeholder />}</p>
            <p><span className="font-bold">Semester:</span> {data.semester ? capitalizeEachWord(data.semester) : <Placeholder />}</p>
            <p><span className="font-bold">Department:</span> {data.department ? capitalizeEachWord(data.department) : <Placeholder />}</p>
            <p className="text-lg font-bold">Daffodil International University</p>
          </div>

          {/* Date */}
          <div className="w-full text-left text-purple-900 text-[16px] font-bold mt-20">
            <span className="underline text-lg">Submission Date:</span>{" "}
            {data.date ? data.date : <Placeholder />}
          </div>
        </div>
      </div>
    </div>
  );
}
