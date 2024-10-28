// App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddService from "./pages/AddService";


const App = () => {
  return (
    <Router>
      {/* <Navbar/> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addService" element={<AddService />} />
        
      </Routes>
    </Router>
  );
};

export default App;
