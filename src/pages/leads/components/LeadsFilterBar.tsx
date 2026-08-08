import { Link } from "react-router";

type LeadsFilterBarProps = {
  filtersOpen: boolean;
  onToggleFilters: () => void;
  statusOptions: string[];
  // ownerOptions: number[];
  activeStatusFilters: string[];
  // activeOwnerFilters: number[];
  onToggleStatus: (status: string) => void;
  // onToggleOwner: (owner: string) => void;
  onClearFilters: () => void;
};

export default function LeadsFilterBar({
  filtersOpen,
  onToggleFilters,
  statusOptions,
  // ownerOptions,
  activeStatusFilters,
  // activeOwnerFilters,
  onToggleStatus,
  // onToggleOwner,
  onClearFilters,
}: LeadsFilterBarProps) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onToggleFilters}
          className="inline-flex items-center rounded-2xl border border-[#2A2A30] bg-white/5 px-4 py-3 text-sm font-semibold text-gray-200 transition hover:border-lime-primary hover:text-white"
        >
          Filters
        </button>
        <Link
          to="/leads/new"
          className="inline-flex items-center rounded-2xl bg-lime-primary px-4 py-3 text-sm font-semibold text-[#121214] shadow-sm shadow-lime-500/20 transition hover:bg-lime-hover"
        >
          Add Lead
        </Link>
      </div>

      {filtersOpen && (
        <div className="border-b border-[#2A2A30] bg-[#141418] px-6 py-5">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-gray-500">Status</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  {statusOptions.map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => onToggleStatus(status)}
                      className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                        activeStatusFilters.includes(status)
                          ? "border-lime-primary bg-lime-primary/15 text-lime-primary"
                          : "border-[#2A2A30] bg-white/5 text-gray-200 hover:border-lime-primary"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                    <button
                        type="button"
                        onClick={onClearFilters}
                        className="rounded-2xl border border-[#2A2A30] bg-white/5 px-4 py-3 text-sm font-semibold text-gray-200 transition hover:border-lime-primary hover:text-white"
                      >
                        Clear all
                    </button>
                </div>
              </div>

              {/* <div>
                <p className="text-xs uppercase tracking-[0.24em] text-gray-500">Owner</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  {ownerOptions.map((owner) => (
                    <button
                      key={owner}
                      type="button"
                      onClick={() => onToggleOwner(owner)}
                      className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                        activeOwnerFilters.includes(owner)
                          ? "border-lime-primary bg-lime-primary/15 text-lime-primary"
                          : "border-[#2A2A30] bg-white/5 text-gray-200 hover:border-lime-primary"
                      }`}
                    >
                      {owner}
                    </button>
                  ))}
                </div>
              </div> */}
            </div>


          </div>
        </div>
      )}
    </>
  );
}