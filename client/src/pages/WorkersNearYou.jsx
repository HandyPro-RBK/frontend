import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import FilterSection from "../components/common/FilterSection";
import WorkerCard from "../components/worker/WorkerCard";
import { MapPin } from "lucide-react";
import workerImage from "../assets/images/worker.jpg";

const WorkersNearYou = () => {
  const { categoryName, city } = useParams();
  const navigate = useNavigate();

  // Example worker data
  const workers = [
    {
      id: 1,
      name: "John Paul",
      rating: 4.9,
      reviews: 25,
      description: "Expert in plumbing repairs and installations",
      location: city,
    },
    {
      id: 2,
      name: "Emily Johnson",
      rating: 4.8,
      reviews: 34,
      description: "Specialized in both residential and commercial plumbing",
      location: city,
    },
    {
      id: 3,
      name: "David Lee",
      rating: 4.7,
      reviews: 45,
      description: "Experienced with emergency plumbing and drain cleaning",
      location: city,
    },
    {
      id: 4,
      name: "Sophia Green",
      rating: 4.6,
      reviews: 29,
      description: "Skilled in pipe fittings and water heater installations",
      location: city,
    },
  ];

  const handleLocationSearch = (e) => {
    if (e.key === "Enter") {
      navigate(`/${categoryName}/${e.target.value}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      <Header style={{ marginBottom: 80 }} />
      <div
        className="flex items-center justify-between bg-blue-50 p-8 rounded-lg mb-8"
        style={{ marginTop: 80 }}
      >
        <div className="max-w-lg">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">
            Find the best {categoryName} in{" "}
            <span className="text-blue-600">{city}</span>
          </h1>
          <p className="text-gray-600 mb-4">
            Our platform connects you with top-rated {categoryName} in your
            area, offering reliable and fast service for all your needs.
          </p>
          <div className="relative mt-4">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Which address are you looking for?"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg shadow-sm"
              onKeyDown={handleLocationSearch}
            />
          </div>
        </div>
        <div className="w-1/3 hidden md:block">
          <img
            src={workerImage}
            alt="Worker Team"
            className="w-full h-auto rounded-lg object-cover object-center"
          />
        </div>
      </div>
      <div className="flex gap-8">
        <FilterSection />
        <div className="flex-1 space-y-4">
          {workers.map((worker) => (
            <WorkerCard key={worker.id} worker={worker} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkersNearYou;
