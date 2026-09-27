import SweTeacherEvaluation from "./SweTeacherEvaluation";
import NoDataMessage from "@/components/pdf/common/NoDataMessage";
import {
  capitalizeEachWord,
  getSentenceCaseReportTitle,
} from "@/components/pdf/common/format";
import { getCustomText } from "@/components/pdf/common/custom-text";
import type { CoverTemplateData } from "@/components/pdf/common/types";

export default function SwePreviewPDF({ data }: { data?: CoverTemplateData }) {
  if (!data) return <NoDataMessage />;

  const resolvedReportTitle = data.courseType
    ? getSentenceCaseReportTitle(data.courseType)
    : "Theory Assignment Report";
  const reportTitle = getCustomText(data, "reportTitleText", resolvedReportTitle);

  const semesterLabel = getCustomText(data, "semesterLabelText", "Semester");
  const studentNameLabel = getCustomText(data, "studentNameLabelText", "Student Name");
  const studentIdLabel = getCustomText(data, "studentIdLabelText", "Student ID");
  const batchLabel = getCustomText(data, "batchLabelText", "Batch");
  const sectionLabel = getCustomText(data, "sectionLabelText", "Section");
  const courseNameLabel = getCustomText(data, "courseTitleLabelText", "Course Name");
  const courseCodeLabel = getCustomText(data, "courseCodeLabelText", "Course Code");
  const teacherNameLabel = getCustomText(
    data,
    "teacherNameLabelText",
    "Course Teacher Name"
  );
  const teacherDesignationLabel = getCustomText(
    data,
    "teacherDesignationLabelText",
    "Designation"
  );
  const submissionDateLabel = getCustomText(
    data,
    "submissionDateLabelText",
    "Submission Date"
  );

  // Resolve formatted student names and IDs (comma-separated if multiple students)
  const resolveStudentDisplay = () => {
    if (Array.isArray(data.teamName) && data.teamName.length > 0) {
      const validNames = data.teamName
        .map((m) => m.studentName?.trim())
        .filter(Boolean)
        .map((name) => capitalizeEachWord(name));
      const validIds = data.teamName
        .map((m) => m.studentId?.trim())
        .filter(Boolean);

      if (validNames.length > 0 || validIds.length > 0) {
        return {
          studentName: validNames.join(", "),
          studentId: validIds.join(", "),
        };
      }
    }

    return {
      studentName: data.studentName ? capitalizeEachWord(data.studentName) : "",
      studentId: data.studentId || "",
    };
  };

  const { studentName: studentNameDisplay, studentId: studentIdDisplay } =
    resolveStudentDisplay();

  return (
    <div
      id="cover-preview"
      className="mx-auto bg-white text-black"
      style={{
        width: "794px",
        minHeight: "1123px",
        height: "1123px",
        padding: "52px 56px 45px 56px",
        boxSizing: "border-box",
        fontFamily: "Arial, 'Segoe UI', Calibri, sans-serif",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* All content centered vertically */}
      <div className="flex flex-col items-center w-full">
        <img
          src={data.logo || "/assets/daffodil-international-university-seeklogo.png"}
          alt="DIU Logo"
          style={{
            width: "240px",
            height: "auto",
            objectFit: "contain",
            marginBottom: "20px",
          }}
        />

        <h1 className="text-[21px] font-bold mb-5 text-center text-black tracking-normal leading-snug">
          {reportTitle}
        </h1>

        {/* Mark Distribution Table */}
        <div className="w-full mb-7">
          <SweTeacherEvaluation data={data} />
        </div>

        {/* Student / Teacher metadata */}
        <div className="w-full text-left text-[14.5px] text-black">
          {/* Semester Line */}
          <div className="mb-3.5">
            <span className="font-bold">{semesterLabel}: </span>
            <span className="font-bold">
              {data.semester
                ? capitalizeEachWord(data.semester)
                : "Spring ........... / Fall ........."}
            </span>
          </div>

          {/* Student Info: Comma-separated names & IDs */}
          <div className="mb-3.5 space-y-1">
            <div>
              <span className="font-bold">{studentNameLabel}: </span>
              <span className="font-normal">{studentNameDisplay}</span>
            </div>
            <div>
              <span className="font-bold">{studentIdLabel}: </span>
              <span className="font-normal">{studentIdDisplay}</span>
            </div>
          </div>

          {/* Batch & Section, Course Code & Course Name */}
          <div className="mb-3.5 space-y-1">
            <div className="flex items-baseline">
              <div className="w-[38%]">
                <span className="font-bold">{batchLabel}: </span>
                <span className="font-normal">
                  {data.batch ? capitalizeEachWord(data.batch) : ""}
                </span>
              </div>
              <div className="flex-1">
                <span className="font-bold">{sectionLabel}: </span>
                <span className="font-normal">
                  {data.section ? capitalizeEachWord(data.section) : ""}
                </span>
              </div>
            </div>

            <div className="flex items-baseline">
              <div className="w-[38%]">
                <span className="font-bold">{courseCodeLabel}: </span>
                <span className="font-normal">{data.courseId || ""}</span>
              </div>
              <div className="flex-1">
                <span className="font-bold">{courseNameLabel}: </span>
                <span className="font-normal">
                  {data.courseName ? capitalizeEachWord(data.courseName) : ""}
                </span>
              </div>
            </div>
          </div>

          {/* Teacher Name, Designation, Submission Date */}
          <div className="space-y-1">
            <div>
              <span className="font-bold">{teacherNameLabel}: </span>
              <span className="font-normal">
                {data.teacherName ? capitalizeEachWord(data.teacherName) : ""}
              </span>
            </div>
            <div>
              <span className="font-bold">{teacherDesignationLabel}: </span>
              <span className="font-normal">
                {data.teacherDesignation
                  ? capitalizeEachWord(data.teacherDesignation)
                  : ""}
              </span>
            </div>
            <div>
              <span className="font-bold">{submissionDateLabel}: </span>
              <span className="font-normal">
                {data.date ? data.date : "......./......./......."}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
