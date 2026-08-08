import { useEffect, useMemo, useState } from "react";
import LeadsFilterBar from "./components/LeadsFilterBar";
import LeadsSearchHeader from "./components/LeadsSearchHeader";
import LeadsSummaryCards from "./components/LeadsSummaryCards";
import Table from "../../components/common/Table";
import api from "../../utils/api";
import { toast } from "react-toastify";
import axios from "axios";
import Label from "../../components/common/Label";
import Button from "../../components/common/Button";

const PAGE_SIZE = 3;

 

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
  const [allLeads,setAllLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [activeStatusFilters, setActiveStatusFilters] = useState<string[]>([]);
  const [activeOwnerFilters, setActiveOwnerFilters] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

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
  const startIndex = filteredLeads.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const endIndex = Math.min(filteredLeads.length, currentPage * PAGE_SIZE);

  useEffect(() => {
    if (currentPage > pageCount) {
      setCurrentPage(1);
    }
  }, [currentPage, pageCount]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeStatusFilters, activeOwnerFilters]);

  const currentPageLeads = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredLeads.slice(start, start + PAGE_SIZE);
  }, [filteredLeads, currentPage]);

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

          <LeadsSearchHeader searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        </div>

        <LeadsSummaryCards />
<div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 items-stretch overflow-hidden">
  {/* Download Button */}
<a href="/template/1_002_-ey4.gif" download>
<Button
  label="Download Lead Excel File Template"
  bgColor="bg-lime-primary hover:bg-lime-hover border border-[#2A2A30]"
  textColor="text-black"
/>
</a>

  {/* Upload Field Container */}
  <label className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-3xl border border-[#2A2A30] bg-[#111115] p-4 text-center text-sm font-semibold text-gray-200 shadow-[0_35px_80px_rgba(0,0,0,0.35)]">
    <span>Upload Files Here for uploading bulk leads</span>

    <input
      type="file"
      accept=".xlsx,.xls"
      className="hidden"
    />
  </label>
</div>
        <section className="overflow-hidden rounded-[32px] border border-[#2A2A30] bg-[#111115] shadow-[0_35px_80px_rgba(0,0,0,0.35)]">
          <div className="flex flex-col gap-4 border-b border-[#2A2A30] p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-gray-500">Lead table</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">All active leads</h2>
            </div>

            <LeadsFilterBar
              filtersOpen={filtersOpen}
              onToggleFilters={() => setFiltersOpen((prev) => !prev)}
              statusOptions={statusOptions}
              activeStatusFilters={activeStatusFilters}
              onToggleStatus={(status) => toggleArrayValue(status, activeStatusFilters, setActiveStatusFilters)}
              onClearFilters={clearAllFilters}
            />
          </div>

          <Table
            data={currentPageLeads}
            pageName={"leads"}
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
            currentPage={currentPage}
            pageCount={pageCount}
            onPageChange={setCurrentPage}
          />
        </section>
      </div>
    </main>
  );
}
