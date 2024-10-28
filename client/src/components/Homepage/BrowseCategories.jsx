import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CategoryCard from "./CategoryCard";

const BrowseCategories = () => {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState("Plumbing");

  // Update active category when navigating from navbar
  useEffect(() => {
    if (location.state?.selectedCategory) {
      setActiveCategory(location.state.selectedCategory);
    }
  }, [location.state]);

  const categoryPills = [
    { id: 1, name: "Kitchen" },
    { id: 2, name: "Plumbing" },
    { id: 3, name: "Indoor" },
    { id: 4, name: "Outdoor" },
    { id: 5, name: "Renovation" },
  ];

  const categories = [
    // Plumbing Services
    {
      title: "Pipe Installation",
      category: "Plumbing",
      image: "src/assets/images/Pipe installation.png",
    },
    {
      title: "Leak Repair",
      category: "Plumbing",
      image: "src/assets/images/Leak Repair.png",
    },
    {
      title: "Drainage Systems",
      category: "Plumbing",
      image: "src/assets/images/Drainage Systems.png",
    },
    {
      title: "Maintenance Services",
      category: "Plumbing",
      image: "src/assets/images/maintenance services.png",
    },
    // Kitchen Services
    {
      title: "Kitchen Cabinets",
      category: "Kitchen",
      image: "src/assets/images/kitchen cabinets.jpg",
    },
    {
      title: "Tile Installation",
      category: "Kitchen",
      image: "src/assets/images/Tile Installation.jpg",
    },
    {
      title: "Countertop Installation",
      category: "Kitchen",
      image: "src/assets/images/Countertop Installation.jpg",
    },
    {
      title: "Kitchen Remodeling",
      category: "Kitchen",
      image: "src/assets/images/Kitchen Remodeling.jpg",
    },
    // Indoor Services
    {
      title: "Interior Painting",
      category: "Indoor",
      image: "src/assets/images/Interior Painting.png",
    },
    {
      title: "Drywall Installation",
      category: "Indoor",
      image: "src/assets/images/Drywall Installation.jpg",
    },
    {
      title: "Flooring Installation",
      category: "Indoor",
      image: "src/assets/images/Flooring Installation.jpg",
    },
    {
      title: "Indoor Landscaping",
      category: "Indoor",
      image: "src/assets/images/Indoor Landscaping.jpg",
    },
    // Outdoor Services
    {
      title: "Lawn Care",
      category: "Outdoor",
      image: "src/assets/images/Lawn Care.jpg",
    },
    {
      title: "Deck Building",
      category: "Outdoor",
      image: "src/assets/images/Deck Building.jpg",
    },
    {
      title: "Patio Installation",
      category: "Outdoor",
      image: "src/assets/images/Patio Installation.jpg",
    },
    {
      title: "Garden Design",
      category: "Outdoor",
      image: "src/assets/images/Garden Design.png",
    },
    // Renovation Services
    {
      title: "Home Renovation",
      category: "Renovation",
      image: "src/assets/images/Home Renovation.jpg",
    },
    {
      title: "Basement Finishing",
      category: "Renovation",
      image: "src/assets/images/Basement Finishing.jpg",
    },
    {
      title: "Bathroom Remodeling",
      category: "Renovation",
      image: "src/assets/images/Bathroom Remodeling.jpg",
    },
    {
      title: "Roofing Services",
      category: "Renovation",
      image: "src/assets/images/Roofing Services.jpg",
    },
  ];

  // Filter categories based on the active category pill
  const filteredCategories = categories.filter(
    (category) => category.category === activeCategory
  );

  return (
    <div className="py-16 px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-blue-900 text-center mb-2">
          Browse by category
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Explore our diverse range of services tailored to your needs.
        </p>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {categoryPills.map((category) => (
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

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCategories.map((category) => (
            <CategoryCard
              key={category.title}
              title={category.title}
              image={category.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrowseCategories;
