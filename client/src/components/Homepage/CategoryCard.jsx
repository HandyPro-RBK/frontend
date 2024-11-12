import React, { useState } from "react";

const CategoryCard = ({
  title = "Untitled Service",
  image = "",
  rating = null,
  providerName = "Unknown Provider",
  onClick = () => {},
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const renderPlaceholder = () => (
    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
      <svg
        className="w-16 h-16 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    </div>
  );

  const formatRating = (rating) => {
    if (rating === null || rating === undefined) return "N/A";
    const numRating = Number(rating);
    return isNaN(numRating) ? "N/A" : numRating.toFixed(1);
  };

  return (
    <div
      className="relative group cursor-pointer overflow-hidden rounded-lg border border-gray-200 shadow hover:shadow-lg transition-shadow duration-300"
      role="article"
      aria-label={`${title} service card`}
    >
      <div className="relative h-72 w-full overflow-hidden">
        {imageLoading && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse">
            {renderPlaceholder()}
          </div>
        )}

        {!imageError ? (
          <img
            src={image}
            alt={title}
            className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 ${
              imageLoading ? "opacity-0" : "opacity-100"
            }`}
            onError={handleImageError}
            onLoad={handleImageLoad}
            loading="lazy"
          />
        ) : (
          renderPlaceholder()
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

        <div className="absolute bottom-6 left-6 text-white">
          <h3 className="text-2xl font-semibold mb-1 line-clamp-2">{title}</h3>

          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <span className="text-yellow-400 flex items-center">
                <svg
                  className="w-5 h-5 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {formatRating(rating)}
              </span>
            </div>
            <span className="text-sm text-gray-200">
              by <span className="font-medium">{providerName}</span>
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label={`View details for ${title}`}
      >
        View Details
      </button>
    </div>
  );
};

export default CategoryCard;
