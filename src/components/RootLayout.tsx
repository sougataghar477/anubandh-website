import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";

export default function RootLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 flex-1 min-w-0">
        <Outlet />
      </div>
    </div>
  );
}