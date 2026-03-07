import Placeholder from "@/components/pdf/common/Placeholder";
import NoDataMessage from "@/components/pdf/common/NoDataMessage";
import {
  capitalizeEachWord,
  getUppercaseReportTitle,
  isSinglePersonProject,
} from "@/components/pdf/common/format";
import { getCustomText } from "@/components/pdf/common/custom-text";
import type { CoverTemplateData } from "@/components/pdf/common/types";

type InfoRowProps = {
  label: string;
  value?: string | null;
};

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <p className="text-base text-left">
      <span className="font-semibold">{label}:</span>{" "}
      {value ? capitalizeEachWord(value) : <Placeholder className="text-base font-semibold" />}
    </p>
  );
}

export default function Default2PreviewPDF({ data }: { data?: CoverTemplateData }) {
  if (!data) {
    return <NoDataMessage className="text-center text-base font-semibold mt-5" />;
  }

  const singlePersonProject = isSinglePersonProject(data);
  const singleProjectMember = data.teamName?.[0];
  const reportTitle = getCustomText(
    data,
    "reportTitleText",
    getUppercaseReportTitle(data.courseType)
  );
  const courseNameLabel = getCustomText(data, "courseTitleLabelText", "Course Name");
  const courseCodeLabel = getCustomText(data, "courseCodeLabelText", "Course Code");
  const submittedToTitle = getCustomText(data, "submittedToTitleText", "Submitted To:");
  const submittedByTitle = getCustomText(data, "submittedByTitleText", "Submitted By:");
  const teacherNameLabel = getCustomText(data, "teacherNameLabelText", "Name");
  const teamMembersLabel = getCustomText(data, "teamMembersLabelText", "Team Members:");
  const sectionLabel = getCustomText(data, "sectionLabelText", "Section");
  const departmentLabel = getCustomText(data, "departmentLabelText", "Department");
  const studentNameLabel = getCustomText(data, "studentNameLabelText", "Name");
  const studentIdLabel = getCustomText(data, "studentIdLabelText", "ID");
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
      className="w-full EB flex justify-center items-center min-h-screen bg-gray-100"
    >
      <div
        className="relative bg-white shadow-md border border-gray-400"
        style={{
          width: "794px",
          height: "1123px",
          padding: "30px",
          boxSizing: "border-box",
          fontFamily: "Gupter, sans-serif",
        }}
      >
        <div className="relative z-10 w-full h-full flex flex-col items-center">
          <img src={data.logo} alt="DIU Logo" className="w-96 my-20" />

          <div className="w-full text-center text-2xl font-bold mb-6 bg-blue-600">
            <div className="w-1/2 text-white py-3 px-6 text-lg font-semibold text-center">
              {reportTitle}
            </div>
            <div className="w-1/2 text-white px-6 text-lg font-semibold text-center"></div>
          </div>

          <div className="w-full flex flex-row gap-6">
            <div className="w-1/2 px-4">
              <h1 className="text-center mt-8 text-lg font-bold underline mb-3">COURSE</h1>
              <div className="space-y-2 text-sm font-medium">
                <InfoRow label={courseNameLabel} value={data.courseName} />
                <InfoRow label={courseCodeLabel} value={data.courseId} />
              </div>

              <h1 className="text-center text-lg font-bold underline mt-6 mb-3">TOPIC</h1>
              <p className="text-base font-medium text-center mb-10">
                {data.topicname ? (
                  capitalizeEachWord(data.topicname)
                ) : (
                  <Placeholder className="text-base font-semibold" />
                )}
              </p>

              <h1 className="text-center text-lg font-bold underline mb-10 mt-5">
                {submittedToTitle}
              </h1>
              <div className="ml-4 space-y-1 text-base font-medium">
                <InfoRow label={teacherNameLabel} value={data.teacherName} />
                <p className="text-base text-center font-bold mt-4">
                  {universityName}
                </p>
              </div>
            </div>

            <div
              className="w-[2px] -mr-4 px-0.5 -mt-6 bg-[#9BBB58]/80 flex items-center justify-center"
              style={{ backgroundColor: "#9BBB58" }}
            />

            <div
              className="w-[2px] -mr-4 px-1 -mt-6 bg-[#9BBB58]/80 flex items-center justify-center"
              style={{ backgroundColor: "#9BBB58" }}
            />

            <div
              className="w-1/2 -mt-6 flex flex-col bg-[#9BBB58] p-4 border-[#9BBB58]"
              style={{
                backgroundColor: "#9BBB58",
                borderColor: "#9BBB58",
              }}
            >
              <div>
                <img
                  src={data.bglogo}
                  alt="Background Logo"
                  className="ml-7 mt-20 mb-20 w-54 opacity-15"
                />
              </div>

              <div>
                <h1 className="text-center text-lg font-bold underline mb-4">{submittedByTitle}</h1>

                {data.courseType === "project" && !singlePersonProject ? (
                  <div className="space-y-3 text-base font-medium z-10 relative">
                    <div className="text-center font-semibold mb-2">{teamMembersLabel}</div>
                    {data.teamName && data.teamName.length > 0 ? (
                      <div className="space-y-1">
                        {data.teamName.map((member, index) => (
                          <p key={`bba-team-member-${index}`} className="text-center">
                            {member.studentName && member.studentId ? (
                              <span>
                                {capitalizeEachWord(member.studentName)} ({member.studentId})
                              </span>
                            ) : member.studentName ? (
                              <span>{capitalizeEachWord(member.studentName)}</span>
                            ) : member.studentId ? (
                              <span>({member.studentId})</span>
                            ) : (
                              <span className="text-gray-600">-</span>
                            )}
                          </p>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-gray-600">No team members</p>
                    )}

                    <div className="mt-4 space-y-1">
                      <InfoRow label={sectionLabel} value={data.section} />
                      <InfoRow label={departmentLabel} value={data.department} />
                      <p className="text-center font-bold mt-2">
                        {universityName}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 text-base font-medium z-10 relative">
                    <InfoRow
                      label={studentNameLabel}
                      value={singlePersonProject ? singleProjectMember?.studentName : data.studentName}
                    />
                    <InfoRow
                      label={studentIdLabel}
                      value={singlePersonProject ? singleProjectMember?.studentId : data.studentId}
                    />
                    <InfoRow label={sectionLabel} value={data.section} />
                    <InfoRow label={departmentLabel} value={data.department} />
                    <p className="text-center font-bold">{universityName}</p>
                  </div>
                )}

                <p className="text-base text-center font-semibold mt-6 mb-25">
                  <span className="underline">{submissionDateLabel}:</span>{" "}
                  {data.date ? (
                    capitalizeEachWord(data.date)
                  ) : (
                    <Placeholder className="text-base font-semibold" />
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
