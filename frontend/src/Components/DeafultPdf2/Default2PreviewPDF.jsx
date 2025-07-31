// Capitalize each word
function capitalizeEachWord(str) {
  if (!str) return "";
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Info Row Component
function InfoRow({ label, value }) {
  return (
    <p className="text-base text-left">
      <span className="font-semibold">{label}:</span>{" "}
      {value ? capitalizeEachWord(value) : "........................"}
    </p>
  );
}

export default function Default2PreviewPDF({ data }) {
  if (!data) {
    return (
      <h3 className="text-center text-base font-semibold mt-5">
        No data submitted yet.
      </h3>
    );
  }

  return (
    <div
      id="cover-preview"
      className="w-full flex justify-center items-center min-h-screen bg-gray-100"
    >
      {/* A4 Fixed Container */}
      <div
        className="relative bg-white shadow-md border border-gray-400"
        style={{
          width: "794px", // A4 width
          height: "1123px", // A4 height
          padding: "30px",
          boxSizing: "border-box",
        }}
      >
        {/* Content Wrapper */}
        <div className="relative z-10 w-full h-full flex flex-col items-center">
          {/* Logo */}
          <img src={data.logo} alt="DIU Logo" className="w-72 my-10" />

          {/* Report Header */}
          <div className="w-full bg-blue-600 text-white py-2 px-6 text-lg font-semibold text-center mb-6">
            {data.courseType
              ? capitalizeEachWord(data.courseType) + " Report"
              : "Report"}
          </div>

          {/* Content Grid */}
          <div className="w-full flex flex-col lg:flex-row gap-6">
            {/* Left Side */}
            <div className="w-full lg:w-1/2 px-4">
              <h1 className="text-center text-lg font-bold underline mb-3">
                COURSE
              </h1>
              <div className="space-y-2 text-sm font-medium">
                <InfoRow label="Course Name" value={data.courseName} />
                <InfoRow label="Course Code" value={data.courseId} />
              </div>

              <h1 className="text-center text-lg font-bold underline mt-6 mb-3">
                TOPIC
              </h1>
              <p className="text-base font-medium text-center mb-6">
                {data.topicname ? capitalizeEachWord(data.topicname) : ".................................."}
              </p>

              <h1 className="text-center text-lg font-bold underline mb-2">
                Submitted To:
              </h1>
              <div className="ml-4 space-y-1 text-base font-medium">
                <InfoRow label="Name" value={data.teacherName} />
                <p className="text-base text-center font-bold">
                  Daffodil International University
                </p>
              </div>
            </div>

            {/* Right Side */}
            <div className="w-full lg:w-1/2 relative bg-lime-300/30 p-4 border border-lime-400">
              {/* Watermark */}
              <img
                src={data.bglogo}
                alt="Background Logo"
                className="absolute top-1/2 left-1/2 w-52 opacity-10 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              />

              {/* Student Info */}
              <h1 className="text-center text-lg font-bold underline mb-4">
                Submitted By:
              </h1>
              <div className="space-y-2 text-base font-medium z-10 relative">
                <InfoRow label="Name" value={data.studentName} />
                <InfoRow label="ID" value={data.studentId} />
                <InfoRow label="Section" value={data.section} />
                <InfoRow label="Department" value={data.department} />
                <p className="text-center font-bold">
                  Daffodil International University
                </p>
              </div>

              {/* Submission Date */}
              <p className="text-base text-center font-semibold mt-6">
                <span className="underline">Submission Date:</span>{" "}
                {data.date ? capitalizeEachWord(data.date) : "........................"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
