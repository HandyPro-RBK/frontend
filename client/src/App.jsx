import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BrowseCategories from "./components/Homepage/BrowseCategories";
import WorkersNearYou from "./pages/WorkersNearYou";
import AddService from "./pages/AddService";
import Dashboard from "./components/dashboard/Dashboard";
import UserBookings from "./components/dashboard/UserBookings";
import BookingDetails from "./components/dashboard/BookingDetails";
import Notifications from "./components/dashboard/Notifications";
import UserProfile from "./components/dashboard/UserProfile";
import RegisterUser from "./components/user/Register";
import RegisterProvider from "./components/serviceProvider/ProviderRegister";
import LoginUser from "./components/user/Login";
import LoginProvider from "./components/serviceProvider/ProviderLogin";
import History from "./components/serviceProvider/History";
import ProviderProfile from "./components/serviceProvider/Profile";
import ServiceDetail from "./components/serviceProvider/ServiceDetail";
import PrivateRoute from "./components/common/PrivateRoute";
import Messanger from './components/messages/Messenger'
import Dashboardp from "./components/serviceProvider/Dashboard";
import Requests from "./components/serviceProvider/Requests";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<BrowseCategories />} />
        <Route path="/ServiceProvider" element={<Dashboardp />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/ServiceProvider" element={<Dashboardp />} />
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
        <Route path="/messenger" element={<Messanger />} />
       

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
        <Route
          path="/dashboard/notifications"
          element={
            <PrivateRoute>
              <Notifications />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/profile"
          element={
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
