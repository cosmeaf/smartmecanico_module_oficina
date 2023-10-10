import React, { useEffect } from "react";
import { Navigate, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";

const PrivateRoute = ({ path, element, isAuthenticated, children }) => {
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      Navigate("/login", {
        state: { from: location.pathname },
      });
    }
  }, [isAuthenticated, location]);

  return (
    <Route path={path} element={isAuthenticated ? element : children}>
      {children}
    </Route>
  );
};

export default PrivateRoute;
