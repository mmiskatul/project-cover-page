
function TeacherEvaluation({ data }) {
  return (
    <div className=" mx-auto px-4 pb-4 bg-white ">
      <h2 className="text-center text-xl font-bold mb-4"></h2>

      <table className="w-full text-black font-bold border-collapse border ">
        <thead>
          <tr>
            <td
              className="border  px-6 md:px-2 lg:px-3  py-1 font-semibold text-center"
              colSpan={7}
            >
              Only for course Teacher
            </td>
          </tr>
        </thead>

        <tbody>
          <tr>
            <th className="border  px-6 md:px-2 lg:px-3  py-1 text-left" colSpan={2}></th>
            <th className="border 300 px-6 md:px-2 lg:px-3  py-1 text-left">
              Needs <br /> Improvement
            </th>
            <th className="border  px-6 md:px-2 lg:px-3  py-1 text-left">Developing</th>
            <th className="border  px-6 md:px-2 lg:px-3  py-1 text-left">Sufficient</th>
            <th className="border  px-6 md:px-2 lg:px-3  py-1 text-left">Above Average</th>
            <th className="border  px-6 md:px-2 lg:px-3  py-1 text-left">Total Mark</th>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td className="border  px-6 md:px-2 lg:px-3  py-1" colSpan={2}>
              Allocate mark <br /> & Percentage{" "}
            </td>
            <td className="border  px-6 md:px-2 lg:px-3  py-1">25%</td>
            <td className="border  px-6 md:px-2 lg:px-3  py-1">50%</td>
            <td className="border  px-6 md:px-2 lg:px-3  py-1">75%</td>
            <td className="border  px-6 md:px-2 lg:px-3  py-1">100%</td>
            <td className="border  px-6 md:px-2 lg:px-3  py-1 font-semibold">
              {data.courseType === "theory" ? "5" : "10" }
            </td>
          </tr>
          <tr>
            <td className="border  px-6 md:px-2 lg:px-3  py-1">Clarity</td>
            <td className="border  px-6 md:px-2 lg:px-3  py-1">
              {data.courseType === "theory" ? "1" : "2"}
            </td>
            <td className="border  px-6 md:px-2 lg:px-3  py-1"></td>
            <td className="border  px-6 md:px-2 lg:px-3  py-1"></td>
            <td className="border  px-6 md:px-2 lg:px-3  py-1"></td>
            <td className="border  px-6 md:px-2 lg:px-3  py-1"></td>
            <td className="border  px-6 md:px-2 lg:px-3  py-1"></td>
          </tr>

          <tr>
            <td className="border  px-6 md:px-2 lg:px-3  py-1">Content Quality</td>
            <td className="border  px-6 md:px-2 lg:px-3  py-1">
              {data.courseType === "theory" ? "2" : "4"}
            </td>
            <td className="border  px-6 md:px-2 lg:px-3  py-1"></td>
            <td className="border  px-6 md:px-2 lg:px-3  py-1"></td>
            <td className="border  px-6 md:px-2 lg:px-3  py-1"></td>
            <td className="border  px-6 md:px-2 lg:px-3  py-1"></td>
            <td className="border  px-6 md:px-2 lg:px-3  py-1"></td>
          </tr>

          <tr>
            <td className="border  px-6 md:px-2 lg:px-3  py-1">Spelling <br /> & Grammar</td>
            <td className="border  px-6 md:px-2 lg:px-3  py-1">
              {data.courseType === "theory" ? "1" : "2"}
            </td>
            <td className="border  px-6 md:px-2 lg:px-3  py-1"></td>
            <td className="border  px-6 md:px-2 lg:px-3  py-1"></td>
            <td className="border  px-6 md:px-2 lg:px-3  py-1"></td>
            <td className="border  px-6 md:px-2 lg:px-3  py-1"></td>
            <td className="border  px-6 md:px-2 lg:px-3  py-1"></td>
          </tr>

          <tr>
            <td className="border  px-6 md:px-2 lg:px-3  py-1">Organization  and Formatting</td>
            <td className="border  px-6 md:px-2 lg:px-3  py-1">
              {data.courseType === "theory" ? "1" : "2"}
            </td>{" "}
            <td className="border  px-6 md:px-2 lg:px-3  py-1"></td>
            <td className="border  px-6 md:px-2 lg:px-3  py-1"></td>
            <td className="border  px-6 md:px-2 lg:px-3  py-1"></td>
            <td className="border  px-6 md:px-2 lg:px-3  py-1"></td>
            <td className="border  px-6 md:px-2 lg:px-3  py-1"></td>
          </tr>

          <tr>
            <td
              colSpan={6}
              className="border  px-6 md:px-2 lg:px-3  py-1 font-semibold text-right"
            >
              Total obtained mark
            </td>
            <td className="border  px-6 md:px-2 lg:px-3  py-1 font-semibold"></td>
          </tr>

          <tr>
            <td className="border  px-8 py-5 font-semibold">Comments</td>
            <td colSpan={6} className="border  px-5 py-3 font-semibold"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TeacherEvaluation;