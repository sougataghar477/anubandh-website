import { NavLink } from "react-router";
import {
  BarChart2,
  CircleHelp,
  LayoutDashboard,
  Package,
  Settings,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

type NavItem = {
  label: string;
  path: string;
  icon: React.ElementType;
};

const mainNavigation: NavItem[] = [
  {
    label: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Leads",
    path: "/leads/all",
    icon: BarChart2,
  },
  {
    label: "Products",
    path: "/products",
    icon: Package,
  },
  {
    label: "Users",
    path: "/users",
    icon: ShieldCheck,
  },
];

const secondaryNavigation: NavItem[] = [
  {
    label: "Settings",
    path: "/profile",
    icon: Settings,
  },
  {
    label: "Support",
    path: "/support",
    icon: CircleHelp,
  },
];

type SidebarProps = {
  isCollapsed: boolean;
  // setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Sidebar({
  isCollapsed,
}: SidebarProps) {

  return (
    <>
      {/* =====================================================
          SIDEBAR
      ====================================================== */}

      <aside
        className={`group hidden fixed left-0 top-0 z-50 lg:flex h-screen flex-col border-r border-blue-200 bg-white/95 font-sans shadow-[10px_0_20px_rgba(0,0,0,0.08)] backdrop-blur-xl transition-all duration-300 ease-in-out md:w-64`}
      >
        {/* =====================================================
            BACKGROUND GLOW
        ====================================================== */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">

          {/* Blue glow */}
          <div className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-blue-200/[0.4] blur-[90px]" />

          {/* Light blue glow */}
          <div className="absolute -bottom-32 -right-24 h-64 w-64 rounded-full bg-blue-100/[0.3] blur-[100px]" />

        </div>

        <div className="relative flex h-full flex-col">

          {/* =====================================================
              BRAND HEADER
          ====================================================== */}

          <div
<<<<<<< Updated upstream
            className={`flex h-23 items-center border-b border-white/6`}
=======
            className={`flex h-[92px] items-center border-b border-blue-100 ${
              isCollapsed ? "justify-center px-3" : "px-5"
            }`}
>>>>>>> Stashed changes
          >
            <div
              className={`flex items-center`}
            >

              {/* Brand Icon */}
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-600/30 bg-blue-600/[0.12] shadow-[0_0_25px_rgba(37,99,235,0.1)]">

                <div className="absolute inset-0 rounded-xl bg-blue-600/10 blur-md" />

                <Sparkles className="relative h-5 w-5 text-blue-600" />

              </div>

              {/* Brand Text */}
               
                <div className="min-w-0 overflow-hidden">

                  <h1 className="whitespace-nowrap text-xl font-bold tracking-tight text-slate-900">
                    CRM{" "}
                    <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                      Portal
                    </span>
                  </h1>

                  <p className="mt-0.5 whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.22em] text-slate-400">
                    Enterprise Suite
                  </p>

                </div>
               

            </div>
          </div>

          {/* =====================================================
              COLLAPSE BUTTON
          ====================================================== */}

      

          {/* =====================================================
              MAIN NAVIGATION
          ====================================================== */}

          <div className="flex-1 overflow-y-auto px-3 py-6">

            {!isCollapsed && (
              <p className="mb-3 px-3 text-[9px] font-bold uppercase tracking-[0.25em] text-slate-400">
                Main Menu
              </p>
            )}

            <nav className="space-y-2">

              {mainNavigation.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === "/"}
                    className={({ isActive }) =>
                      `group/item relative flex h-12 items-center rounded-xl text-sm font-medium transition-all duration-300 ${
                        isCollapsed
                          ? "justify-center px-0"
                          : "gap-3 px-3"
                      } ${
                        isActive
                          ? "border border-blue-300 bg-gradient-to-r from-blue-100/40 via-blue-100/20 to-transparent text-slate-900 shadow-[0_8px_25px_rgba(37,99,235,0.1)]"
                          : "border border-transparent text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-slate-800"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {/* =================================================
                            ACTIVE TOP INDICATOR
                        ================================================== */}

                        {isActive && (
                          <span className="absolute left-3 right-3 top-0 h-[2px] rounded-full bg-gradient-to-r from-transparent via-blue-600 to-transparent shadow-[0_0_10px_rgba(37,99,235,0.6)]" />
                        )}

                        {/* Active left glow */}
                        {isActive && (
                          <span className="absolute left-0 top-1/2 h-7 w-[3px] -translate-y-1/2 rounded-r-full bg-blue-600 shadow-[0_0_12px_rgba(37,99,235,0.6)]" />
                        )}

                        {/* Icon */}
                        <div
                          className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-300 ${
                            isActive
                              ? "bg-blue-600/15 shadow-[0_0_18px_rgba(37,99,235,0.1)]"
                              : "bg-slate-100 group-hover/item:bg-blue-100"
                          }`}
                        >
                          <Icon
                            className={`h-[17px] w-[17px] transition-all duration-300 ${
                              isActive
                                ? "text-blue-600"
                                : "text-slate-500 group-hover/item:text-blue-600"
                            }`}
                          />
                        </div>

                        {/* Label */}
                        {!isCollapsed && (
                          <span className="whitespace-nowrap">
                            {item.label}
                          </span>
                        )}

                        {/* Active dot */}
                        {isActive && !isCollapsed && (
                          <span className="ml-auto mr-1 h-1.5 w-1.5 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.6)]" />
                        )}

                        {/* Tooltip */}
                        {isCollapsed && (
                          <span className="pointer-events-none absolute left-[70px] z-[100] whitespace-nowrap rounded-lg border border-blue-200 bg-white px-3 py-2 text-xs font-medium text-slate-900 opacity-0 shadow-lg transition-all duration-200 group-hover/item:translate-x-1 group-hover/item:opacity-100">
                            {item.label}
                          </span>
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}

            </nav>
          </div>

          {/* =====================================================
              BOTTOM NAVIGATION
          ====================================================== */}

          <div className="border-t border-blue-100 px-3 py-5">

            {!isCollapsed && (
              <p className="mb-3 px-3 text-[9px] font-bold uppercase tracking-[0.25em] text-slate-400">
                Workspace
              </p>
            )}

            <nav className="space-y-2">

              {secondaryNavigation.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `group/item relative flex h-11 items-center rounded-xl text-sm font-medium transition-all duration-300 ${
                        isCollapsed
                          ? "justify-center px-0"
                          : "gap-3 px-3"
                      } ${
                        isActive
                          ? "border border-blue-300 bg-blue-100/30 text-slate-900"
                          : "border border-transparent text-slate-600 hover:bg-blue-50 hover:text-slate-800"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <span className="absolute left-0 top-1/2 h-6 w-[2px] -translate-y-1/2 rounded-r-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
                        )}

                        <Icon
                          className={`h-[17px] w-[17px] ${
                            isActive
                              ? "text-blue-600"
                              : "text-slate-500 group-hover/item:text-blue-600"
                          }`}
                        />

                        {!isCollapsed && (
                          <span>{item.label}</span>
                        )}

                        {isCollapsed && (
                          <span className="pointer-events-none absolute left-[70px] z-[100] whitespace-nowrap rounded-lg border border-blue-200 bg-white px-3 py-2 text-xs font-medium text-slate-900 opacity-0 shadow-lg transition-all duration-200 group-hover/item:translate-x-1 group-hover/item:opacity-100">
                            {item.label}
                          </span>
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}

            </nav>

            {/* Version */}
            {!isCollapsed && (
              <p className="mt-5 text-center text-[9px] font-medium tracking-wider text-slate-400">
                CRM PORTAL • ENTERPRISE
              </p>
            )}

          </div>
        </div>
      </aside>

{/* =====================================================
    MOBILE NAVBAR
    Visible below 768px
====================================================== */}
<nav className="fixed inset-x-0 bottom-0 z-50 flex h-[72px] border-t border-blue-200 bg-white/95 font-sans shadow-[0_-10px_40px_rgba(0,0,0,0.08)] backdrop-blur-xl lg:hidden">

  {/* Background glows */}
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    <div className="absolute -left-10 -bottom-20 h-40 w-40 rounded-full bg-blue-200/[0.3] blur-[70px]" />
    <div className="absolute -right-10 -bottom-20 h-40 w-40 rounded-full bg-blue-100/[0.2] blur-[70px]" />
  </div>

  <div className="relative flex w-full items-center justify-around px-2">

    {mainNavigation.slice(0, 5).map((item) => {
      const Icon = item.icon;

      return (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.path === "/"}
          className={({ isActive }) =>
            `group relative flex h-full min-w-0 flex-1 flex-col items-center justify-center gap-1 transition-all duration-300 ${
              isActive
                ? "text-blue-600"
                : "text-slate-500 hover:text-blue-600"
            }`
          }
        >
          {({ isActive }) => (
            <>
              {/* Active top glow */}
              {isActive && (
                <span className="absolute left-1/2 top-0 h-[2px] w-10 -translate-x-1/2 rounded-full bg-blue-600 shadow-[0_0_12px_rgba(37,99,235,0.6)]" />
              )}

              {/* Icon */}
              <div
                className={`relative flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-blue-600/[0.12] shadow-[0_0_18px_rgba(37,99,235,0.1)]"
                    : "bg-transparent"
                }`}
              >
                <Icon
                  className={`h-[18px] w-[18px] transition-all duration-300 ${
                    isActive
                      ? "text-blue-600"
                      : "text-slate-500 group-hover:text-blue-600"
                  }`}
                />
              </div>

              {/* Label */}
              <span
                className={`max-w-[64px] truncate text-[9px] font-medium ${
                  isActive ? "text-blue-600" : "text-slate-500"
                }`}
              >
                {item.label}
              </span>

              {/* Active dot */}
              {isActive && (
                <span className="absolute bottom-1 h-1 w-1 rounded-full bg-blue-600 shadow-[0_0_7px_rgba(37,99,235,0.6)]" />
              )}
            </>
          )}
        </NavLink>
      );
    })}

  </div>
</nav>




    </>
  );
}