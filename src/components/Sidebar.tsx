import { Link } from "react-router";
import {
  BarChart2,
  Package,
  ShieldCheck,
  Settings,
  HelpCircle,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-[#18181B] border-r border-[#2A2A30] flex flex-col justify-between p-5 font-sans z-20">
      {/* Top Section */}
      <div>
        {/* Brand Header */}
        <div className="mb-8 px-2">
          <h1 className="text-2xl font-serif text-lime-primary font-semibold tracking-wide">
            CRM Portal
          </h1>
          <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mt-0.5">
            Enterprise Suite
          </p>
        </div>

        {/* Main Navigation */}
        <nav className="space-y-1.5">
          <Link
            to="/leads/all"
            className="flex items-center gap-3 px-3.5 py-3 rounded-lg bg-lime-primary/10 text-lime-primary border-l-2 border-lime-primary text-sm font-medium transition-colors"
          >
            <BarChart2 className="w-4 h-4 text-lime" />
            <span>Leads</span>
          </Link>

          <Link
            to="/products"
            className="flex items-center gap-3 px-3.5 py-3 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-[#222226] text-sm font-medium transition-colors"
          >
            <Package className="w-4 h-4 text-gray-400" />
            <span>Products</span>
          </Link>

          <Link
            to="/users"
            className="flex items-center gap-3 px-3.5 py-3 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-[#222226] text-sm font-medium transition-colors"
          >
            <ShieldCheck className="w-4 h-4 text-gray-400" />
            <span>Administration</span>
          </Link>
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="space-y-6">
        {/* Action Button */}
        <button
          type="button"
          className="w-full py-3 px-4 bg-lime-primary hover:bg-lime-hover text-[#121214] font-semibold text-sm rounded-lg transition-colors shadow-sm"
        >
          Create New
        </button>

        {/* Secondary Navigation */}
        <nav className="space-y-1 pt-4 border-t border-[#2A2A30]">
          <Link
            to="/"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-[#222226] text-sm font-medium transition-colors"
          >
            <Settings className="w-4 h-4 text-gray-400" />
            <span>Settings</span>
          </Link>

          <Link
            to="/"
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-[#222226] text-sm font-medium transition-colors"
          >
            <HelpCircle className="w-4 h-4 text-gray-400" />
            <span>Support</span>
          </Link>
        </nav>
      </div>
    </aside>
  );
}