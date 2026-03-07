import type { CoverTemplateData } from "@/components/pdf/common/types";
import { getDefaultSweEvaluation } from "./swe-evaluation-config";

function SweTeacherEvaluation({ data }: { data: CoverTemplateData }) {
  const defaultEvaluation = getDefaultSweEvaluation(data.courseType);
  const evaluationRows = defaultEvaluation.rows.map((defaultRow, index) => {
    const customRow = data.sweCriteriaRows?.[index];
    const customLabel =
      typeof customRow?.label === "string" && customRow.label.trim()
        ? customRow.label.trim()
        : defaultRow.label;
    const customMark =
      typeof customRow?.mark === "string" && customRow.mark.trim()
        ? customRow.mark.trim()
        : defaultRow.mark;

    return {
      label: customLabel,
      mark: customMark,
    };
  });
  const totalMark = evaluationRows.reduce((sum, row) => {
    const parsedMark = Number.parseInt(row.mark, 10);
    return Number.isFinite(parsedMark) ? sum + parsedMark : sum;
  }, 0);

  return (
    <div className="w-full -ml-10  px-6 text-black font-bold bg-white">

      <table className="w-full border border-black border-collapse text-sm">
        <thead>
          <tr>
            <td
              className="border border-black px-5 py-1 text-center font-semibold"
              colSpan={7}
            >
              Only for course Teacher
            </td>
          </tr>
        </thead>

        <tbody>
          <tr>
            <th className="border border-black px-2 py-1 text-left w-[30%]" colSpan={2}></th>
            <th className="border border-black px-2 py-1 text-left">
              Needs <br /> Improvement
            </th>
            <th className="border border-black px-2 py-1 text-left">Developing</th>
            <th className="border border-black px-2 py-1 text-left">Sufficient</th>
            <th className="border border-black px-2 py-1 text-left">Above Average</th>
            <th className="border border-black px-2 py-1 text-left">Total Mark</th>
          </tr>

          <tr>
            <td className="border border-black px-5 py-1" colSpan={2}>
              Allocate mark <br /> & Percentage
            </td>
            <td className="border border-black px-5 py-1">25%</td>
            <td className="border border-black px-5 py-1">50%</td>
            <td className="border border-black px-5 py-1">75%</td>
            <td className="border border-black px-5 py-1">100%</td>
            <td className="border border-black px-5 py-1 font-semibold">{`${totalMark}`}</td>
          </tr>

          {evaluationRows.map((row) => (
            <tr key={`${data.courseType}-${row.label}`}>
              <td className="border border-black px-2 py-1 w-[25%]">{row.label}</td>
              <td className="border border-black px-2 py-1 w-[6%] text-center">{row.mark}</td>
              <td className="border border-black px-5 py-1"></td>
              <td className="border border-black px-5 py-1"></td>
              <td className="border border-black px-5 py-1"></td>
              <td className="border border-black px-5 py-1"></td>
              <td className="border border-black px-5 py-1"></td>
            </tr>
          ))}

          <tr>
            <td
              colSpan={6}
              className="border border-black px-5 py-1 font-semibold text-right"
            >
              Total obtained mark
            </td>
            <td className="border border-black px-5 py-1 font-semibold"></td>
          </tr>

          <tr>
            <td className="border border-black px-5 py-5 font-semibold">Comments</td>
            <td colSpan={6} className="border border-black px-5 py-5 font-semibold"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default SweTeacherEvaluation;
