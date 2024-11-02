import React, { useEffect, useState } from 'react';
import ProviderNavBar from './ProviderNavBar';
import Footer from '../Homepage/Footer'

function Requests() {
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    try {
      const response = await fetch('http://127.0.0.1:3001/provider/history/1');
      const data = await response.json();
      setHistory(data);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <>
    <div className="bg-gray-100 min-h-screen">
      <ProviderNavBar />

      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Booking History</h2>
        {history.length === 0 ? (
          <p className="text-gray-500">No booking history available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {history.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md p-4">
                <h3 className="font-medium text-lg">{item.service.name}</h3>
                <p className="text-gray-600">Booking Date: {new Date(item.bookingDate).toLocaleDateString()}</p>
                
                {item.notes && <p className="text-gray-500 italic">Notes: {item.notes}</p>}
                <p className="text-gray-500">Status: {item.status}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    <Footer />
    </>
  );
  
}

export default Requests;
