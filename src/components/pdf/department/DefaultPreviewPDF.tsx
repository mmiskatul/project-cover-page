import Placeholder from "@/components/pdf/common/Placeholder";
import NoDataMessage from "@/components/pdf/common/NoDataMessage";
import {
  capitalizeEachWord,
  getUppercaseReportTitle,
  isSinglePersonProject,
} from "@/components/pdf/common/format";
import { getCustomText } from "@/components/pdf/common/custom-text";
import type { CoverTemplateData } from "@/components/pdf/common/types";

function LongPlaceholder() {
  return (
    <Placeholder
      className="text-xl font-bold"
      text="...................................................."
    />
  );
}

export default function DefaultPreview({ data }: { data?: CoverTemplateData }) {
  if (!data) {
    return <NoDataMessage />;
  }

  const singlePersonProject = isSinglePersonProject(data);
  const singleProjectMember = data.teamName?.[0];
  const reportTitle = getCustomText(
    data,
    "reportTitleText",
    getUppercaseReportTitle(data.courseType)
  );
  const courseCodeLabel = getCustomText(data, "courseCodeLabelText", "Course Code");
  const courseTitleLabel = getCustomText(data, "courseTitleLabelText", "Course Title");
  const topicLabel = getCustomText(data, "topicLabelText", "Topic Name");
  const submittedToTitle = getCustomText(data, "submittedToTitleText", "Submitted To:");
  const submittedByTitle = getCustomText(data, "submittedByTitleText", "Submitted By:");
  const teacherNameLabel = getCustomText(data, "teacherNameLabelText", "Name");
  const teacherDesignationLabel = getCustomText(
    data,
    "teacherDesignationLabelText",
    "Designation"
  );
  const departmentLabel = getCustomText(data, "departmentLabelText", "Department");
  const teamMembersLabel = getCustomText(data, "teamMembersLabelText", "Team Members:");
  const studentNameLabel = getCustomText(data, "studentNameLabelText", "Name");
  const studentIdLabel = getCustomText(data, "studentIdLabelText", "ID");
  const sectionLabel = getCustomText(data, "sectionLabelText", "Section");
  const semesterLabel = getCustomText(data, "semesterLabelText", "Semester");
  const submissionDateLabel = getCustomText(
    data,
    "submissionDateLabelText",
    "Submission Date"
  );
  const universityName = getCustomText(
    data,
    "universityNameText",
    "Daffodil International University"
  );

  return (
    <div
      id="cover-preview"
      className="flex justify-center items-center w-full min-h-screen bg-gray-100"
    >
      <div
        className="relative bg-white text-black shadow border border-gray-400"
        style={{
          width: "794px",
          height: "1123px",
          padding: "50px 40px",
          boxSizing: "border-box",
          overflow: "hidden",
          fontFamily: "Gupter, sans-serif",
        }}
      >
        <div
          className="absolute top-1/2 left-1/2 pointer-events-none mt-10"
          style={{
            transform: "translate(-50%, -50%)",
            backgroundImage: `url(${data.bglogo})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "contain",
            width: "370px",
            height: "440px",
            opacity: 0.13,
            zIndex: 0,
          }}
        />

        <div className="relative p-5 px-10 z-10 w-full h-full flex flex-col items-center">
          <img src={data.logo} alt="DIU Logo" style={{ width: "300px", marginTop: "10px" }} />

          <h3 className="text-2xl font-bold underline mt-6 mb-8">
            {reportTitle}
          </h3>

          <div className="w-full text-left text-[17px] font-medium space-y-2 mb-6">
            <p>
              <span className="font-bold">{courseCodeLabel}:</span>{" "}
              {data.courseId ? capitalizeEachWord(data.courseId) : <LongPlaceholder />}
            </p>
            <p>
              <span className="font-bold">{courseTitleLabel}:</span>{" "}
              {data.courseName ? capitalizeEachWord(data.courseName) : <LongPlaceholder />}
            </p>
            <p>
              <span className="font-bold">{topicLabel}:</span>{" "}
              {data.topicname ? capitalizeEachWord(data.topicname) : <LongPlaceholder />}
            </p>
          </div>

          <div className="w-full text-purple-900 text-left text-[18px] font-bold underline mb-2">
            {submittedToTitle}
          </div>
          <div className="w-full pl-32 text-left text-[16px] font-medium space-y-1 mb-6">
            <p>
              <span className="font-bold">{teacherNameLabel}:</span>{" "}
              {data.teacherName ? capitalizeEachWord(data.teacherName) : <LongPlaceholder />}
            </p>
            <p>
              <span className="font-bold">{teacherDesignationLabel}:</span>{" "}
              {data.teacherDesignation ? (
                capitalizeEachWord(data.teacherDesignation)
              ) : (
                <LongPlaceholder />
              )}
            </p>
            <p>
              <span className="font-bold">{departmentLabel}:</span>{" "}
              {data.department ? capitalizeEachWord(data.department) : <LongPlaceholder />}
            </p>
            <p className="text-lg font-bold">{universityName}</p>
          </div>

          <div className="w-full text-purple-900 text-left text-[18px] font-bold underline mb-2">
            {submittedByTitle}
          </div>

          {data.courseType === "project" && !singlePersonProject ? (
            <div className="w-full pl-32 text-left text-[16px] font-medium space-y-1 mb-6">
              <div className="mb-2">
                <span className="font-bold">{teamMembersLabel}</span>
              </div>

              {data.teamName && data.teamName.length > 0 ? (
                <div className="space-y-2">
                  {data.teamName.map((member, index) => (
                    <p key={`default-team-member-${index}`}>
                      {member.studentName && member.studentId ? (
                        <span>
                          {capitalizeEachWord(member.studentName)} ({member.studentId})
                        </span>
                      ) : member.studentName ? (
                        <span>{capitalizeEachWord(member.studentName)}</span>
                      ) : member.studentId ? (
                        <span>({member.studentId})</span>
                      ) : (
                        <LongPlaceholder />
                      )}
                    </p>
                  ))}
                </div>
              ) : (
                <LongPlaceholder />
              )}

              <div className="mt-4 space-y-1">
                <p>
                  <span className="font-bold">{sectionLabel}:</span>{" "}
                  {data.section ? capitalizeEachWord(data.section) : <LongPlaceholder />}
                </p>
                <p>
                  <span className="font-bold">{semesterLabel}:</span>{" "}
                  {data.semester ? capitalizeEachWord(data.semester) : <LongPlaceholder />}
                </p>
                <p>
                  <span className="font-bold">{departmentLabel}:</span>{" "}
                  {data.department ? capitalizeEachWord(data.department) : <LongPlaceholder />}
                </p>
                <p className="text-lg font-bold">{universityName}</p>
              </div>
            </div>
          ) : (
            <div className="w-full pl-32 text-left text-[16px] font-medium space-y-1 mb-6">
              <p>
                <span className="font-bold">{studentNameLabel}:</span>{" "}
                {singlePersonProject ? (
                  singleProjectMember?.studentName ? (
                    capitalizeEachWord(singleProjectMember.studentName)
                  ) : (
                    <LongPlaceholder />
                  )
                ) : data.studentName ? (
                  capitalizeEachWord(data.studentName)
                ) : (
                  <LongPlaceholder />
                )}
              </p>
              <p>
                <span className="font-bold">{studentIdLabel}:</span>{" "}
                {singlePersonProject
                  ? singleProjectMember?.studentId || <LongPlaceholder />
                  : data.studentId || <LongPlaceholder />}
              </p>
              <p>
                <span className="font-bold">{sectionLabel}:</span>{" "}
                {data.section ? capitalizeEachWord(data.section) : <LongPlaceholder />}
              </p>
              <p>
                <span className="font-bold">{semesterLabel}:</span>{" "}
                {data.semester ? capitalizeEachWord(data.semester) : <LongPlaceholder />}
              </p>
              <p>
                <span className="font-bold">{departmentLabel}:</span>{" "}
                {data.department ? capitalizeEachWord(data.department) : <LongPlaceholder />}
              </p>
              <p className="text-lg font-bold">{universityName}</p>
            </div>
          )}

          <div className="w-full text-left text-purple-900 text-[16px] font-bold mt-20">
            <span className="underline text-lg">{submissionDateLabel}:</span>{" "}
            {data.date || <LongPlaceholder />}
          </div>
        </div>
      </div>
    </div>
  );
}
