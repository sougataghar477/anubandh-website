import { NavLink } from "react-router";
import {
  BarChart2,
  ChevronLeft,
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
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Sidebar({
  isCollapsed,
  setIsCollapsed,
}: SidebarProps) {

  return (
    <>
      {/* =====================================================
          SIDEBAR
      ====================================================== */}

      <aside
        className={`group fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-white/[0.07] bg-[#0D0F12]/95 font-sans shadow-[10px_0_50px_rgba(0,0,0,0.25)] backdrop-blur-2xl transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-[82px]" : "w-64"
        }`}
      >
        {/* =====================================================
            BACKGROUND GLOW
        ====================================================== */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">

          {/* Lime glow */}
          <div className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-lime-400/[0.045] blur-[90px]" />

          {/* Purple glow */}
          <div className="absolute -bottom-32 -right-24 h-64 w-64 rounded-full bg-purple-500/[0.04] blur-[100px]" />

        </div>

        <div className="relative flex h-full flex-col">

          {/* =====================================================
              BRAND HEADER
          ====================================================== */}

          <div
            className={`flex h-[92px] items-center border-b border-white/[0.06] ${
              isCollapsed ? "justify-center px-3" : "px-5"
            }`}
          >
            <div
              className={`flex items-center ${
                isCollapsed ? "justify-center" : "gap-3"
              }`}
            >

              {/* Brand Icon */}
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-lime-400/20 bg-lime-400/[0.07] shadow-[0_0_25px_rgba(163,230,53,0.06)]">

                <div className="absolute inset-0 rounded-xl bg-lime-400/5 blur-md" />

                <Sparkles className="relative h-5 w-5 text-lime-300" />

              </div>

              {/* Brand Text */}
              {!isCollapsed && (
                <div className="min-w-0 overflow-hidden">

                  <h1 className="whitespace-nowrap text-xl font-bold tracking-tight text-white">
                    CRM{" "}
                    <span className="bg-gradient-to-r from-lime-300 to-emerald-400 bg-clip-text text-transparent">
                      Portal
                    </span>
                  </h1>

                  <p className="mt-0.5 whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.22em] text-slate-500">
                    Enterprise Suite
                  </p>

                </div>
              )}

            </div>
          </div>

          {/* =====================================================
              COLLAPSE BUTTON
          ====================================================== */}

      <button
  type="button"
  onClick={() => setIsCollapsed((prev) => !prev)}
  aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
  className="
    group absolute -right-3 top-[76px] z-50
    flex h-7 w-7 items-center justify-center
    rounded-full
    border border-white/[0.10]
    bg-[#171A1F]
    text-slate-400
    shadow-[0_5px_20px_rgba(0,0,0,0.4)]
    backdrop-blur-xl
    transition-all duration-500 ease-out
    hover:scale-110
    hover:border-lime-400/40
    hover:bg-lime-400/[0.10]
    hover:text-lime-300
    hover:shadow-[0_0_25px_rgba(163,230,53,0.20)]
  "
>
  {/* Outer Hover Ring */}
  <span
    className="
      pointer-events-none absolute inset-[-4px]
      rounded-full border border-transparent
      opacity-0
      transition-all duration-500
      group-hover:scale-110
      group-hover:border-lime-400/25
      group-hover:opacity-100
    "
  />

  {/* Inner Glow */}
  <span
    className="
      pointer-events-none absolute inset-0
      rounded-full bg-transparent
      transition-all duration-500
      group-hover:bg-lime-400/10
      group-hover:blur-sm
    "
  />

  {/* ONE Arrow - rotates */}
  <span
    className={`
      relative z-10 flex items-center justify-center
      transition-transform duration-500
      ease-[cubic-bezier(0.68,-0.55,0.27,1.55)]
      ${isCollapsed ? "rotate-180" : "rotate-0"}
      group-hover:scale-125
    `}
  >
    <ChevronLeft className="h-3.5 w-3.5 transition-all duration-300" />
  </span>

</button>

          {/* =====================================================
              MAIN NAVIGATION
          ====================================================== */}

          <div className="flex-1 overflow-y-auto px-3 py-6">

            {!isCollapsed && (
              <p className="mb-3 px-3 text-[9px] font-bold uppercase tracking-[0.25em] text-slate-600">
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
                          ? "border border-lime-400/15 bg-gradient-to-r from-lime-400/[0.12] via-lime-400/[0.05] to-transparent text-white shadow-[0_8px_25px_rgba(163,230,53,0.06)]"
                          : "border border-transparent text-slate-400 hover:border-white/[0.05] hover:bg-white/[0.035] hover:text-slate-200"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {/* =================================================
                            ACTIVE TOP INDICATOR
                        ================================================== */}

                        {isActive && (
                          <span className="absolute left-3 right-3 top-0 h-[2px] rounded-full bg-gradient-to-r from-transparent via-lime-400 to-transparent shadow-[0_0_10px_rgba(163,230,53,0.8)]" />
                        )}

                        {/* Active left glow */}
                        {isActive && (
                          <span className="absolute left-0 top-1/2 h-7 w-[3px] -translate-y-1/2 rounded-r-full bg-lime-400 shadow-[0_0_12px_rgba(163,230,53,0.8)]" />
                        )}

                        {/* Icon */}
                        <div
                          className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-300 ${
                            isActive
                              ? "bg-lime-400/10 shadow-[0_0_18px_rgba(163,230,53,0.08)]"
                              : "bg-white/[0.025] group-hover/item:bg-white/[0.06]"
                          }`}
                        >
                          <Icon
                            className={`h-[17px] w-[17px] transition-all duration-300 ${
                              isActive
                                ? "text-lime-300"
                                : "text-slate-500 group-hover/item:text-slate-200"
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
                          <span className="ml-auto mr-1 h-1.5 w-1.5 rounded-full bg-lime-400 shadow-[0_0_8px_rgba(163,230,53,0.8)]" />
                        )}

                        {/* Tooltip */}
                        {isCollapsed && (
                          <span className="pointer-events-none absolute left-[70px] z-[100] whitespace-nowrap rounded-lg border border-white/[0.08] bg-[#171A1F] px-3 py-2 text-xs font-medium text-white opacity-0 shadow-xl transition-all duration-200 group-hover/item:translate-x-1 group-hover/item:opacity-100">
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

          <div className="border-t border-white/[0.06] px-3 py-5">

            {!isCollapsed && (
              <p className="mb-3 px-3 text-[9px] font-bold uppercase tracking-[0.25em] text-slate-600">
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
                          ? "border border-purple-400/15 bg-purple-400/[0.07] text-white"
                          : "border border-transparent text-slate-500 hover:bg-white/[0.035] hover:text-slate-200"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <span className="absolute left-0 top-1/2 h-6 w-[2px] -translate-y-1/2 rounded-r-full bg-purple-400 shadow-[0_0_10px_rgba(192,132,252,0.7)]" />
                        )}

                        <Icon
                          className={`h-[17px] w-[17px] ${
                            isActive
                              ? "text-purple-300"
                              : "text-slate-500 group-hover/item:text-slate-300"
                          }`}
                        />

                        {!isCollapsed && (
                          <span>{item.label}</span>
                        )}

                        {isCollapsed && (
                          <span className="pointer-events-none absolute left-[70px] z-[100] whitespace-nowrap rounded-lg border border-white/[0.08] bg-[#171A1F] px-3 py-2 text-xs font-medium text-white opacity-0 shadow-xl transition-all duration-200 group-hover/item:translate-x-1 group-hover/item:opacity-100">
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
              <p className="mt-5 text-center text-[9px] font-medium tracking-wider text-slate-700">
                CRM PORTAL • ENTERPRISE
              </p>
            )}

          </div>
        </div>
      </aside>
    </>
  );
}