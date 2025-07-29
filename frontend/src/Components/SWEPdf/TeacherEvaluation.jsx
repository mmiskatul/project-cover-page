function TeacherEvaluation({ data }) {
  return (
    <div className="w-full mt-10 px-6 text-black font-bold bg-white">

      <table className="w-full border border-black border-collapse text-sm">
        <thead>
          <tr>
            <td
              className="border border-black px-4 py-2 text-center font-semibold"
              colSpan={7}
            >
              Only for Course Teacher
            </td>
          </tr>
        </thead>

        <tbody>
          <tr>
            <th className="border border-black px-4 py-2 text-left" colSpan={2}></th>
            <th className="border border-black px-4 py-2 text-left">
              Needs <br /> Improvement
            </th>
            <th className="border border-black px-4 py-2 text-left">Developing</th>
            <th className="border border-black px-4 py-2 text-left">Sufficient</th>
            <th className="border border-black px-4 py-2 text-left">Above Average</th>
            <th className="border border-black px-4 py-2 text-left">Total Mark</th>
          </tr>

          <tr>
            <td className="border border-black px-4 py-2" colSpan={2}>
              Allocate Mark <br /> & Percentage
            </td>
            <td className="border border-black px-4 py-2">25%</td>
            <td className="border border-black px-4 py-2">50%</td>
            <td className="border border-black px-4 py-2">75%</td>
            <td className="border border-black px-4 py-2">100%</td>
            <td className="border border-black px-4 py-2 font-semibold">
              {data.courseType === "theory" ? "5" : "10"}
            </td>
          </tr>

          <tr>
            <td className="border border-black px-4 py-2">Clarity</td>
            <td className="border border-black px-4 py-2">
              {data.courseType === "theory" ? "1" : "2"}
            </td>
            <td className="border border-black px-4 py-2"></td>
            <td className="border border-black px-4 py-2"></td>
            <td className="border border-black px-4 py-2"></td>
            <td className="border border-black px-4 py-2"></td>
            <td className="border border-black px-4 py-2"></td>
          </tr>

          <tr>
            <td className="border border-black px-4 py-2">Content Quality</td>
            <td className="border border-black px-4 py-2">
              {data.courseType === "theory" ? "2" : "4"}
            </td>
            <td className="border border-black px-4 py-2"></td>
            <td className="border border-black px-4 py-2"></td>
            <td className="border border-black px-4 py-2"></td>
            <td className="border border-black px-4 py-2"></td>
            <td className="border border-black px-4 py-2"></td>
          </tr>

          <tr>
            <td className="border border-black px-4 py-2">Spelling & Grammar</td>
            <td className="border border-black px-4 py-2">
              {data.courseType === "theory" ? "1" : "2"}
            </td>
            <td className="border border-black px-4 py-2"></td>
            <td className="border border-black px-4 py-2"></td>
            <td className="border border-black px-4 py-2"></td>
            <td className="border border-black px-4 py-2"></td>
            <td className="border border-black px-4 py-2"></td>
          </tr>

          <tr>
            <td className="border border-black px-4 py-2">Organization & Formatting</td>
            <td className="border border-black px-4 py-2">
              {data.courseType === "theory" ? "1" : "2"}
            </td>
            <td className="border border-black px-4 py-2"></td>
            <td className="border border-black px-4 py-2"></td>
            <td className="border border-black px-4 py-2"></td>
            <td className="border border-black px-4 py-2"></td>
            <td className="border border-black px-4 py-2"></td>
          </tr>

          <tr>
            <td
              colSpan={6}
              className="border border-black px-4 py-2 font-semibold text-right"
            >
              Total Obtained Mark
            </td>
            <td className="border border-black px-4 py-2 font-semibold"></td>
          </tr>

          <tr>
            <td className="border border-black px-4 py-5 font-semibold">Comments</td>
            <td colSpan={6} className="border border-black px-4 py-5 font-semibold"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TeacherEvaluation;
