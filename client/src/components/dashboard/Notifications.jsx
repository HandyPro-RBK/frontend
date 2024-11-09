import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Homepage/Navbar";
import DashboardSidebar from "./DashboardSidebar";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("/api/dashboard/notifications", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Ensure response data is an array before setting state
        setNotifications(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch notifications");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const markAsRead = async (notificationId) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.patch(
        `/api/dashboard/notifications/${notificationId}/read`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setNotifications(
        notifications.map((notification) =>
          notification.id === notificationId
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="flex">
          <DashboardSidebar />
          <div className="flex-1 p-8">
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
          <h1 className="text-2xl font-bold mb-6">Notifications</h1>

          {error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <div className="space-y-4">
              {notifications.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
                  No notifications yet
                </div>
              ) : (
                Array.isArray(notifications) &&
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`bg-white rounded-lg shadow-md p-6 ${
                      !notification.read ? "border-l-4 border-blue-900" : ""
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <h3 className="font-medium">{notification.title}</h3>
                        <p className="text-gray-600">{notification.message}</p>
                        <p className="text-sm text-gray-400">
                          {new Date(
                            notification.createdAt
                          ).toLocaleDateString()}
                        </p>
                      </div>
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-sm text-blue-900 hover:text-blue-700"
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
