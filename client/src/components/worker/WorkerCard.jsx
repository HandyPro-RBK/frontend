import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Star, Heart, MapPin } from "lucide-react";

const WorkerCard = ({ worker }) => {
  const navigate = useNavigate();

  const handleQuoteRequest = (workerId) => {
    navigate(`/request-quote/${workerId}`);
  };

  return (
    <div className="bg-white rounded-lg p-4 flex gap-4 border border-gray-100">
      <Link to={`/worker/${worker.id}`} className="w-24 h-24">
        <img
          src="/api/placeholder/96/96"
          alt="Worker profile"
          className="w-full h-full rounded-lg object-cover"
        />
      </Link>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <Link
              to={`/worker/${worker.id}`}
              className="font-semibold text-blue-600 hover:underline"
            >
              John paul
            </Link>
            <div className="flex items-center gap-1 mt-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm">4.5</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              20 years ago first collaborated on this Fixed Plumbing task
            </p>
          </div>
          <button className="hover:text-red-500">
            <Heart className="w-5 h-5 text-gray-400" />
          </button>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <MapPin className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">Contact for price</span>
        </div>
        <button
          onClick={() => handleQuoteRequest(worker.id)}
          className="mt-2 bg-orange-500 text-white px-4 py-1 rounded-full text-sm hover:bg-orange-600 transition-colors"
        >
          Request a quote
        </button>
      </div>
    </div>
  );
};

export default WorkerCard;
