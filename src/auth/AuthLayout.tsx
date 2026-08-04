import { Outlet } from "react-router";
import { AuthProvider } from "./AuthProvider";

export default function AuthLayout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}