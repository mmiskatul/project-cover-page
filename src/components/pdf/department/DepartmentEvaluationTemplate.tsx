import Placeholder from "@/components/pdf/common/Placeholder";
import NoDataMessage from "@/components/pdf/common/NoDataMessage";
import {
  capitalizeEachWord,
  getSemesterPart,
  isSinglePersonProject,
} from "@/components/pdf/common/format";
import type { CoverTemplateData } from "@/components/pdf/common/types";

type DepartmentHeadingConfig = {
  text: string;
  className: string;
};

type DepartmentEvaluationTemplateConfig = {
  rootClassName?: string;
  wrapperClassName?: string;
  departmentHeading?: DepartmentHeadingConfig;
  logoWidth: string;
  logoMarginBottom?: string;
  reportTitleClassName: string;
  resolveReportTitle: (courseType: string) => string;
  courseTableMarginClass: string;
  courseHeaderCellClassName?: string;
  evaluationTableMarginClass: string;
  assignmentHeaderClassName: string;
  presentationHeaderClassName?: string;
  includePresentationSection?: boolean;
  semesterTableMarginClass: string;
  submissionTableMarginClass: string;
  submittedByCellClassName?: string;
  submittedToCellClassName?: string;
  dateSignatureCellClassName: string;
  includeLeadingBreakInSignature?: boolean;
};

type DepartmentEvaluationTemplateProps = {
  data?: CoverTemplateData;
  config: DepartmentEvaluationTemplateConfig;
};

export default function DepartmentEvaluationTemplate({
  data,
  config,
}: DepartmentEvaluationTemplateProps) {
  if (!data) {
    return <NoDataMessage />;
  }

  const singlePersonProject = isSinglePersonProject(data);
  const reportTitle = config.resolveReportTitle(data.courseType || "");
  const submittedByCellClassName =
    config.submittedByCellClassName || "border border-black px-4 py-1 text-left";
  const submittedToCellClassName =
    config.submittedToCellClassName || "border border-black px-4 py-1 text-left";

  return (
    <div
      id="cover-preview"
      className={`${config.rootClassName || ""} mx-auto bg-white text-black`}
      style={{
        width: "794px",
        minHeight: "1123px",
        padding: "40px",
        boxSizing: "border-box",
        fontFamily: "Gupter, sans-serif",
      }}
    >
      <div className={config.wrapperClassName || "flex flex-col items-center w-full"}>
        {config.departmentHeading && (
          <h1 className={config.departmentHeading.className}>
            {config.departmentHeading.text}
          </h1>
        )}

        <img
          src={data.logo}
          alt="DIU Logo"
          style={{
            width: config.logoWidth,
            height: "auto",
            objectFit: "contain",
            marginBottom: config.logoMarginBottom || "20px",
          }}
        />

        <h3 className={config.reportTitleClassName}>{reportTitle}</h3>

        <table
          className={`table-auto w-full font-bold border border-black border-collapse ${config.courseTableMarginClass}`}
        >
          <thead>
            <tr>
              <th
                className={`${config.courseHeaderCellClassName || ""} border border-black px-4 py-1 text-left`}
              >
                Course Code: {data.courseId}
              </th>
              <th
                className={`${config.courseHeaderCellClassName || ""} border border-black px-4 py-1 text-left`}
              >
                Course Title: {capitalizeEachWord(data.courseName)}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={2} className="border border-black px-4 py-1 text-left">
                Title/Topic:{" "}
                {data.topicname ? (
                  capitalizeEachWord(data.topicname)
                ) : (
                  <Placeholder />
                )}
              </td>
            </tr>
          </tbody>
        </table>

        <table
          className={`table-fixed w-full border border-black border-collapse text-sm ${config.evaluationTableMarginClass}`}
        >
          <thead>
            <tr>
              <th
                rowSpan={2}
                className="border border-black px-2 py-1 text-center w-10"
              >
                SL
              </th>
              <th
                rowSpan={2}
                className="border border-black px-2 py-1 text-center w-64"
              >
                Evaluation criteria with marks
              </th>
              <th colSpan={5} className="border border-black px-2 py-1 text-center">
                Put Tick Mark
              </th>
              <th
                rowSpan={2}
                className="border border-black px-2 py-1 text-center w-24"
              >
                Mark Obtained
              </th>
              <th
                rowSpan={2}
                colSpan={2}
                className="border border-black px-2 py-1 text-center w-40"
              >
                Remarks
              </th>
            </tr>
            <tr>
              {["Excellent", "Good", "Fair", "Poor", "Fail"].map((label) => (
                <th
                  key={label}
                  className="border border-black px-1 py-1 text-center whitespace-nowrap text-xs"
                  style={{
                    writingMode: "vertical-rl",
                    textOrientation: "mixed",
                    transform: "rotate(180deg)",
                  }}
                >
                  {label}
                </th>
              ))}
            </tr>
            <tr>
              <th colSpan={10} className={config.assignmentHeaderClassName}>
                Assignment
              </th>
            </tr>
          </thead>
          <tbody>
            {(data.evaluationTitles || []).map((criteria, index) => (
              <tr key={`assignment-${index}`}>
                <td className="border border-black px-2 py-1 text-center">
                  {index + 1}
                </td>
                <td className="border border-black px-2 py-1">{criteria}</td>
                {Array.from({ length: 5 }).map((_, markerIndex) => (
                  <td
                    key={`assignment-marker-${index}-${markerIndex}`}
                    className="border border-black px-2 py-1 text-center"
                  ></td>
                ))}
                <td className="border border-black px-2 py-1 text-center"></td>
                <td colSpan={2} className="border border-black px-2 py-1 text-center"></td>
              </tr>
            ))}

            <tr>
              <td className="border border-black px-2 py-1 text-center"></td>
              <td
                colSpan={6}
                className="border border-black px-2 py-1 text-right font-semibold"
              >
                Total
              </td>
              <td className="border border-black px-2 py-1 text-center"></td>
              <td colSpan={2} className="border border-black px-2 py-1 text-center"></td>
            </tr>

            {config.includePresentationSection && (
              <>
                <tr>
                  <th
                    colSpan={10}
                    className={
                      config.presentationHeaderClassName ||
                      config.assignmentHeaderClassName
                    }
                  >
                    Presentation
                  </th>
                </tr>
                {(data.presentationTitles || []).map((criteria, index) => (
                  <tr key={`presentation-${index}`}>
                    <td className="border border-black px-2 py-1 text-center">
                      {index + 1}
                    </td>
                    <td className="border border-black px-2 py-1">{criteria}</td>
                    {Array.from({ length: 5 }).map((_, markerIndex) => (
                      <td
                        key={`presentation-marker-${index}-${markerIndex}`}
                        className="border border-black px-2 py-1 text-center"
                      ></td>
                    ))}
                    <td className="border border-black px-2 py-1 text-center"></td>
                    <td
                      colSpan={2}
                      className="border border-black px-2 py-1 text-center"
                    ></td>
                  </tr>
                ))}
                <tr>
                  <td className="border border-black px-2 py-1 text-center"></td>
                  <td
                    colSpan={6}
                    className="border border-black px-2 py-1 text-right font-semibold"
                  >
                    Total
                  </td>
                  <td className="border border-black px-2 py-1 text-center"></td>
                  <td
                    colSpan={2}
                    className="border border-black px-2 py-1 text-center"
                  ></td>
                </tr>
              </>
            )}

            <tr>
              <td colSpan={8} className="border border-black px-2 py-1">
                <span className="font-bold">Date of Submission:</span>{" "}
                {data.date || <Placeholder />}
              </td>
              <td colSpan={2} className={config.dateSignatureCellClassName}>
                {config.includeLeadingBreakInSignature ? <br /> : null}
                <span>.........................</span>
                <br />
                <span>..............</span>
                <br />
                Teacher <br />
                Signature
              </td>
            </tr>
          </tbody>
        </table>

        <table
          className={`table-auto w-full font-bold border border-black border-collapse ${config.semesterTableMarginClass}`}
        >
          <thead>
            <tr>
              <th className="border border-black px-4 py-1 text-left">
                Semester: {capitalizeEachWord(getSemesterPart(data.semester, 0))}
              </th>
              <th className="border border-black px-4 py-1 text-left">
                Year: {getSemesterPart(data.semester, 1, `${new Date().getFullYear()}`)}
              </th>
              <th className="border border-black px-4 py-1 text-left">
                Level-Term: {data.level}
              </th>
              <th className="border border-black px-4 py-1 text-left">
                Section: {capitalizeEachWord(data.section)}
              </th>
            </tr>
          </thead>
        </table>

        <table
          className={`table-auto w-full font-bold border border-black border-collapse ${config.submissionTableMarginClass}`}
        >
          <thead>
            <tr>
              <th className="border border-black px-4 py-1 text-left">Submitted by-</th>
              <th className="border border-black px-4 py-1 text-left">Submitted to-</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={submittedByCellClassName}>
                {data.courseType === "project" && !singlePersonProject ? (
                  <div>
                    <p className="font-bold mb-2">Team Members:</p>
                    {data.teamName && data.teamName.length > 0 ? (
                      <div className="space-y-1">
                        {data.teamName.map((member, index) => (
                          <p key={`team-member-${index}`}>
                            {member.studentName && member.studentId ? (
                              <span>
                                {capitalizeEachWord(member.studentName)} ({member.studentId})
                              </span>
                            ) : member.studentName ? (
                              <span>{capitalizeEachWord(member.studentName)}</span>
                            ) : member.studentId ? (
                              <span>({member.studentId})</span>
                            ) : (
                              <Placeholder />
                            )}
                          </p>
                        ))}
                      </div>
                    ) : (
                      <Placeholder />
                    )}
                  </div>
                ) : (
                  <div>
                    <p>
                      <span className="font-bold">Name:</span>{" "}
                      {singlePersonProject
                        ? capitalizeEachWord(data.teamName?.[0]?.studentName)
                        : data.studentName
                        ? capitalizeEachWord(data.studentName)
                        : <Placeholder />}
                    </p>
                    <p>
                      <span className="font-bold">Student ID:</span>{" "}
                      {singlePersonProject
                        ? data.teamName?.[0]?.studentId
                        : data.studentId || <Placeholder />}
                    </p>
                  </div>
                )}
              </td>

              <td className={submittedToCellClassName}>
                <p>
                  <span className="font-bold">Name:</span>{" "}
                  {data.teacherName ? capitalizeEachWord(data.teacherName) : <Placeholder />}
                </p>
                <p>
                  <span className="font-bold">Designation:</span>{" "}
                  {data.teacherDesignation ? (
                    capitalizeEachWord(data.teacherDesignation)
                  ) : (
                    <Placeholder />
                  )}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
