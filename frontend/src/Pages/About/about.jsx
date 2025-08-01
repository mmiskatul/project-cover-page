import React from "react";
import {
  FaFileAlt,
  FaMagic,
  FaUserAlt,
  FaGithub,
  FaLinkedin,
  FaCode,
  FaEnvelope,
} from "react-icons/fa";
import devPic from "../../assets/develop.png";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="bg-gray-50 mt-18 min-h-screen px-6 md:px-16 py-12 text-gray-800">
      {/* Section Header */}
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-900">
        About This Website
      </h1>

      {/* Introduction */}
      <p className="text-lg mb-10 max-w-3xl mx-auto text-center text-gray-700 leading-relaxed">
        This platform is built to streamline the process of creating polished
        and personalized
        <span className="font-semibold"> assignment cover pages</span>. Whether
        you're submitting academic work or professional documents, our tool
        provides a range of clean templates and a seamless merging feature to
        ensure your documents stand out — without the hassle of manual
        formatting.
      </p>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
        <div className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg transition">
          <FaFileAlt className="text-4xl text-blue-500 mb-4" />
          <h3 className="font-semibold text-xl mb-2">Multiple Templates</h3>
          <p className="text-gray-600">
            Choose from a curated set of elegant and academic-friendly cover
            page designs.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg transition">
          <FaMagic className="text-4xl text-green-500 mb-4" />
          <h3 className="font-semibold text-xl mb-2">Smart Merge</h3>
          <p className="text-gray-600">
            Instantly combine your selected cover page with any PDF file, ready
            for submission.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg transition">
          <FaUserAlt className="text-4xl text-purple-500 mb-4" />
          <h3 className="font-semibold text-xl mb-2">Beginner Friendly</h3>
          <p className="text-gray-600">
            Easy-to-use interface — no technical or design skills required.
          </p>
        </div>
      </div>

      {/* Developer Card */}
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md mx-auto text-center">
      <h2 className="text-3xl font-bold mb-4 text-gray-900">Developed By</h2>

      <img
        src={devPic}
        alt="Developer"
        className="w-28 h-28 rounded-full object-cover mx-auto border-4 border-blue-200 shadow-md"
      />

      <div className="mt-4">
        <p className="text-xl font-semibold text-gray-800">Md. Miskatul Masabi</p>
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
