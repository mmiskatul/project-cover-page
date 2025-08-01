import React, { useRef, useState, useEffect } from "react";
import { FiAlignJustify } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

const NavBar = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Merge", path: "/mergepage" },
    { name: "About", path: "/about" },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const ref = useRef(null);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
  }, [isMenuOpen]);

  return (
    <div ref={ref} className="relative">
      <nav className="fixed top-0 left-0 p-6 bg-indigo-800 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50">
        {/* Logo and desktop links */}
        <div className="flex items-center justify-between w-full">
          <Link to="/" className="text-xl font-bold text-white">
            DCM
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <Link
                key={i}
                to={link.path}
                className="text-white font-medium hover:text-gray-200 transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            className="md:hidden bg-black text-white px-4 py-2 rounded-full transition duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <IoClose /> : <FiAlignJustify />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col items-center justify-center gap-6 text-gray-800 transition-transform transform ease-in-out duration-300 md:hidden z-40 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="absolute top-4 right-4"
          onClick={() => setIsMenuOpen(false)}
          aria-label="Close menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {navLinks.map((link, i) => (
          <Link
            key={i}
            to={link.path}
            className="text-gray-800 hover:text-gray-600 transition duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            {link.name}
          </Link>
        ))}
      </div>
      {/* text-gray-800 hover:text-gray-600 transition duration-300 */}
    </div>
  );
};

export default NavBar;
