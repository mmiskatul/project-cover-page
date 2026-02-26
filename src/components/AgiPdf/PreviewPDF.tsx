import DepartmentEvaluationTemplate from "@/components/pdf/department/DepartmentEvaluationTemplate";
import type { CoverTemplateData } from "@/components/pdf/common/types";

const agriTemplateConfig = {
  rootClassName: "gupter",
  wrapperClassName: "EB flex flex-col items-center w-full",
  departmentHeading: {
    text: "Department of Agricultural Science",
    className:
      "w-full text-center border-b-2 border-black text-base font-bold mb-1",
  },
  logoWidth: "240px",
  logoMarginBottom: "20px",
  reportTitleClassName: "text-xl font-bold mb-2 text-center border-b-2 border-black",
  resolveReportTitle: () => "Assignment and Presentation",
  courseTableMarginClass: "mt-2",
  evaluationTableMarginClass: "mt-1",
  assignmentHeaderClassName: "border border-black px-2 py-1 text-center",
  presentationHeaderClassName: "border border-black px-2 py-1 text-center",
  includePresentationSection: true,
  semesterTableMarginClass: "mt-1",
  submissionTableMarginClass: "mt-1",
  dateSignatureCellClassName: "border border-black px-2 py-3 text-left font-bold",
  includeLeadingBreakInSignature: true,
};

export default function PreviewPDF({ data }: { data?: CoverTemplateData }) {
  return <DepartmentEvaluationTemplate data={data} config={agriTemplateConfig} />;
}