import {
    ArrowUpRight,
    BarChart3,
    FolderKanban,
    TrendingUp,
    Activity,
    Plus,
    CheckCircle2,
    XCircle,
    Briefcase,
} from "lucide-react";

import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import api from "../../utils/api";
import { formatLabel } from "../../utils/helper";
import type { PopupType } from "../../components/common/Popup";
import Popup from "../../components/common/Popup";

type Lead = {
    id: number;
    name: string;
    product: string;
    phone: string;
    status: string;
};
interface PopupProps{
    type:PopupType;
    visible:boolean;
    title:string;
    message:string;
}
const getDisplayStatus = (status: string) => {
    // const normalized = status?.trim().toLowerCase() ?? "";

    // if (normalized === "in_progress" || normalized === "in progress" || normalized === "inprogress") {
    //     return "In Progress";
    // }

    // if (normalized === "successful" || normalized === "successfull" || normalized === "success" || normalized === "completed" || normalized === "complete") {
    //     return "Successful";
    // }

    // if (normalized === "failed" || normalized === "failure" || normalized === "unsuccessful") {
    //     return "Failed";
    // }

    return formatLabel(status || "Pending");
};

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
export default function DashboardPage() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [popupOptions,setPopupOptions] = useState<PopupProps>({type:'failure',visible:false,title:'Error',message:''});
    useEffect(() => {
        let isMounted = true;

        const fetchLeads = async () => {
            try {
                const response = await api.get("/leads/all");
                const rawLeads = Array.isArray(response.data?.leads)
                    ? response.data.leads
                    : Array.isArray(response.data)
                        ? response.data
                        : [];

                if (!isMounted) return;

                setLeads(
                    rawLeads.map((lead: any) => ({
                        id: Number(lead.id ?? 0),
                        name: lead.name ?? lead.fullName ?? "Unnamed Lead",
                        product: lead.product?.name ?? lead.productName ?? lead.product ?? "No product",
                        phone: lead.phone ?? lead.phoneNumber ?? lead.mobile ?? "—",
                        status: lead.status ?? "pending",
                    }))
                );
            } catch (error) {
                console.error("Failed to load dashboard leads:", error);
                if (isMounted) {
                    if (axios.isAxiosError(error)) {
                        const errorMessage = error.response?.data?.message || "Error fetching leads";
                        setPopupOptions(prev => ({...prev,message:errorMessage,visible:true}))
                        // toast.error(error.response?.data?.message || "Error fetching leads");
                    } else {
                        setPopupOptions(prev => ({...prev,message:"Error fetching leads",visible:true}))
                        // toast.error("Something went wrong");
                    }
                    setLeads([]);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchLeads();

        return () => {
            isMounted = false;
        };
    }, []);

    const stats = useMemo(() => {
        const inProgress = leads.filter((lead) => getDisplayStatus(lead.status) === "In Progress").length;
        const successful = leads.filter((lead) => getDisplayStatus(lead.status) === "Successful").length;
        const failed = leads.filter((lead) => getDisplayStatus(lead.status) === "Failed").length;

        return [
            {
                title: "In Progress",
                value: loading ? "—" : String(inProgress),
                change: "+1 Today",
                icon: Activity,
                color: "text-amber-400",
                bg: "bg-amber-400/10",
            },
            {
                title: "Successful",
                value: loading ? "—" : String(successful),
                change: "Completed",
                icon: CheckCircle2,
                color: "text-green-400",
                bg: "bg-green-400/10",
            },
            {
                title: "Failed",
                value: loading ? "—" : String(failed),
                change: "Need Attention",
                icon: XCircle,
                color: "text-red-400",
                bg: "bg-red-400/10",
            },
            {
                title: "Total Leads",
                value: loading ? "—" : String(leads.length),
                change: "Overall",
                icon: Briefcase,
                color: "text-blue-400",
                bg: "bg-blue-400/10",
            },
        ];
    }, [leads, loading]);

    const recentLeads = useMemo(
        () =>
            leads.slice(0, 5).map((lead) => ({
                id: lead.id,
                name: lead.name,
                product: lead.product,
                phone: lead.phone,
                status: getDisplayStatus(lead.status),
            })),
        [leads]
    );
  const closePopup = () => {
    setPopupOptions(prev => ({...prev,visible:false}))
  }
    return (
       <div className="min-h-screen bg-white p-6 text-black md:p-8 lg:p-10">
    <div className="w-full space-y-6">
<section className="relative overflow-x-hidden rounded-[32px] bg-white shadow-2xl shadow-slate-200/60">
  {/* Soft lime radial glow overlay */}

  <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 p-8 lg:p-12">
    {/* Left Column */}
    <div className="w-full">
      <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-blue-700 shadow-sm">
        CRM Dashboard
      </span>

      <h1 className="mt-5 text-5xl font-bold leading-tight text-slate-900">
        Welcome Back 👋
      </h1>

      <p className="mt-4 text-slate-600 leading-8 max-w-xl">
        Monitor your business performance, track leads, manage customers and
        grow your revenue from one beautiful dashboard.
      </p>

      <div className="mt-8 flex flex-wrap gap-4">
        <button className="rounded-2xl bg-gradient-to-r from-blue-400 to-blue-500 px-6 py-3 font-semibold text-slate-950 transition hover:scale-105 shadow-lg shadow-blue-500/25">
          <span className="flex items-center gap-2">
            <Plus size={18} />
            New Lead
          </span>
        </button>

        <button className="rounded-2xl bg-slate-100 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-200 shadow-md shadow-slate-200/50">
          View Reports
        </button>
      </div>
    </div>

    {/* Right Column / Card */}
    <div className="w-full">
      <div className="rounded-3xl bg-slate-50/80 p-8 shadow-lg shadow-slate-200/70 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Success Rate</p>
            <h2 className="mt-2 text-6xl font-bold text-slate-900">84%</h2>
            <p className="mt-3 text-sm font-semibold text-blue-600">
              ▲ +12.8% this month
            </p>
          </div>

          <div className="hidden md:flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-500 text-slate-950 shadow-md shadow-lime-500/30">
            <TrendingUp size={36} />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-8 h-3.5 rounded-full bg-slate-200/80 overflow-hidden shadow-inner">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-500 shadow-sm"
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
                                className="group rounded-3xl border border-[#2B2B2B] bg-white p-6 transition-all duration-300 hover:-translate-y-2 hover:border-lime-400/30 hover:shadow-[0_20px_50px_rgba(163,230,53,0.12)]"
                            >
                                {/* Icon */}
                                <div
                                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.bg}`}
                                >
                                    <Icon className={item.color} size={28} />
                                </div>

                                {/* Value */}
                                <div className="mt-10">
                                    <h2 className="text-5xl font-bold text-black">
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

                        <h2 className="text-2xl font-bold text-black">

                            Quick Actions

                        </h2>

                        <span className="text-blue-600">

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

                                    <div className="rounded-3xl bg-white p-6 h-full">

                                        <div className="flex items-center justify-between">

                                            <div
                                                className={`rounded-2xl bg-gradient-to-br ${item.color} p-4`}
                                            >

                                                <Icon
                                                    className="text-black"
                                                    size={28}
                                                />

                                            </div>

                                            <ArrowUpRight
                                                className="text-gray-500 group-hover:text-black transition"
                                            />

                                        </div>

                                        <h3 className="mt-6 text-2xl font-bold text-black">

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

                <section className="rounded-3xl shadow-2xl bg-white p-6">

                    <div className="flex items-center justify-between mb-6">

                        <h2 className="text-2xl font-bold text-black">
                            Recent Leads
                        </h2>

                        <Link
                            to="/leads/all"
                            className="text-blue-600 text-sm hover:underline"
                        >
                            View All
                        </Link>

                    </div>

                    <div className="space-y-4">

                        {recentLeads.map((lead) => (

                            <div
                                key={lead.id}
                                className="rounded-2xl shadow-md hover:shadow-xl bg-white p-5 hover:border-blue-400 transition"
                            >

                                <div className="flex items-center justify-between">

                                    <div className="flex items-center gap-4">

                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white font-bold">
                                            {lead.name.charAt(0)}
                                        </div>

                                        <div>

                                            <h3 className="text-lg font-semibold text-black">
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
                <Popup
                type={popupOptions.type}
                visible={popupOptions.visible}
                title={popupOptions.title}
                message={popupOptions.message}
                onCancel={closePopup}
                />
                </section>
            </div>
        </div>
    );
}