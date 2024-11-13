import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({
  id,
  title = "Untitled Service",
  image = "",
  averageRating = null,
  providerName = "Unknown Provider",
}) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleCardClick = () => {
    navigate(`/service/${id}`);
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
    return rating > 0 ? rating.toFixed(1) : "0.0";
  };

  return (
    <div
      className="relative group cursor-pointer overflow-hidden rounded-lg border border-gray-200 shadow hover:shadow-lg transition-shadow duration-300"
      role="article"
      aria-label={`${title} service card`}
      onClick={handleCardClick}
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
            <div className="flex items-center bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
              <span className="text-yellow-400 flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {formatRating(averageRating)}
              </span>
            </div>
            <span className="text-sm text-gray-200">
              by <span className="font-medium">{providerName}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
