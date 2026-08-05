import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../auth/useAuth";

export default function AdminRoute() {
  const { user } = useAuth();

  // if (user && user.role !== "admin") {
  //   return <Navigate to="/" replace />;
  // }

  return <Outlet />;
}