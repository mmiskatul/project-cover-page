import Placeholder from "@/components/pdf/common/Placeholder";
import NoDataMessage from "@/components/pdf/common/NoDataMessage";
import {
  capitalizeEachWord,
  getUppercaseReportTitle,
  isSinglePersonProject,
} from "@/components/pdf/common/format";
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
              {getUppercaseReportTitle(data.courseType)}
            </div>
            <div className="w-1/2 text-white px-6 text-lg font-semibold text-center"></div>
          </div>

          <div className="w-full flex flex-row gap-6">
            <div className="w-1/2 px-4">
              <h1 className="text-center mt-8 text-lg font-bold underline mb-3">COURSE</h1>
              <div className="space-y-2 text-sm font-medium">
                <InfoRow label="Course Name" value={data.courseName} />
                <InfoRow label="Course Code" value={data.courseId} />
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
                Submitted To:
              </h1>
              <div className="ml-4 space-y-1 text-base font-medium">
                <InfoRow label="Name" value={data.teacherName} />
                <p className="text-base text-center font-bold mt-4">
                  Daffodil International University
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
                <h1 className="text-center text-lg font-bold underline mb-4">Submitted By:</h1>

                {data.courseType === "project" && !singlePersonProject ? (
                  <div className="space-y-3 text-base font-medium z-10 relative">
                    <div className="text-center font-semibold mb-2">Team Members:</div>
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
                      <InfoRow label="Section" value={data.section} />
                      <InfoRow label="Department" value={data.department} />
                      <p className="text-center font-bold mt-2">
                        Daffodil International University
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 text-base font-medium z-10 relative">
                    <InfoRow
                      label="Name"
                      value={singlePersonProject ? singleProjectMember?.studentName : data.studentName}
                    />
                    <InfoRow
                      label="ID"
                      value={singlePersonProject ? singleProjectMember?.studentId : data.studentId}
                    />
                    <InfoRow label="Section" value={data.section} />
                    <InfoRow label="Department" value={data.department} />
                    <p className="text-center font-bold">Daffodil International University</p>
                  </div>
                )}

                <p className="text-base text-center font-semibold mt-6 mb-25">
                  <span className="underline">Submission Date:</span>{" "}
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
