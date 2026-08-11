import { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";

export default function RootLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#08090C]">

      <Sidebar
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />

      <div
        className={`min-h-screen min-w-0 overflow-x-hidden transition-all duration-300 ease-in-out ${
          isSidebarCollapsed
            ? "ml-[82px] w-[calc(100%-82px)]"
            : "ml-64 w-[calc(100%-256px)]"
        }`}
      >
        <Outlet />
      </div>

    </div>
  );
}