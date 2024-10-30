import React from "react";
import { Star } from "lucide-react";

const FilterSection = () => (
  <div className="w-64 p-4 bg-white rounded-lg">
    <h3 className="font-semibold mb-4">Filters</h3>
    <div className="space-y-3">
      <h4 className="text-sm font-medium mb-2">Best reviews</h4>
      {[5, 4, 3, 2, 1].map((rating) => (
        <div key={rating} className="flex items-center gap-2">
          <input type="checkbox" className="rounded border-gray-300" />
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-gray-600">({rating}.0)</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default FilterSection;
