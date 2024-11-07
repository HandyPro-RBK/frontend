// App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BrowseCategories from "./components/Homepage/BrowseCategories";
import WorkersNearYou from "./pages/WorkersNearYou";
import AddService from "./pages/AddService";
import Dashboard from "./components/serviceProvider/Dashboard";
import Requests from "./components/serviceProvider/Requests";
import RegisterUser from "./components/user/Register";
import RegisterProvider from "./components/serviceProvider/ProviderRegister";
import LoginUser from "./components/user/Login";
import LoginProvider from "./components/serviceProvider/ProviderLogin";
import History from "./components/serviceProvider/History";
import ProviderProfile from "./components/serviceProvider/Profile"
import ServiceDetail from './components/serviceProvider/ServiceDetail';

const App = () => {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<BrowseCategories />} />
        <Route path="/ServiceProvider" element={<Dashboard />} />
        <Route path="/requests" element={<Requests />} />
        <Route
          path="/categories/:categoryName/:city"
          element={<WorkersNearYou />}
        
        />
        <Route path="/login-user" element={<LoginUser />} />
        <Route path="/login-provider" element={<LoginProvider />} />
        <Route path="/register-user" element={<RegisterUser />} />
        <Route path="/register-provider" element={<RegisterProvider />} />
        <Route path="/addService" element={<AddService />} />
        <Route path="/history" element={<History />} />
        <Route path="/profile" element={<ProviderProfile />} />
        <Route path="/service/:id" element={<ServiceDetail />} />
        
      </Routes>
    </Router>
  );
};

export default App;
