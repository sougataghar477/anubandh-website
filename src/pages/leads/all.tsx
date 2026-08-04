import { useEffect, useMemo, useState } from "react";
import LeadsFilterBar from "./components/LeadsFilterBar";
import LeadsSearchHeader from "./components/LeadsSearchHeader";
import LeadsSummaryCards from "./components/LeadsSummaryCards";
import LeadsTable from "./components/LeadsTable";

const PAGE_SIZE = 3;

const LEADS = [
  {
    name: "Nova Insights",
    company: "BrightSpark LLC",
    value: "$18,400",
    status: "Qualified",
    statusColor: "text-emerald-400 bg-emerald-500/10",
    owner: "Simran",
  },
  {
    name: "Apex Commerce",
    company: "TradeWave Inc.",
    value: "$9,200",
    status: "In Progress",
    statusColor: "text-amber-300 bg-amber-500/10",
    owner: "Raman",
  },
  {
    name: "Orion Finance",
    company: "Pulse Capital",
    value: "$34,800",
    status: "New",
    statusColor: "text-sky-300 bg-sky-500/10",
    owner: "Aisha",
  },
  {
    name: "Zenith Healthcare",
    company: "CareFlow Solutions",
    value: "$12,600",
    status: "Lost",
    statusColor: "text-rose-400 bg-rose-500/10",
    owner: "Nisha",
  },
  {
    name: "Vertex Energy",
    company: "HelioGrid",
    value: "$7,400",
    status: "Qualified",
    statusColor: "text-emerald-400 bg-emerald-500/10",
    owner: "Arjun",
  },
];

const STATUS_OPTIONS = ["Qualified", "In Progress", "New", "Lost"];
const OWNER_OPTIONS = ["Simran", "Raman", "Aisha", "Nisha", "Arjun"];

type Lead = {
  name: string;
  company: string;
  value: string;
  status: string;
  statusColor: string;
  owner: string;
};

export default function AllLeadsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [activeStatusFilters, setActiveStatusFilters] = useState<string[]>([]);
  const [activeOwnerFilters, setActiveOwnerFilters] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredLeads = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();

    return LEADS.filter((lead) => {
      const matchesSearch =
        normalized === "" ||
        [lead.name, lead.company, lead.status, lead.owner, lead.value]
          .join(" ")
          .toLowerCase()
          .includes(normalized);

      const matchesStatus =
        activeStatusFilters.length === 0 ||
        activeStatusFilters.includes(lead.status);

      const matchesOwner =
        activeOwnerFilters.length === 0 ||
        activeOwnerFilters.includes(lead.owner);

      return matchesSearch && matchesStatus && matchesOwner;
    });
  }, [searchTerm, activeStatusFilters, activeOwnerFilters]);

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

        <section className="overflow-hidden rounded-[32px] border border-[#2A2A30] bg-[#111115] shadow-[0_35px_80px_rgba(0,0,0,0.35)]">
          <div className="flex flex-col gap-4 border-b border-[#2A2A30] px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-gray-500">Lead table</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">All active leads</h2>
            </div>

            <LeadsFilterBar
              filtersOpen={filtersOpen}
              onToggleFilters={() => setFiltersOpen((prev) => !prev)}
              statusOptions={STATUS_OPTIONS}
              ownerOptions={OWNER_OPTIONS}
              activeStatusFilters={activeStatusFilters}
              activeOwnerFilters={activeOwnerFilters}
              onToggleStatus={(status) => toggleArrayValue(status, activeStatusFilters, setActiveStatusFilters)}
              onToggleOwner={(owner) => toggleArrayValue(owner, activeOwnerFilters, setActiveOwnerFilters)}
              onClearFilters={clearAllFilters}
            />
          </div>

          <LeadsTable
            leads={currentPageLeads}
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
