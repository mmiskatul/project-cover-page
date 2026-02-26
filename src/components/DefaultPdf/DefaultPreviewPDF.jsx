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

  // Check if project is done by only one person
  const isSinglePersonProject = data.courseType === "project" && 
                               data.teamName && 
                               data.teamName.length === 1 && 
                               data.teamName[0].studentName && 
                               data.teamName[0].studentId;

  return (
    <div
      id="cover-preview"
      className="flex  justify-center items-center w-full min-h-screen bg-gray-100"
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
              : data.courseType === "lab report"  
              ? "LAB REPORT"
              : data.courseType === "lab assignment"
              ? "LAB REPORT"
              : data.courseType === "lab final"
              ? "LAB FINAL "
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
          
          {data.courseType === "project" && !isSinglePersonProject ? (
            // Team Members Section - For projects with multiple people
            <div className="w-full pl-32 text-left text-[16px] font-medium space-y-1 mb-6">
              <div className="mb-2">
                <span className="font-bold">Team Members:</span>
              </div>
              
              {data.teamName && data.teamName.length > 0 ? (
                <div className="space-y-2">
                  {data.teamName.map((member, index) => (
                    <p key={index}>
                      {member.studentName && member.studentId ? (
                        <span>
                          {capitalizeEachWord(member.studentName)} ({member.studentId})
                        </span>
                      ) : member.studentName ? (
                        <span>{capitalizeEachWord(member.studentName)}</span>
                      ) : member.studentId ? (
                        <span>({member.studentId})</span>
                      ) : (
                        <Placeholder />
                      )}
                    </p>
                  ))}
                </div>
              ) : (
                <Placeholder />
              )}
              
              <div className="mt-4 space-y-1">
                <p><span className="font-bold">Section:</span> {data.section ? capitalizeEachWord(data.section) : <Placeholder />}</p>
                <p><span className="font-bold">Semester:</span> {data.semester ? capitalizeEachWord(data.semester) : <Placeholder />}</p>
                <p><span className="font-bold">Department:</span> {data.department ? capitalizeEachWord(data.department) : <Placeholder />}</p>
                <p className="text-lg font-bold">Daffodil International University</p>
              </div>
            </div>
          ) : (
            // Individual Student Section - For non-projects OR single-person projects
            <div className="w-full pl-32 text-left text-[16px] font-medium space-y-1 mb-6">
              <p>
                <span className="font-bold">Name:</span>{" "}
                {isSinglePersonProject 
                  ? capitalizeEachWord(data.teamName[0].studentName) 
                  : data.studentName 
                    ? capitalizeEachWord(data.studentName) 
                    : <Placeholder />
                }
              </p>
              <p>
                <span className="font-bold">ID:</span>{" "}
                {isSinglePersonProject 
                  ? data.teamName[0].studentId 
                  : data.studentId 
                    ? data.studentId 
                    : <Placeholder />
                }
              </p>
              <p><span className="font-bold">Section:</span> {data.section ? capitalizeEachWord(data.section) : <Placeholder />}</p>
              <p><span className="font-bold">Semester:</span> {data.semester ? capitalizeEachWord(data.semester) : <Placeholder />}</p>
              <p><span className="font-bold">Department:</span> {data.department ? capitalizeEachWord(data.department) : <Placeholder />}</p>
              <p className="text-lg font-bold">Daffodil International University</p>
            </div>
          )}

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