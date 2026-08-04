import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, ArrowRight } from "lucide-react";
import Table from "../../components/common/Table";
import Paginationn from "../../components/common/Paginationn";
import ListToolbarr from "../../components/common/ListToolbarr";

type Lead = {
  id: string;
  customerName: string;
  product: string;
  status: "New" | "In Progress" | "Qualified" | "Lost";
  owner: string;
  lastContact: string;
};

const mockLeads: Lead[] = [
  {
    id: "L-001",
    customerName: "Riya Sharma",
    product: "CRM Pro",
    status: "Qualified",
    owner: "Ananya Singh",
    lastContact: "2026-08-01",
  },
  {
    id: "L-002",
    customerName: "Amit Patel",
    product: "Analytics Module",
    status: "In Progress",
    owner: "Rahul Verma",
    lastContact: "2026-08-03",
  },
  {
    id: "L-003",
    customerName: "Nina Kapoor",
    product: "Enterprise Suite",
    status: "New",
    owner: "Priya Narayan",
    lastContact: "2026-08-04",
  },
  {
    id: "L-004",
    customerName: "Arjun Mehta",
    product: "CRM Pro",
    status: "Lost",
    owner: "Rhea Sen",
    lastContact: "2026-08-02",
  },
  {
    id: "L-005",
    customerName: "Maya Rao",
    product: "Analytics Module",
    status: "In Progress",
    owner: "Sameer Khan",
    lastContact: "2026-08-03",
  },
  {
    id: "L-006",
    customerName: "Kavya Desai",
    product: "Enterprise Suite",
    status: "New",
    owner: "Ananya Singh",
    lastContact: "2026-08-04",
  },
];

const statusStyles: Record<Lead["status"], string> = {
  New: "bg-blue-500/10 text-blue-200 border border-blue-500/20",
  "In Progress": "bg-amber-500/10 text-amber-200 border border-amber-500/20",
  Qualified: "bg-emerald-500/10 text-emerald-200 border border-emerald-500/20",
  Lost: "bg-red-500/10 text-red-200 border border-red-500/20",
};

const STATUS_FILTERS = [
  { label: "All Statuses", value: "all" },
  { label: "New", value: "New" },
  { label: "In Progress", value: "In Progress" },
  { label: "Qualified", value: "Qualified" },
  { label: "Lost", value: "Lost" },
];

const PAGE_SIZE = 4;

export default function AllLeadsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredLeads = useMemo(() => {
    return mockLeads.filter((lead) => {
      const matchesSearch = [lead.customerName, lead.product, lead.owner, lead.id]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.trim().toLowerCase());

      const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredLeads.length / PAGE_SIZE));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const visibleLeads = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return filteredLeads.slice(startIndex, startIndex + PAGE_SIZE);
  }, [currentPage, filteredLeads]);

  const columns = useMemo(
    () => [
      {
        header: "Lead",
        render: (lead: Lead) => (
          <div>
            <div className="text-sm font-semibold text-white">{lead.customerName}</div>
            <div className="mt-1 text-xs text-gray-400">{lead.id}</div>
          </div>
        ),
      },
      {
        header: "Product",
        accessor: "product",
      },
      {
        header: "Status",
        render: (lead: Lead) => (
          <span className={`${statusStyles[lead.status]} inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]`}>
            {lead.status}
          </span>
        ),
      },
      {
        header: "Owner",
        accessor: "owner",
      },
      {
        header: "Last Contact",
        accessor: "lastContact",
      },
      {
        header: "Action",
        render: (lead: Lead) => (
          <Link
            to={`/leads-all/new`}
            className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-2 text-xs font-semibold text-lime-primary transition hover:bg-white/10"
          >
            View
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        ),
      },
    ],
    []
  );

  return (
    <main className="min-h-screen bg-[#121214] text-[#E1E1E6] p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <nav className="text-xs font-bold text-lime-primary tracking-wider uppercase mb-2">
              Leads &gt; <span className="text-white">All Leads</span>
            </nav>
            <h1 className="text-3xl font-serif text-white tracking-wide">LeadAll Dashboard</h1>
            <p className="mt-2 text-sm text-gray-400 max-w-2xl">
              Browse and manage all leads with fast search, status filtering, and pagination.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              to="/leads-all/new"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-lime-primary px-5 py-3 text-sm font-semibold text-[#121214] transition hover:bg-lime-hover"
            >
              <Plus className="w-4 h-4" />
              Add New Lead
            </Link>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="rounded-3xl border border-[#2A2A30] bg-[#18181C] p-6">
            <p className="text-sm uppercase tracking-[0.4em] text-gray-500">Total Leads</p>
            <p className="mt-4 text-4xl font-semibold text-white">{mockLeads.length}</p>
          </div>
          <div className="rounded-3xl border border-[#2A2A30] bg-[#18181C] p-6">
            <p className="text-sm uppercase tracking-[0.4em] text-gray-500">In Progress</p>
            <p className="mt-4 text-4xl font-semibold text-white">{mockLeads.filter((lead) => lead.status === "In Progress").length}</p>
          </div>
          <div className="rounded-3xl border border-[#2A2A30] bg-[#18181C] p-6">
            <p className="text-sm uppercase tracking-[0.4em] text-gray-500">Qualified</p>
            <p className="mt-4 text-4xl font-semibold text-white">{mockLeads.filter((lead) => lead.status === "Qualified").length}</p>
          </div>
        </section>

        <section className="rounded-3xl border border-[#2A2A30] bg-[#18181C] p-6 shadow-xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">Lead Table</h2>
              <p className="mt-1 text-sm text-gray-400">Filtered results update instantly as you search or change the status.</p>
            </div>

            <ListToolbarr
              searchValue={searchTerm}
              onSearchChange={setSearchTerm}
              statusValue={statusFilter}
              onStatusChange={setStatusFilter}
              statusOptions={STATUS_FILTERS}
            />
          </div>

          <div className="mt-6">
            <Table<Lead>
              columns={columns}
              data={visibleLeads}
              rowKey={(lead) => lead.id}
              emptyMessage="No leads match your filters."
            />
          </div>

          <div className="mt-6">
            <Paginationn currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        </section>
      </div>
    </main>
  );
}
