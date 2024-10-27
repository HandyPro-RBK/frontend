import React from "react";

const CategoryCard = ({ image, title }) => (
  <div className="relative group cursor-pointer overflow-hidden rounded-lg">
    <div className="relative h-72 w-full overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      <h3 className="absolute bottom-6 left-6 text-white text-2xl font-semibold">
        {title}
      </h3>
    </div>
  </div>
);

export default CategoryCard;
