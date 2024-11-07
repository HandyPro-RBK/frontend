import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import Navbar from "../Homepage/Navbar";
import DashboardSidebar from "./DashboardSidebar";

const Dashboard = () => {
  const [summary, setSummary] = useState({
    recentBookings: [],
    unreadNotifications: 0,
    recentNotifications: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const fetchDashboardSummary = async () => {
    try {
      const response = await api.get("/dashboard/summary");
      const data = response.data || {};

      // Fetch recent bookings
      const bookingsResponse = await api.get("/dashboard/bookings", {
        params: {
          sort: "bookingDate",
          direction: "desc",
          limit: 5,
        },
      });
      setSummary({
        recentBookings: response.data.recentBookings || [],
        unreadNotifications: response.data.unreadNotifications || 0,
        recentNotifications: response.data.recentNotifications || [],
      });

      // Get any success message from the URL
      const urlParams = new URLSearchParams(window.location.search);
      const message = urlParams.get("message");
      if (message) {
        setSuccessMessage(decodeURIComponent(message));
        window.history.replaceState({}, "", window.location.pathname);
      }
    } catch (err) {
      if (err.response?.status === 403) {
        setError("You do not have permission to access the dashboard.");
      } else {
        setError("Failed to fetch dashboard data. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardSummary();
  }, []);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const LoadingSpinner = () => (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex justify-center items-center h-[calc(100vh-100px)]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-900"></div>
      </div>
    </div>
  );

  const ErrorDisplay = () => (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex justify-center items-center h-[calc(100vh-100px)]">
        <div className="text-red-500 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p>{error}</p>
          <button
            onClick={fetchDashboardSummary}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    </div>
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay />;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex">
        <DashboardSidebar />
        <div className="flex-1 p-8">
          {successMessage && (
            <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
              {successMessage}
            </div>
          )}

          <div className="mb-6">
            <h1 className="text-2xl font-bold">Dashboard Overview</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Recent Bookings</h2>
                <Link
                  to="/dashboard/bookings"
                  className="text-blue-900 hover:text-blue-700"
                >
                  View All
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3">Service</th>
                      <th className="text-left py-3">Provider</th>
                      <th className="text-left py-3">Price</th>
                      <th className="text-left py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {summary.recentBookings.map((booking) => (
                      <tr
                        key={booking.id}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="py-3">{booking.service.name}</td>
                        <td className="py-3">{booking.provider.username}</td>
                        <td className="py-3">${booking.service.price}</td>
                        <td className="py-3">
                          <span
                            className={`px-2 py-1 rounded-full text-sm ${
                              booking.status === "COMPLETED"
                                ? "bg-green-100 text-green-800"
                                : booking.status === "PENDING"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  Recent Notifications{" "}
                  {summary.unreadNotifications > 0 && (
                    <span className="bg-red-500 text-white text-sm px-2 py-1 rounded-full ml-2">
                      {summary.unreadNotifications}
                    </span>
                  )}
                </h2>
                <Link
                  to="/dashboard/notifications"
                  className="text-blue-900 hover:text-blue-700"
                >
                  View All
                </Link>
              </div>
              <div className="space-y-4">
                {summary.recentNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-lg ${
                      notification.read ? "bg-gray-50" : "bg-blue-50"
                    }`}
                  >
                    <p className="font-medium">{notification.title}</p>
                    <p className="text-gray-600 text-sm">
                      {notification.message}
                    </p>
                    <p className="text-gray-400 text-xs mt-2">
                      {new Date(notification.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
