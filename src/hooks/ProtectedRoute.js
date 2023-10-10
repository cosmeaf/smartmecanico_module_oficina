import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return children;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
