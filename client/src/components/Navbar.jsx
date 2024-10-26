import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav
      className="flex items-center justify-between p-4 bg-white text-blue-900 shadow-md border border-gray-200 rounded-md mx-4"
      style={{ marginTop: "20px" }}
    >
      <div className="text-xl font-bold flex items-center">
        <img
          src="src/assets/images/logo.png"
          alt="HandyPro"
          className="h-8 mr-2"
        />
      </div>
      <ul className="flex space-x-6 text-lg">
        <li>Home</li>
        <li>Find A Professional</li>
        <li
          className="relative"
          onMouseEnter={toggleDropdown}
          onMouseLeave={toggleDropdown}
        >
          <span className="cursor-pointer">All Category</span>
          {dropdownOpen && (
            <div className="absolute top-full mt-2 w-40 bg-white text-black border border-gray-200 shadow-lg rounded-md">
              <ul className="flex flex-col">
                <li className="p-2 hover:bg-gray-100 cursor-pointer">
                  Outdoor
                </li>
                <li className="p-2 hover:bg-gray-100 cursor-pointer">Indoor</li>
                <li className="p-2 hover:bg-gray-100 cursor-pointer">
                  Plumbing
                </li>
                <li className="p-2 hover:bg-gray-100 cursor-pointer">
                  Kitchen
                </li>
                <li className="p-2 hover:bg-gray-100 cursor-pointer">
                  Renovation
                </li>
              </ul>
            </div>
          )}
        </li>
        <li>Contact</li>
      </ul>
      <div className="flex items-center space-x-4">
        <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600">
          Sign In
        </button>
        <FaUserCircle className="text-blue-900 text-3xl" />
      </div>
    </nav>
  );
};

export default Navbar;
