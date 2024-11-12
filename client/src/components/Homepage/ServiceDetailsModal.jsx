import React, { useState } from "react";
import { X, Star, Clock, MapPin } from "lucide-react";
import BookingForm from "./BookingForm";
import { useNavigate } from "react-router-dom";

const ServiceDetailsModal = ({ isOpen, onClose, service }) => {
  const navigate = useNavigate();
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen || !service) return null;

  const handleBookNowClick = () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      const confirmLogin = window.confirm(
        "Please log in to book a service. Would you like to go to the login page?"
      );
      if (confirmLogin) {
        navigate("/login-user");
      }
      return;
    }
    setIsBookingFormOpen(true);
  };

  const handleBookingFormClose = () => {
    setIsBookingFormOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-blue-900">{service.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="text-lg font-semibold">
                  {service.averageRating.toFixed(1)} ({service.reviews?.length}{" "}
                  reviews)
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-gray-500" />
                <span>Duration: {service.duration} hours</span>
              </div>
              <div className="text-2xl font-bold text-blue-900">
                {service.price} Dinar
              </div>
              <button
                className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
                onClick={handleBookNowClick}
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Book Now"}
              </button>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Description</h3>
            <p className="text-gray-600">{service.description}</p>
          </div>

          {service.provider && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Service Provider</h3>
              <div className="flex items-center space-x-4">
                <img
                  src={service.provider.photoUrl}
                  alt={service.provider.username}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{service.provider.username}</p>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1">{service.provider.rating}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="ml-1">{service.provider.city}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {service.reviews && service.reviews.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Recent Reviews</h3>
              <div className="space-y-4">
                {service.reviews.map((review) => (
                  <div key={review.id} className="border-b pb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <img
                        src={review.user.photoUrl}
                        alt={review.user.username}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold">{review.user.username}</p>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="ml-1">{review.rating}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {isBookingFormOpen && (
        <BookingForm
          serviceId={service.id}
          providerId={service.provider.id}
          onClose={handleBookingFormClose}
        />
      )}
    </div>
  );
};

export default ServiceDetailsModal;
