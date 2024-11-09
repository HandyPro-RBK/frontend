import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import Navbar from "../Homepage/Navbar";
import DashboardSidebar from "./DashboardSidebar";

const BookingDetails = () => {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [submittingReview, setSubmittingReview] = useState(false);
  const navigate = useNavigate();

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!rating) {
      setError("Please select a rating");
      return;
    }

    try {
      setSubmittingReview(true);
      await api.post(`/dashboard/bookings/${bookingId}/review`, {
        rating,
        review,
      });
      await fetchBookingDetails();
      setReview("");
      setRating(0);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to submit review");
    } finally {
      setSubmittingReview(false);
    }
  };

  const fetchBookingDetails = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/dashboard/bookings/${bookingId}`);
      if (response.data) {
        setBooking(response.data);
        setError(null);
      } else {
        setError("No booking data found");
      }
    } catch (err) {
      console.error("Booking fetch error:", err);
      setError(err.response?.data?.error || "Failed to fetch booking details");
      setBooking(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (bookingId) {
      fetchBookingDetails();
    }
  }, [bookingId, navigate]);

  const renderStarRating = (currentRating) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className={`text-2xl ${
              star <= currentRating ? "text-yellow-400" : "text-gray-300"
            }`}
          >
            ★
          </button>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="flex">
          <DashboardSidebar />
          <div className="flex-1 p-8">
            <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-900"></div>
              <p className="mt-4 text-gray-700">Loading booking details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="flex">
          <DashboardSidebar />
          <div className="flex-1 p-8">
            <div className="bg-red-100 text-red-700 p-4 rounded-lg">
              {error}
            </div>
            <button
              onClick={() => navigate("/dashboard/bookings")}
              className="mt-4 px-4 py-2 text-blue-900 hover:text-blue-700"
            >
              Back to Bookings
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="flex">
          <DashboardSidebar />
          <div className="flex-1 p-8">
            <div className="text-center">
              <p className="text-gray-700">No booking found</p>
              <button
                onClick={() => navigate("/dashboard/bookings")}
                className="mt-4 px-4 py-2 text-blue-900 hover:text-blue-700"
              >
                Back to Bookings
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex">
        <DashboardSidebar />
        <div className="flex-1 p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Booking Details</h1>
            <button
              onClick={() => navigate("/dashboard/bookings")}
              className="px-4 py-2 text-blue-900 hover:text-blue-700"
            >
              Back to Bookings
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Service Information
                </h2>
                <div className="space-y-3">
                  <p>
                    <span className="font-medium">Service:</span>{" "}
                    {booking.service?.name || "N/A"}
                  </p>
                  <p>
                    <span className="font-medium">Description:</span>{" "}
                    {booking.service?.description || "N/A"}
                  </p>
                  <p>
                    <span className="font-medium">Price:</span> $
                    {booking.service?.price || "N/A"}
                  </p>
                  <p>
                    <span className="font-medium">Status: </span>
                    <span
                      className={`ml-2 px-2 py-1 rounded-full text-sm ${
                        booking.status === "COMPLETED"
                          ? "bg-green-100 text-green-800"
                          : booking.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Provider Details</h2>
                <div className="flex items-center space-x-4 mb-4">
                  {booking.provider?.photoUrl && (
                    <img
                      src={booking.provider.photoUrl}
                      alt={booking.provider.username}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="font-medium">
                      {booking.provider?.username || "N/A"}
                    </p>
                    <p className="text-gray-600">
                      {booking.provider?.email || "N/A"}
                    </p>
                    <p className="text-gray-600">
                      {booking.provider?.phone || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <h2 className="text-xl font-semibold mb-4">
                  Booking Date and Time
                </h2>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">Scheduled for:</span>{" "}
                    {booking.bookingDate
                      ? new Date(booking.bookingDate).toLocaleString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        })
                      : "N/A"}
                  </p>
                  <p>
                    <span className="font-medium">Created on:</span>{" "}
                    {booking.createdAt
                      ? new Date(booking.createdAt).toLocaleString()
                      : "N/A"}
                  </p>
                </div>
              </div>

              {booking.status === "COMPLETED" && !booking.review && (
                <div className="md:col-span-2">
                  <h2 className="text-xl font-semibold mb-4">Leave a Review</h2>
                  <form onSubmit={handleReviewSubmit} className="space-y-4">
                    {renderStarRating(rating)}
                    <textarea
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      placeholder="Share your experience..."
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows="4"
                    />
                    <button
                      type="submit"
                      disabled={submittingReview}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
                    >
                      {submittingReview ? "Submitting..." : "Submit Review"}
                    </button>
                  </form>
                </div>
              )}

              {booking.status === "COMPLETED" && booking.review && (
                <div className="md:col-span-2">
                  <h2 className="text-xl font-semibold mb-4">Your Review</h2>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="mb-2">
                      {renderStarRating(booking.rating)}
                    </div>
                    <p className="text-gray-700">{booking.review}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Posted on{" "}
                      {booking.reviewDate
                        ? new Date(booking.reviewDate).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
