import SweTeacherEvaluation from "./SweTeacherEvaluation";
import Placeholder from "@/components/pdf/common/Placeholder";
import {
  capitalizeEachWord,
  getSentenceCaseReportTitle,
  isSinglePersonProject,
} from "@/components/pdf/common/format";
import type { CoverTemplateData } from "@/components/pdf/common/types";

export default function PreviewPDF({ data }: { data?: CoverTemplateData }) {
  if (!data)
    return (
      <h3 className="text-center text-lg font-semibold mt-5">
        No data submitted yet.
      </h3>
    );

  const singlePersonProject = isSinglePersonProject(data);
  const singleProjectMember = data.teamName?.[0];

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
          {getSentenceCaseReportTitle(data.courseType)}
        </h3>

        {/* Mark Distribution Table */}
        <SweTeacherEvaluation data={data} />

        {/* Metadata Section */}
        <div className="w-full mt-6 space-y-3 text-left text-xl font-medium">
          <p>
            <span className="font-bold">Semester:</span>{" "}
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
                <span className="font-bold">Student Name:</span>{" "}
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
                <span className="font-bold">Student ID:</span>{" "}
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
              <p className="font-bold text-center mb-2">Team Members</p>
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

          {(data.courseType !== "project" || singlePersonProject) && <div className="flex flex-row gap-20">
            <p>
              <span className="font-bold">Batch:</span>{" "}
              {data.batch ? (
                capitalizeEachWord(data.batch)
              ) : (
                <Placeholder />
              )}
            </p>
            <p>
              <span className="font-bold">Section:</span>{" "}
              {data.section ? (
                capitalizeEachWord(data.section)
              ) : (
                <Placeholder />
              )}
            </p>
          </div>}

          <div className="flex flex-row justify-between gap-3 items-start">
             <p>
              <span className="font-bold">Course Name:</span>{" "}
              {data.courseName ? (
                capitalizeEachWord(data.courseName)
              ) : (
                <Placeholder />
              )}
            </p>
            <p className="whitespace-nowrap flex items-center gap-1">
              <span className="font-bold">Course Code:</span>{" "}
              {data.courseId ? data.courseId : <Placeholder />}
            </p>
          </div>

          <p>
            <span className="font-bold">Teacher Name:</span>{" "}
            {data.teacherName ? (
              capitalizeEachWord(data.teacherName)
            ) : (
              <Placeholder />
            )}
          </p>
          <p>
            <span className="font-bold">Designation:</span>{" "}
            {data.teacherDesignation ? (
              capitalizeEachWord(data.teacherDesignation)
            ) : (
              <Placeholder />
            )}
          </p>
          <p>
            <span className="font-bold">Date:</span>{" "}
            {data.date ? data.date : <Placeholder />}
          </p>
        </div>
      </div>
    </div>
  );
}
