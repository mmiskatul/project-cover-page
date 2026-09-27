"use client";

import Link from "next/link";
import { RiGeminiFill } from "react-icons/ri";

const Hero = () => {

    return (
        <section className="relative flex flex-col items-center bg-gradient-to-b from-[#F1EAFF] via-purple-50/40 to-white text-gray-800 pb-16 sm:pb-24 pt-20 sm:pt-28 px-3 sm:px-6 overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
                <div className="absolute top-0 right-1/4 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
                <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
            </div>

            <div className="relative z-10 max-w-7xl w-full flex flex-col items-center">
                {/* Header section */}
                <div className="text-center max-w-4xl px-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 mb-4 sm:mb-6">
                        ✨ University Standard Cover Page Generator
                    </span>
                    <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-3 sm:mb-6 tracking-tight">
                        Professional Assignment Cover Pages <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">Made Simple</span>
                    </h1>
                    <p className="text-xs sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Create polished, academic cover pages in minutes with our intuitive builder.
                    </p>
                </div>

                {/* CTA Button */}
                <div className="mt-6 sm:mt-8">
                    <Link
                        href="/template"
                        className="group relative inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 overflow-hidden font-bold text-white rounded-xl sm:rounded-full transition-all duration-300 bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 shadow-lg hover:shadow-xl active:scale-[0.98]"
                    >
                        <span className="relative text-sm sm:text-base md:text-lg">Generate Cover Page</span>
                        <RiGeminiFill className="ml-2.5 text-yellow-200 text-lg sm:text-xl transition-transform group-hover:rotate-12" />
                        <span className="absolute inset-0 border-2 border-white rounded-xl sm:rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    </Link>
                </div>




            </div>
        </section>
    );
};

export default Hero;
