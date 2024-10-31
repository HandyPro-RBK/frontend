import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/worker/Header";
import FilterSection from "../components/worker/FilterSection";
import WorkerCard from "../components/worker/WorkerCard";
import FeaturedCategories from "../components/worker/FeaturedCategories";
import FAQSection from "../components/Homepage/FAQSection";
import { MapPin } from "lucide-react";
import workerImage from "../assets/images/worker.png";
import Footer from "../components/Homepage/Footer";

const WorkersNearYou = () => {
  const { categoryName, city } = useParams();
  const navigate = useNavigate();

  const workers = [
    {
      id: 1,
      name: "John Paul",
      rating: 4.9,
      reviews: 25,
      description: "Expert in plumbing repairs and installations",
      location: city,
      image: "/assets/images/john_paul.jpg",
    },
    {
      id: 2,
      name: "Michael Johnson",
      rating: 4.8,
      reviews: 34,
      description: "Specialized in both residential and commercial plumbing",
      location: city,
      image: "/assets/images/michael_johnson.jpg",
    },
    {
      id: 3,
      name: "David Lee",
      rating: 4.7,
      reviews: 45,
      description: "Experienced with emergency plumbing and drain cleaning",
      location: city,
      image: "/assets/images/david_lee.jpg",
    },
    {
      id: 4,
      name: "Samuel Green",
      rating: 4.6,
      reviews: 29,
      description: "Skilled in pipe fittings and water heater installations",
      location: city,
      image: "/assets/images/samuel_green.jpg",
    },
  ];

  const handleLocationSearch = (e) => {
    if (e.key === "Enter") {
      navigate(`/${categoryName}/${e.target.value}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <div className="flex-grow container max-w-7xl mx-auto px-4 py-8 mt-8">
        <div className="flex items-center justify-between bg-gray-200 p-8 rounded-lg mb-8">
          <div className="max-w-lg">
            <h1 className="text-3xl font-bold text-blue-900 mb-2">
              Find the best {categoryName} in{" "}
              <span className="text-[#2B4DFF]">{city}</span>{" "}
            </h1>
            <p className="text-gray-800 mb-4">
              Our platform connects you with top-rated {categoryName} in your
              area, offering reliable and fast service for all your needs.
            </p>
            <div className="relative mt-4">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800" />
              <input
                type="text"
                placeholder="Which address are you looking for?"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg shadow-sm bg-white text-gray-800 placeholder-gray-800"
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

        {/* Main Content */}
        <div className="flex gap-8">
          <FilterSection />
          <div className="flex-1 space-y-4">
            {workers.map((worker) => (
              <WorkerCard
                key={worker.id}
                worker={worker}
                className="bg-white border border-gray-200 hover:border-blue-900 transition-colors duration-200"
              />
            ))}
          </div>
        </div>
        <div className="mt-12">
          <FeaturedCategories />
        </div>
        <FAQSection />
      </div>

      <Footer className="bg-blue-900 text-white" />
    </div>
  );
};

export default WorkersNearYou;
