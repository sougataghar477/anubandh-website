import { Navigate, Outlet } from "react-router";
import { useAuth } from "./useAuth";
import Loader from "../components/common/Loader";

export default function ProtectedLayout() {
  const { loading, isLoggedIn } = useAuth();

  if (loading.auth) {
    return <Loader/>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}