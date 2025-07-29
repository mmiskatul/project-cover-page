import logo from "../../assets/daffodil-international-university-seeklogo.png";
import bglogo from "../../assets/BgImage.png";

// Capitalize each word
function capitalizeEachWord(str) {
  if (!str) return "";
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}


// Info Row Component
function InfoRow({ label,value }) {
  return (
    <p className="text-base text-center">
      <span className="font-semibold">{label} :</span> {capitalizeEachWord(value) }
    </p>
  );
}

export default function Default2PreviewPDF({ data }) {
  if (!data) {
    return (
      <h3 className="text-center text-base font-semibold mt-5">
        No data submitted yet.
      </h3>
    );
  }

  return (
    <div className="w-full flex justify-center items-center min-h-screen bg-gray-100">
      {/* A4 Container */}
      <div
        className="relative bg-white shadow-md overflow-hidden"
        style={{
          width: "794px", // A4 width
          height: "1123px", // A4 height
          padding: "20px", // page margin
          boxSizing: "border-box",
        }}
      >
       

        {/* Content Box */}
        <div className="relative z-10 w-full h-full border border-gray-400 p-8 box-border flex flex-col items-center space-y-5">
          {/* Logo */}
          <img src={logo} alt="DIU Logo" className="w-80 my-14" />

          {/* Report Title Bar */}
          <div className="-mx-8 px-8 w-[calc(100%+64px)] bg-blue-500 flex justify-between items-center">
            <h3 className="text-xl ml-30 font-semibold py-2 text-white">Report</h3>
            <h3 className="text-xl font-bold py-2 text-white" />
          </div>

          {/* Info Section */}
          <div className="w-full flex flex-col lg:flex-row justify-between items-start gap-6">
            
            <div className="w-full flex flex-col lg:flex-row justify-between items-start gap-6 ">
            {/* Left - Course & Teacher Info */}
            <div className="w-1/2 ">
              <h1 className="text-center mt-10 mb-6 font-bold text-lg underline">COURSE</h1> 
              <div className="space-y-0 text-sm font-medium">
                <InfoRow label="Course Name" value={data.courseName} />
                <InfoRow label="Course Code" value={data.courseId} />
              </div>
              <h1 className="text-center mt-10 mb-6 font-bold text-lg underline">TOPIC</h1> 
              <div className="space-y-0 text-base font-medium">
                <h3>
                  <span className="font-semibold text-center "></span> {capitalizeEachWord(data.topicname)}
                </h3>
              </div>

              <div className="text-sm text-center font-bold underline mt-4">Submitted To:</div>
              <div className="ml-4 space-y-1 text-base font-medium">
                <InfoRow label="Name" value={data.teacherName} />
                <InfoRow label="Department" value={data.department} />
                <p className="text-lg font-bold">Daffodil International University</p>
              </div>
            </div>

            {/* Right - Student Info */}
            <div className="w-1/2  -mr-8 -mt-5  bg-lime-400/80 p-4 ">
              <img src={bglogo} alt=""  className="w-60 -z-10 opacity-20 ml-5 mb-15 "/>
              <div className="text-lg text-center font-bold underline my">Submitted By:</div>
              <div className="ml-4  text-base font-medium">
                <InfoRow label="Name" value={data.studentName} />
                <InfoRow label="ID" value={data.studentId} />
                <InfoRow label="Section" value={data.section} />
                <InfoRow label="Semester" value={data.semester} />
                <InfoRow label="Department" value={data.department} />
                <p className="text-lg font-bold">Daffodil International University</p>
              </div>

              <p className="text-base font-semibold mt-4">
                <span className="underline">Submission Date:</span>{" "}
                 {capitalizeEachWord(data.date)}
              </p>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
