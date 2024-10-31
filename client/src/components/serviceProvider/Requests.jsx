import React, { useEffect, useState } from 'react';
import ProviderNavBar from './ProviderNavBar'

function Requests() {
  const [pendingreq, setpendingreq] = useState([]);
  const [acceptedreq, setacceptedreq] = useState([]);

  const fetchrequests = async () => {
    try {
      const response = await fetch('http://127.0.0.1:3001/provider/1');
      const data = await response.json();
      setpendingreq(data.bookingspending);
      setacceptedreq(data.bookingsaccepted);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };
  
  const handleAccept = async(requestId) => {
    console.log(requestId);
    const response = await fetch('http://127.0.0.1:3001/provider/accept', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Specify the content type
      },
      body: JSON.stringify({ requestId: requestId, ProviderId: 1 }), // Convert the body to a JSON string
    });
  
    if (!response.ok) {
      // Handle errors if the response is not OK
      const errorText = await response.text(); // Get error details
      console.error('Error accepting request:', errorText);
      return;
    }
  
    const data = await response.json(); // Process the response data if needed
    console.log('Request accepted:', data);
  
    setpendingreq(prev => prev.filter(req => req.id !== requestId));

    const accepted = pendingreq.find(req => req.id === requestId);
    if (accepted) {
      setacceptedreq(prev => [...prev, accepted]);
    }
  };

  const handleReject = async(requestId) => {
    console.log(requestId);
    const response = await fetch('http://127.0.0.1:3001/provider/accept', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Specify the content type
      },
      body: JSON.stringify({ requestId: requestId, ProviderId: 1 }), // Convert the body to a JSON string
    });
  
    if (!response.ok) {
      // Handle errors if the response is not OK
      const errorText = await response.text(); // Get error details
      console.error('Error accepting request:', errorText);
      return;
    }
  
    const data = await response.json(); // Process the response data if needed
    console.log('Request accepted:', data);
    setpendingreq(prev => prev.filter(req => req.id !== requestId));
  };

  useEffect(() => {
    fetchrequests();
  }, []);

  return (<div>
          <ProviderNavBar/>

    <div className="flex justify-around p-8 bg-gray-100">
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
              <p className="text-gray-500">Total Price: ${req.totalPrice}</p>
              {req.notes && <p className="text-gray-500 italic">Notes: {req.notes}</p>}
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleAccept(req.id)}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleReject(req.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
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
              <p className="text-gray-500">Total Price: ${req.totalPrice}</p>
              {req.notes && <p className="text-gray-500 italic">Notes: {req.notes}</p>}
            </div>
          ))
        )}
      </div>
    </div>
    </div>
  );
}

export default Requests;
