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

  return (
    <div
      id="cover-preview"
      className="Doc mx-auto bg-white text-black"
      style={{
        width: "794px", // A4 width in px at 96 DPI
        minHeight: "1123px", // A4 height in px at 96 DPI
        padding: "40px", // Inner padding
        boxSizing: "border-box",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Header & Logo */}
      <div className="flex flex-col items-center w-full">
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

        <h3 className="text-3xl font-bold mb-6 text-center">
          {data.courseType === "theory"
            ? "Theory Assignment Report"
            : data.courseType === "lab"
            ? "Lab Assignment Report"
            : data.courseType === "project"
            ? "Project Report"
            : "Select the type of report"}
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
          <p>
            <span className="font-bold">Student Name:</span>{" "}
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

          <div className="flex flex-row jsutify-around gap-4">
            <p>
              <span className="font-bold ">Batch:</span>
              {data.batch === "" ? (
                <Placeholder />
              ) : (
                capitalizeEachWord(data.batch)
              )}
            </p>
            <p>
              <span className="font-bold">Section:</span>
              {data.section === "" ? (
                <Placeholder />
              ) : (
                capitalizeEachWord(data.section)
              )}
            </p>
          </div>

          <div className="flex flex-row justify-around gap-4 items-start">
            <p className="whitespace-nowrap flex items-center gap-1">
              <span className="font-bold">Course Code:</span>
              {data.courseId === "" ? <Placeholder /> : data.courseId}
            </p>

            <p>
              <span className="font-bold">Course Name:</span>{" "}
              {data.courseName === "" ? (
                <Placeholder />
              ) : (
                capitalizeEachWord(data.courseName)
              )}
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
