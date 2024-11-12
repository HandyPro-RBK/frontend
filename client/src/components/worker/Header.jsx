import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import logo from "../../assets/images/logo.png";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState(null);

  const toggleDropdown = () => {
    clearTimeout(dropdownTimeout);
    setDropdownOpen(!dropdownOpen);
  };

  const handleMouseEnter = () => {
    clearTimeout(dropdownTimeout);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setDropdownOpen(false);
    }, 300);
    setDropdownTimeout(timeout);
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-white text-blue-900 shadow-lg border-b border-gray-200 mx-4 mt-8 rounded-lg">
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="h-10 w-auto" />
        </Link>
      </div>

      <div className="flex-grow flex justify-center">
        <ul className="flex space-x-6 text-lg items-center">
          <li>
            <Link
              to="/"
              className="hover:text-blue-700 transition-colors duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/find-professional"
              className="hover:text-blue-700 transition-colors duration-300"
            >
              Find A Professional
            </Link>
          </li>
          <li className="relative flex items-center">
            <Link
              to="/all-categories"
              className="hover:text-blue-700 flex items-center transition-colors duration-300"
            >
              All Category <MdKeyboardArrowDown className="ml-1" />
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="hover:text-blue-700 transition-colors duration-300"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex items-center space-x-6">
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <span className="cursor-pointer">
            <FaUserCircle className="text-blue-900 text-3xl hover:text-blue-700 transition-colors duration-300" />
          </span>
          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-40 bg-white text-black border border-gray-200 shadow-lg rounded-md z-50">
              <ul className="flex flex-col">
                <li className="p-2 hover:bg-gray-100 cursor-pointer rounded-t-md">
                  <Link to="/profile" className="block">
                    Profile
                  </Link>
                </li>
                <li className="p-2 hover:bg-gray-100 cursor-pointer">
                  <Link to="/edit-profile" className="block">
                    Edit Profile
                  </Link>
                </li>
                <li className="p-2 hover:bg-gray-100 cursor-pointer rounded-b-md">
                  <Link to="/logout" className="block">
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
