import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BrowseCategories from "./components/Homepage/BrowseCategories";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<BrowseCategories />} />
        <Route
          path="/categories/:categoryName"
          element={<BrowseCategories />}
        />
      </Routes>
    </Router>
  );
};

export default App;
