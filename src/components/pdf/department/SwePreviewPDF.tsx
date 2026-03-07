import SweTeacherEvaluation from "./SweTeacherEvaluation";
import Placeholder from "@/components/pdf/common/Placeholder";
import NoDataMessage from "@/components/pdf/common/NoDataMessage";
import {
  capitalizeEachWord,
  getSentenceCaseReportTitle,
  isSinglePersonProject,
} from "@/components/pdf/common/format";
import { getCustomText } from "@/components/pdf/common/custom-text";
import type { CoverTemplateData } from "@/components/pdf/common/types";

export default function PreviewPDF({ data }: { data?: CoverTemplateData }) {
  if (!data) return <NoDataMessage />;

  const singlePersonProject = isSinglePersonProject(data);
  const singleProjectMember = data.teamName?.[0];
  const reportTitle = getCustomText(
    data,
    "reportTitleText",
    getSentenceCaseReportTitle(data.courseType)
  );
  const semesterLabel = getCustomText(data, "semesterLabelText", "Semester");
  const studentNameLabel = getCustomText(data, "studentNameLabelText", "Student Name");
  const studentIdLabel = getCustomText(data, "studentIdLabelText", "Student ID");
  const teamMembersLabel = getCustomText(data, "teamMembersLabelText", "Team Members");
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

  return (
    <div
      id="cover-preview"
      className="EB mx-auto bg-white text-black"
      style={{
        width: "794px", // A4 width in px at 96 DPI
        minHeight: "1123px", // A4 height in px at 96 DPI
        padding: "40px", // Inner padding
        boxSizing: "border-box",
        fontFamily: "Gupter, sans-serif",
      }}
    >
      {/* Header & Logo */}
      <div className="flex flex-col items-center w-full">

        <img
          src={data.logo}
          alt="DIU Logo"
          style={{
            width: "400px",
            height: "auto",
            objectFit: "contain",
            marginBottom: "20px",
          }}
        />

        <h3 className="text-3xl font-bold mb-6 text-center">
          {reportTitle}
        </h3>

        {/* Mark Distribution Table */}
        <SweTeacherEvaluation data={data} />

        {/* Metadata Section */}
        <div className="w-full mt-6 pl-8 space-y-2 text-left text-base font-medium">
          <p>
            <span className="font-bold">{semesterLabel}:</span>{" "}
            {data.semester ? (
              capitalizeEachWord(data.semester)
            ) : (
              <Placeholder />
            )}
          </p>

          {/* Student name/id section OR Team Members section */}
          {data.courseType !== "project" || singlePersonProject ? (
            <>
              <p>
                <span className="font-bold">{studentNameLabel}:</span>{" "}
                {singlePersonProject ? (
                  singleProjectMember?.studentName ? (
                    capitalizeEachWord(singleProjectMember.studentName)
                  ) : (
                    <Placeholder />
                  )
                ) : data.studentName ? (
                  capitalizeEachWord(data.studentName)
                ) : (
                  <Placeholder />
                )}
              </p>
              <p>
                <span className="font-bold">{studentIdLabel}:</span>{" "}
                {singlePersonProject ? (
                  singleProjectMember?.studentId || <Placeholder />
                ) : data.studentId ? (
                  data.studentId
                ) : (
                  <Placeholder />
                )}
              </p>
            </>
          ) : (
            <div className="mt-4">
              <p className="font-bold text-center mb-2">{teamMembersLabel}</p>
              {data.teamName && data.teamName.length > 0 ? (
                <table className="w-full border-collapse border border-gray-400 mt-2">
                  <thead>
                    <tr className="">
                      <th className="w-1/2 border border-gray-400 px-3 py-1 text-center font-bold">Student ID</th>
                      <th className="w-1/2 border border-gray-400 px-3 py-1 text-center font-bold">Student Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.teamName.map((member, index) => (
                      <tr key={index}>
                        <td className="border border-gray-400 px-3 py-2">
                          {member.studentId || <Placeholder />}
                        </td>
                        <td className="border border-gray-400 px-3 py-2">
                          {member.studentName ? capitalizeEachWord(member.studentName) : <Placeholder />}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td className="border border-gray-400 px-3 py-2 font-bold text-left" colSpan={2}>Section: {`${data.batch}(${data.section})`}</td>
                      
                    </tr>
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-4">
                  <Placeholder />
                </div>
              )}
            </div>
          )}

          {(data.courseType !== "project" || singlePersonProject) && <div className="flex flex-row gap-12">
            <p>
              <span className="font-bold">{batchLabel}:</span>{" "}
              {data.batch ? (
                capitalizeEachWord(data.batch)
              ) : (
                <Placeholder />
              )}
            </p>
            <p>
              <span className="font-bold">{sectionLabel}:</span>{" "}
              {data.section ? (
                capitalizeEachWord(data.section)
              ) : (
                <Placeholder />
              )}
            </p>
          </div>}

          <div className="flex flex-row justify-between gap-3 items-start">
            <p className="whitespace-nowrap flex items-center gap-1">
              <span className="font-bold">{courseCodeLabel}:</span>{" "}
              {data.courseId ? data.courseId : <Placeholder />}
            </p>
             <p>
              <span className="font-bold">{courseNameLabel}:</span>{" "}
              {data.courseName ? (
                capitalizeEachWord(data.courseName)
              ) : (
                <Placeholder />
              )}
            </p>
          </div>

          <p>
            <span className="font-bold">{teacherNameLabel}:</span>{" "}
            {data.teacherName ? (
              capitalizeEachWord(data.teacherName)
            ) : (
              <Placeholder />
            )}
          </p>
          <p>
            <span className="font-bold">{teacherDesignationLabel}:</span>{" "}
            {data.teacherDesignation ? (
              capitalizeEachWord(data.teacherDesignation)
            ) : (
              <Placeholder />
            )}
          </p>
          <p>
            <span className="font-bold">{submissionDateLabel}:</span>{" "}
            {data.date ? data.date : <Placeholder />}
          </p>
        </div>
      </div>
    </div>
  );
}
