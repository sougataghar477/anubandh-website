import { formatLabel } from "../../utils/helper";

type FilterOption = {
  label: string;
  value: string;
};

type FilterGroup = {
  label: string;
  options: FilterOption[];
  activeValues: string[];
  onToggle: (value: string) => void;
};

type FilterProps = {
  filtersOpen: boolean;
  onToggleFilters: () => void;
  filterGroups: FilterGroup[];
  onClearFilters: () => void;
};

export default function Filter({
  filtersOpen,
  onToggleFilters,
  filterGroups,
  onClearFilters,
}: FilterProps) {
  return (
    <>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onToggleFilters}
          className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-500 hover:text-blue-600"
        >
          Filter By Status
        </button>
        
      {filtersOpen && (
        <div className="border-b border-slate-200 bg-slate-50/50 px-6 py-5 rounded-xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              {filterGroups.map((group) => (
                <div key={group.label}>
                  <div className="flex flex-wrap gap-3">
                    {group.options.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => group.onToggle(option.value)}
                        className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                          group.activeValues.includes(option.value)
                            ? "border-blue-500 bg-blue-50 text-blue-600"
                            : "border-slate-200 bg-white text-slate-600 hover:border-blue-400"
                        }`}
                      >
                        {formatLabel(option.label)}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={onClearFilters}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 transition hover:border-red-400 hover:text-red-500"
              >
                Clear all
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  );
}