import { useEffect, useMemo, useState } from "react";

import Table from "../../components/common/Table";
import api from "../../utils/api";
import { toast } from "react-toastify";
import axios from "axios";
import Button from "../../components/common/Button";
import { Check,  Plus,  SaveIcon,  Trash2, Upload } from "lucide-react";
import { fileToObject } from "../../utils/helper";
import Filter from "../../components/common/Filter";
import { Link } from "react-router";
import SearchInput from "../../components/common/Search";
import Tooltip from "../../components/common/TooltipWrapper";
import Popup from "../../components/common/Popup";
const PAGE_SIZE = 3;

 const SUMMARY_CARDS = [
  {
    title: "Total Leads",
    amount: "1,248",
    note: "+12% this month",
    badgeClass: "text-emerald-300",
  },
  {
    title: "Active Leads",
    amount: "912",
    note: "73% of pipeline",
    badgeClass: "text-sky-300",
  },
  {
    title: "New Leads",
    amount: "314",
    note: "26 added this week",
    badgeClass: "text-amber-300",
  },
  {
    title: "Pipeline Value",
    amount: "$124.8k",
    note: "Estimated revenue",
    badgeClass: "text-lime-primary",
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
interface PopupProps{
  type:'failure',
  visible:boolean,
  title:'Error',
  message:''

}
export default function AllLeadsPage() {
  const [submitLoading,setIsSubmitLoading] = useState<boolean>(false);
  const [popupOptions,setPopupOptions] = useState<PopupProps>({type:'failure',visible:false,title:'Error',message:''});
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
         setPopupOptions({
          type:'failure',
          visible:true,
          title:'Error',
          message:error.response?.data.message
         }) 
          
    // toast.error(error.response?.data?.message || "Error fetching leads");
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
    toast.error("Please select a valid Excel file (.xlsx or .xls)");
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
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
              Lead Inventory
            </p>
            <h1 className="mt-4 text-4xl font-semibold text-white tracking-tight">
              Manage your lead pipeline with clarity.
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

       <div className="grid gap-4 grid-cols-1 lg:grid-cols-5">
      {SUMMARY_CARDS.map((card) => (
        <div
          key={card.title}
          className="rounded-[28px] border border-[#2A2A30] bg-[#16161A] p-6 shadow-[0_30px_60px_rgba(0,0,0,0.2)]"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
            {card.title}
          </p>
          <p className="mt-5 text-4xl font-semibold text-white">{card.amount}</p>
          <span className={`mt-3 inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-xs font-semibold ${card.badgeClass}`}>
            {card.note}
          </span>
        </div>
      ))}
      <Link to={"/leads/new"} className="grid place-items-center  rounded-[28px] border border-[#2A2A30] bg-[#16161A] p-6 shadow-[0_30px_60px_rgba(0,0,0,0.2)]">
       <Plus />
        Add New Lead
      </Link>
    </div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
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
      <div className="relative flex h-full min-h-12 w-full items-center justify-between rounded-3xl border border-[#2A2A30] bg-[#111115] px-5 py-3 text-gray-200 shadow-sm">
        <span className="text-sm font-medium text-gray-200 flex flex-1 gap-2 w-full">
          <Check color="green"/>
          File Uploaded
        </span>
        

         
        <button
          type="button"
          onClick={() => setSelectedFile(null)}
          className="group cursor-pointer relative rounded-full p-1 transition-colors hover:bg-red-500/10"
          title="Remove file"
        >
          <Tooltip text="Remove File" />
          <Trash2 className="h-4 w-4 text-red-400 transition-colors group-hover:text-red-500" />
        </button>
         
      </div>
    )
  )}

  <Button type="button" label="Save Leads" icon={<SaveIcon/>} loading={submitLoading} onClick={handleLeadsUpload}/>
{/* </div> */}
</div>
        <section className="overflow-x-hidden rounded-4xl border border-[#2A2A30] bg-[#111115] shadow-[0_35px_80px_rgba(0,0,0,0.35)]">
          <div className="flex flex-col gap-4 border-b border-[#2A2A30] p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-gray-500">Lead table</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">All active leads</h2>
            </div>

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
              <Popup
                type={'failure'}
                visible={popupOptions.visible}
                title={popupOptions.title}
                message={popupOptions.message}
                cancelText="Exit"
                onCancel={() =>
                  setPopupOptions({
                    type: "failure",
                    visible: false,
                    message: "",
                    title: "Error",
                  })
                }
              />
      </div>
    </main>
  );
}
