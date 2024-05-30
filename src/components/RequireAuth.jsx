import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAuth = () => {
  const location = useLocation();
  const user = useSelector((state) => state?.auth?.user);

  const content =
    user !== null ? (
      <Outlet />
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
    );

  return content;
};
export default RequireAuth;
