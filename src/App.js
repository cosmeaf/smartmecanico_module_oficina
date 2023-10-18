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
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";
import Recovery from "./pages/public/Recovery";
import UserUpdate from "./pages/protected/UserUpdate";
import UserDetails from "./pages/protected/UserDetails";

const App = () => {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return <Spinner />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          path="/"
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
          element={isAuthenticated ? <Dashboard /> : <Login />}
        >
          <Route index element={isAuthenticated ? <Admin /> : <Login />} />
          <Route path="user" element={isAuthenticated ? <User /> : <Login />} />
          <Route
            path="user-register"
            element={isAuthenticated ? <UserRegister /> : <Login />}
          />
          <Route
            path="user/:id"
            element={isAuthenticated ? <UserUpdate /> : <Login />}
          />
          <Route
            path="user-all/:id"
            element={isAuthenticated ? <UserDetails /> : <Login />}
          />
          <Route
            path="address"
            element={isAuthenticated ? <Address /> : <Login />}
          />
          <Route
            path="vehicle"
            element={isAuthenticated ? <Vehicle /> : <Login />}
          />
          <Route
            path="vehicle-add"
            element={isAuthenticated ? <VehicleAdd /> : <Login />}
          />
          <Route
            path="services"
            element={isAuthenticated ? <Services /> : <Login />}
          />
          <Route
            path="appointment"
            element={isAuthenticated ? <Appointment /> : <Login />}
          />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
