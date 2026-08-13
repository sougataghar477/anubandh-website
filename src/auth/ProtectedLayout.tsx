// import { Navigate, Outlet } from "react-router";
// import { useAuth } from "./useAuth";
// import Loader from "../components/common/Loader";

// export default function ProtectedLayout() {
//   const { loading, isLoggedIn } = useAuth();

//   if (loading.auth) {
//     return <Loader/>;
//   }

//   if (!isLoggedIn) {
//     return <Navigate to="/login" replace />;
//   }

//   return <Outlet />;
// }
import { Navigate, Outlet } from "react-router";
import { useAuth } from "./useAuth";
import Loader from "../components/common/Loader";

export default function ProtectedLayout() {
  const { loading, authStatus } = useAuth();

  if (loading.auth) {
    return <Loader />;
  }

  if (authStatus === "unauthenticated") {
    return <Navigate to="/login" replace />;
  }

  if (authStatus === "unavailable") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0c0d10] text-white gap-2">
        Unable to verify your session. Please check your connection.
      </div>
    );
  }

  return <Outlet />;
}