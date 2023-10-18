import PropTypes from "prop-types";
import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";
import { showMessage } from "../components/Notification";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);

      const token = localStorage.getItem("access_token");
      const userData = JSON.parse(localStorage.getItem("user_data"));
      const refreshToken = localStorage.getItem("refresh_token");

      if (token) {
        const isTokenValid = await api.tokenVerify(token);

        if (isTokenValid.status) {
          setIsAuthenticated(true);
          setUser(userData);
          setLoading(false);
          return;
        }

        if (refreshToken) {
          const newTokenData = await api.tokenRefresh(refreshToken);

          if (newTokenData.status) {
            localStorage.setItem("access_token", newTokenData.data.access);
            setIsAuthenticated(true);
            setUser(userData);
            setLoading(false);
            return;
          }
        }
      }
      signOut();
      setLoading(false);
    };

    initAuth();
  }, []);

  const showNotification = (status, message, position) => {
    showMessage({ status, message, position });
  };

  const signIn = async (email, password) => {
    setLoading(true);
    const data = await api.signIn(email, password);
    try {
      if (data.status) {
        const user = {
          id: data.data.id,
          email: data.data.email,
          first_name: data.data.first_name,
          last_name: data.data.last_name,
        };
        localStorage.setItem("user_data", JSON.stringify(user));
        localStorage.setItem("access_token", data.data.token);
        localStorage.setItem("refresh_token", data.data.refresh);

        setUser(user);
        setIsAuthenticated(true);
        setLoading(false);
        return data.status;
      } else {
        setLoading(false);
        return data.status;
      }
    } catch (error) {
      setLoading(false);
      return error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    setLoading(true);
    localStorage.removeItem("user_data");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsAuthenticated(false);
    setUser(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        isAuthenticated,
        loading,
        user,
        showNotification,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
