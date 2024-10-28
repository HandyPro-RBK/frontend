import React from "react";
import { useParams } from "react-router-dom";

const WorkersNearYou = () => {
  const { categoryName, city } = useParams();

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-blue-900 mb-6">
        {categoryName} Workers Near {city}
      </h1>
      {/* Replace with actual data fetching and worker display logic */}
      <p>
        Showing top-rated {categoryName.toLowerCase()} professionals in {city}.
      </p>
      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Map through worker data here */}
        {[1, 2, 3].map((worker, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg shadow-md p-4 text-center"
          >
            <h3 className="text-xl font-semibold">Worker {index + 1}</h3>
            <p className="text-gray-600">Details about the worker.</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkersNearYou;
