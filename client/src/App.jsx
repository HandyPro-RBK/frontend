import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BrowseCategories from "./components/Homepage/BrowseCategories";
import WorkersNearYou from "./pages/WorkersNearYou";
import AddService from "./pages/AddService";
import Dashboard from "./components/dashboard/Dashboard";
import UserBookings from "./components/dashboard/UserBookings";
import BookingDetails from "./components/dashboard/BookingDetails";
import RegisterUser from "./components/user/Register";
import RegisterProvider from "./components/serviceProvider/ProviderRegister";
import LoginUser from "./components/user/Login";
import LoginProvider from "./components/serviceProvider/ProviderLogin";
import PrivateRoute from "./components/common/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<BrowseCategories />} />
        <Route
          path="/categories/:categoryName/:city"
          element={<WorkersNearYou />}
        />
        <Route path="/login-user" element={<LoginUser />} />
        <Route path="/login-provider" element={<LoginProvider />} />
        <Route path="/register-user" element={<RegisterUser />} />
        <Route path="/register-provider" element={<RegisterProvider />} />

        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/bookings"
          element={
            <PrivateRoute>
              <UserBookings />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/bookings/:bookingId"
          element={
            <PrivateRoute>
              <BookingDetails />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
