import React, { useState, useEffect } from "react";
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
  const itemsToShow = 4;

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

  return (
    <>
      {/* Section principale avec le fond bleu */}
      <div
        className="w-full min-h-screen bg-cover bg-center text-blue-900 pt-4"
        style={{
          backgroundImage: "url('src/assets/images/background.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top center",
        }}
      >
        <ProviderNavBar />
        <div className="flex flex-col lg:flex-row justify-between items-center p-16 lg:p-24">
          {/* Texte et inputs à gauche */}
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

          {/* Image à droite */}
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
      </div>

      {/* Conteneur pour la section des services avec espacement */}
      <div className="my-20">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-[#0A165E]">
            List of Your Post
          </h1>
        </div>

        {/* Conteneur flex pour les services et les flèches */}
        <div className="flex items-center justify-center relative">
          {/* Flèche précédente */}
          <button 
            className={`absolute left-0 transform -translate-x-1/2 bg-orange-500 text-white px-4 py-2 rounded-full transition-transform duration-300 ${
              currentIndex === 0 ? "opacity-50 cursor-not-allowed" : "hover:scale-110"
            }`} 
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            style={{ top: "50%", marginLeft: "300px" }}
          >
            &lt;
          </button>

          {/* Conteneur des cartes de service */}
          <div className="flex gap-6 mb-8">
            {services.slice(currentIndex, currentIndex + itemsToShow).map((service, index) => (
              <div
                key={index}
                className="w-72 bg-white p-4 rounded-lg shadow-lg text-left"
              >
                <img 
                  src={service.image}
                  alt={service.name}
                  className="w-full h-40 object-cover rounded mb-4"
                />
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

          {/* Flèche suivante */}
          <button 
            className={`absolute right-0 transform translate-x-1/2 bg-orange-500 text-white px-4 py-2 rounded-full transition-transform duration-300 ${
              currentIndex + itemsToShow >= services.length ? "opacity-50 cursor-not-allowed" : "hover:scale-110"
            }`} 
            onClick={handleNext}
            disabled={currentIndex + itemsToShow >= services.length}
            style={{ top: "50%", marginRight: "300px" }}
          >
            &gt;
          </button>
        </div>

        {/* Bouton pour ajouter un service */}
        <div className="flex justify-center">
          <button
            className="bg-orange-500 text-white py-3 px-8 rounded-full font-semibold"
            onClick={() => setIsModalOpen(true)}
          >
            Add your service
          </button>
        </div>
      </div>

      {/* Modal for adding service */}
      <AddServiceModal 
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          fetchServices(); // Refresh the services list after adding a new service
        }}
      />

      {/* Sections FAQ et Footer */}
      <FAQSection />
      <Footer />
    </>
  );
};

export default Dashboard;