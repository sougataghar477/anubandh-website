import { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";

export default function RootLayout() {
  const [isSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">

      <Sidebar
        isCollapsed={isSidebarCollapsed}
      />

      <div
        className={`min-h-screen min-w-0 overflow-x-hidden transition-all duration-300 ease-in-out lg:ml-64`}
      >
        <Outlet />
      </div>

    </div>
  );
}