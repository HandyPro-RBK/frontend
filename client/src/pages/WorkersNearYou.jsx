import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import FilterSection from "../components/common/FilterSection";
import WorkerCard from "../components/worker/WorkerCard";
import { MapPin } from "lucide-react";

const WorkersNearYou = () => {
  const { categoryName, city } = useParams();
  const navigate = useNavigate();
  const workers = Array(4).fill({ id: 1 }); // Placeholder data with IDs

  const handleLocationSearch = (e) => {
    if (e.key === "Enter") {
      navigate(`/${categoryName}/${e.target.value}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      <Header />
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-blue-900">
          Find the best {categoryName} in {city}
        </h1>
        <p className="text-gray-600 mt-2">
          Our platform connects you with top-rated {categoryName} in your area,
          offering reliable and fast service for all your {categoryName} needs
        </p>
        <div className="relative mt-4">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="What services are you looking for?"
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg"
            onKeyDown={handleLocationSearch}
          />
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">
          Top {categoryName} near you
        </h2>
        <div className="flex gap-8">
          <FilterSection />
          <div className="flex-1 space-y-4">
            {workers.map((worker, index) => (
              <WorkerCard key={index} worker={worker} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkersNearYou;
