import DepartmentEvaluationTemplate from "@/components/pdf/department/DepartmentEvaluationTemplate";
import type { CoverTemplateData } from "@/components/pdf/common/types";

const textileTemplateConfig = {
  rootClassName: "gupter",
  wrapperClassName: "EB flex flex-col items-center w-full",
  departmentHeading: {
    text: "Department of Textile Engineering",
    className:
      "w-full italic text-center border-b-2 border-black text-lg text-gray-500 font-bold mb-1",
  },
  logoWidth: "240px",
  logoMarginBottom: "16px",
  reportTitleClassName: "text-xl font-bold mb-1 text-center border-b-2 border-black",
  resolveReportTitle: () => "Assignment and Presentation",
  courseTableMarginClass: "mt-2",
  courseHeaderCellClassName: "w-1/2",
  evaluationTableMarginClass: "mt-1",
  assignmentHeaderClassName: "border border-black px-2 py-1 text-center bg-green-600",
  presentationHeaderClassName: "border border-black px-2 py-1 text-center bg-green-600",
  includePresentationSection: true,
  semesterTableMarginClass: "mt-1",
  submissionTableMarginClass: "mt-1",
  submittedByCellClassName: "w-1/2 border border-black px-4 py-1 text-left",
  submittedToCellClassName: "w-1/2 border border-black px-4 py-1 text-left",
  dateSignatureCellClassName: "border border-black px-2 py-3 text-left font-bold",
  includeLeadingBreakInSignature: false,
};

export default function PreviewPDF({ data }: { data?: CoverTemplateData }) {
  return <DepartmentEvaluationTemplate data={data} config={textileTemplateConfig} />;
}