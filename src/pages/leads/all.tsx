import { useEffect, useMemo, useState } from "react";

import Table from "../../components/common/Table";
import api from "../../utils/api";
import { toast } from "react-toastify";
import axios from "axios";
import Button from "../../components/common/Button";
import { Check, Plus, SaveIcon, Trash2, Upload, Users, Activity, UserPlus, DollarSign } from "lucide-react";
import { fileToObject } from "../../utils/helper";
import Filter from "../../components/common/Filter";
import { Link } from "react-router";
import SearchInput from "../../components/common/Search";
const PAGE_SIZE = 3;

 const SUMMARY_CARDS = [
  {
    title: "Total Leads",
    amount: "1,248",
    note: "+12% this month",
    badgeClass: "text-emerald-300",
    icon: Users,
    iconBg: "bg-emerald-500/15 text-emerald-300",
  },
  {
    title: "Active Leads",
    amount: "912",
    note: "73% of pipeline",
    badgeClass: "text-sky-300",
    icon: Activity,
    iconBg: "bg-sky-500/15 text-sky-300",
  },
  {
    title: "New Leads",
    amount: "314",
    note: "26 added this week",
    badgeClass: "text-amber-300",
    icon: UserPlus,
    iconBg: "bg-amber-500/15 text-amber-300",
  },
  {
    title: "Pipeline Value",
    amount: "$124.8k",
    note: "Estimated revenue",
    badgeClass: "text-lime-primary",
    icon: DollarSign,
    iconBg: "bg-lime-500/15 text-lime-300",
  },
];

const statusOptions = ["in_progress","successful","failed"];

type Lead = {
  id: number;
  name: string;
  phone: string;
  product: string;
  description: string;
  status: string;
  created_by: number;
  created_at: string;
  updated_at: string;
};

export default function AllLeadsPage() {
  const [submitLoading,setIsSubmitLoading] = useState<boolean>(false);
  const [allLeads,setAllLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [activeStatusFilters, setActiveStatusFilters] = useState<string[]>([]);
  const [activeOwnerFilters, setActiveOwnerFilters] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFile,setSelectedFile] = useState<File | null>(null);
  const filteredLeads = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();

    return allLeads.filter((lead) => {
      const matchesSearch =
        normalized === "" ||
        [lead.name, lead.product, lead.status, lead.created_by, lead.description]
          .join(" ")
          .toLowerCase()
          .includes(normalized);

      const matchesStatus =
        activeStatusFilters.length === 0 ||
        activeStatusFilters.includes(lead.status);

      const matchesOwner =
        activeOwnerFilters.length === 0 ||
        activeOwnerFilters.includes(lead.created_by);

      return matchesSearch && matchesStatus && matchesOwner;
    });
  }, [searchTerm, activeStatusFilters, activeOwnerFilters,allLeads]);
  const pageCount = Math.max(1, Math.ceil(filteredLeads.length / PAGE_SIZE));

  const effectivePage = Math.min(currentPage, pageCount);
const startIndex =
  filteredLeads.length === 0
    ? 0
    : (effectivePage - 1) * PAGE_SIZE + 1;

const endIndex = Math.min(
  filteredLeads.length,
  effectivePage * PAGE_SIZE
);

const currentPageLeads = useMemo(() => {
  const start = (effectivePage - 1) * PAGE_SIZE;

  return filteredLeads.slice(
    start,
    start + PAGE_SIZE
  );
}, [filteredLeads, effectivePage]);

  const toggleArrayValue = (value: string, list: string[], setter: (values: string[]) => void) => {
    if (list.includes(value)) {
      setter(list.filter((item) => item !== value));
    } else {
      setter([...list, value]);
    }
  };

  const clearAllFilters = () => {
    setActiveStatusFilters([]);
    setActiveOwnerFilters([]);
    setCurrentPage(1);
  };
useEffect(()=>{
  const fetchAllLeads = async () => {
    try {
        const response = await api.get("/leads/all");
        console.log(response.data);
        setAllLeads(response.data.leads);
    } catch (error) { 
        if (axios.isAxiosError(error)) {
    toast.error(error.response?.data?.message || "Error fetching leads");
  } else {
    toast.error("Something went wrong");
  }
      
    }
  }
  fetchAllLeads();
},[]);
const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  if (file.name.match(/\.(xlsx|xls)$/i)) {
    console.log("UPLOAD WORKING")
    setSelectedFile(file);
  } else {
    alert("Please select a valid Excel file (.xlsx or .xls)");
  }
};


const handleLeadsUpload = async () => {
  try {
    if (!selectedFile){
      toast.warning("Please select a file");
      return;
    }
    setIsSubmitLoading(true)

    const formData = new FormData();
    formData.append("file", selectedFile);

    const response = await api.post("/leads/upload", formData);
    
    toast.success(response.data.message || "Leads uploaded successfully");
    setSelectedFile(null);
    console.log(response);
  } catch (error) {
    console.error(error);
    toast.error("Failed leads upload");
  }
  finally{
    setIsSubmitLoading(false);
  }
};


  return (
    <main className="min-h-screen bg-[#0c0d10] text-gray-100 px-6 py-8 md:px-8 lg:px-10">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-lime-500/10 border border-lime-500/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-lime-400">
              Lead Inventory
            </p>
            <h1 className="mt-4 text-4xl font-semibold text-white tracking-tight">
              Manage your <span className="bg-gradient-to-r from-lime-400 to-green-500 bg-clip-text text-transparent">leads </span> pipeline with clarity.
            </h1>
            <p className="mt-3 max-w-xl text-sm text-gray-400 leading-7">
              Track lead status, expected deal value, and ownership across your team in a polished, dark dashboard that matches your existing app theme.
            </p>
          </div>

          <SearchInput    
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          placeholder="Search leads..."
        />
        </div>

       <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {SUMMARY_CARDS.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="group mk relative overflow-hidden rounded-3xl border border-[#2B2B2B] bg-[#181818] p-5 transition-all duration-300 hover:-translate-y-2 hover:border-lime-400/30 hover:shadow-[0_20px_50px_rgba(163,230,53,0.12)]"
          >
            <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-lime-400/5 blur-2xl" />
            <div className="flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-3xl ${card.iconBg}`}>
                <Icon size={14} />
              </div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400 truncate">
                {card.title}
              </p>
            </div>
            <div className="mt-5">
              <p className="text-3xl font-semibold text-white text-left">{card.amount}</p>
            </div>
            <div className="mt-4">
              <span className={`inline-flex max-w-full items-center rounded-full bg-white/5 px-3 py-1 text-xs font-semibold ${card.badgeClass} truncate`}>
                {card.note}
              </span>
            </div>
          </div>
        );
      })}
      <Link
        to={'/leads/new'}
        className="group flex items-center justify-center gap-2 rounded-3xl border border-[#2B2B2B] bg-gradient-to-br from-[#141414] via-[#181818] to-[#111111] p-6 text-white transition-all duration-300 hover:-translate-y-2 hover:border-lime-400/30 hover:shadow-[0_20px_50px_rgba(163,230,53,0.12)]"
      >
        <Plus className="text-lime-300" />
        <span className="font-semibold text-white">Add New Lead</span>
      </Link>
    </div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch overflow-hidden">
  {/* Download Button */}
  <a href="/template/1_002_-ey4.gif" download className="h-full">
    <Button
      label="Download Lead Excel File Template"
      loading={submitLoading}
    />
  </a>

  {/* Upload Field Container */}
{/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> */}
  {!selectedFile ? (
    <label className="group flex h-full min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-3xl border-2 border-dashed border-[#3F3F46] bg-[#111115] p-3 text-center transition-all hover:border-lime-primary hover:bg-[#18181C]">
      <Upload className="h-5 w-5 text-gray-400 transition-colors group-hover:text-lime-primary" />
      <p className="text-sm font-semibold text-gray-200">Upload Files Here</p>

      <input
        type="file"
        accept=".xlsx,.xls"
        className="hidden"
        onChange={handleFileChange}
      />
    </label>
  ) : (
    selectedFile &&
    fileToObject(selectedFile) && (
      <div className="group flex h-full min-h-12 w-full items-center justify-between rounded-3xl border border-[#2B2B2B] bg-[#181818] px-5 py-3 text-gray-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-lime-400/30 hover:shadow-[0_20px_50px_rgba(163,230,53,0.12)]">
        <span className="text-sm font-medium text-gray-200 flex gap-2">
          <Check color="green"/>
          File Uploaded
        </span>
        <button
          type="button"
          onClick={() => setSelectedFile(null)}
          className="group rounded-full p-1 transition-colors hover:bg-red-500/10"
          title="Remove file"
        >
          <Trash2 className="h-4 w-4 text-red-400 transition-colors group-hover:text-red-500" />
        </button>
      </div>
    )
  )}

  <Button type="button" label="Save Leads" icon={<SaveIcon/>} loading={submitLoading} onClick={handleLeadsUpload}/>
{/* </div> */}
</div>
        <section className="overflow-hidden rounded-4xl border border-[#2A2A30] bg-[#121218] shadow-[0_35px_80px_rgba(0,0,0,0.32)]">
          <div className="flex flex-col gap-4 border-b border-[#2A2A30] bg-[#111218] px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-lime-300">Lead table</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">All active leads</h2>
              
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="rounded-3xl border border-lime-primary/30 bg-[#181818] px-4 py-3 text-sm text-gray-200 shadow-[0_15px_40px_rgba(0,0,0,0.15)]">
                Showing {startIndex}-{endIndex} of {filteredLeads.length}
              </div>
              <div>
                <Filter
                  filtersOpen={filtersOpen}
                  onToggleFilters={() => setFiltersOpen((prev) => !prev)}
                  onClearFilters={clearAllFilters}
                  filterGroups={[
                    {
                      label: "Status",
                      options: statusOptions.map((status) => ({
                        label: status,
                        value: status,
                      })),
                      activeValues: activeStatusFilters,
                      onToggle: (status) =>
                        toggleArrayValue(
                          status,
                          activeStatusFilters,
                          setActiveStatusFilters
                        ),
                    },
                  ]}
                />
              </div>
            </div>
          </div>

          <Table
            data={currentPageLeads}
            pageName="leads"
            columns={[
              "name",
              "product",
              "phone",
              "status",
              "description",
            ]}
            filteredCount={filteredLeads.length}
            startIndex={startIndex}
            endIndex={endIndex}
            currentPage={effectivePage}
            pageCount={pageCount}
            onPageChange={setCurrentPage}
          />
        </section>
      </div>
    </main>
  );
}
