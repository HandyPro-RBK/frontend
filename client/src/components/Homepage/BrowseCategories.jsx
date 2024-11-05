import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CategoryCard from "./CategoryCard";
import ServiceDetailsModal from "./ServiceDetailsModal";
import ErrorBoundary from "../errorHandling/ErrorBoundary";

const API_URL = import.meta.env.VITE_API_URL;

const BrowseCategories = () => {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState("Plumbing");
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [categoriesResponse, servicesResponse] = await Promise.all([
          fetch(`${API_URL}/my-categories`),
          fetch(`${API_URL}/my-services`),
        ]);

        if (!categoriesResponse.ok || !servicesResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const categoriesData = await categoriesResponse.json();
        const servicesData = await servicesResponse.json();

        setCategories(categoriesData);
        setServices(servicesData);

        if (!activeCategory && categoriesData.length > 0) {
          setActiveCategory(categoriesData[0].name);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load content. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (location.state?.selectedCategory) {
      setActiveCategory(location.state.selectedCategory);
    }
  }, [location.state]);

  useEffect(() => {
    const filtered = services.filter(
      (service) => service.category.name === activeCategory
    );
    setFilteredServices(filtered);
  }, [services, activeCategory]);

  const handleServiceClick = async (serviceId) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${API_URL}/my-services/${serviceId}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch service details");
      }

      const serviceDetails = await response.json();
      setSelectedService(serviceDetails);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching service details:", error);
      setError("Failed to load service details");
    }
  };

  if (error) {
    return <div className="text-center text-red-600 p-4">{error}</div>;
  }

  if (isLoading) {
    return (
      <div className="text-center p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="py-16 px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-blue-900 text-center mb-2">
            Browse by category
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Explore our diverse range of services tailored to your needs.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.name)}
                className={`px-8 py-2 rounded-full transition-all duration-200 text-lg ${
                  activeCategory === category.name
                    ? "bg-blue-100 text-blue-900 font-medium"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                } border border-gray-200`}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredServices.map((service) => (
              <CategoryCard
                key={service.id}
                title={service.name}
                image={service.image}
                onClick={() => handleServiceClick(service.id)}
              />
            ))}
          </div>
        </div>

        {selectedService && (
          <ServiceDetailsModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedService(null);
            }}
            service={selectedService}
          />
        )}
      </div>
    </ErrorBoundary>
  );
};

export default BrowseCategories;
