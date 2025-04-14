import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = ({ isAllowed }) => {
  let token = localStorage.getItem("token"); // Corrected usage of localStorage
  let role = localStorage.getItem("role"); // Corrected usage of localStorage
  const location = useLocation();

  return isAllowed?.includes(role) ? (
    <Outlet />
  ) : token ? (
    <Navigate to="/unauthorize" state={{ from: location }} replace />
  ) : (
    !token && <Navigate to="/login" state={{ from: location }} />
  );
};

export default RequireAuth;
