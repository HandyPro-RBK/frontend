import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Navbar = ({ onCategorySelect }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    setIsAuthenticated(!!authToken);
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleCategoryClick = (category) => {
    setDropdownOpen(false);
    onCategorySelect(category);
  };

  const handleSignIn = () => {
    navigate("/login-user");
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    navigate("/");
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen((prev) => !prev);
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
          className="h-10 w-auto"
        />
      </div>
      <ul className="flex space-x-6 text-lg">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li className="cursor-default">Find A Professional</li>
        <li className="relative">
          <span className="cursor-pointer" onClick={toggleDropdown}>
            All Category
          </span>
          {dropdownOpen && (
            <div className="absolute top-full mt-2 w-40 bg-white text-black border border-gray-200 shadow-lg rounded-md z-50">
              <ul className="flex flex-col">
                {["Outdoor", "Indoor", "Plumbing", "Kitchen", "Renovation"].map(
                  (category) => (
                    <li
                      key={category}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <span onClick={() => handleCategoryClick(category)}>
                        {category}
                      </span>
                    </li>
                  )
                )}
              </ul>
            </div>
          )}
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
      <div className="flex items-center space-x-4">
        {!isAuthenticated ? (
          <button
            onClick={handleSignIn}
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
          >
            Sign In
          </button>
        ) : (
          <div className="relative">
            <div className="cursor-pointer" onClick={toggleProfileDropdown}>
              <FaUserCircle className="text-blue-900 text-3xl hover:text-blue-700" />
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  <ul className="py-2">
                    <li>
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dashboard/bookings"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        My Bookings
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dashboard/notifications"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Notifications
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dashboard/profile"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Profile Settings
                      </Link>
                    </li>
                    <li className="border-t border-gray-100">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
