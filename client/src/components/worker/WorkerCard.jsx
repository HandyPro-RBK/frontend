import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Star, Heart, MapPin, MessageSquare } from "lucide-react";

const WorkerCard = ({ worker }) => {
  const navigate = useNavigate();

  const handleBooking = (workerId) => {
    navigate(`/book-service/${workerId}`);
  };

  return (
    <div className="bg-white rounded-lg p-6 flex gap-4 shadow border border-black">
      <Link to={`/worker/${worker.id}`} className="w-24 h-24">
        <img
          src={worker.image}
          alt={`${worker.name} profile`}
          className="w-full h-full rounded-lg object-cover"
        />
      </Link>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <Link
              to={`/worker/${worker.id}`}
              className="font-semibold text-[#0A165E] hover:underline"
            >
              {worker.name}
            </Link>
            <div className="flex items-center gap-1 mt-1 text-[#FF9202]">
              <Star className="w-4 h-4" />
              <span className="text-sm font-medium">
                {worker.rating}/5 ({worker.reviews})
              </span>
            </div>
            <p className="text-sm text-[#1C1C1C] mt-1">{worker.description}</p>
            <span className="text-sm text-blue-900 mt-1">
              {worker.professionals} professionals available
            </span>{" "}
          </div>
          <button className="hover:text-red-500">
            <Heart className="w-5 h-5 text-gray-400" />
          </button>
        </div>
        <div className="flex items-center gap-2 mt-2 text-[#1C1C1C]">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">Contact for price</span>
          <MessageSquare className="w-4 h-4 ml-2 text-[#1C1C1C]" />
        </div>
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => handleBooking(worker.id)}
            className="bg-[#FF9202] text-white px-4 py-1 rounded-lg text-sm hover:bg-[#FF9202] transition-colors"
          >
            Book Service
          </button>
          <button
            onClick={() => navigate(`/worker/${worker.id}`)}
            className="bg-white border border-[#FF9202] text-[#FF9202] px-4 py-1 rounded-lg text-sm hover:bg-[#FF9202] hover:text-white transition-colors"
          >
            View profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkerCard;
