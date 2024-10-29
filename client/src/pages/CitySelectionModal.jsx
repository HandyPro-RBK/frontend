import React, { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CitySelectionModal = ({ isOpen, onClose, selectedCategory }) => {
  const navigate = useNavigate();
  const cities = [
    "Tunis",
    "Sousse",
    "Bizert",
    "Sfax",
    "Sidi-Bouzid",
    "Manouba",
  ];
  const [searchTerm, setSearchTerm] = useState("");

  if (!isOpen) return null;

  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCitySelect = (city) => {
    navigate(`/categories/${selectedCategory}/${city}`); // Navigate to WorkersNearYou
    onClose(); // Close the modal after navigation
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 text-2xl focus:outline-none"
        >
          &times;
        </button>
        <h2 className="text-lg font-semibold mb-4 text-center">
          Select your city
        </h2>
        <div className="relative mb-4">
          <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Type your city name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 p-3 border border-gray-300 rounded-md outline-none text-black"
          />
        </div>
        <ul className="space-y-2">
          {filteredCities.map((city) => (
            <li
              key={city}
              onClick={() => handleCitySelect(city)}
              className="flex justify-between items-center p-3 cursor-pointer hover:bg-gray-100 rounded-lg text-gray-800"
            >
              {city}
              <span className="text-gray-400">&gt;</span>
            </li>
          ))}
          {filteredCities.length === 0 && (
            <li className="p-3 text-gray-500 text-center">No cities found</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CitySelectionModal;
