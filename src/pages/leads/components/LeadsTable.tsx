type Lead = {
  name: string;
  company: string;
  value: string;
  status: string;
  statusColor: string;
  owner: string;
};

type LeadsTableProps = {
  leads: Lead[];
  filteredCount: number;
  startIndex: number;
  endIndex: number;
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
};

export default function LeadsTable({
  leads,
  filteredCount,
  startIndex,
  endIndex,
  currentPage,
  pageCount,
  onPageChange,
}: LeadsTableProps) {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0 text-left text-sm">
          <thead className="bg-[#141418] text-xs uppercase tracking-[0.24em] text-gray-500">
            <tr>
              <th className="px-6 py-4">Lead</th>
              <th className="px-6 py-4">Company</th>
              <th className="px-6 py-4">Value</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Owner</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2A2A30]">
            {leads.map((lead) => (
              <tr key={lead.name} className="bg-[#111115]">
                <td className="whitespace-nowrap px-6 py-5 font-semibold text-white">{lead.name}</td>
                <td className="px-6 py-5 text-gray-400">{lead.company}</td>
                <td className="px-6 py-5 text-white">{lead.value}</td>
                <td className="px-6 py-5">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${lead.statusColor}`}>
                    {lead.status}
                  </span>
                </td>
                <td className="px-6 py-5 text-gray-300">{lead.owner}</td>
                <td className="px-6 py-5 text-right">
                  <button className="rounded-full border border-[#2A2A30] bg-white/5 px-4 py-2 text-xs font-semibold text-gray-200 transition hover:border-lime-primary hover:text-white">
                    View
                  </button>
                </td>
              </tr>
            ))}
            {filteredCount === 0 && (
              <tr className="bg-[#111115]">
                <td colSpan={6} className="px-6 py-8 text-center text-sm text-gray-400">
                  No leads found. Try a different search term.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-4 border-t border-[#2A2A30] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray-400">
          Showing {startIndex}-{endIndex} of {filteredCount} leads
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            className={`rounded-2xl border px-4 py-2 text-sm transition ${
              currentPage === 1
                ? "border-[#2A2A30] bg-[#0d0d10] text-gray-600 cursor-not-allowed"
                : "border-[#2A2A30] bg-[#141418] text-gray-200 hover:border-lime-primary"
            }`}
          >
            Prev
          </button>
          {Array.from({ length: pageCount }, (_, idx) => idx + 1).map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                currentPage === page
                  ? "bg-lime-primary text-[#121214]"
                  : "border border-[#2A2A30] bg-[#141418] text-gray-200 hover:border-lime-primary"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            type="button"
            disabled={currentPage === pageCount}
            onClick={() => onPageChange(Math.min(pageCount, currentPage + 1))}
            className={`rounded-2xl border px-4 py-2 text-sm transition ${
              currentPage === pageCount
                ? "border-[#2A2A30] bg-[#0d0d10] text-gray-600 cursor-not-allowed"
                : "border-[#2A2A30] bg-[#141418] text-gray-200 hover:border-lime-primary"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
