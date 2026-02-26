import React from "react";

// Capitalize first letter of each word
function capitalizeEachWord(str) {
  if (!str) return "";
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Placeholder component
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
        width: "794px", // A4 width
        minHeight: "1123px", // A4 height
        padding: "40px",
        boxSizing: "border-box",
        fontFamily: "Gupter, sans-serif",
      }}
    >
      {/* Header */}
      <div className="flex flex-col items-center w-full">
      <h1 className="w-full text-center border-b-2 border-black text-base font-bold mb-3 ">Department of Nutrition and Food Engineering</h1>

        <img
          src={data.logo}
          alt="DIU Logo"
          style={{
            width: "300px",
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
            : data.courseType === "lab report"
            ? "Lab Report"
            : data.courseType === "lab final"
            ? "Lab Final Report"
            : data.courseType === "project"
            ? "Project Report"
            : "Select the type of report"}
        </h3>

        {/* Course Info Table */}
        <table className="table-auto w-full font-bold border border-black border-collapse mt-10">
          <thead>
            <tr>
              <th className="border border-black px-4 py-1 text-left">
                Course Code: {data.courseId}
              </th>
              <th className="border border-black px-4 py-1 text-left">
                Course Title: {capitalizeEachWord(data.courseName)}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                colSpan="2"
                className="border border-black px-4 py-1 text-left"
              >
                Title/Topic:{" "}
                {data.topicname === "" ? (
                  <Placeholder />
                ) : (
                  capitalizeEachWord(data.topicname)
                )}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Evaluation Table */}
        <table className="table-fixed w-full border border-black border-collapse text-sm mt-5">
          <thead>
            <tr>
              <th
                rowSpan="2"
                className="border border-black px-2 py-1 text-center w-10"
              >
                SL
              </th>
              <th
                rowSpan="2"
                className="border border-black px-2 py-1 text-center w-64"
              >
                Evaluation criteria with marks
              </th>
              <th
                colSpan="5"
                className="border border-black px-2 py-1 text-center"
              >
                Put Tick (✓) Mark
              </th>
              <th
                rowSpan="2"
                className="border border-black px-2 py-1 text-center w-24"
              >
                Mark Obtained
              </th>
              <th
                rowSpan="2"
                colSpan="2"
                className="border border-black px-2 py-1 text-center w-40"
              >
                Remarks
              </th>
            </tr>
            <tr>
              {["Excellent", "Good", "Fair", "Poor", "Fail"].map((label) => (
                <th
                  key={label}
                  className="border border-black px-1 py-1 text-center whitespace-nowrap text-xs"
                  style={{
                    writingMode: "vertical-rl",
                    textOrientation: "mixed",
                    transform: "rotate(180deg)",
                  }}
                >
                  {label}
                </th>
              ))}
            </tr>
            <tr>
              <th
                colSpan="10"
                className="border border-black px-2 py-1 text-center bg-gray-200"
              >
                Assignment
              </th>
            </tr>
          </thead>
          <tbody>
            {data.evaluationTitles?.map((criteria, index) => (
              <tr key={index}>
                <td className="border border-black px-2 py-1 text-center">
                  {index + 1}
                </td>
                <td className="border border-black px-2 py-1">
                  {criteria}
                </td>
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <td
                      key={i}
                      className="border border-black px-2 py-1 text-center"
                    ></td>
                  ))}
                <td className="border border-black px-2 py-1 text-center"></td>
                <td
                  colSpan="2"
                  className="border border-black px-2 py-1 text-center"
                ></td>
              </tr>
            ))}
            <tr>
              <td className="border border-black px-2 py-1 text-center"></td>
              <td
                colSpan="6"
                className="border border-black px-2 py-1 text-right font-semibold"
              >
                Total
              </td>
              <td className="border border-black px-2 py-1 text-center"></td>
              <td
                colSpan="2"
                className="border border-black px-2 py-1 text-center"
              ></td>
            </tr>
            <tr>
              <td colSpan="8" className="border border-black px-2 py-1">
                <span className="font-bold">Date of Submission:</span>{" "}
                {data.date === "" ? <Placeholder /> : data.date}
              </td>
              <td
                colSpan="2"
                className="border border-black px-2 py-6 text-left font-bold"
              >
                <br />
                <span>.........................</span>
                <br />
                <span>..............</span>
                <br />
                Teacher <br />
                Signature
              </td>
            </tr>
          </tbody>
        </table>

        {/* Semester Info */}
        <table className="table-auto w-full font-bold border border-black border-collapse mt-5">
          <thead>
            <tr>
              <th className="border border-black px-4 py-1 text-left">
                Semester:{" "}
                {capitalizeEachWord(data.semester?.split(" ")[0] || "")}
              </th>
              <th className="border border-black px-4 py-1 text-left">
                Year: {data.semester?.split(" ")[1] || new Date().getFullYear()}
              </th>
              <th className="border border-black px-4 py-1 text-left">
                Level-Term: {data.level}
              </th>
              <th className="border border-black px-4 py-1 text-left">
                Section: {capitalizeEachWord(data.section)}
              </th>
            </tr>
          </thead>
        </table>

        {/* Submission Info */}
        <table className="table-auto w-full font-bold border border-black border-collapse mt-5">
          <thead>
            <tr>
              <th className="border border-black px-4 py-1 text-left">
                Submitted by-
              </th>
              <th className="border border-black px-4 py-1 text-left">
                Submitted to-
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black px-4 py-1 text-left">
                {data.courseType === "project" && !isSinglePersonProject ? (
                  // Team Members Section
                  <div>
                    <p className="font-bold mb-2">Team Members:</p>
                    {data.teamName && data.teamName.length > 0 ? (
                      <div className="space-y-1">
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
                  </div>
                ) : (
                  // Individual Student Section
                  <div>
                    <p>
                      <span className="font-bold">Name:</span>{" "}
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
                  </div>
                )}
              </td>
              <td className="border border-black px-4 py-1 text-left">
                <p>
                  <span className="font-bold">Name:</span>{" "}
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
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}