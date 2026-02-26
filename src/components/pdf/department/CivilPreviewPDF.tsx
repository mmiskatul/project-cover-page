import DepartmentEvaluationTemplate from "@/components/pdf/department/DepartmentEvaluationTemplate";
import type { CoverTemplateData } from "@/components/pdf/common/types";

function resolveCivilReportTitle(courseType: string) {
  switch (courseType) {
    case "theory":
      return "Assignment";
    case "lab assignment":
      return "Assignment";
    case "lab report":
      return "Lab Report";
    case "lab final":
      return "Lab Final";
    case "project":
      return "Project Report";
    default:
      return "Select the type of report";
  }
}

const civilTemplateConfig = {
  rootClassName: "EB",
  wrapperClassName: "flex flex-col items-center w-full",
  logoWidth: "340px",
  logoMarginBottom: "20px",
  reportTitleClassName: "text-3xl font-bold mb-3 text-center",
  resolveReportTitle: resolveCivilReportTitle,
  courseTableMarginClass: "mt-5",
  evaluationTableMarginClass: "mt-5",
  assignmentHeaderClassName: "border border-black px-2 py-1 text-center bg-gray-200",
  includePresentationSection: false,
  semesterTableMarginClass: "mt-5",
  submissionTableMarginClass: "mt-5",
  dateSignatureCellClassName: "border border-black px-2 py-3 text-left font-bold",
  includeLeadingBreakInSignature: true,
};

export default function PreviewPDF({ data }: { data?: CoverTemplateData }) {
  return <DepartmentEvaluationTemplate data={data} config={civilTemplateConfig} />;
}