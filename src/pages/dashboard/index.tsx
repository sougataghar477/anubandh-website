import {
    ArrowUpRight,
    BarChart3,
    FolderKanban,
    Users,
    TrendingUp,
    Activity,
    Plus,
    CheckCircle2,
    XCircle,
    Briefcase,
} from "lucide-react";

import { Link } from "react-router-dom";
const stats = [
    {
        title: "In Progress",
        value: "2",
        change: "+1 Today",
        icon: Activity,
        color: "text-amber-400",
        bg: "bg-amber-400/10",
    },
    {
        title: "Successful",
        value: "0",
        change: "Completed",
        icon: CheckCircle2,
        color: "text-green-400",
        bg: "bg-green-400/10",
    },
    {
        title: "Failed",
        value: "0",
        change: "Need Attention",
        icon: XCircle,
        color: "text-red-400",
        bg: "bg-red-400/10",
    },
    {
        title: "Total Leads",
        value: "2",
        change: "Overall",
        icon: Briefcase,
        color: "text-blue-400",
        bg: "bg-blue-400/10",
    },
];

const actions = [
    {
        title: "New Lead",
        subtitle: "Create a new enquiry",
        icon: Plus,
        color: "from-lime-400 to-green-500",
        link: "/leads/new",
    },
    {
        title: "All Leads",
        subtitle: "Manage existing leads",
        icon: FolderKanban,
        color: "from-cyan-500 to-blue-600",
        link: "/leads/all",
    },
    {
        title: "Products",
        subtitle: "Browse products",
        icon: BarChart3,
        color: "from-purple-500 to-pink-500",
        link: "/products",
    },
];
const recentLeads = [
    {
        name: "Uttam",
        product: "Test Product to be removed later",
        phone: "8697293492",
        status: "In Progress",
    },
    {
        name: "Testing",
        product: "CRM Software Requirement",
        phone: "987654321",
        status: "Successful",
    },
];
export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-[#111111] p-6 text-[#E0E0E0] md:p-10">
            <div className="mx-auto max-w-7xl space-y-6">
                <section className="relative overflow-hidden rounded-[32px] border border-[#2B2B2B] bg-[#181818] shadow-2xl">

                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(163,230,53,.20),transparent_40%)]" />

                    <div className="relative grid lg:grid-cols-2 gap-10 p-8 lg:p-12">

                        <div>

                            <span className="inline-flex items-center gap-2 rounded-full bg-lime-500/10 border border-lime-500/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-lime-400">
                                CRM Dashboard
                            </span>

                            <h1 className="mt-5 text-5xl font-bold leading-tight text-white">
                                Welcome Back 👋
                            </h1>

                            <p className="mt-4 text-[#A8A8A8] leading-8 max-w-xl">
                                Monitor your business performance, track leads,
                                manage customers and grow your revenue from one
                                beautiful dashboard.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-4">

                                <button className="rounded-2xl bg-gradient-to-r from-lime-400 to-green-500 px-6 py-3 font-semibold text-black transition hover:scale-105">

                                    <span className="flex items-center gap-2">

                                        <Plus size={18} />

                                        New Lead

                                    </span>

                                </button>

                                <button className="rounded-2xl border border-[#323232] bg-[#121212] px-6 py-3 text-white transition hover:border-lime-400">

                                    View Reports

                                </button>

                            </div>

                        </div>

                        <div>

                            <div className="rounded-3xl border border-lime-400/20 bg-gradient-to-br from-lime-500/15 via-[#202020] to-[#151515] p-8">

                                <div className="flex items-center justify-between">

                                    <div>

                                        <p className="text-sm text-gray-400">

                                            Success Rate

                                        </p>

                                        <h2 className="mt-2 text-6xl font-bold text-white">

                                            84%

                                        </h2>

                                        <p className="mt-3 text-lime-400">

                                            ▲ +12.8% this month

                                        </p>

                                    </div>

                                    <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-lime-400 bg-[#111]">

                                        <TrendingUp
                                            className="text-lime-400"
                                            size={40}
                                        />

                                    </div>

                                </div>

                                <div className="mt-8 h-3 rounded-full bg-[#2b2b2b]">

                                    <div
                                        className="h-3 rounded-full bg-gradient-to-r from-lime-400 via-green-500 to-emerald-400"
                                        style={{ width: "84%" }}
                                    />

                                </div>

                            </div>

                        </div>

                    </div>

                </section>
                <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                    {stats.map((item) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={item.title}
                                className="group rounded-3xl border border-[#2B2B2B] bg-[#181818] p-6 transition-all duration-300 hover:-translate-y-2 hover:border-lime-400/30 hover:shadow-[0_20px_50px_rgba(163,230,53,0.12)]"
                            >
                                {/* Icon */}
                                <div
                                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.bg}`}
                                >
                                    <Icon className={item.color} size={28} />
                                </div>

                                {/* Value */}
                                <div className="mt-10">
                                    <h2 className="text-5xl font-bold text-white">
                                        {item.value}
                                    </h2>

                                    <p className="mt-3 text-lg text-gray-400">
                                        {item.title}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </section>

                <section>

                    <div className="flex items-center justify-between mb-6">

                        <h2 className="text-2xl font-bold text-white">

                            Quick Actions

                        </h2>

                        <span className="text-lime-400">

                            Fast Navigation

                        </span>

                    </div>

                    <div className="grid md:grid-cols-3 gap-6">

                        {actions.map((item) => {

                            const Icon = item.icon;

                            return (

                                <Link
                                    key={item.title}
                                    to={item.link}
                                    className={`group rounded-3xl bg-gradient-to-br ${item.color} p-[1px] hover:scale-[1.03] transition duration-300`}
                                >

                                    <div className="rounded-3xl bg-[#181818] p-6 h-full">

                                        <div className="flex items-center justify-between">

                                            <div
                                                className={`rounded-2xl bg-gradient-to-br ${item.color} p-4`}
                                            >

                                                <Icon
                                                    className="text-white"
                                                    size={28}
                                                />

                                            </div>

                                            <ArrowUpRight
                                                className="text-gray-500 group-hover:text-white transition"
                                            />

                                        </div>

                                        <h3 className="mt-6 text-2xl font-bold text-white">

                                            {item.title}

                                        </h3>

                                        <p className="mt-2 text-gray-400">

                                            {item.subtitle}

                                        </p>

                                    </div>

                                </Link>

                            )

                        })}

                    </div>

                </section>

                <section className="rounded-3xl border border-[#2B2B2B] bg-[#181818] p-6">

                    <div className="flex items-center justify-between mb-6">

                        <h2 className="text-2xl font-bold text-white">
                            Recent Leads
                        </h2>

                        <Link
                            to="/leads/all"
                            className="text-lime-400 text-sm hover:underline"
                        >
                            View All
                        </Link>

                    </div>

                    <div className="space-y-4">

                        {recentLeads.map((lead, index) => (

                            <div
                                key={index}
                                className="rounded-2xl border border-[#2B2B2B] bg-[#121212] p-5 hover:border-lime-400 transition"
                            >

                                <div className="flex items-center justify-between">

                                    <div className="flex items-center gap-4">

                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-lime-500 text-black font-bold">
                                            {lead.name.charAt(0)}
                                        </div>

                                        <div>

                                            <h3 className="text-lg font-semibold text-white">
                                                {lead.name}
                                            </h3>

                                            <p className="text-sm text-gray-400 mt-1">
                                                {lead.product}
                                            </p>

                                            <p className="text-sm text-gray-500 mt-1">
                                                {lead.phone}
                                            </p>

                                        </div>

                                    </div>

                                    <span
                                        className={`rounded-full px-4 py-2 text-xs font-semibold ${lead.status === "Successful"
                                                ? "bg-green-500/20 text-green-400"
                                                : lead.status === "Failed"
                                                    ? "bg-red-500/20 text-red-400"
                                                    : "bg-amber-500/20 text-amber-400"
                                            }`}
                                    >
                                        {lead.status}
                                    </span>

                                </div>

                            </div>

                        ))}

                    </div>

                </section>
            </div>
        </div>
    );
}
