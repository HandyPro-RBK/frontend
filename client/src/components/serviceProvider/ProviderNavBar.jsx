import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, User } from 'lucide-react';
import AddServiceModal from '../../pages/AddService';

const ProviderNavBar = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (dropdownOpen) setDropdownOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
    setDropdownOpen(false);
  };

  const handleAddService = () => {
    setIsModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-white shadow-lg">
        <div className="w-full px-0">
          <div className="flex justify-between items-center h-16">
            {/* Logo section */}
            <div 
              className="text-xl font-bold flex items-center cursor-pointer pl-2" 
              onClick={() => handleNavigation('/ServiceProvider')}
            >
              <img
                src="src/assets/images/logo.png"
                alt="HandyPro"
                className="h-8 mr-2"
              />
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8 pr-4">
              <Link 
                to="/ServiceProvider" 
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </Link>
              <Link 
                to="/requests" 
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Requests
              </Link>
              <Link 
                to="/history" 
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                History
              </Link>
              <button 
                onClick={handleAddService}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Add Service
              </button>

              {/* Profile Dropdown */}
              <div className="relative">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <User className="h-6 w-6 text-gray-600" />
                </div>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link 
                      to="/edit-profile" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Edit Profile
                    </Link>
                    <Link 
                      to="/logout" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Logout
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center pr-4">
              <button 
                onClick={toggleMobileMenu}
                className="mobile-menu-button p-2 rounded-md hover:bg-gray-100 focus:outline-none"
              >
                <Menu className="h-6 w-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              to="/ServiceProvider" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              to="/requests" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Requests
            </Link>
            <Link 
              to="/history" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              History
            </Link>
            <button 
              onClick={handleAddService}
              className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
            >
              Add Service
            </button>
            <Link 
              to="/profile" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Profile
            </Link>
            <Link 
              to="/logout" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Logout
            </Link>
          </div>
        </div>
      </nav>

      {/* Add Service Modal */}
      <AddServiceModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ProviderNavBar;