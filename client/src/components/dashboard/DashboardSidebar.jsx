import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaThLarge,
  FaClipboardList,
  FaBell,
  FaUser,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
 
} from "react-icons/fa";

const DashboardSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const menuItems = [
    {
      section: "Main",
      items: [{ path: "/dashboard", icon: FaThLarge, label: "Overview" }],
    },
    {
      section: "Management",
      items: [
        {
          path: "/dashboard/bookings",
          icon: FaClipboardList,
          label: "My Bookings",
        },
        {
          path: "/dashboard/notifications",
          icon: FaBell,
          label: "Notifications",
          badge: 3,
        },
        
      ],
    },
    {
      section: "Account",
      items: [{ path: "/dashboard/profile", icon: FaUser, label: "Profile" }],
    },
  ];

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/");
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const MenuItem = ({ item }) => (
    <Link
      to={item.path}
      className={`flex items-center ${
        isCollapsed ? "justify-center" : "justify-between"
      } p-3 rounded-lg transition-all duration-200 ${
        location.pathname === item.path
          ? "bg-blue-900 text-white"
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      <div className="flex items-center space-x-3">
        <item.icon className={`w-5 h-5 ${isCollapsed ? "mr-0" : "mr-3"}`} />
        {!isCollapsed && <span>{item.label}</span>}
      </div>
      {!isCollapsed && item.badge && (
        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
          {item.badge}
        </span>
      )}
    </Link>
  );

  return (
    <>
      <div
        className={`${
          isCollapsed ? "w-20" : "w-64"
        } bg-white min-h-screen shadow-md relative transition-all duration-300`}
      >
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-4 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
        >
          {isCollapsed ? (
            <FaChevronRight className="w-4 h-4 text-gray-600" />
          ) : (
            <FaChevronLeft className="w-4 h-4 text-gray-600" />
          )}
        </button>

        <div className={`p-6 ${isCollapsed ? "p-4" : ""}`}>
          {!isCollapsed && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
              <p className="text-sm text-gray-500">Welcome back!</p>
            </div>
          )}

          <nav>
            {menuItems.map((section, index) => (
              <div key={section.section} className="mb-6">
                {!isCollapsed && (
                  <h3 className="text-xs font-semibold text-gray-400 uppercase mb-2">
                    {section.section}
                  </h3>
                )}
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item.path}>
                      <MenuItem item={item} />
                    </li>
                  ))}
                </ul>
                {index < menuItems.length - 1 && !isCollapsed && (
                  <div className="my-4 border-t border-gray-200"></div>
                )}
              </div>
            ))}
            <div className="mt-auto">
              <button
                onClick={handleLogout}
                className={`w-full flex items-center ${
                  isCollapsed ? "justify-center" : "justify-between"
                } p-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors`}
              >
                <div className="flex items-center space-x-3">
                  <FaSignOutAlt
                    className={`w-5 h-5 ${isCollapsed ? "mr-0" : "mr-3"}`}
                  />
                  {!isCollapsed && <span>Logout</span>}
                </div>
              </button>
            </div>
          </nav>
        </div>
      </div>

      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
            <h2 className="text-xl font-bold mb-4">Confirm Logout</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to logout? You will need to login again to
              access your dashboard.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelLogout}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardSidebar;