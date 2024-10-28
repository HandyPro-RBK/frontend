import React, { useState } from "react";
import { Link } from "react-router-dom";
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
      <ul className="flex space-x-6 text-lg ml-2">
        <li>
          <Link to="/requests">Requests</Link>
        </li>
        <li>
          <Link to="/history">History </Link>
        </li>
        <li
          className="relative"
          onMouseEnter={toggleDropdown}
          onMouseLeave={toggleDropdown}
        >
          <span className="cursor-pointer">
            {" "}
            <FaUserCircle className="text-blue-900 text-3xl " />
          </span>
          {dropdownOpen && (
            <div className="absolute top-full mt-1 w-40 bg-white text-black border border-gray-200 shadow-lg rounded-md">
              <ul className="flex flex-col">
                <li className="p-2 hover:bg-gray-100 cursor-pointer">
                  <Link to="/categories">profile</Link>
                </li>
                <li className="p-2 hover:bg-gray-100 cursor-pointer">
                  <Link to="/categories">edit profile</Link>
                </li>
                <li className="p-2 hover:bg-gray-100 cursor-pointer">
                  <Link to="/categories">logout</Link>
                </li>
              </ul>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
