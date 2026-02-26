import Placeholder from "@/components/pdf/common/Placeholder";
import NoDataMessage from "@/components/pdf/common/NoDataMessage";
import {
  capitalizeEachWord,
  getUppercaseReportTitle,
  isSinglePersonProject,
} from "@/components/pdf/common/format";
import type { CoverTemplateData } from "@/components/pdf/common/types";

export default function PreviewPDF({ data }: { data?: CoverTemplateData }) {
  if (!data) {
    return <NoDataMessage />;
  }

  const singlePersonProject = isSinglePersonProject(data);

  return (
    <div
      id="cover-preview"
      style={{
        fontFamily: "Gupter, sans-serif",
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: "white",
        color: "black",
        width: "794px",
        minHeight: "1123px",
        padding: "40px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
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

        <h3
          style={{
            fontSize: "2.8125rem",
            color: "rgb(107 114 128)",
            fontWeight: "700",
            marginBottom: "1.5rem",
            textAlign: "center",
          }}
        >
          Daffodil International University
        </h3>

        <h1
          style={{
            fontSize: "1.875rem",
            fontWeight: "700",
            wordWrap: "break-word",
            textAlign: "center",
            marginBottom: "1rem",
          }}
        >
          {getUppercaseReportTitle(data.courseType)}
        </h1>

        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            wordWrap: "break-word",
            textAlign: "center",
          }}
        >
          {capitalizeEachWord(data.courseName)}{" "}
          <span style={{ fontSize: "1.25rem" }}>({data.courseId})</span>
        </h2>

        <h3
          style={{
            fontSize: "1.25rem",
            fontWeight: "500",
            textAlign: "center",
            marginTop: "3.25rem",
          }}
        >
          Title of the {data.courseType === "project" ? "Project" : "Assignment"}
        </h3>
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            wordWrap: "break-word",
            textAlign: "center",
          }}
        >
          {capitalizeEachWord(data.topicname)}
        </h1>

        <h3 style={{ marginTop: "4.5rem", fontSize: "1.25rem", fontWeight: "400" }}>
          Submitted by-
        </h3>

        {data.courseType === "project" && !singlePersonProject ? (
          <div style={{ textAlign: "center", marginBottom: "1rem" }}>
            <h4
              style={{
                fontSize: "1.125rem",
                fontWeight: "700",
                marginBottom: "0.5rem",
              }}
            >
              Team Members:
            </h4>
            {data.teamName && data.teamName.length > 0 ? (
              data.teamName.map((member, index) => (
                <h5
                  key={index}
                  style={{ fontSize: "1.125rem", fontWeight: "600", margin: "0.25rem 0" }}
                >
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
                </h5>
              ))
            ) : (
              <h5 style={{ fontSize: "1.125rem", fontWeight: "600", color: "#999" }}>
                No team members
              </h5>
            )}
          </div>
        ) : (
          <>
            <h5 style={{ fontSize: "1.125rem", fontWeight: "700" }}>
              Name:{" "}
              {singlePersonProject ? data.teamName?.[0]?.studentName : data.studentName}
            </h5>
            <h5 style={{ fontSize: "1.125rem", fontWeight: "600" }}>
              ID No:{" "}
              {singlePersonProject ? data.teamName?.[0]?.studentId : data.studentId}
            </h5>
          </>
        )}

        <h5 style={{ fontSize: "1.125rem", fontWeight: "600" }}>
          Section: {data.batch}({data.section})
        </h5>

        <h3
          style={{
            fontSize: "1.25rem",
            fontWeight: "500",
            textAlign: "center",
            marginTop: "3.25rem",
          }}
        >
          Submitted to -
        </h3>
        <h5 style={{ fontSize: "1.125rem", fontWeight: "700" }}>{data.teacherName}</h5>
        <h5 style={{ fontSize: "1.125rem", fontWeight: "600" }}>
          ID: {data.courseTeacherId || <Placeholder className="text-xl font-bold" />}
        </h5>
        <h2 style={{ fontSize: "1.125rem", fontWeight: "600" }}>
          {data.teacherDesignation} , {data.department}
        </h2>
        <h2 style={{ marginBottom: "2rem", fontSize: "1.25rem" }}>
          Daffodil International University
        </h2>

        <h1 style={{ marginBottom: "2rem", fontSize: "1.25rem" }}>{data.date}</h1>

        {data.courseType !== "project" && (
          <div style={{ overflowX: "auto" }}>
            <h1 style={{ fontSize: "1.25rem", fontWeight: "700" }}>Assignment Rubric:</h1>
            <table
              style={{
                minWidth: "100%",
                border: "2px solid black",
                borderCollapse: "collapse",
              }}
            >
              <thead style={{ backgroundColor: "rgb(243 244 246)" }}>
                <tr>
                  <th
                    style={{
                      padding: "0.5rem 1rem",
                      textAlign: "left",
                      fontSize: "0.875rem",
                      fontWeight: "700",
                      color: "black",
                      border: "2px solid black",
                    }}
                  >
                    Content & Information (2)
                  </th>
                  <th
                    style={{
                      padding: "0.5rem 1rem",
                      textAlign: "left",
                      fontSize: "0.875rem",
                      fontWeight: "700",
                      color: "black",
                      border: "2px solid black",
                    }}
                  >
                    Language & Grammar (2)
                  </th>
                  <th
                    style={{
                      padding: "0.5rem 1rem",
                      textAlign: "left",
                      fontSize: "0.875rem",
                      fontWeight: "700",
                      color: "black",
                      border: "2px solid black",
                    }}
                  >
                    Organization (1)
                  </th>
                  <th
                    style={{
                      padding: "0.5rem 1rem",
                      textAlign: "left",
                      fontSize: "0.875rem",
                      fontWeight: "700",
                      color: "black",
                      border: "2px solid black",
                    }}
                  >
                    Total (5)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ height: "3.25rem", border: "2px solid black" }}></td>
                  <td style={{ height: "3.25rem", border: "2px solid black" }}></td>
                  <td style={{ height: "3.25rem", border: "2px solid black" }}></td>
                  <td style={{ height: "3.25rem", border: "2px solid black" }}></td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
