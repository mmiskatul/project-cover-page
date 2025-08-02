import React from "react";
import {
  FaFileAlt,
  FaMagic,
  FaUserAlt,
  FaGithub,
  FaLinkedin,
  FaCode,
  FaEnvelope,
  FaBolt,
  FaPalette,
  FaPuzzlePiece,
  FaBook,
  FaBox,
  FaBrain
} from "react-icons/fa";
import devPic from "../../assets/develop.png";

function About() {
  return (
    <div className="min-h-screen mt-10 px-8 md:px-0 py-16 text-gray-800 max-w-5xl mx-auto relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
      
        * {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>
      
      {/* Background element */}
      <div className="size-[520px] -top-80 left-1/2 -translate-x-1/2 rounded-full absolute blur-[300px] -z-10 bg-[#FBFFE1]"></div>

      {/* Header */}
      <h1 className="text-3xl font-semibold text-center mx-auto">About our app</h1>
      <p className="text-sm text-slate-500 text-center mt-2 max-w-lg mx-auto">
        A platform designed to create polished assignment cover pages - each template crafted with precision and style.
      </p>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 pt-16">
        <div>
          <div className="size-10 p-2 bg-indigo-50 border border-indigo-200 rounded flex items-center justify-center">
            <FaFileAlt className="text-indigo-500" />
          </div>
          <div className="mt-5 space-y-2">
            <h3 className="text-base font-medium text-slate-600">Multiple Templates</h3>
            <p className="text-sm text-slate-500">Choose from a curated set of elegant and academic-friendly cover page designs.</p>
          </div>
        </div>

        <div>
          <div className="size-10 p-2 bg-indigo-50 border border-indigo-200 rounded flex items-center justify-center">
            <FaMagic className="text-indigo-500" />
          </div>
          <div className="mt-5 space-y-2">
            <h3 className="text-base font-medium text-slate-600">Smart Merge</h3>
            <p className="text-sm text-slate-500">Instantly combine your selected cover page with any PDF file, ready for submission.</p>
          </div>
        </div>

        <div>
          <div className="size-10 p-2 bg-indigo-50 border border-indigo-200 rounded flex items-center justify-center">
            <FaUserAlt className="text-indigo-500" />
          </div>
          <div className="mt-5 space-y-2">
            <h3 className="text-base font-medium text-slate-600">Beginner Friendly</h3>
            <p className="text-sm text-slate-500">Easy-to-use interface — no technical or design skills required.</p>
          </div>
        </div>

        <div>
          <div className="size-10 p-2 bg-indigo-50 border border-indigo-200 rounded flex items-center justify-center">
            <FaBolt className="text-indigo-500" />
          </div>
          <div className="mt-5 space-y-2">
            <h3 className="text-base font-medium text-slate-600">Fast Processing</h3>
            <p className="text-sm text-slate-500">Quickly generate and download your cover pages without delays.</p>
          </div>
        </div>

        <div>
          <div className="size-10 p-2 bg-indigo-50 border border-indigo-200 rounded flex items-center justify-center">
            <FaPalette className="text-indigo-500" />
          </div>
          <div className="mt-5 space-y-2">
            <h3 className="text-base font-medium text-slate-600">Customizable</h3>
            <p className="text-sm text-slate-500">Personalize templates with your own colors and information.</p>
          </div>
        </div>

        <div>
          <div className="size-10 p-2 bg-indigo-50 border border-indigo-200 rounded flex items-center justify-center">
            <FaPuzzlePiece className="text-indigo-500" />
          </div>
          <div className="mt-5 space-y-2">
            <h3 className="text-base font-medium text-slate-600">Easy Integration</h3>
            <p className="text-sm text-slate-500">Works seamlessly with your existing documents and workflows.</p>
          </div>
        </div>
      </div>

      {/* Developer Card */}
      <div className="mt-32 max-w-md mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-4">Developed By</h2>

        <img
          src={devPic}
          alt="Developer"
          className="w-28 h-28 rounded-full object-cover mx-auto border-4 border-indigo-200 shadow-md"
        />

        <div className="mt-4">
          <p className="text-xl font-medium text-gray-800">Md. Miskatul Masabi</p>
          <p className="text-gray-600 text-sm">BSc in Software Engineering</p>
          <p className="text-gray-500 text-sm mb-2">
            Daffodil International University (DIU)
          </p>
          <p className="text-gray-700 text-sm">
            Full Stack Developer • React • Node.js • Express • MongoDB
          </p>
          <p className="text-gray-700 text-sm">Problem Solver • Aspiring AI Engineer</p>

          {/* Email Line with Icon */}
          <p className="text-sm text-gray-600 mt-2 flex justify-center items-center gap-2">
            <FaEnvelope className="text-red-500" />
            <a
              href="mailto:masabimiskat@gmail.com"
              className="hover:underline text-gray-800"
            >
              masabimiskat@gmail.com
            </a>
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-5 mt-6 text-2xl">
          <a
            href="https://github.com/mmiskatul"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-black transition-transform hover:scale-110"
            title="GitHub"
          >
            <FaGithub />
          </a>

          <a
            href="https://www.linkedin.com/in/md-mishkatul-masabi-b55b76292/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 transition-transform hover:scale-110"
            title="LinkedIn"
          >
            <FaLinkedin />
          </a>

          <a
            href="https://codeforces.com/profile/Miskatul_Masabi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-700 hover:text-purple-900 transition-transform hover:scale-110"
            title="Codeforces"
          >
            <FaCode />
          </a>
        </div>
      </div>
    </div>
  );
}

export default About;