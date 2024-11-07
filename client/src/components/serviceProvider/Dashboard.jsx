// Dashboard.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProviderNavBar from "./ProviderNavBar";
import FAQSection from "../Homepage/FAQSection";
import Footer from "../Homepage/Footer";
import AddServiceModal from "../../pages/AddService";

const Dashboard = () => {
  const [service, setService] = useState("");
  const [city, setCity] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [services, setServices] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const itemsToShow = 4;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchServices = async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("authToken");
    
    try {
      const providerId = localStorage.getItem("providerId"); 
      const response = await fetch(`http://127.0.0.1:3001/service/provider/${providerId}`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (!response.ok) throw new Error("Failed to fetch services.");
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSearch = () => {
    console.log("Searching for:", service, "in", city);
    
  };

  const handleNext = () => {
    if (currentIndex + itemsToShow < services.length) {
      setCurrentIndex(currentIndex + itemsToShow);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - itemsToShow);
    }
  };

  const handleServiceClick = (id) => {
    navigate(`/service/${id}`);
  };

  return (
    <>
      <div
        className="min-h-screen bg-cover bg-center text-blue-900 pt-4"
        style={{
          backgroundImage: "url('src/assets/images/background3.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top center",
        }}
      >
        <ProviderNavBar onCategorySelect={() => setIsModalOpen(true)} />
        <div className="flex flex-col lg:flex-row justify-between items-center p-16 lg:p-24">
          {/* Left Side - Text and Inputs */}
          <div className="lg:w-1/2 space-y-8 text-white">
            <h1 className="text-2xl lg:text-3xl font-semibold tracking-wide">
              Quality services at your doorstep.
            </h1>
            <h2 className="text-6xl lg:text-7xl font-bold mt-4 leading-snug">
              Explore Top-Rated Services Available in Your Local Area!
            </h2>
            <p className="text-xl lg:text-2xl mt-6 max-w-xl">
              Easily find the best services near you, with trusted professionals at your fingertips.
            </p>
            <div className="flex justify-start mt-8">
              <div className="flex items-center space-x-4 bg-white p-2 rounded-lg border border-gray-300">
                <input
                  type="text"
                  placeholder="What service are you looking for?"
                  className="p-1 border border-gray-300 rounded-md outline-none text-black text-base"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="City"
                  className="p-1 border border-gray-300 rounded-md outline-none text-black text-base"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <button
                  className="bg-orange-500 text-white px-4 py-1 text-base font-semibold rounded-md hover:bg-orange-600"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="lg:w-1/2 mt-10 lg:mt-0 lg:pl-8 flex justify-end">
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                overflow: "hidden",
                borderRadius: "0.5rem",
                border: "2px solid transparent",
                marginLeft: "20px",
              }}
            >
              <img
                src="src/assets/images/image1.png"
                alt="Professional service"
                style={{
                  width: "100%",
                  maxWidth: "450px",
                  borderRadius: "0.5rem",
                  transition: "transform 0.3s ease",
                  transform: isHovered ? "scale(1.05)" : "scale(1)",
                }}
              />
            </div>
          </div>
        </div>


        {/* Services List Section */}
        <div className="my-20">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold text-[#FF9202]">List of Your Posts</h1>
          </div>

          {/* Loading and Error Handling */}
          {loading && <p className="text-center">Loading services...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}

          {/* Services Carousel with Arrows */}
          <div className="flex items-center justify-center relative">
            <button
              className={`absolute left-0 transform -translate-x-1/2 bg-orange-500 text-white px-4 py-2 rounded-full transition-transform duration-300 ${
                currentIndex === 0 ? "opacity-50 cursor-not-allowed" : "hover:scale-110"
              }`}
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              style={{ top: "50%", marginLeft: "100px" }}
            >
              &lt;
            </button>

            <div className="flex gap-6 mb-8">
              {services.slice(currentIndex, currentIndex + itemsToShow).map((service, index) => (
                <div
                  key={service.id} 
                  onClick={() => handleServiceClick(service.id)}
                  className="w-72 bg-white p-4 rounded-lg shadow-lg text-left cursor-pointer"
                >
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-40 object-cover rounded mb-4"
                  />
                  <div className="mb-2 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-[#0A165E]">{service.name}</h2>
                    <button className="text-orange-500 text-xl">♥</button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="bg-orange-200 text-orange-500 px-2 py-1 rounded text-xs font-semibold">
                      See detail
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button
              className={`absolute right-0 transform translate-x-1/2 bg-orange-500 text-white px-4 py-2 rounded-full transition-transform duration-300 ${
                currentIndex + itemsToShow >= services.length ? "opacity-50 cursor-not-allowed" : "hover:scale-110"
              }`}
              onClick={handleNext}
              disabled={currentIndex + itemsToShow >= services.length}
              style={{ top: "50%", marginRight: "100px" }}
            >
              &gt;
            </button>
          </div>

          {/* Add Service Button */}
          <div className="flex justify-center">
            <button
              className="bg-orange-500 text-white py-3 px-8 rounded-full font-semibold"
              onClick={() => setIsModalOpen(true)}
            >
              Add your service
            </button>
          </div>
        </div>

        {/* Modal for Adding Service */}
        <AddServiceModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            fetchServices(); 
          }}
        />
      </div>

      {/* FAQ and Footer Sections */}
      <FAQSection />
      <Footer />
    </>
  );
};

export default Dashboard;
