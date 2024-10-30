import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      navigate(`/search?q=${e.target.value}`);
    }
  };

  return (
    <div className="flex items-center justify-between mb-8">
      <Link to="/" className="text-xl font-bold text-blue-900">
        I Need Pro
      </Link>
      <nav className="flex gap-4">
        <Link
          to="/find-professional"
          className="text-gray-600 hover:text-blue-900"
        >
          Find A Professional
        </Link>
        <Link
          to="/all-categories"
          className="text-gray-600 hover:text-blue-900"
        >
          All Category
        </Link>
        <Link to="/contact" className="text-gray-600 hover:text-blue-900">
          Contact
        </Link>
      </nav>
    </div>
  );
};

export default Header;
