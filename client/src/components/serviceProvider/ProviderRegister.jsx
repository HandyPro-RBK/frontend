import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "./image/1.png";

const RegisterProvider = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    city: "",
    phoneNumber: "",
    certification: "",
    identityCard: "",
    birthDate: "",
  });

  const [error, setError] = useState("");
  const [fileName, setFileName] = useState({
    certification: "No file chosen",
    identityCard: "No file chosen",
  });
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cities] = useState([
    { code: "TUN", name: "TUNIS", flag: "🇹🇳" },
    { code: "SFX", name: "SFAX", flag: "🇹🇳" },
    { code: "SUS", name: "SOUSSE", flag: "🇹🇳" },
    { code: "KRN", name: "KAIROUAN", flag: "🇹🇳" },
    { code: "BZT", name: "BIZERTE", flag: "🇹🇳" },
    { code: "GBS", name: "GABES", flag: "🇹🇳" },
    { code: "ARN", name: "ARIANA", flag: "🇹🇳" },
    { code: "GFS", name: "GAFSA", flag: "🇹🇳" },
    { code: "MNS", name: "MONASTIR", flag: "🇹🇳" },
    { code: "BNA", name: "BEN AROUS", flag: "🇹🇳" },
    { code: "KSR", name: "KASSERINE", flag: "🇹🇳" },
    { code: "MDN", name: "MEDENINE", flag: "🇹🇳" },
    { code: "NBL", name: "NABEUL", flag: "🇹🇳" },
    { code: "TTN", name: "TATAOUINE", flag: "🇹🇳" },
    { code: "BJA", name: "BEJA", flag: "🇹🇳" },
    { code: "JND", name: "JENDOUBA", flag: "🇹🇳" },
    { code: "MHD", name: "MAHDIA", flag: "🇹🇳" },
    { code: "SLN", name: "SILIANA", flag: "🇹🇳" },
    { code: "KEF", name: "KEF", flag: "🇹🇳" },
    { code: "TZR", name: "TOZEUR", flag: "🇹🇳" },
    { code: "MNB", name: "MANOUBA", flag: "🇹🇳" },
    { code: "ZGN", name: "ZAGHOUAN", flag: "🇹🇳" },
    { code: "KBL", name: "KEBILI", flag: "🇹🇳" },
  ]);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsCityDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCitySelect = (city) => {
    setFormData({
      ...formData,
      city: city.name,
    });
    setIsCityDropdownOpen(false);
  };

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const fieldName = e.target.name;

    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("File size should be less than 5MB");
        return;
      }

      try {
        const reader = new FileReader();
        reader.onload = () => {
          setFormData({
            ...formData,
            [fieldName]: reader.result,
          });
          setFileName({
            ...fileName,
            [fieldName]: file.name,
          });
        };
        reader.readAsDataURL(file);
      } catch (error) {
        setError("Error processing file");
        console.error("File processing error:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3001/service-provider/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.status !== 201) {
        const errorData = await response.text();
        console.error("Server Response:", errorData);
        throw new Error(errorData || "Registration failed");
      }

      const data = await response.json();
      // Store user data
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userId", data.provider.id.toString());
      localStorage.setItem("userType", "PROVIDER");
      localStorage.setItem("role", "provider");
      localStorage.setItem("username", data.provider.username);
      localStorage.setItem("isAvailable", data.provider.isAvailable.toString());

      if (data.provider.photoUrl) {
        localStorage.setItem("photoUrl", data.provider.photoUrl);
      }

      // Only show deactivation notice if account is not available
      if (!data.provider.isAvailable) {
        setShowDeactivationNotice(true);
      }

      navigate("/ServiceProvider");
    } catch (error) {
      setError(error.message || "An error occurred during registration");
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
        title="Go to Home"
      >
        <svg
          className="w-6 h-6 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      </button>

      <div className="flex flex-1">
        <div className="w-1/2 bg-[#1034A6] flex items-center justify-center">
          <div className="text-white text-4xl font-bold">
            <div className="flex items-center">
              <img src={logo} alt="HandyPro Logo" className="w-96 h-96 mr-2" />
            </div>
          </div>
        </div>

        <div className="w-1/2 flex items-center justify-center p-8 overflow-y-auto">
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-2">Hello!</h2>
            <p className="text-gray-600 mb-4">Sign Up As Service Provider</p>

            <div className="flex w-full mb-8 bg-gray-100 rounded-full p-1">
              <button
                onClick={() => navigate("/register-user")}
                className={`flex-1 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  location.pathname === "/register-user"
                    ? "bg-[#1034A6] text-white shadow-lg"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                User
              </button>
              <button
                onClick={() => navigate("/register-provider")}
                className={`flex-1 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  location.pathname === "/register-provider"
                    ? "bg-[#1034A6] text-white shadow-lg"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Provider
              </button>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username input */}
              <div className="relative">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={handleChange}
                  value={formData.username}
                  required
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </span>
              </div>

              {/* Email input */}
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  onChange={handleChange}
                  value={formData.email}
                  required
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </span>
              </div>

              {/* Password input */}
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  value={formData.password}
                  required
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </span>
              </div>

              {/* Confirm Password input */}
              <div className="relative">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  value={formData.confirmPassword}
                  required
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </span>
              </div>

              {/* City Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <div
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg cursor-pointer flex items-center"
                  onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                >
                  {formData.city ? (
                    <span>{formData.city}</span>
                  ) : (
                    <span className="text-gray-400">Select City</span>
                  )}
                </div>
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                  </svg>
                </span>

                {isCityDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                    <div className="p-2">
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="Search a city"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                      {filteredCities.map((city) => (
                        <div
                          key={city.code}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                          onClick={() => handleCitySelect(city)}
                        >
                          <span className="mr-2">{city.flag}</span>
                          <span>{city.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Phone Number input */}
              <div className="relative">
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  value={formData.phoneNumber}
                  required
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </span>
              </div>

              {/* Birth Date input */}
              <div className="relative">
                <input
                  type="date"
                  name="birthDate"
                  onChange={handleChange}
                  value={formData.birthDate}
                  required
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </span>
              </div>

              {/* File Upload sections */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Certification
                  </label>
                  <div className="mt-1 flex items-center">
                    <label className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                      <input
                        type="file"
                        name="certification"
                        onChange={handleFileChange}
                        className="sr-only"
                      />
                      <svg
                        className="w-5 h-5 mr-2 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      {fileName.certification}
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Identity Card
                  </label>
                  <div className="mt-1 flex items-center">
                    <label className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                      <input
                        type="file"
                        name="identityCard"
                        onChange={handleFileChange}
                        className="sr-only"
                      />
                      <svg
                        className="w-5 h-5 mr-2 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      {fileName.identityCard}
                    </label>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#FF8A00] text-white py-3 rounded-lg hover:bg-[#FF8A00]/90 transition-colors duration-200"
              >
                Sign Up
              </button>
            </form>
            <div className="text-center mt-6">
              <span className="text-gray-600">
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/login-provider")}
                  className="text-[#FF8A00] hover:underline"
                >
                  Sign In
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterProvider;
