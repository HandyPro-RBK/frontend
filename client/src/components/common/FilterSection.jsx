import React from "react";
import { Star } from "lucide-react";

const FilterSection = () => (
  <div className="w-64 p-4 bg-white rounded-lg shadow border border-gray-100">
    <h3 className="font-semibold text-lg mb-6">Filters</h3>
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-gray-700">Best service</h4>
      {[5, 4, 3, 2, 1].map((rating) => (
        <div key={rating} className="flex items-center gap-2">
          <input
            type="radio"
            name="rating"
            className="rounded border-gray-300"
          />
          <div className="flex items-center gap-1 text-orange-500">
            <Star className="w-4 h-4" />
            <span className="text-sm">{rating}.9/5</span>
            <span className="text-gray-500 text-sm ml-1">(25)</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default FilterSection;
