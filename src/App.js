import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Spinner from "./components/Spinner";
import Dashboard from "./pages/protected/Dashboard";
import Admin from "./pages/protected/Admin";
import Error404 from "./pages/error/Error404";
import User from "./pages/protected/User";
import UserRegister from "./pages/protected/UserRegister";
import Address from "./pages/protected/Address";
import Vehicle from "./pages/protected/Vehicle";
import VehicleAdd from "./pages/protected/VehicleAdd";
import Services from "./pages/protected/Services";
import Appointment from "./pages/protected/Appointment";
import Home from "./pages/public/Home";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";
import Recovery from "./pages/public/Recovery";
import About from "./pages/public/About";
import UserUpdate from "./pages/protected/UserUpdate";
import UserDetails from "./pages/protected/UserDetails";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />;
};

const App = () => {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return <Spinner />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Home />
          }
        />
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
          }
        />
        <Route
          path="/register"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Register />
            )
          }
        />
        <Route
          path="/recovery"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Recovery />
            )
          }
        />

        <Route
          path="/dashboard"
          element={isAuthenticated ? <ProtectedRoute /> : <Login />}
        >
          <Route index element={<Admin />} />
          <Route path="user" element={<User />} />
          <Route path="user-register" element={<UserRegister />} />
          <Route path="user/:id" element={<UserUpdate />} />
          <Route path="user-all/:id" element={<UserDetails />} />
          <Route path="address" element={<Address />} />
          <Route path="vehicle" element={<Vehicle />} />
          <Route path="vehicle-add" element={<VehicleAdd />} />
          <Route path="services" element={<Services />} />
          <Route path="appointment" element={<Appointment />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
