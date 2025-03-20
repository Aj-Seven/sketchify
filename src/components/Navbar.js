import React from "react";

const NavBar = () => {
  return (
    <nav className="bg-blue-500 border-b border-gray-200 text-white p-2 py-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="text-2xl font-bold">
          SketchConverter
        </a>

        <div>
          <a
            href="https://github.com/aj-seveen/image-sketch"
            className="text-white text-md hover:text-gray-300"
          >
            Github
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
