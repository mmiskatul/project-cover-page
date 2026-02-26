import TeacherEvaluation from "./TeacherEvaluation";

// Capitalize first letter of each word
function capitalizeEachWord(str) {
  if (!str) return "";
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function Placeholder() {
  return (
    <span className="text-2xl font-bold">...............................</span>
  );
}

export default function PreviewPDF({ data }) {
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
      className="EB mx-auto bg-white text-black"
      style={{
        width: "794px", // A4 width in px at 96 DPI
        minHeight: "1123px", // A4 height in px at 96 DPI
        padding: "40px", // Inner padding
        boxSizing: "border-box",
        fontFamily: "Gupter, sans-serif",
      }}
    >
      {/* Header & Logo */}
      <div className="flex flex-col items-center w-full">

        <img
          src={data.logo}
          alt="DIU Logo"
          style={{
            width: "400px",
            height: "auto",
            objectFit: "contain",
            marginBottom: "20px",
          }}
        />

        <h3 className="text-3xl font-bold mb-6 text-center">
          {data.courseType === "theory"
            ? "Theory Assignment Report"
            : data.courseType === "lab assignment"
            ? "Lab Assignment Report"
            : data.courseType === "project"
            ? "Project Report"
            : data.courseType === "lab report"
            ? "Lab Report"   
            : data.courseType === "lab final" 
            ? "Lab Final"       
            : "Select the type of report"
            }
        </h3>

        {/* Mark Distribution Table */}
        <TeacherEvaluation data={data} />

        {/* Metadata Section */}
        <div className="w-full mt-6 space-y-3 text-left text-xl font-medium">
          <p>
            <span className="font-bold">Semester:</span>{" "}
            {data.semester === "" ? (
              <Placeholder />
            ) : (
              capitalizeEachWord(data.semester)
            )}
          </p>

          {/* Student name/id section OR Team Members section */}
          {data.courseType !== "project" || isSinglePersonProject ? (
            <>
              <p>
                <span className="font-bold">Student Name:</span>{" "}
                {isSinglePersonProject ? (
                  capitalizeEachWord(data.teamName[0].studentName)
                ) : data.studentName === "" ? (
                  <Placeholder />
                ) : (
                  capitalizeEachWord(data.studentName)
                )}
              </p>
              <p>
                <span className="font-bold">Student ID:</span>{" "}
                {isSinglePersonProject ? (
                  data.teamName[0].studentId
                ) : data.studentId === "" ? (
                  <Placeholder />
                ) : (
                  data.studentId
                )}
              </p>
            </>
          ) : (
            <div className="mt-4">
              <p className="font-bold text-center mb-2">Team Members</p>
              {data.teamName && data.teamName.length > 0 ? (
                <table className="w-full border-collapse border border-gray-400 mt-2">
                  <thead>
                    <tr className="">
                      <th className="w-1/2 border border-gray-400 px-3 py-1 text-center font-bold">Student ID</th>
                      <th className="w-1/2 border border-gray-400 px-3 py-1 text-center font-bold">Student Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.teamName.map((member, index) => (
                      <tr key={index}>
                        <td className="border border-gray-400 px-3 py-2">
                          {member.studentId || <Placeholder />}
                        </td>
                        <td className="border border-gray-400 px-3 py-2">
                          {member.studentName ? capitalizeEachWord(member.studentName) : <Placeholder />}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td className="border border-gray-400 px-3 py-2 font-bold text-left" colSpan={2}>Section: {`${data.batch}(${data.section})`}</td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-4">
                  <Placeholder />
                </div>
              )}
            </div>
          )}

          {(data.courseType !== "project"|| isSinglePersonProject) && <div className="flex flex-row gap-20">
            <p>
              <span className="font-bold">Batch:</span>{" "}
              {data.batch === "" ? (
                <Placeholder />
              ) : (
                capitalizeEachWord(data.batch)
              )}
            </p>
            <p>
              <span className="font-bold">Section:</span>{" "}
              {data.section === "" ? (
                <Placeholder />
              ) : (
                capitalizeEachWord(data.section)
              )}
            </p>
          </div>}

          <div className="flex flex-row justify-between gap-3 items-start">
             <p>
              <span className="font-bold">Course Name:</span>{" "}
              {data.courseName === "" ? (
                <Placeholder />
              ) : (
                capitalizeEachWord(data.courseName)
              )}
            </p>
            <p className="whitespace-nowrap flex items-center gap-1">
              <span className="font-bold">Course Code:</span>{" "}
              {data.courseId === "" ? <Placeholder /> : data.courseId}
            </p>
          </div>

          <p>
            <span className="font-bold">Teacher Name:</span>{" "}
            {data.teacherName === "" ? (
              <Placeholder />
            ) : (
              capitalizeEachWord(data.teacherName)
            )}
          </p>
          <p>
            <span className="font-bold">Designation:</span>{" "}
            {data.teacherDesignation === "" ? (
              <Placeholder />
            ) : (
              capitalizeEachWord(data.teacherDesignation)
            )}
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