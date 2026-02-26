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

export function getSemesterPart(
  semester: string | undefined,
  index: number,
  fallback = ""
) {
  if (!semester) return fallback;
  const parts = semester.split(" ");
  return parts[index] || fallback;
}
