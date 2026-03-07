"use client";

import React, { useEffect, useState } from "react";
import Placeholder from "@/components/pdf/common/Placeholder";
import NoDataMessage from "@/components/pdf/common/NoDataMessage";
import {
  capitalizeEachWord,
  getUppercaseReportTitle,
  isSinglePersonProject,
} from "@/components/pdf/common/format";
import { getCustomText } from "@/components/pdf/common/custom-text";
import type { CoverTemplateData } from "@/components/pdf/common/types";

const iconPng = "/assets/tourisomlogo.png";

// Convert image to Base64
function getBase64Image(imgSrc: string) {
  return new Promise<string>((resolve, reject) => {
    const img = new Image();
    img.src = imgSrc;
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas context is unavailable"));
        return;
      }
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = () => reject(new Error("Failed to load image"));
  });
}

export default function PreviewPDF({ data }: { data?: CoverTemplateData }) {
  const [iconBase64, setIconBase64] = useState<string | null>(null);

  useEffect(() => {
    getBase64Image(iconPng).then(setIconBase64);
  }, []);

  // Check if project is done by only one person
  if (!data)
    return (
      <NoDataMessage
        style={{
          color: "#666",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      />
    );

  const singlePersonProject = isSinglePersonProject(data);
  const singleProjectMember = data.teamName?.[0];
  const reportTitle = getCustomText(
    data,
    "reportTitleText",
    getUppercaseReportTitle(data.courseType)
  );
  const topicLabel = getCustomText(data, "topicLabelText", "Assignment Topic");
  const courseCodeLabel = getCustomText(data, "courseCodeLabelText", "Course Code");
  const courseTitleLabel = getCustomText(data, "courseTitleLabelText", "Course Title");
  const submittedToTitle = getCustomText(data, "submittedToTitleText", "Submitted To");
  const submittedByTitle = getCustomText(data, "submittedByTitleText", "Submitted By");
  const teacherNameLabel = getCustomText(data, "teacherNameLabelText", "Name");
  const teacherDesignationLabel = getCustomText(
    data,
    "teacherDesignationLabelText",
    "Designation"
  );
  const departmentLabel = getCustomText(data, "departmentLabelText", "Department");
  const teamMembersLabel = getCustomText(data, "teamMembersLabelText", "Team Members:");
  const studentNameLabel = getCustomText(data, "studentNameLabelText", "Name");
  const studentIdLabel = getCustomText(data, "studentIdLabelText", "ID");
  const batchLabel = getCustomText(data, "batchLabelText", "Batch");
  const sectionLabel = getCustomText(data, "sectionLabelText", "Section");
  const submissionDateLabel = getCustomText(
    data,
    "submissionDateLabelText",
    "Date of Submission"
  );
  const universityName = getCustomText(
    data,
    "universityNameText",
    "Daffodil International University"
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
          {reportTitle}
        </h3>

        {/* Topic of the assignment */}
        <div style={{ textAlign: "left", width: "100%", marginBottom: "20px" }}>
          <h3 style={{ fontSize: "20px", fontWeight: "bold", margin: "15px 0" }}>
            {topicLabel}:{" "}
            <span style={{ fontWeight: "600", color: "#1a3a6c" }}>
              {data.topicname ? capitalizeEachWord(data.topicname) : <Placeholder />}
            </span>
          </h3>
          <h3 style={{ fontSize: "20px", fontWeight: "bold", margin: "15px 0" }}>
            {courseCodeLabel}:{" "}
            <span style={{ fontWeight: "600", color: "#1a3a6c" }}>
              {data.courseId ? capitalizeEachWord(data.courseId) : <Placeholder />}
            </span>
          </h3>
          <h3 style={{ fontSize: "20px", fontWeight: "bold", margin: "15px 0" }}>
            {courseTitleLabel}:{" "}
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
                  {submittedToTitle}
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
                  {submittedByTitle}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ border: "2px solid #1a3a6c", padding: "15px", verticalAlign: "top" }}>
                  <div style={{ marginBottom: "6px" }}>
                    <strong>{teacherNameLabel}:</strong> {data.teacherName || <Placeholder />}
                  </div>
                  <div style={{ marginBottom: "6px" }}>
                    <strong>{teacherDesignationLabel}:</strong> {data.teacherDesignation || <Placeholder />}
                  </div>
                  <div style={{ marginBottom: "6px" }}>
                    <strong>{departmentLabel} of {data.department || <Placeholder />}</strong>
                  </div>
                  <div style={{ marginTop: "12px", fontWeight: "bold", color: "#1a3a6c" }}>
                    {universityName}
                  </div>
                </td>
                <td style={{ border: "2px solid #1a3a6c", padding: "15px", verticalAlign: "top" }}>
                  {data.courseType === "project" && !singlePersonProject ? (
                    // Team Members Section
                    <>
                      <div style={{ marginBottom: "6px" }}>
                        <strong>{teamMembersLabel}</strong>
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
                        <strong>{studentNameLabel}:</strong>{" "}
                        {singlePersonProject 
                          ? singleProjectMember?.studentName || <Placeholder />
                          : data.studentName || <Placeholder />
                        }
                      </div>
                      <div style={{ marginBottom: "6px" }}>
                        <strong>{studentIdLabel}:</strong>{" "}
                        {singlePersonProject 
                          ? singleProjectMember?.studentId || <Placeholder />
                          : data.studentId || <Placeholder />
                        }
                      </div>
                    </>
                  )}
                  
                  <div style={{ marginBottom: "6px" }}>
                    <strong>{batchLabel}:</strong> {data.batch || <Placeholder />}
                  </div>
                  <div style={{ marginBottom: "6px" }}>
                    <strong>{sectionLabel}:</strong> {data.section || <Placeholder />}
                  </div>
                  <strong>{departmentLabel} of {data.department || <Placeholder />}</strong>
                  <div style={{ marginTop: "12px", fontWeight: "bold", color: "#1a3a6c" }}>
                    {universityName}
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
          {submissionDateLabel}: {data.date || <Placeholder />}
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
