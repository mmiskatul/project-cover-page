"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";

const NavBar = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Recent", path: "/recent" },
    { name: "About", path: "/about" },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const pathname = usePathname();
  const navRef = useRef(null);
  const lastScrollY = useRef(0);

  // Lock body scroll cleanly without jitter when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Track scroll state + hide-on-scroll-down (headroom)
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      setIsScrolled(currentY > 8);

      // Only trigger if scrolled more than 6px to avoid micro-jitter
      if (Math.abs(delta) > 6) {
        if (delta > 0 && currentY > 80) {
          // Scrolling DOWN & past threshold → hide
          setIsHidden(true);
          // Always close mobile menu when hiding
          setIsMenuOpen(false);
        } else {
          // Scrolling UP → show
          setIsHidden(false);
        }
        lastScrollY.current = currentY;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when route changes
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsMenuOpen(false);
  }

  return (
    <header
      ref={navRef}
      className={`fixed w-full z-50 top-0 inset-x-0 transition-transform duration-300 ease-in-out ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <nav
        className={`transition-colors duration-200 bg-slate-900/95 backdrop-blur-md border-b ${
          isScrolled ? "border-slate-800 shadow-md shadow-slate-950/20" : "border-slate-800/60"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link
                href="/"
                className="text-lg sm:text-2xl font-black text-white tracking-tight hover:opacity-90 transition-opacity"
              >
                D<span className="text-indigo-400">I</span>U PageCrafter
                <span className="text-indigo-500 font-black">.</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.path}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                    pathname === link.path
                      ? "text-white bg-indigo-600 shadow-sm"
                      : "text-slate-300 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <Link
                href="/template"
                className="ml-3 px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition-all shadow-md shadow-indigo-600/20"
              >
                Create Cover
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none transition-colors border border-slate-700/60"
                aria-expanded={isMenuOpen}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMenuOpen ? (
                  <FiX className="block h-5 w-5" />
                ) : (
                  <FiMenu className="block h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu dropdown with backdrop */}
        <div
          className={`md:hidden fixed inset-0 top-14 sm:top-16 z-40 transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Dark backdrop */}
          <div
            onClick={() => setIsMenuOpen(false)}
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs"
          />

          {/* Slide panel */}
          <div
            className={`relative w-full bg-slate-900/98 backdrop-blur-xl border-b border-slate-800 shadow-2xl px-4 py-5 max-h-[calc(100dvh-3.5rem)] overflow-y-auto transition-transform duration-300 ${
              isMenuOpen ? "translate-y-0" : "-translate-y-4"
            }`}
          >
            <div className="space-y-1">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.path}
                  className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    pathname === link.path
                      ? "text-white bg-indigo-600 shadow-md"
                      : "text-slate-300 hover:text-white hover:bg-slate-800"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-3 mt-3 border-t border-slate-800">
                <Link
                  href="/template"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full py-2.5 px-4 rounded-xl text-center font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 shadow-lg flex items-center justify-center gap-2"
                >
                  Browse All Templates
                </Link>
              </div>
            </div>

            <div className="text-center text-[11px] text-slate-500 pt-4">
              DIU PageCrafter • Student Project Cover Generator
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
