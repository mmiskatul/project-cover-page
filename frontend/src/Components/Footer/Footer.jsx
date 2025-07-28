const  Footer=()=> {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Merge", path: "/merge" },
    { name: "About", path: "/about" },
  ];
  return (
    <footer className="w-full mt-15  bg-slate-800 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col items-center">
           {/* Branding */}
        <div className="flex items-center space-x-3 mb-6">
          <h1 className="text-3xl font-bold">DIU Cover Page Maker</h1>
        </div>

        {/* Description */}
        <h3 className="text-center text-sm md:text-base text-gray-400 max-w-xl mb-2">
          Create professional DIU assignment cover pages in seconds.
        </h3>

        <h3 className="text-center text-xs md:text-sm text-gray-400 max-w-xl mb-6">
          Designed for students to customize, merge, and download easily.
        </h3>
       {/* Navigation Links */}
        <div className="text-center max-w-xl text-sm font-normal leading-relaxed ">
          {navLinks.map((link, index) => (
            <span key={index}>
              <a
                href={link.path}
                className="text-white hover:text-indigo-800 transition duration-300"
              >
                {link.name}
              </a>
              {index < navLinks.length - 1 && " | "}
            </span>
          ))}
        </div>
      </div>
        {/* Footer Bottom Line */}
      <div className="border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm font-normal">
          <a
            href="https://www.linkedin.com/in/md-mishkatul-masabi-b55b76292/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Md. Miskatul Masabi
          </a>{" "}
          © {new Date().getFullYear()}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
