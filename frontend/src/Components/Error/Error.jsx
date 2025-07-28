import BackButton from "../BackButton/BackButton";

export default function Example() {
  return (
    <div className="flex flex-col pt-32 mb-10 bg-gradient-to-b from-[#F1EAFF] to-[#FFFFFF] items-center justify-center text-sm max-md:px-4">
      
      <h1 className="text-8xl md:text-9xl font-bold text-indigo-500">404</h1>
      <div className="h-1 w-16 rounded bg-indigo-500 my-5 md:my-7"></div>
      <p className="text-2xl md:text-3xl font-bold text-gray-800">
        Page Not Found
      </p>
      <p className="text-sm md:text-base mt-4 text-gray-500 max-w-md text-center">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <div className=" flex justify-center items-center gap-4 mt-6">
         <BackButton/>
        
      </div>
    </div>
  );
}
