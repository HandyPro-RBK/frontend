import React, { useEffect, useState } from "react";
import ProviderNavBar from "./ProviderNavBar";
import Footer from "../Homepage/Footer";

function Requests() {
  const [pendingreq, setpendingreq] = useState([]);
  const [acceptedreq, setacceptedreq] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchrequests = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");

      const response = await fetch("http://127.0.0.1:3001/provider/requests", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch requests");
      }

      const data = await response.json();

      // Calculate total price for each request
      const processedPendingRequests = data.bookingspending.map((req) => ({
        ...req,
        totalPrice: (req.service.price * req.service.duration).toFixed(2),
      }));

      const processedAcceptedRequests = data.bookingsaccepted.map((req) => ({
        ...req,
        totalPrice: (req.service.price * req.service.duration).toFixed(2),
      }));

      setpendingreq(processedPendingRequests);
      setacceptedreq(processedAcceptedRequests);
      setError(null);
    } catch (error) {
      console.error("Error fetching requests:", error);
      setError("Failed to load requests. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (requestId) => {
    try {
      const token = localStorage.getItem("authToken");
      const providerId = localStorage.getItem("providerId");

      const response = await fetch("http://127.0.0.1:3001/provider/accept", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          requestId: requestId,
          ProviderId: providerId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to accept request");
      }

      const accepted = pendingreq.find((req) => req.id === requestId);
      setpendingreq((prev) => prev.filter((req) => req.id !== requestId));

      if (accepted) {
        setacceptedreq((prev) => [...prev, accepted]);
      }

      // Refresh requests
      fetchrequests();
    } catch (error) {
      console.error("Error handling accept:", error);
      setError("Failed to accept request");
    }
  };

  const handleReject = async (requestId) => {
    try {
      const token = localStorage.getItem("authToken");
      const providerId = localStorage.getItem("providerId");

      const response = await fetch("http://127.0.0.1:3001/provider/reject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          requestId: requestId,
          ProviderId: providerId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to reject request");
      }

      setpendingreq((prev) => prev.filter((req) => req.id !== requestId));
      // Refresh requests
      fetchrequests();
    } catch (error) {
      console.error("Error handling reject:", error);
      setError("Failed to reject request");
    }
  };

  useEffect(() => {
    fetchrequests();
  }, []);

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <ProviderNavBar />
        <div className="flex-grow flex flex-col md:flex-row justify-around p-4 md:p-8 bg-gray-100">
          {error && (
            <div className="w-full mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {loading ? (
            <div className="w-full text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading requests...</p>
            </div>
          ) : (
            <>
              {/* Pending Requests */}
              <div className="flex-1 p-6 bg-white rounded-lg shadow-lg mb-4 md:mb-0 md:mr-4">
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">
                  Pending Requests
                </h2>
                {pendingreq.length === 0 ? (
                  <p className="text-gray-500">No pending requests</p>
                ) : (
                  pendingreq.map((req) => (
                    <div
                      key={req.id}
                      className="mb-6 p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-medium text-lg text-blue-600">
                            {req.user.username}
                          </p>
                          <p className="text-gray-600 font-medium">
                            {req.service.name}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">
                            Booking Date:{" "}
                            {new Date(req.bookingDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-gray-500">
                            Price per Hour:
                            <span className="font-medium text-gray-700">
                              {" "}
                              ${req.service.price}
                            </span>
                          </p>
                          <p className="text-gray-500">
                            Duration:
                            <span className="font-medium text-gray-700">
                              {" "}
                              {req.service.duration} hours
                            </span>
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-800 font-semibold">
                            Total Price: {req.totalPrice} dinar
                          </p>
                        </div>
                      </div>

                      {req.notes && (
                        <div className="mb-4 p-3 bg-gray-50 rounded-md">
                          <p className="text-gray-600 italic">
                            Notes: {req.notes}
                          </p>
                        </div>
                      )}

                      <div className="mt-4 flex gap-3">
                        <button
                          onClick={() => handleAccept(req.id)}
                          className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-300 transition-colors"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleReject(req.id)}
                          className="flex-1 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Accepted Requests */}
              <div className="flex-1 p-6 bg-white rounded-lg shadow-lg md:ml-4">
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">
                  Accepted Requests
                </h2>
                {acceptedreq.length === 0 ? (
                  <p className="text-gray-500">No accepted requests</p>
                ) : (
                  acceptedreq.map((req) => (
                    <div
                      key={req.id}
                      className="mb-6 p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-medium text-lg text-blue-600">
                            {req.user.username}
                          </p>
                          <p className="text-gray-600 font-medium">
                            {req.service.name}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">
                            Booking Date:{" "}
                            {new Date(req.bookingDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-gray-500">
                            Price per Hour:
                            <span className="font-medium text-gray-700">
                              {" "}
                              ${req.service.price}
                            </span>
                          </p>
                          <p className="text-gray-500">
                            Duration:
                            <span className="font-medium text-gray-700">
                              {" "}
                              {req.service.duration} hours
                            </span>
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-800 font-semibold">
                            Total Price: {req.totalPrice} dinar
                          </p>
                        </div>
                      </div>

                      {req.notes && (
                        <div className="mb-4 p-3 bg-gray-50 rounded-md">
                          <p className="text-gray-600 italic">
                            Notes: {req.notes}
                          </p>
                        </div>
                      )}

                      <div className="mt-2 text-right">
                        <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                          Accepted
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Requests;
