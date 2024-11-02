import React, { useEffect, useState } from 'react';
import ProviderNavBar from './ProviderNavBar';
import Footer from '../Homepage/Footer';

function Requests() {
  const [pendingreq, setpendingreq] = useState([]);
  const [acceptedreq, setacceptedreq] = useState([]);

  const fetchrequests = async () => {
    try {
      const response = await fetch('http://127.0.0.1:3001/provider/1');
      const data = await response.json();
      
      // Calculate total price for each request
      const processedPendingRequests = data.bookingspending.map(req => ({
        ...req,
        totalPrice: (req.service.price * req.service.duration).toFixed(2)
      }));
      
      const processedAcceptedRequests = data.bookingsaccepted.map(req => ({
        ...req,
        totalPrice: (req.service.price * req.service.duration).toFixed(2)
      }));

      setpendingreq(processedPendingRequests);
      setacceptedreq(processedAcceptedRequests);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };
  
  const handleAccept = async(requestId) => {
    try {
      const response = await fetch('http://127.0.0.1:3001/provider/accept', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ requestId: requestId, ProviderId: 1 }),
      });
    
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error accepting request:', errorText);
        return;
      }
    
      const data = await response.json();
      console.log('Request accepted:', data);
    
      const accepted = pendingreq.find(req => req.id === requestId);
      setpendingreq(prev => prev.filter(req => req.id !== requestId));
      
      if (accepted) {
        setacceptedreq(prev => [...prev, accepted]);
      }
    } catch (error) {
      console.error('Error handling accept:', error);
    }
  };

  const handleReject = async(requestId) => {
    try {
      const response = await fetch('http://127.0.0.1:3001/provider/reject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ requestId: requestId, ProviderId: 1 }),
      });
    
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error rejecting request:', errorText);
        return;
      }
    
      const data = await response.json();
      console.log('Request rejected:', data);
      setpendingreq(prev => prev.filter(req => req.id !== requestId));
    } catch (error) {
      console.error('Error handling reject:', error);
    }
  };

  useEffect(() => {
    fetchrequests();
  }, []);

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <ProviderNavBar/>
        <div className="flex-grow flex justify-around p-8 bg-gray-100">
          {/* Pending Requests */}
          <div className="flex-1 p-6 bg-white rounded-lg shadow-lg mr-4">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Pending Requests</h2>
            {pendingreq.length === 0 ? (
              <p className="text-gray-500">No pending requests</p>
            ) : (
              pendingreq.map((req) => (
                <div key={req.id} className="mb-6 p-4 border rounded-lg shadow-md">
                  <p className="font-medium text-lg">{req.user.username}</p>
                  <p className="text-gray-600">{req.service.name}</p>
                  <p className="text-gray-500">Booking Date: {new Date(req.bookingDate).toLocaleDateString()}</p>
                  <p className="text-gray-500">Price per Hour: ${req.service.price}</p>
                  <p className="text-gray-500">Duration: {req.service.duration} hours</p>
                  <p className="text-gray-500 font-semibold">Total Price: ${req.totalPrice}</p>
                  {req.notes && <p className="text-gray-500 italic">Notes: {req.notes}</p>}
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => handleAccept(req.id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-green-500 transition-colors"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(req.id)}
                      className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Accepted Requests */}
          <div className="flex-1 p-6 bg-white rounded-lg shadow-lg ml-4">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Accepted Requests</h2>
            {acceptedreq.length === 0 ? (
              <p className="text-gray-500">No accepted requests</p>
            ) : (
              acceptedreq.map((req) => (
                <div key={req.id} className="mb-6 p-4 border rounded-lg shadow-md">
                  <p className="font-medium text-lg">{req.user.username}</p>
                  <p className="text-gray-600">{req.service.name}</p>
                  <p className="text-gray-500">Booking Date: {new Date(req.bookingDate).toLocaleDateString()}</p>
                  <p className="text-gray-500">Price per Hour: ${req.service.price}</p>
                  <p className="text-gray-500">Duration: {req.service.duration} hours</p>
                  <p className="text-gray-500 font-semibold">Total Price: ${req.totalPrice}</p>
                  {req.notes && <p className="text-gray-500 italic">Notes: {req.notes}</p>}
                </div>
              ))
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Requests;