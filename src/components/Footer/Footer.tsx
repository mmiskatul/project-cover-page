import Link from "next/link";
import { BsTwitterX } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    {name:"Recent",path:'/recent'}

  ];

  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/md-mishkatul-masabi-b55b76292/",
      icon: (
        <FaLinkedin />
      )
    },
    {
      name: "Twitter",
      url: "#",
      icon: (
        <BsTwitterX />
      )
    }
  ];

  return (
    <footer className="w-full bg-slate-900 text-gray-300 border-t border-slate-700">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">
          {/* Branding and description */}
          <div className="space-y-1.5 md:space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">DIU PageCrafter</h2>
            <p className="text-xs md:text-sm text-gray-400 leading-relaxed max-w-sm">
              Create professional DIU assignment cover pages in seconds. 
              Designed for students to customize, merge, and download easily.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-1.5 md:space-y-3">
            <h3 className="text-xs md:text-sm font-semibold uppercase tracking-wider text-slate-200">
              Quick Links
            </h3>
            <ul className="flex flex-wrap gap-x-4 gap-y-1 md:block md:space-y-2 text-xs md:text-sm">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.path}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social and contact */}
          <div className="space-y-1.5 md:space-y-3">
            <h3 className="text-xs md:text-sm font-semibold uppercase tracking-wider text-slate-200">
              Connect With Me
            </h3>
            <div className="flex items-center space-x-3 text-base md:text-lg">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200 p-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright section */}
        <div className="mt-6 md:mt-10 pt-4 md:pt-6 border-t border-slate-800">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left">
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} DIU PageCrafter. All rights reserved.
            </p>
            <div>
              <a
                href="https://www.linkedin.com/in/md-mishkatul-masabi-b55b76292/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-400 hover:text-white transition-colors duration-200"
              >
                Developed by Md. Miskatul Masabi
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
