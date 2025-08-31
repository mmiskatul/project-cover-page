function TeacherEvaluation({ data }) {
  return (
    <div className="w-full -ml-10  px-6 text-black font-bold bg-white">

      <table className="w-full border border-black border-collapse text-sm">
        <thead>
          <tr>
            <td
              className="border border-black px-4 py-1 text-center font-semibold"
              colSpan={7}
            >
              Only for Course Teacher
            </td>
          </tr>
        </thead>

        <tbody>
          <tr>
            <th className="border border-black px-4 py-1 text-left" colSpan={2}></th>
            <th className="border border-black px-4 py-1 text-left">
              Needs <br /> Improvement
            </th>
            <th className="border border-black px-4 py-1 text-left">Developing</th>
            <th className="border border-black px-4 py-1 text-left">Sufficient</th>
            <th className="border border-black px-4 py-1 text-left">Above Average</th>
            <th className="border border-black px-4 py-1 text-left">Total Mark</th>
          </tr>

          <tr>
            <td className="border border-black px-4 py-1" colSpan={2}>
              Allocate Mark <br /> & Percentage
            </td>
            <td className="border border-black px-4 py-1">25%</td>
            <td className="border border-black px-4 py-1">50%</td>
            <td className="border border-black px-4 py-1">75%</td>
            <td className="border border-black px-4 py-1">100%</td>
            <td className="border border-black px-4 py-1 font-semibold">
              {data.courseType === "theory" ? "5" : 
              data.courseType==="lab report" || data.courseType==="project"
              ? "25" :
              data.courseType==="lab final" ?
               "40"
              
              : "10"}
            </td>
          </tr>

          <tr>
            <td className="border border-black px-4 py-1">{
                data.courseType=="lab report" ?`Problem underStanding  &  Analysis `:
                data.courseType=="lab final" || data.courseType=="project"? 'Problem Understanding':
                "Clarity" 
              }</td>
            <td className="border border-black px-4 py-1">
              {data.courseType === "theory" ? "1" :
              data.courseType ==="lab report" ? "5":
              data.courseType=="project" ? "7" :
              data.courseType==="lab final"? '10'
               : "2"}
            </td>
            <td className="border border-black px-4 py-1"></td>
            <td className="border border-black px-4 py-1"></td>
            <td className="border border-black px-4 py-1"></td>
            <td className="border border-black px-4 py-1"></td>
            <td className="border border-black px-4 py-1"></td>
          </tr>

          <tr>
            <td className="border border-black px-4 py-1">{
                data.courseType=="lab report" || data.courseType=="project" ? `Implementation `:
                data.courseType=='lab final'?"Analysis":
                "Content Quality" 
              }</td>
            <td className="border border-black px-4 py-1">
              {data.courseType === "theory" ? "2" :
              data.courseType ==="lab report" ? "10" :
              data.courseType=="project" ? "8" :
              data.courseType=='lab final'? '15'
               : "4"}
            </td>
            <td className="border border-black px-4 py-1"></td>
            <td className="border border-black px-4 py-1"></td>
            <td className="border border-black px-4 py-1"></td>
            <td className="border border-black px-4 py-1"></td>
            <td className="border border-black px-4 py-1"></td>
          </tr>

          <tr>
             <td className="border border-black px-4 py-1">{
                data.courseType=="lab report" || data.courseType=="project"? `Report Writing `:
                data.courseType=='lab final'?"Implementation":
                "Spelling & Grammar" 
              }</td>
            <td className="border border-black px-4 py-1">
              {data.courseType === "theory" ? "1" :
              data.courseType ==="lab report" || data.courseType=="project"? "10":
               data.courseType=='lab final'? '10'
               : "2"}
            </td>
           
            <td className="border border-black px-4 py-1"></td>
            <td className="border border-black px-4 py-1"></td>
            <td className="border border-black px-4 py-1"></td>
            <td className="border border-black px-4 py-1"></td>
            <td className="border border-black px-4 py-1"></td>
          </tr>

          {
            data.courseType !== "lab report" && data.courseType !=="project" &&
            <tr>
            <td className="border border-black px-4 py-1">{data.courseType === "lab final"?"Task Efficiency":"Organization & Formatting"}</td>
            <td className="border border-black px-4 py-1">
              {data.courseType === "theory" ? "1" :
              data.courseType=='lab final'?"5":
               "2"}
            </td>
            <td className="border border-black px-4 py-1"></td>
            <td className="border border-black px-4 py-1"></td>
            <td className="border border-black px-4 py-1"></td>
            <td className="border border-black px-4 py-1"></td>
            <td className="border border-black px-4 py-1"></td>
          </tr>
          }

          <tr>
            <td
              colSpan={6}
              className="border border-black px-4 py-1 font-semibold text-right"
            >
              Total Obtained Mark
            </td>
            <td className="border border-black px-4 py-1 font-semibold"></td>
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
