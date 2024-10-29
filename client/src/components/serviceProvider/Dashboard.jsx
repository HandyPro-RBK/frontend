import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProviderNavBar from "./ProviderNavBar";
import FAQSection from "../Homepage/FAQSection";
import Footer from "../Homepage/Footer";

const Dashboard = () => {
  const navigate = useNavigate();
  const [service, setService] = useState("");
  const [city, setCity] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [services, setServices] = useState([]);

  const fetchServices = async () => {
    try {
      const response = await fetch('http://127.0.0.1:3001/service/provider/1');
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSearch = () => {
    console.log("Searching for:", service, "in", city);
  };

  return (
    <>
      <div
        className="min-h-screen bg-cover bg-center text-blue-900 pt-4"
        style={{
          backgroundImage: "url('src/assets/images/background.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top center",
        }}
      >
        <ProviderNavBar />
        <div className="flex flex-col lg:flex-row justify-between items-center p-16 lg:p-24">
          {/* Left Side - Text and Inputs */}
          <div className="lg:w-1/2 space-y-8 text-white">
            <h1 className="text-2xl lg:text-3xl font-semibold tracking-wide">
              Quality services at your doorstep.
            </h1>
            <h2 className="text-6xl lg:text-7xl font-bold mt-4 leading-snug">
              Explore Top-Rated Services Available in Your Local Area!
            </h2>
            <div className="flex justify-start mt-8">
              <div className="flex items-center space-x-4 bg-white p-2 rounded-lg border border-gray-300">
                <input
                  type="text"
                  placeholder="What service are you looking for?"
                  className="p-1 border border-gray-300 rounded-md outline-none text-black text-base"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                />
                <div className="relative">
                  <i className="fas fa-map-marker-alt absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
                  <input
                    type="text"
                    placeholder="City"
                    className="p-1 pl-10 border border-gray-300 rounded-md outline-none text-black text-base"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
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
              className="overflow-hidden rounded-lg border-2 border-transparent ml-5"
            >
              <img
                src="src/assets/images/image1.png"
                alt="Professional service"
                className={`w-full max-w-xs transition-transform duration-300 ${
                  isHovered ? "transform scale-105" : "transform scale-100"
                }`}
              />
            </div>
          </div>
        </div>

        {/* Section Title */}
        <div className="text-center mb-8 mt-20">
          <h1 className="text-3xl font-semibold text-[#0A165E]">
            Top Plumbers for Professionals
          </h1>
          <p className="text-gray-500 mt-2">
            Discover a Network of Top Professionals Who Share Your Commitment to Quality
          </p>
        </div>

        {/* Services List */}
        <div className="flex justify-center gap-6 mb-8">
          {services.slice(services.length - 4, services.length).map((service, index) => (
            <div
              key={index}
              className="w-72 bg-white p-4 rounded-lg shadow-lg text-left"
            >
              <div className="w-full h-40 bg-gray-200 rounded mb-4"></div>
              <div className="mb-2 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-[#0A165E]">
                  {service.name}
                </h2>
                <button className="text-orange-500 text-xl">♥</button>
              </div>
              <div className="flex items-center justify-between">
                <span className="bg-orange-200 text-orange-500 px-2 py-1 rounded text-xs font-semibold">
                  see detail
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Add Service Button */}
        <div className="flex justify-center mb-16">
          <button
            className="bg-orange-500 text-white py-3 px-8 rounded-full font-semibold"
            onClick={() => navigate("/addService")}
          >
            Add your service
          </button>
        </div>
      </div>

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer Section */}
      <Footer />
    </>
  );
};

export default Dashboard;
