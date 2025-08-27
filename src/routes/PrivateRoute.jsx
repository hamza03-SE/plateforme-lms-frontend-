import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

/**
 * Protège une route. Optionnellement, restreint par rôles.
 * Usage:
 *  <PrivateRoute roles={["ADMIN"]}><AdminPage /></PrivateRoute>
 */
function PrivateRoute({ children, roles }) {
  const { user, hasRole } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  if (roles && roles.length > 0 && !hasRole(roles)) {
    // Redirige vers une page adaptée si besoin
    return <Navigate to="/login" replace />;
  }

  return children;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  roles: PropTypes.arrayOf(PropTypes.string),
};

PrivateRoute.defaultProps = {
  roles: undefined,
};

export default PrivateRoute;
