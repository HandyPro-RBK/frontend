import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Star, Heart, MapPin, MessageSquare } from "lucide-react";

const WorkerCard = ({ worker }) => {
  const navigate = useNavigate();

  const handleBooking = (workerId) => {
    navigate(`/book-service/${workerId}`);
  };

  return (
    <div className="bg-white rounded-lg p-6 flex gap-4 shadow border border-gray-100">
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
              className="font-semibold text-blue-900 hover:underline"
            >
              {worker.name}
            </Link>
            <div className="flex items-center gap-1 mt-1 text-orange-500">
              <Star className="w-4 h-4" />
              <span className="text-sm font-medium">
                {worker.rating}/5 ({worker.reviews})
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">{worker.description}</p>
          </div>
          <button className="hover:text-red-500">
            <Heart className="w-5 h-5 text-gray-400" />
          </button>
        </div>
        <div className="flex items-center gap-2 mt-2 text-gray-500">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">Contact for price</span>
          <MessageSquare className="w-4 h-4 ml-2 text-gray-500" />
        </div>
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => handleBooking(worker.id)}
            className="bg-orange-500 text-white px-4 py-1 rounded-lg text-sm hover:bg-orange-600 transition-colors"
          >
            Book Service
          </button>
          <button
            onClick={() => navigate(`/worker/${worker.id}`)}
            className="bg-white border border-orange-500 text-orange-500 px-4 py-1 rounded-lg text-sm hover:bg-orange-500 hover:text-white transition-colors"
          >
            View profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkerCard;
