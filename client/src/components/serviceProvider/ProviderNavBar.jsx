// components/serviceProvider/ProviderNavBar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, User, Bell } from 'lucide-react';
import { io } from 'socket.io-client';
import AddServiceModal from '../../pages/AddService';
import logo from "../../assets/images/logo.png";

const ProviderNavBar = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [provider, setProvider] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [pendingRequestsCount, setPendingRequestsCount] = useState(0);

  useEffect(() => {
    fetchProviderData();
    fetchUnreadMessages();
    fetchPendingRequests();

    const userId = localStorage.getItem('userId');
    const role = localStorage.getItem('role');
    if (!userId) return;

    const socket = io('http://localhost:3001');

    socket.on('connect', () => {
      console.log('Connected to socket for notifications');
    });

    socket.on('newMessage', (message) => {
      if (message.sender !== role) {
        setUnreadCount(prev => prev + 1);
      }
    });

    socket.on('messagesRead', ({ conversationId }) => {
      fetchUnreadMessages();
    });

    // Listen for changes in bookings
    socket.on('bookingStatusChanged', () => {
      fetchPendingRequests();
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchProviderData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch('http://localhost:3001/provider/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setProvider(data);
      }
    } catch (error) {
      console.error('Error fetching provider data:', error);
    }
  };

  const fetchUnreadMessages = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const role = localStorage.getItem('role');
      const response = await fetch(
        `http://localhost:3001/api/conversations/unread/${userId}?role=${role}`
      );
      
      if (response.ok) {
        const data = await response.json();
        setUnreadCount(data.count);
      }
    } catch (error) {
      console.error('Error fetching unread messages:', error);
    }
  };

  const fetchPendingRequests = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch('http://localhost:3001/provider/requests', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        // Set pending requests count from the bookingspending array length
        setPendingRequestsCount(data.bookingspending.length);
      }
    } catch (error) {
      console.error('Error fetching pending requests:', error);
    }
  };

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

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  return (
    <>
      <nav className="bg-white shadow-lg">
        <div className="max-w-full px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo section - Far Left */}
            <div 
              className="text-xl font-bold flex items-center cursor-pointer" 
              onClick={() => handleNavigation('/ServiceProvider')}
            >
              <img
                src={logo}
                alt="HandyPro"
                className="h-8 mr-2"
              />
            </div>

            {/* Center Navigation Links */}
            <div className="hidden md:flex items-center justify-evenly flex-grow mx-12">
              <Link 
                to="/ServiceProvider" 
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              <Link 
                to="/requests" 
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium relative"
              >
                Requests
                {pendingRequestsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {pendingRequestsCount > 99 ? '99+' : pendingRequestsCount}
                  </span>
                )}
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
              <Link 
                to="/messenger" 
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium relative"
              >
                Messages
                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#FF8A00] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Profile Dropdown - Far Right */}
            <div className="hidden md:block">
              <div className="relative">
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  {provider?.photoUrl ? (
                    <img
                      src={provider.photoUrl}
                      alt="Profile"
                      className="h-8 w-8 rounded-full object-cover border-2 border-gray-200"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="h-5 w-5 text-gray-600" />
                    </div>
                  )}
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
                    
                    <button
                      onClick={() => {
                        handleLogout();
                        setDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
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
              Home
            </Link>
            <Link 
              to="/requests" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 relative"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Requests
              {pendingRequestsCount > 0 && (
                <span className="absolute top-2 ml-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {pendingRequestsCount > 99 ? '99+' : pendingRequestsCount}
                </span>
              )}
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
              to="/messenger" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 relative"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Messages
              {unreadCount > 0 && (
                <span className="absolute top-2 ml-2 bg-[#FF8A00] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              )}
            </Link>
            <Link 
              to="/profile" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Profile
            </Link>
            <button
              onClick={() => {
                handleLogout();
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <AddServiceModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ProviderNavBar;