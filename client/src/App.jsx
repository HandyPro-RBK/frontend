// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BrowseCategories from "./components/services/BrowseCategories";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<BrowseCategories />} />
      </Routes>
    </Router>
  );
};

export default App;
