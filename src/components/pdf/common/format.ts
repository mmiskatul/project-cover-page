import type { CoverTemplateData } from "./types";

export function capitalizeEachWord(value?: string | null) {
  if (!value) return "";
  return value
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function isSinglePersonProject(data: CoverTemplateData) {
  return Boolean(
    data.courseType === "project" &&
      data.teamName &&
      data.teamName.length === 1 &&
      data.teamName[0]?.studentName &&
      data.teamName[0]?.studentId
  );
}

export function getSentenceCaseReportTitle(courseType?: string | null) {
  switch (courseType) {
    case "theory":
      return "Theory Assignment Report";
    case "lab assignment":
      return "Lab Assignment Report";
    case "lab report":
      return "Lab Report";
    case "lab final":
      return "Lab Final Report";
    case "project":
      return "Project Report";
    default:
      return "Select the type of report";
  }
}

export function getUppercaseReportTitle(courseType?: string | null) {
  switch (courseType) {
    case "theory":
      return "ASSIGNMENT";
    case "lab assignment":
    case "lab report":
      return "LAB REPORT";
    case "lab final":
      return "LAB FINAL";
    case "project":
      return "PROJECT REPORT";
    default:
      return "SELECT THE TYPE OF REPORT";
  }
}

export function getSemesterPart(
  semester: string | undefined,
  index: number,
  fallback = ""
) {
  if (!semester) return fallback;
  const parts = semester.split(" ");
  return parts[index] || fallback;
}
