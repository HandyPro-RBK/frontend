import React from "react";
import { Wrench, Paintbrush, Plug, Car, Home, Utensils } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FeaturedCategories = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 1,
      name: "Plumbing",
      icon: Wrench,
      description: "Expert plumbers for all your pipe and fixture needs",
      workers: 245,
      color: "bg-[#EFEFEF]", // Updated color to match palette
    },
    {
      id: 2,
      name: "Kitchen",
      icon: Utensils,
      description:
        "Professional services for kitchen installations and repairs",
      workers: 189,
      color: "bg-[#EFEFEF]", // Updated color to match palette
    },
    {
      id: 3,
      name: "Indoor",
      icon: Paintbrush,
      description: "Specialists for indoor improvements and renovations",
      workers: 167,
      color: "bg-[#EFEFEF]", // Updated color to match palette
    },
    {
      id: 4,
      name: "Outdoor",
      icon: Car,
      description: "Expert services for outdoor landscaping and maintenance",
      workers: 203,
      color: "bg-[#EFEFEF]", // Updated color to match palette
    },
    {
      id: 5,
      name: "Renovation",
      icon: Home,
      description: "Complete renovation services for your home",
      workers: 278,
      color: "bg-[#EFEFEF]", // Updated color to match palette
    },
  ];

  const handleCategoryClick = (categoryName) => {
    navigate(`/${categoryName.toLowerCase()}/your-city`);
  };

  return (
    <div className="max-w-7xl mx-auto p-8 mt-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-blue-900 mb-4">
          {" "}
          {/* Updated color */}
          Featured Service Categories
        </h2>
        <p className="text-[#1C1C1C] max-w-2xl mx-auto">
          Explore our most popular service categories with verified
          professionals ready to help
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer ${category.color}`} // Add category color as background
            onClick={() => handleCategoryClick(category.name)}
          >
            <div className="flex items-start space-x-4">
              <div className={`p-3 rounded-lg bg-[#2B4DFF]`}>
                <category.icon className="w-6 h-6 text-white" />{" "}
                {/* Icon color */}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-[#1C1C1C] mb-2">
                  {category.name}
                </h3>
                <p className="text-[#1C1C1C] text-sm mb-3">
                  {category.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#0A165E] font-medium">
                    {category.workers} professionals
                  </span>
                  <span className="text-sm text-gray-500">View all →</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCategories;
