import logo from "../../assets/daffodil-international-university-seeklogo.png";

// Capitalize first letter of each word
function capitalizeEachWord(str) {
  if (!str) return "";
  return str
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Reusable placeholder for empty fields
function Placeholder() {
  return <span className="text-2xl font-bold">....................................................</span>;
}
export default function DefaultPreview({ data }) {
  if (!data)
    return (
      <h3 className="text-center text-lg font-semibold mt-5">
        No data submitted yet.
      </h3>
    );

  return (
    <div className="Doc flex flex-col items-center  w-full p-4 mt-3  bg-white rounded shadow-lg">
      {/* Header & Logo */}
      <div className="flex flex-col  border-2 border-gray-500 p-10 items-center w-full max-w-4xl">
        <img src={logo} alt="DIU Logo" className="w-100 mb-4 pt-20" />
        <h3 className="text-3xl font-bold pt-10  underline">
          {data.courseType === "theory"
            ? "ASSIGNMENT "
            : data.courseType === "lab"
            ? "LAB REPORT"
            : data.courseType === "project"
            ? "Project Report"
            : "Select the type of report"}
        </h3>

          {/* Metadata Section */}

            {/* Course Code and Name */}
            <div className="w-full px-6 mb-10 space-y-0 mt-10 text-left text-xl font-medium">
              <p>
              <span className="font-bold">Course Code:</span>
              {data.courseId === "" ? <Placeholder /> : capitalizeEachWord(data.courseId)}
            </p>
            <p>
              <span className="font-bold">Course Title :</span>
              {data.courseName === "" ? <Placeholder /> : capitalizeEachWord(data.courseName)}
            </p>
            {/* Topic name */}
             <p>
              <span className="font-bold">Topic  Name :</span>
              {data.topicname === "" ? <Placeholder /> : capitalizeEachWord(data.topicname)}
            </p>
            </div>

            {/* Submitted to  */}

              {/* Teacher Info */}
              
            <div className="w-full px-6 mb-8 text-2xl space-y-2 text-left  font-bold underline">
              <h1>
                Submitted To :
              </h1>
            </div>
          <div className="w-full px-14 mb-8  space-y-0 text-left text-xl font-medium ml-30">
            
                  <p>
                  <span className="font-bold">Name :</span>
                  {data.teacherName === "" ? <Placeholder /> : capitalizeEachWord(data.teacherName)}
                </p>
                <p>
                  <span className="font-bold">Designation :</span>
                  {data.teacherDesignation === "" ? <Placeholder /> : capitalizeEachWord(data.teacherDesignation)}
                </p>
                  {/* Department */}
                <p> 
                  <span className="font-bold">Department :</span>
                  {data.department === "" ? <Placeholder /> : capitalizeEachWord(data.department)}
                </p>
                {/* University Title */}
                <p className=" text-2xl font-bold">
                  Daffodil International University
                </p>
          </div>


            {/* Submitted By */}


            <div className="w-full px-6 mb-8 space-y-3 text-left text-2xl font-bold underline">
              <h1>
                Submitted By :
              </h1>
            </div>

            <div className="w-full px-14 mb-8 space-y-0 text-left text-xl font-medium ml-30">
                {/* Student Name */}
                  <p>
                  <span className="font-bold">Name :</span>
                  {data.studentName === "" ? <Placeholder /> : capitalizeEachWord(data.studentName)}
                </p>
                {/* Student ID */}
                <p>
                  <span className="font-bold">ID :</span>
                  {data.studentId === "" ? <Placeholder /> : capitalizeEachWord(data.studentId)}
                </p>
                {/* Section  */}
                <p>
                  <span className="font-bold">Section :</span>
                  {data.section === "" ? <Placeholder /> : capitalizeEachWord(data.section)}
                </p>
                {/* Semester */}
                <p>
                  <span className="font-bold">Semester :</span>
                  {data.semester === "" ? <Placeholder /> : capitalizeEachWord(data.semester)}
                </p>
                  {/* Department */}
                <p> 
                  <span className="font-bold">Department :</span>
                  {data.department === "" ? <Placeholder /> : capitalizeEachWord(data.department)}
                </p>
                {/* University Title */}
                <p className=" text-2xl font-bold">
                  Daffodil International University
                </p>
          </div>

          {/* Submission Date   */}
          <div className="w-full px-6 mb-30 space-y-3 text-left text-xl font-bold ">
            <h1>
              <span className="underline text-2xl">Submission Date :</span>
                {data.department === "" ? <Placeholder /> : "    "+capitalizeEachWord(data.date)}

            </h1> 
            </div>

       
      </div>
    </div>
  );
}
