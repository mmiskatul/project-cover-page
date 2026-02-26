import DepartmentEvaluationTemplate from "@/components/pdf/department/DepartmentEvaluationTemplate";
import type { CoverTemplateData } from "@/components/pdf/common/types";

function resolveNfeReportTitle(courseType: string) {
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

const nfeTemplateConfig = {
  rootClassName: "EB",
  wrapperClassName: "flex flex-col items-center w-full",
  departmentHeading: {
    text: "Department of Nutrition and Food Engineering",
    className:
      "w-full text-center border-b-2 border-black text-base font-bold mb-3",
  },
  logoWidth: "300px",
  logoMarginBottom: "20px",
  reportTitleClassName: "text-3xl font-bold mb-6 text-center",
  resolveReportTitle: resolveNfeReportTitle,
  courseTableMarginClass: "mt-10",
  evaluationTableMarginClass: "mt-5",
  assignmentHeaderClassName: "border border-black px-2 py-1 text-center bg-gray-200",
  includePresentationSection: false,
  semesterTableMarginClass: "mt-5",
  submissionTableMarginClass: "mt-5",
  dateSignatureCellClassName: "border border-black px-2 py-6 text-left font-bold",
  includeLeadingBreakInSignature: true,
};

export default function PreviewPDF({ data }: { data?: CoverTemplateData }) {
  return <DepartmentEvaluationTemplate data={data} config={nfeTemplateConfig} />;
}