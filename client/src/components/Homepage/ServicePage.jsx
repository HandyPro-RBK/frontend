import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Star,
  Clock,
  MapPin,
  Heart,
  Share2,
  Calendar,
  MessageCircle,
  Shield,
  Award,
  ThumbsUp,
  User,
  CheckCircle,
  Clock8,
} from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BookingForm from "./BookingForm";
import api from "../utils/api";

const ServicePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [providerImageError, setProviderImageError] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        setIsLoading(true);
        const { data } = await api.get(`/my-services/${id}`);
        setService(data);
      } catch (error) {
        console.error("Error fetching service details:", error);
        setError("Failed to load service details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchServiceDetails();
  }, [id]);

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

  const handleContactClick = async () => {
    const token = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      const confirmLogin = window.confirm(
        "Please log in to contact the provider. Would you like to go to the login page?"
      );
      if (confirmLogin) {
        navigate("/login-user");
      }
      return;
    }

    try {
      const checkExisting = await api.get(
        `/conversations/${userId}/Allconversations`
      );
      let existingConversation = checkExisting.data.find(
        (conv) =>
          conv.providerId === service.providerId &&
          conv.UserId === parseInt(userId)
      );

      if (existingConversation) {
        navigate("/messenger", {
          state: { currentChat: existingConversation },
        });
      } else {
        const response = await api.post("/conversations/create", {
          userId: parseInt(userId),
          providerId: service.providerId,
        });
        navigate("/messenger", { state: { currentChat: response.data } });
      }
    } catch (error) {
      console.error("Error handling conversation:", error);
      alert("Failed to start conversation. Please try again.");
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: service.name,
        text: service.description,
        url: window.location.href,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <div className="relative w-24 h-24">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-200 rounded-full animate-pulse"></div>
            <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-900 rounded-full animate-spin border-t-transparent"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <div className="text-orange-600 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Error Loading Service
            </h3>
            <p className="text-gray-600">{error || "Service not found"}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="relative h-[500px]">
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/800x500?text=Service+Image";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>

            {/* Service Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <div className="max-w-3xl">
                <h1 className="text-4xl font-bold mb-4">{service.name}</h1>
                <div className="flex flex-wrap gap-4 items-center text-sm">
                  <div className="flex items-center bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm">
                    <Star className="h-4 w-4 text-yellow-400 mr-2" />
                    <span>{service.averageRating?.toFixed(1) || "New"}</span>
                  </div>
                  <div className="flex items-center bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{service.provider.city}</span>
                  </div>
                  <div className="flex items-center bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{service.duration} hours</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="absolute top-4 right-4 flex space-x-2">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
              >
                <Heart
                  className={`h-6 w-6 ${
                    isFavorite
                      ? "fill-orange-600 text-orange-600"
                      : "text-gray-600"
                  }`}
                />
              </button>
              <button
                onClick={handleShare}
                className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
              >
                <Share2 className="h-6 w-6 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Content Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Tabs */}
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8">
                  {["description", "reviews", "provider"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab
                          ? "border-orange-600 text-blue-900"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="mt-8">
                {activeTab === "description" && (
                  <div className="prose max-w-none">
                    <p className="text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className="space-y-6">
                    {service.reviews?.map((review) => (
                      <div
                        key={review.id}
                        className="bg-gray-50 rounded-xl p-6"
                      >
                        <div className="flex items-center space-x-4 mb-4">
                          <img
                            src={review.user.photoUrl}
                            alt={review.user.username}
                            className="w-12 h-12 rounded-full object-cover"
                            onError={(e) => {
                              e.target.src =
                                "https://via.placeholder.com/48x48?text=User";
                            }}
                          />
                          <div>
                            <p className="font-semibold">
                              {review.user.username}
                            </p>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? "text-yellow-400 fill-current"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "provider" && (
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-center space-x-4 mb-6">
                      <img
                        src={service.provider.photoUrl}
                        alt={service.provider.username}
                        className="w-16 h-16 rounded-full object-cover"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/64x64?text=Provider";
                        }}
                      />
                      <div>
                        <h3 className="text-xl font-semibold">
                          {service.provider.username}
                        </h3>
                        <p className="text-gray-600">
                          Professional Service Provider
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-white p-4 rounded-lg">
                        <p className="text-gray-500">Experience</p>
                        <p className="text-lg font-semibold">5+ years</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg">
                        <p className="text-gray-500">Completed Jobs</p>
                        <p className="text-lg font-semibold">100+</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
                <div className="mb-6">
                  <p className="text-gray-500">Price</p>
                  <p className="text-3xl font-bold text-blue-900">
                    {service.price} Dinar
                  </p>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={handleBookNowClick}
                    className="w-full bg-blue-900 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-800 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Calendar className="h-5 w-5" />
                    <span>Book Now</span>
                  </button>

                  <button
                    onClick={handleContactClick}
                    className="w-full bg-white text-orange-600 py-3 px-4 rounded-lg font-medium border-2 border-orange-600 hover:bg-orange-50 transition-colors flex items-center justify-center space-x-2"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>Contact Provider</span>
                  </button>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-medium mb-4">Service Guarantees</h4>
                  <div className="space-y-3">
                    {[
                      { icon: Shield, text: "Service Protection" },
                      { icon: Award, text: "Quality Guaranteed" },
                      { icon: ThumbsUp, text: "Satisfaction Assured" },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 text-gray-600"
                      >
                        <item.icon className="h-5 w-5 text-orange-600" />
                        <span>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {isBookingFormOpen && (
        <BookingForm
          serviceId={service.id}
          providerId={service.providerId}
          onClose={() => setIsBookingFormOpen(false)}
        />
      )}

      <Footer />
    </div>
  );
};

export default ServicePage;
