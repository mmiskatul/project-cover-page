import React, { useEffect, useState } from "react";
import iconPng from "../../assets/tourisomlogo.png";

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
    <span style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#ccc" }}>
      ........................
    </span>
  );
}

// Convert image to Base64
function getBase64Image(imgSrc) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = imgSrc;
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };
  });
}

export default function PreviewPDF({ data }) {
  const [iconBase64, setIconBase64] = useState(null);

  useEffect(() => {
    getBase64Image(iconPng).then(setIconBase64);
  }, []);

  // Check if project is done by only one person
  const isSinglePersonProject = data.courseType === "project" && 
                               data.teamName && 
                               data.teamName.length === 1 && 
                               data.teamName[0].studentName && 
                               data.teamName[0].studentId;

  if (!data)
    return (
      <h3
        style={{
          textAlign: "center",
          fontSize: "1.125rem",
          fontWeight: "600",
          marginTop: "1.25rem",
          color: "#666",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        No data submitted yet.
      </h3>
    );

  return (
    <div
      id="cover-preview"
      style={{
        fontFamily: "'Gupter', 'Times New Roman', serif",
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: "white",
        color: "#333",
        width: "794px",
        minHeight: "1123px",
        padding: "60px 50px",
        boxSizing: "border-box",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        border: "1px solid #e0e0e0",
        lineHeight: "1.6",
        position: "relative",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <img
          src={data.logo}
          alt="DIU Logo"
          style={{
            width: "300px",
            height: "auto",
            objectFit: "contain",
            marginBottom: "15px",
            marginTop: "10px",
            filter: "contrast(1.1)",
          }}
        />

        {/* Report Title */}
        <h3
          style={{
            fontSize: "26px",
            fontWeight: "bold",
            textDecoration: "underline",
            textUnderlineOffset: "6px",
            marginTop: "30px",
            marginBottom: "20px",
            color: "#1a3a6c",
            letterSpacing: "1px",
          }}
        >
          {data.courseType === "theory"
            ? "ASSIGNMENT"
            : data.courseType === "lab report"
            ? "LAB REPORT"
            : data.courseType === "lab assignment"
            ? "LAB REPORT"
            : data.courseType === "lab final"
            ? "LAB FINAL"
            : data.courseType === "project"
            ? "PROJECT REPORT"
            : "SELECT THE TYPE OF REPORT"}
        </h3>

        {/* Topic of the assignment */}
        <div style={{ textAlign: "left", width: "100%", marginBottom: "20px" }}>
          <h3 style={{ fontSize: "20px", fontWeight: "bold", margin: "15px 0" }}>
            Assignment Topic:{" "}
            <span style={{ fontWeight: "600", color: "#1a3a6c" }}>
              {data.topicname ? capitalizeEachWord(data.topicname) : <Placeholder />}
            </span>
          </h3>
          <h3 style={{ fontSize: "20px", fontWeight: "bold", margin: "15px 0" }}>
            Course Code:{" "}
            <span style={{ fontWeight: "600", color: "#1a3a6c" }}>
              {data.courseId ? capitalizeEachWord(data.courseId) : <Placeholder />}
            </span>
          </h3>
          <h3 style={{ fontSize: "20px", fontWeight: "bold", margin: "15px 0" }}>
            Course Title:{" "}
            <span style={{ fontWeight: "600", color: "#1a3a6c" }}>
              {data.courseName ? capitalizeEachWord(data.courseName) : <Placeholder />}
            </span>
          </h3>
        </div>

        {/* Submitted to / by table */}
        <div style={{ marginTop: "15px", width: "100%" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              border: "2px solid #1a3a6c",
              fontSize: "16px",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    border: "2px solid #1a3a6c",
                    padding: "12px",
                    textAlign: "center",
                    backgroundColor: "#f0f5ff",
                    color: "#1a3a6c",
                    fontSize: "20px",
                  }}
                >
                  Submitted To
                </th>
                <th
                  style={{
                    border: "2px solid #1a3a6c",
                    padding: "12px",
                    textAlign: "center",
                    backgroundColor: "#f0f5ff",
                    color: "#1a3a6c",
                    fontSize: "20px",
                  }}
                >
                  Submitted By
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ border: "2px solid #1a3a6c", padding: "15px", verticalAlign: "top" }}>
                  <div style={{ marginBottom: "6px" }}>
                    <strong>Name:</strong> {data.teacherName || <Placeholder />}
                  </div>
                  <div style={{ marginBottom: "6px" }}>
                    <strong>Designation:</strong> {data.teacherDesignation || <Placeholder />}
                  </div>
                  <div style={{ marginBottom: "6px" }}>
                    <strong>Department of {data.department || <Placeholder />}</strong>
                  </div>
                  <div style={{ marginTop: "12px", fontWeight: "bold", color: "#1a3a6c" }}>
                    Daffodil International University
                  </div>
                </td>
                <td style={{ border: "2px solid #1a3a6c", padding: "15px", verticalAlign: "top" }}>
                  {data.courseType === "project" && !isSinglePersonProject ? (
                    // Team Members Section
                    <>
                      <div style={{ marginBottom: "6px" }}>
                        <strong>Team Members:</strong>
                      </div>
                      {data.teamName && data.teamName.length > 0 ? (
                        <div style={{ marginBottom: "10px" }}>
                          {data.teamName.map((member, index) => (
                            <div key={index} style={{ marginBottom: "4px" }}>
                              {member.studentName && member.studentId ? (
                                <span>
                                  {capitalizeEachWord(member.studentName)} ({member.studentId})
                                </span>
                              ) : member.studentName ? (
                                <span>{capitalizeEachWord(member.studentName)}</span>
                              ) : member.studentId ? (
                                <span>({member.studentId})</span>
                              ) : (
                                <span style={{ color: "#999" }}>-</span>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div style={{ marginBottom: "10px", color: "#999" }}>No team members</div>
                      )}
                    </>
                  ) : (
                    // Individual Student Section
                    <>
                      <div style={{ marginBottom: "6px" }}>
                        <strong>Name:</strong>{" "}
                        {isSinglePersonProject 
                          ? data.teamName[0].studentName || <Placeholder />
                          : data.studentName || <Placeholder />
                        }
                      </div>
                      <div style={{ marginBottom: "6px" }}>
                        <strong>ID:</strong>{" "}
                        {isSinglePersonProject 
                          ? data.teamName[0].studentId || <Placeholder />
                          : data.studentId || <Placeholder />
                        }
                      </div>
                    </>
                  )}
                  
                  <div style={{ marginBottom: "6px" }}>
                    <strong>Batch:</strong> {data.batch || <Placeholder />}
                  </div>
                  <div style={{ marginBottom: "6px" }}>
                    <strong>Section:</strong> {data.section || <Placeholder />}
                  </div>
                  <strong>Department of {data.department || <Placeholder />}</strong>
                  <div style={{ marginTop: "12px", fontWeight: "bold", color: "#1a3a6c" }}>
                    Daffodil International University
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Date of Submission */}
        <p
          style={{
            width: "100%",
            textAlign: "left",
            fontSize: "16px",
            marginTop: "30px",
            fontWeight: "600",
          }}
        >
          Date of Submission: {data.date || <Placeholder />}
        </p>

        {/* Bottom image */}
        {iconBase64 && (
          <img
            src={iconBase64}
            alt="Submission icon"
            style={{
              width: "220px",
              opacity: "0.8",
              position: "absolute",
              bottom: "0px",
              right: "50px",
            }}
          />
        )}
      </div>
    </div>
  );
}