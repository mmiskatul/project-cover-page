import type { CoverTemplateData } from "@/components/pdf/common/types";
import { getDefaultSweEvaluation } from "./swe-evaluation-config";

function SweTeacherEvaluation({ data }: { data: CoverTemplateData }) {
  const defaultEvaluation = getDefaultSweEvaluation(data.courseType);

  // Use custom rows if present (and non-empty), otherwise fall back to defaults
  const hasCustomRows =
    Array.isArray(data.sweCriteriaRows) && data.sweCriteriaRows.length > 0;

  const evaluationRows = hasCustomRows
    ? data.sweCriteriaRows!.map((row, index) => ({
        label:
          row.label?.trim() || defaultEvaluation.rows[index]?.label || `Row ${index + 1}`,
        mark:
          row.mark?.trim() || defaultEvaluation.rows[index]?.mark || "0",
      }))
    : defaultEvaluation.rows.map((r) => ({ label: r.label, mark: r.mark }));

  const totalMark = evaluationRows.reduce((sum, row) => {
    const parsedMark = Number.parseInt(row.mark, 10);
    return Number.isFinite(parsedMark) ? sum + parsedMark : sum;
  }, 0);

  return (
    <div
      className="w-full text-black bg-white"
      style={{ fontFamily: "Arial, 'Segoe UI', Calibri, sans-serif" }}
    >
      <table
        className="w-full border-[1.5px] border-black border-collapse text-black"
        style={{ borderCollapse: "collapse", tableLayout: "fixed" }}
      >
        <colgroup>
          <col style={{ width: "26.44%" }} />
          <col style={{ width: "5.75%" }} />
          <col style={{ width: "16.67%" }} />
          <col style={{ width: "15.23%" }} />
          <col style={{ width: "12.93%" }} />
          <col style={{ width: "12.64%" }} />
          <col style={{ width: "10.34%" }} />
        </colgroup>

        <tbody>
          <tr>
            <td colSpan={2} className="border border-black"></td>
            <td
              colSpan={5}
              className="border border-black py-0.5 px-1 text-center text-[11px] font-bold text-black"
            >
              Only for course Teacher
            </td>
          </tr>

          <tr>
            <td colSpan={2} className="border border-black"></td>
            <td className="border border-black py-1 px-0.5 text-center text-[10px] font-bold leading-tight text-black">
              Needs<br />Improvement
            </td>
            <td className="border border-black py-1 px-0.5 text-center text-[10px] font-bold leading-tight text-black">
              Developing
            </td>
            <td className="border border-black py-1 px-0.5 text-center text-[10px] font-bold leading-tight text-black">
              Sufficient
            </td>
            <td className="border border-black py-1 px-0.5 text-center text-[10px] font-bold leading-tight text-black">
              Above<br />Average
            </td>
            <td className="border border-black py-1 px-0.5 text-center text-[10px] font-bold leading-tight text-black">
              Total<br />Mark
            </td>
          </tr>

          <tr>
            <td
              colSpan={2}
              className="border border-black py-0.5 px-2 text-[11px] font-bold leading-tight text-black"
            >
              Allocate mark &amp; Percentage
            </td>
            <td className="border border-black py-0.5 px-0.5 text-center text-[11px] font-bold text-black">25%</td>
            <td className="border border-black py-0.5 px-0.5 text-center text-[11px] font-bold text-black">50%</td>
            <td className="border border-black py-0.5 px-0.5 text-center text-[11px] font-bold text-black">75%</td>
            <td className="border border-black py-0.5 px-0.5 text-center text-[11px] font-bold text-black">100%</td>
            <td className="border border-black py-0.5 px-0.5 text-center text-[11px] font-bold text-black">
              {totalMark}
            </td>
          </tr>

          {evaluationRows.map((row, index) => (
            <tr key={`${data.courseType}-${row.label}-${index}`}>
              <td className="border border-black py-1 px-2 text-[11px] font-medium text-left leading-tight text-black">
                {row.label}
              </td>
              <td className="border border-black py-1 px-0.5 text-center text-[11px] font-medium text-black">
                {row.mark}
              </td>
              <td className="border border-black py-1"></td>
              <td className="border border-black py-1"></td>
              <td className="border border-black py-1"></td>
              <td className="border border-black py-1"></td>
              <td className="border border-black py-1"></td>
            </tr>
          ))}

          <tr>
            <td
              colSpan={6}
              className="border border-black py-0.5 px-2 text-[11px] font-bold text-right text-black"
            >
              Total obtained mark
            </td>
            <td className="border border-black py-0.5"></td>
          </tr>

          <tr>
            <td
              colSpan={2}
              className="border border-black py-2 px-2 text-[11px] font-bold align-top text-black"
              style={{ height: "76px" }}
            >
              Comments
            </td>
            <td colSpan={5} className="border border-black py-2 px-2 align-top" style={{ height: "76px" }}></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default SweTeacherEvaluation;
