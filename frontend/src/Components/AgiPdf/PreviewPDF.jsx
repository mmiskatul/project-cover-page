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

  return (
    <div
      id="cover-preview"
      className="gupter mx-auto bg-white text-black"
      style={{
        width: "794px", // A4 width
        minHeight: "1123px", // A4 height
        padding: "40px",
        boxSizing: "border-box",
        fontFamily: "Gupter, sans-serif",
      }}
    >
      {/* Header */}
      <div className="EB flex flex-col items-center w-full">
            <h1 className="w-full text-center border-b-2 border-black text-base font-bold mb-3 ">Department of Agricultural Science</h1>
        <img
          src={data.logo}
          alt="DIU Logo"
          style={{
            width: "240px",
            height: "auto",
            objectFit: "contain",
            marginBottom: "20px",
          }}
        />

        <h3 className="text-xl font-bold mb-2 text-center border-b-2">
          Assignment and Presentation
        </h3>

        {/* Course Info Table */}
        <table className="table-auto w-full font-bold border border-black border-collapse mt-10">
          <thead>
            <tr>
              <th className="border border-black px-4 py-2 text-left">
                Course Code: {data.courseId}
              </th>
              <th className="border border-black px-4 py-2 text-left">
                Course Title: {capitalizeEachWord(data.courseName)}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                colSpan="2"
                className="border border-black px-4 py-2 text-left"
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
        <table className="table-fixed w-full border border-black border-collapse text-sm mt-10">
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
            {[
              { sl: 1, criteria: "Idea with Focus (1)" },
              { sl: 2, criteria: "Organization (1)" },
              { sl: 3, criteria: "Content (2)" },
              { sl: 4, criteria: "Time Management (1)" },
            ].map((row) => (
              <tr key={row.sl}>
                <td className="border border-black px-2 py-1 text-center">
                  {row.sl}
                </td>
                <td className="border border-black px-2 py-1">
                  {row.criteria}
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
                <th
                colSpan="10"
                className="border border-black px-2 py-1 text-center bg-gray-200"
              >
                Presentation
              </th>
            </tr>
            {[
              { sl: 1, criteria: "Content and Design (2)" },
              { sl: 2, criteria: "Knowledge and Interaction (2)" },
              { sl: 3, criteria: "Body language and Attire (1)" },
              { sl: 4, criteria: "Fluency (2)" },
              { sl: 5, criteria: "Time Management (1)"}
            ].map((row) => (
              <tr key={row.sl}>
                <td className="border border-black px-2 py-1 text-center">
                  {row.sl}
                </td>
                <td className="border border-black px-2 py-1">
                  {row.criteria}
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
                className="border border-black px-2 py-3 text-left font-bold"
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
        <table className="table-auto w-full font-bold border border-black border-collapse mt-10">
          <thead>
            <tr>
              <th className="border border-black px-4 py-2 text-left">
                Semester:{" "}
                {capitalizeEachWord(data.semester?.split(" ")[0] || "")}
              </th>
              <th className="border border-black px-4 py-2 text-left">
                Year: {data.semester?.split(" ")[1] || new Date().getFullYear()}
              </th>
              <th className="border border-black px-4 py-2 text-left">
                Level-Term: {data.level}
              </th>
              <th className="border border-black px-4 py-2 text-left">
                Section: {capitalizeEachWord(data.section)}
              </th>
            </tr>
          </thead>
        </table>

        {/* Submission Info */}
        <table className="table-auto w-full font-bold border border-black border-collapse mt-10">
          <thead>
            <tr>
              <th className="border border-black px-4 py-2 text-left">
                Submitted by-
              </th>
              <th className="border border-black px-4 py-2 text-left">
                Submitted to-
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black px-4 py-2 text-left">
                <p>
                  <span className="font-bold">Name:</span>{" "}
                  {data.studentName === "" ? (
                    <Placeholder />
                  ) : (
                    capitalizeEachWord(data.studentName)
                  )}
                </p>
                <p>
                  <span className="font-bold">Student ID:</span>{" "}
                  {data.studentId === "" ? <Placeholder /> : data.studentId}
                </p>
              </td>
              <td className="border border-black px-4 py-2 text-left">
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
