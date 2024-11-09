import React, { useState } from "react";
import { Menu, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./image/1.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-zink-700 shadow-lg transition-all duration-300 ease-in-out">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/dashboard" className="flex items-center">
              <img
                src={logo}
                alt="logo"
                className="h-12 w-auto transform hover:scale-105 transition-transform duration-300"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex items-center space-x-8">
              <li>
                <button
                  onClick={handleLogout}
                  className="group flex items-center space-x-2 px-4 py-2 rounded-full bg-custom-500 hover:bg-custom-600 transition-all duration-300 ease-in-out"
                >
                  <span className="text-white font-medium">Logout</span>
                  <LogOut
                    size={20}
                    className="text-white transform group-hover:rotate-180 transition-transform duration-300"
                  />
                </button>
              </li>
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md bg-custom-500 hover:bg-custom-600 text-white transition-colors duration-300"
            >
              <Menu
                className={`h-6 w-6 transform transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isOpen
              ? "max-h-screen opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-md bg-custom-500 hover:bg-custom-600 text-white transition-colors duration-300"
            >
              <span>Logout</span>
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
