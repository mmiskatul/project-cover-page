import {
  CoverSheet,
  Watermark,
  InfoField,
  NoDataMessage,
  capitalizeEachWord,
  getUppercaseReportTitle,
  isSinglePersonProject,
  getCustomText,
  type CoverTemplateData,
} from "@/components/pdf/common";

const LONG_PLACEHOLDER = "....................................................";

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
    <CoverSheet>
      <Watermark bglogo={data.bglogo} opacity={0.13} />

      <div className="relative p-5 px-10 z-10 w-full h-full flex flex-col items-center">
        <img src={data.logo} alt="DIU Logo" style={{ width: "300px", marginTop: "10px" }} />

        <h3 className="text-2xl font-bold underline mt-6 mb-8">{reportTitle}</h3>

        <div className="w-full text-left text-[17px] font-medium space-y-2 mb-6">
          <InfoField label={courseCodeLabel} value={data.courseId} placeholderText={LONG_PLACEHOLDER} />
          <InfoField label={courseTitleLabel} value={data.courseName} placeholderText={LONG_PLACEHOLDER} />
          <InfoField label={topicLabel} value={data.topicname} placeholderText={LONG_PLACEHOLDER} />
        </div>

        <div className="w-full text-purple-900 text-left text-[18px] font-bold underline mb-2">
          {submittedToTitle}
        </div>
        <div className="w-full pl-32 text-left text-[16px] font-medium space-y-1 mb-6">
          <InfoField label={teacherNameLabel} value={data.teacherName} placeholderText={LONG_PLACEHOLDER} />
          <InfoField label={teacherDesignationLabel} value={data.teacherDesignation} placeholderText={LONG_PLACEHOLDER} />
          <InfoField label={departmentLabel} value={data.department} placeholderText={LONG_PLACEHOLDER} />
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
                      <span className="text-xl font-bold">{LONG_PLACEHOLDER}</span>
                    )}
                  </p>
                ))}
              </div>
            ) : (
              <span className="text-xl font-bold">{LONG_PLACEHOLDER}</span>
            )}

            <div className="mt-4 space-y-1">
              <InfoField label={sectionLabel} value={data.section} placeholderText={LONG_PLACEHOLDER} />
              <InfoField label={semesterLabel} value={data.semester} placeholderText={LONG_PLACEHOLDER} />
              <InfoField label={departmentLabel} value={data.department} placeholderText={LONG_PLACEHOLDER} />
              <p className="text-lg font-bold">{universityName}</p>
            </div>
          </div>
        ) : (
          <div className="w-full pl-32 text-left text-[16px] font-medium space-y-1 mb-6">
            <InfoField
              label={studentNameLabel}
              value={singlePersonProject ? singleProjectMember?.studentName : data.studentName}
              placeholderText={LONG_PLACEHOLDER}
            />
            <InfoField
              label={studentIdLabel}
              value={singlePersonProject ? singleProjectMember?.studentId : data.studentId}
              placeholderText={LONG_PLACEHOLDER}
            />
            <InfoField label={sectionLabel} value={data.section} placeholderText={LONG_PLACEHOLDER} />
            <InfoField label={semesterLabel} value={data.semester} placeholderText={LONG_PLACEHOLDER} />
            <InfoField label={departmentLabel} value={data.department} placeholderText={LONG_PLACEHOLDER} />
            <p className="text-lg font-bold">{universityName}</p>
          </div>
        )}

        <div className="w-full text-left text-purple-900 text-[16px] font-bold mt-20">
          <InfoField
            label={submissionDateLabel}
            value={data.date}
            labelClassName="underline text-lg font-bold"
            placeholderText={LONG_PLACEHOLDER}
          />
        </div>
      </div>
    </CoverSheet>
  );
}
