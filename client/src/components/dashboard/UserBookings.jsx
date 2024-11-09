import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import Navbar from "../Homepage/Navbar";
import DashboardSidebar from "./DashboardSidebar";

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortField, setSortField] = useState("bookingDate");
  const [sortDirection, setSortDirection] = useState("desc");
  const navigate = useNavigate();

  useEffect(() => {
    const message = localStorage.getItem("bookingSuccess");
    if (message) {
      setSuccessMessage(message);
      localStorage.removeItem("bookingSuccess");

      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [statusFilter, sortField, sortDirection]);

  const fetchBookings = async () => {
    try {
      const response = await api.get(`/dashboard/bookings`, {
        params: {
          status: statusFilter !== "ALL" ? statusFilter : undefined,
          sort: sortField,
          direction: sortDirection,
        },
      });

      setBookings(Array.isArray(response.data) ? response.data : []);
      setError(null);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("authToken");
        navigate("/login");
        return;
      }
      setError(err.response?.data?.error || "Failed to fetch bookings");
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredBookings = Array.isArray(bookings)
    ? bookings.filter((booking) => {
        const searchTermLower = searchTerm.toLowerCase();
        return (
          booking.service.name.toLowerCase().includes(searchTermLower) ||
          booking.provider.username.toLowerCase().includes(searchTermLower)
        );
      })
    : [];

  const renderTableHeader = () => (
    <tr className="bg-gray-50">
      <th
        onClick={() => handleSort("service.name")}
        className="cursor-pointer px-6 py-3"
      >
        Service
      </th>
      <th
        onClick={() => handleSort("provider.username")}
        className="cursor-pointer px-6 py-3"
      >
        Provider
      </th>
      <th
        onClick={() => handleSort("bookingDate")}
        className="cursor-pointer px-6 py-3"
      >
        Date
      </th>
      <th
        onClick={() => handleSort("status")}
        className="cursor-pointer px-6 py-3"
      >
        Status
      </th>
      <th
        onClick={() => handleSort("service.price")}
        className="cursor-pointer px-6 py-3"
      >
        Price
      </th>
      <th className="px-6 py-3">Actions</th>
    </tr>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="flex">
          <DashboardSidebar />
          <div className="flex-1 p-8 flex justify-center items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-900"></div>
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
            <h1 className="text-2xl font-bold">My Bookings</h1>
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
              >
                <option value="ALL">All Status</option>
                <option value="PENDING">Pending</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
          </div>

          {successMessage && (
            <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
              {successMessage}
            </div>
          )}

          {error ? (
            <div className="text-red-500 p-4 bg-red-100 rounded-md">
              {error}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>{renderTableHeader()}</thead>
                  <tbody>
                    {filteredBookings.map((booking) => (
                      <tr
                        key={booking.id}
                        className="border-t hover:bg-gray-50"
                      >
                        <td className="px-6 py-4">{booking.service.name}</td>
                        <td className="px-6 py-4 flex items-center space-x-3">
                          <img
                            src={booking.provider.photoUrl}
                            alt={booking.provider.username}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <span>{booking.provider.username}</span>
                        </td>
                        <td className="px-6 py-4">
                          {new Date(booking.bookingDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
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
                        <td className="px-6 py-4">${booking.service.price}</td>
                        <td className="px-6 py-4">
                          <Link
                            to={`/dashboard/bookings/${booking.id}`}
                            className="text-blue-900 hover:text-blue-700 font-medium"
                          >
                            View Details
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserBookings;
