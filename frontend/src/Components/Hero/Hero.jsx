import { RiGeminiFill } from "react-icons/ri";
import { Link } from "react-router-dom";
const Hero = () => {
    return (
        <section className="flex flex-col items-center bg-gradient-to-b from-[#F1EAFF] to-[#FFFFFF] text-gray-800 pb-16 text-sm">
            
            {/* Assignement Cover page Builder Hero */}
            <h1 className="text-4xl mt-32 md:text-6xl text-center font-medium max-w-3xl  bg-gradient-to-r from-black to-[#748298] text-transparent bg-clip-text">
                Build Your Assignment Cover Page with Ease
            </h1>
            <p className="text-slate-600 md:text-base max-md:px-2 text-center max-w-xl mt-3">
                Create stunning assignment cover pages effortlessly with our intuitive builder. Choose from a variety of templates, customize your design, and download your cover page in seconds.
            </p>

            <Link to='/template' className="flex items-center hover:scale-105 gap-2  bg-indigo-800 hover:bg-indigo-600 text-white px-8 py-3 mt-8 rounded-full transition active:scale-95 active:bg-indigo-800">
                <span className='font-bold text-xl  '>Generate </span>    
                <RiGeminiFill  className=' text-yellow-200 text-lg'/>            
            </Link>
            <div className="overflow-hidden w-full relative max-w-5xl mx-auto select-none mt-16">
                <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-[#f5f7ff] to-transparent"></div>
                <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-[#efe9f4] to-transparent"></div>
            </div>
        </section>
    );
};

export default Hero;