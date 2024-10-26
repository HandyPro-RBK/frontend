import React, { useState } from "react";
import { Link } from "react-router-dom";
import CategoryCard from "./CategoryCard";

const BrowseCategories = () => {
  const [activeCategory, setActiveCategory] = useState("Plumbing");

  const categoryPills = [
    { id: 1, name: "Kitchen" },
    { id: 2, name: "Plumbing" },
    { id: 3, name: "Indoor" },
    { id: 4, name: "Outdoor" },
    { id: 5, name: "Renovation" },
  ];

  const categories = [
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
    {
      title: "Kitchen Cabinets",
      category: "Kitchen",
      image: "src/assets/images/kitchen_cabinets.png",
    },
    {
      title: "Tile Installation",
      category: "Kitchen",
      image: "src/assets/images/tile_installation.png",
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
