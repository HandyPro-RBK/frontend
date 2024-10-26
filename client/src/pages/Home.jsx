import React, { useState } from "react";
import Navbar from "../components/Navbar";
import BrowseCategories from "../components/services/BrowseCategories";

const Home = () => {
  // State variables to manage input values
  const [service, setService] = useState(""); // State for service input
  const [city, setCity] = useState(""); // State for city input
  const [isHovered, setIsHovered] = useState(false); // State for hover effect

  const handleSearch = () => {
    // Handle the search functionality
    console.log("Searching for:", service, "in", city);
    // Implement any search logic here
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center text-blue-900 pt-4"
      style={{
        backgroundImage: "url('src/assets/images/background.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Navbar />
      <div className="flex flex-col lg:flex-row justify-between items-center p-12">
        <div className="lg:w-1/2 space-y-6 text-white">
          <h1 className="text-xl font-medium">
            Quality services at your doorstep.
          </h1>
          <h2 className="text-5xl font-extrabold mt-4 leading-tight">
            Explore Top-Rated Services Available in Your Local Area!
          </h2>
          <p className="text-lg mt-4 max-w-xl">
            Easily find the best services near you, with trusted professionals
            at your fingertips.
          </p>

          <div className="flex justify-start mt-6">
            <div className="flex space-x-4 bg-white p-4 rounded-lg border border-gray-300">
              <input
                type="text"
                placeholder="What service are you looking for?"
                className="p-2 border border-gray-300 rounded-md outline-none text-black"
                value={service}
                onChange={(e) => setService(e.target.value)}
              />
              <input
                type="text"
                placeholder="City"
                className="p-2 border border-gray-300 rounded-md outline-none text-black"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <button
                className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 mt-8 lg:mt-0 lg:pl-8 flex justify-center">
          <div
            onMouseEnter={() => setIsHovered(true)} // Set hover state to true
            onMouseLeave={() => setIsHovered(false)} // Set hover state to false
            style={{
              overflow: "hidden", // Prevent overflow
              borderRadius: "0.5rem", // Rounded corners
              border: "2px solid transparent", // Transparent border for spacing
            }}
          >
            <img
              src="src/assets/images/image1.png"
              alt="Professional service"
              style={{
                width: "100%",
                maxWidth: "400px", // Adjust max width as needed
                borderRadius: "0.5rem",
                transition: "transform 0.3s ease", // Smooth transition effect
                transform: isHovered ? "scale(1.05)" : "scale(1)", // Scale image on hover
              }}
            />
          </div>
        </div>
      </div>

      <BrowseCategories />
    </div>
  );
};

export default Home;
