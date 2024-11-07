import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Calendar, Clock } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const validateDateTime = (date, time) => {
  const now = new Date();
  const selectedDateTime = new Date(`${date}T${time}`);

  if (selectedDateTime < now) {
    throw new Error("Cannot book for past date and time");
  }

  const hours = selectedDateTime.getHours();
  if (hours < 9 || hours > 17) {
    throw new Error("Bookings are only available between 9 AM and 5 PM");
  }
};

const BookingForm = ({ serviceId, providerId, onClose }) => {
  const navigate = useNavigate();
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      validateDateTime(bookingDate, bookingTime);

      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("Authentication required");
      }

      const combinedDateTime = `${bookingDate}T${bookingTime}:00.000Z`;

      const response = await fetch(`${API_URL}/my-services/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          serviceId,
          providerId,
          bookingDate: combinedDateTime,
          notes,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.code === "TOKEN_EXPIRED") {
          localStorage.removeItem("authToken");
          navigate("/login");
          return;
        }
        throw new Error(errorData.error || "Failed to create booking");
      }

      const data = await response.json();
      alert(data.message);
      onClose();
      navigate("/categories");
    } catch (error) {
      console.error("Error creating booking:", error);
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-blue-900">Book Service</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <span>Date</span>
                </div>
                <input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="border border-gray-300 rounded-md px-4 py-2 w-full"
                  required
                />
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <span>Time</span>
                </div>
                <input
                  type="time"
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                  className="border border-gray-300 rounded-md px-4 py-2 w-full"
                  required
                />
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Additional Notes</h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 w-full h-32"
                placeholder="Add any special requirements or notes..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Processing..." : "Submit Booking"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
