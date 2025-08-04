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
    <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
      ...............................
    </span>
  );
}

export default function PreviewPDF({ data }) {
  if (!data)
    return (
      <h3 style={{ textAlign: "center", fontSize: "1.125rem", fontWeight: "600", marginTop: "1.25rem" }}>
        No data submitted yet.
      </h3>
    );

  return (
    <div
      id="cover-preview"
      style={{
        fontFamily: "Gupter, sans-serif",
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: "white",
        color: "black",
        width: "794px", // A4 width
        minHeight: "1123px", // A4 height
        padding: "40px",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
        <img
          src={data.bglogo}
          alt="DIU Logo"
          style={{
            width: "120px",
            height: "auto",
            objectFit: "contain",
            marginBottom: "4px",
          }}
        />

        <h3 style={{ fontSize: "2.8125rem", color: "rgb(107 114 128)", fontWeight: "700", marginBottom: "1.5rem", textAlign: "center" }}>
          Daffodil International University
        </h3>
        
        {/* Course Name and Course code */}
        <h1 style={{ fontSize: "1.875rem", fontWeight: "700", wordWrap: "break-word", textAlign: "center" }}>
          {capitalizeEachWord(data.courseName)} <span style={{ fontSize: "1.5625rem" }}>({data.courseId})</span>
        </h1>

        {/* Topic of the assignment Title */}
        <h3 style={{ fontSize: "1.25rem", fontWeight: "500", textAlign: "center", marginTop: "3.25rem" }}>Title of the Assignment</h3>
        <h1 style={{ fontSize: "1.5rem", fontWeight: "600", wordWrap: "break-word", textAlign: "center" }}>
          {capitalizeEachWord(data.topicname)}
        </h1>
        
        {/* Submitted by */}
        <h3 style={{ marginTop: "4.5rem", fontSize: "1.25rem", fontWeight: "400" }}>Submitted by–</h3>
        <h5 style={{ fontSize: "1.125rem", fontWeight: "700" }}>Name: {data.studentName}</h5>
        <h5 style={{ fontSize: "1.125rem", fontWeight: "600" }}>ID No: {data.studentId}</h5>
        <h5 style={{ fontSize: "1.125rem", fontWeight: "600" }}>Section: {data.batch}({data.section})</h5>
        
        {/* Submitted to */}
        <h3 style={{ fontSize: "1.25rem", fontWeight: "500", textAlign: "center", marginTop: "3.25rem" }}>Submitted to –</h3>
        <h5 style={{ fontSize: "1.125rem", fontWeight: "700" }}>{data.teacherName}</h5>
        <h5 style={{ fontSize: "1.125rem", fontWeight: "600" }}>ID: {data.courseTeacherId}</h5>
        <h2 style={{ fontSize: "1.125rem", fontWeight: "600" }}>{data.teacherDesignation} , {data.department}</h2>
        <h2 style={{ marginBottom: "2rem", fontSize: "1.25rem" }}>Daffodil International University</h2>

        {/* Date */}
        <h1 style={{ marginBottom: "2rem", fontSize: "1.25rem" }}>{data.date}</h1>

        {/* Rubric Table */}
        <div style={{ overflowX: "auto" }}>
          <h1 style={{ fontSize: "1.25rem", fontWeight: "700" }}>Assignment Rubric:</h1>
          <table style={{ minWidth: "100%", border: "2px solid black", borderCollapse: "collapse" }}>
            <thead style={{ backgroundColor: "rgb(243 244 246)" }}>
              <tr>
                <th style={{ padding: "0.5rem 1rem", textAlign: "left", fontSize: "0.875rem", fontWeight: "700", color: "black", border: "2px solid black" }}>
                  Content & Information (2)
                </th>
                <th style={{ padding: "0.5rem 1rem", textAlign: "left", fontSize: "0.875rem", fontWeight: "700", color: "black", border: "2px solid black" }}>
                  Language & Grammar (2)
                </th>
                <th style={{ padding: "0.5rem 1rem", textAlign: "left", fontSize: "0.875rem", fontWeight: "700", color: "black", border: "2px solid black" }}>
                  Organization (1)
                </th>
                <th style={{ padding: "0.5rem 1rem", textAlign: "left", fontSize: "0.875rem", fontWeight: "700", color: "black", border: "2px solid black" }}>
                  Total (5)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ height: "3.25rem", padding: "0.5rem 1rem", fontSize: "0.875rem", fontWeight: "700", border: "2px solid black" }}></td>
                <td style={{ height: "3.25rem", padding: "0.5rem 1rem", fontSize: "0.875rem", fontWeight: "700", border: "2px solid black" }}></td>
                <td style={{ height: "3.25rem", padding: "0.5rem 1rem", fontSize: "0.875rem", fontWeight: "700", border: "2px solid black" }}></td>
                <td style={{ height: "3.25rem", padding: "0.5rem 1rem", fontSize: "0.875rem", fontWeight: "700", border: "2px solid black" }}></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}