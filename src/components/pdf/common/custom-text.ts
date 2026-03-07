import type { CoverTemplateData } from "./types";

type CustomTextField = keyof Pick<
  CoverTemplateData,
  | "departmentHeadingText"
  | "reportTitleText"
  | "assignmentSectionTitle"
  | "presentationSectionTitle"
  | "courseCodeLabelText"
  | "courseTitleLabelText"
  | "topicLabelText"
  | "submittedToTitleText"
  | "submittedByTitleText"
  | "teacherNameLabelText"
  | "teacherDesignationLabelText"
  | "studentNameLabelText"
  | "studentIdLabelText"
  | "batchLabelText"
  | "sectionLabelText"
  | "semesterLabelText"
  | "yearLabelText"
  | "levelTermLabelText"
  | "departmentLabelText"
  | "teamMembersLabelText"
  | "submissionDateLabelText"
  | "universityNameText"
>;

export function getCustomText(
  data: CoverTemplateData | undefined,
  field: CustomTextField,
  fallback: string
) {
  const value = data?.[field];
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}
