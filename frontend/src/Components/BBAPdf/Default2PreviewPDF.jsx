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
      {capitalizeEachWord(value)}
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
      className="w-full EB flex justify-center items-center min-h-screen bg-gray-100"
    >
      {/* A4 Fixed Container */}
      <div
        className="relative bg-white shadow-md border border-gray-400"
        style={{
          width: "794px", // A4 width
          height: "1123px", // A4 height
          padding: "30px",
          boxSizing: "border-box",
          fontFamily: "Gupter, sans-serif",
        }}
      >
        {/* Content Wrapper */}
        <div className="relative z-10 w-full h-full flex flex-col items-center">
          {/* Logo */}
          <img src={data.logo} alt="DIU Logo" className="w-72 my-20" />

          {/* Report Header */}
          <div className="w-full text-center text-2xl font-bold mb-6 bg-blue-600">
            <div className="w-1/2  text-white py-3 px-6 text-lg font-semibold text-center ">
              {data.courseType
                ? capitalizeEachWord(data.courseType) + " Report"
                : "Report"}
            </div>
            <div className="w-1/2 text-white  px-6 text-lg font-semibold text-center"></div>
          </div>

          {/* Content Grid */}
          <div className="w-full flex flex-row gap-6">
            {/* Left Side */}
            <div className="w-1/2 px-4">
              <h1 className="text-center mt-8 text-lg font-bold underline mb-3">
                COURSE
              </h1>
              <div className="space-y-2 text-sm font-medium">
                <InfoRow label="Course Name" value={data.courseName} />
                <InfoRow label="Course Code" value={data.courseId} />
              </div>

              <h1 className="text-center text-lg font-bold underline mt-6 mb-3">
                TOPIC
              </h1>
              <p className="text-base font-medium text-center mb-10">
                {capitalizeEachWord(data.topicname)}
              </p>

              <h1 className="text-center text-lg font-bold underline mb-10 mt-5">
                Submitted To:
              </h1>
              <div className="ml-4 space-y-1 text-base font-medium">
                <InfoRow label="Name" value={data.teacherName} />
                <p className="text-base text-center font-bold mt-4">
                  Daffodil International University
                </p>
              </div>
            </div>
            {/* line */}
            <div
              className=" w-[2px] -mr-4 px-0.5 -mt-6 cal(h-full+mt-6) bg-[#9BBB58]/80 flex items-center justify-center"
             style={{ backgroundColor: "#9BBB58"}}
            />

            <div
              className="w-[2px] -mr-4 px-1 -mt-6   cal(h-full+mt-6)  bg-[#9BBB58]/80 flex items-center justify-center"
              style={{ backgroundColor: "#9BBB58"}}
            />

            {/* Right Side */}
            <div
              className="w-1/2   -mt-6 flex flex-col bg-[#9BBB58] p-4  border-[#9BBB58]"
              style={{
                backgroundColor: "#9BBB58",
                borderColor: "#9BBB58",
              }}
            >
              {/* Watermark */}
              <div>
                <img
                  src={data.bglogo}
                  alt="Background Logo"
                  className=" ml-7 mt-20 mb-20  w-54 opacity-15 "
                />
              </div>

              <div>
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
                <p className="text-base text-center font-semibold mt-6 mb-25">
                  <span className="underline">Submission Date:</span>{" "}
                  {capitalizeEachWord(data.date)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
