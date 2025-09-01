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
  FaBrain,
} from "react-icons/fa";
import devPic from "../../assets/develop.png";

function About() {
  return (
    <div className="min-h-screen pt-20 px-8 md:px-0 py-16 text-gray-800 max-w-5xl mx-auto relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
      
        * {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>

      {/* Background element */}
      <div className="size-[520px] -top-80 left-1/2 -translate-x-1/2 rounded-full absolute blur-[300px] -z-10 bg-[#FBFFE1]"></div>

      {/* Header */}
      <h1 className="text-3xl font-semibold text-center mx-auto">
        About My Website
      </h1>
      <p className="text-sm text-slate-500 text-center mt-2 max-w-lg mx-auto">
        A platform designed to create polished assignment cover pages - each
        template crafted with precision and style.
      </p>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 pt-16">
        <div>
          <div className="size-10 p-2 bg-indigo-50 border border-indigo-200 rounded flex items-center justify-center">
            <FaFileAlt className="text-indigo-500" />
          </div>
          <div className="mt-5 space-y-2">
            <h3 className="text-base font-medium text-slate-600">
              Multiple Templates
            </h3>
            <p className="text-sm text-slate-500">
              Choose from a curated set of elegant and academic-friendly cover
              page designs.
            </p>
          </div>
        </div>

        <div>
          <div className="size-10 p-2 bg-indigo-50 border border-indigo-200 rounded flex items-center justify-center">
            <FaMagic className="text-indigo-500" />
          </div>
          <div className="mt-5 space-y-2">
            <h3 className="text-base font-medium text-slate-600">
              Smart Merge
            </h3>
            <p className="text-sm text-slate-500">
              Instantly combine your selected cover page with any PDF file,
              ready for submission.
            </p>
          </div>
        </div>

        <div>
          <div className="size-10 p-2 bg-indigo-50 border border-indigo-200 rounded flex items-center justify-center">
            <FaUserAlt className="text-indigo-500" />
          </div>
          <div className="mt-5 space-y-2">
            <h3 className="text-base font-medium text-slate-600">
              Beginner Friendly
            </h3>
            <p className="text-sm text-slate-500">
              Easy-to-use interface — no technical or design skills required.
            </p>
          </div>
        </div>

        <div>
          <div className="size-10 p-2 bg-indigo-50 border border-indigo-200 rounded flex items-center justify-center">
            <FaBolt className="text-indigo-500" />
          </div>
          <div className="mt-5 space-y-2">
            <h3 className="text-base font-medium text-slate-600">
              Fast Processing
            </h3>
            <p className="text-sm text-slate-500">
              Quickly generate and download your cover pages without delays.
            </p>
          </div>
        </div>

        <div>
          <div className="size-10 p-2 bg-indigo-50 border border-indigo-200 rounded flex items-center justify-center">
            <FaPalette className="text-indigo-500" />
          </div>
          <div className="mt-5 space-y-2">
            <h3 className="text-base font-medium text-slate-600">
              Customizable
            </h3>
            <p className="text-sm text-slate-500">
              Personalize templates with your own colors and information.
            </p>
          </div>
        </div>

        <div>
          <div className="size-10 p-2 bg-indigo-50 border border-indigo-200 rounded flex items-center justify-center">
            <FaPuzzlePiece className="text-indigo-500" />
          </div>
          <div className="mt-5 space-y-2">
            <h3 className="text-base font-medium text-slate-600">
              Easy Integration
            </h3>
            <p className="text-sm text-slate-500">
              Works seamlessly with your existing documents and workflows.
            </p>
          </div>
        </div>
      </div>

      {/* Developer Section */}
     {/* Developer Section */}
<div className="mt-32 relative">
  <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">
    Developed By
  </h2>

  <div className="bg-white/60 backdrop-blur-md shadow-xl rounded-2xl p-10 flex flex-col md:flex-row items-center justify-center gap-10 max-w-4xl mx-auto border border-indigo-100">
    {/* Developer Photo */}
    <div className="relative group">
      <img
        src={devPic}
        alt="Md. Miskatul Masabi"
        className="w-40 h-40 rounded-full object-cover border-4 border-indigo-100 shadow-lg transition-transform duration-300 group-hover:scale-105"
      />
      <span className="absolute inset-0 rounded-full border-2 border-indigo-400/50 animate-pulse"></span>
    </div>

    {/* Developer Info */}
    <div className="text-center md:text-left">
      <h3 className="text-2xl font-semibold text-gray-800">
        Md. <span className="text-indigo-600">Miskatul Masabi</span>
      </h3>
      <p className="text-indigo-500 font-medium mt-1">
        Full Stack Developer | AI Enthusiast
      </p>

      <p className="mt-4 text-gray-700 max-w-md">
        Passionate software engineer with hands-on experience in web and AI development, building smart applications and solving real-world problems with code.
      </p>

      <div className="mt-6 space-y-3 text-gray-700">
        <p className="flex items-center gap-2">
          <FaBook className="text-indigo-500" />
          BSc in Software Engineering, Daffodil International University
        </p>
        <p className="flex items-center gap-2">
          <FaBox className="text-indigo-500" />
          Specializes in Full Stack Web Applications (React, Node.js, Express, MongoDB)
        </p>
        <p className="flex items-center gap-2">
          <FaBrain className="text-indigo-500" />
          Machine Learning & AI Enthusiast (Basic knowledge of Python)
        </p>
        <p className="flex items-center gap-2">
          <FaBolt className="text-indigo-500" />
          Current Projects: AI-powered web apps, Automation tools, Data Analysis
        </p>
        <p className="flex items-center gap-2">
          <FaEnvelope className="text-indigo-500" />
          <a
            href="mailto:masabimiskat@gmail.com"
            className="hover:underline hover:text-indigo-600 transition-colors"
          >
            masabimiskat@gmail.com
          </a>
        </p>
        <p className="flex items-center gap-2">
          <FaPuzzlePiece className="text-indigo-500" />
          Achievements: Codeforces Rated, Completed multiple professional certifications
        </p>
      </div>

      {/* Social Links */}
      <div className="flex justify-center md:justify-start gap-4 mt-6">
        <a
          href="https://github.com/mmiskatul"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-black shadow transition"
          aria-label="GitHub Profile"
        >
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/md-mishkatul-masabi-b55b76292/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 hover:text-blue-800 shadow transition"
          aria-label="LinkedIn Profile"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://codeforces.com/profile/Miskatul_Masabi"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-black shadow transition"
          aria-label="Codeforces Profile"
        >
          <FaCode />
        </a>
      </div>
    </div>
  </div>
</div>

    </div>
  );
}

export default About;
