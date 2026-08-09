import { Navigate, Outlet } from "react-router";
import { useAuth } from "./useAuth";
import Loader from "../components/common/Loader";

export default function ProtectedLayout() {
  const { loading, isLoggedIn } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0c0d10] text-white gap-2">
        <span>Loading</span> 
        <Loader />
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}