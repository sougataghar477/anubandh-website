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
          className="rounded-2xl border border-[#2A2A30] bg-white/5 px-4 py-3 text-sm font-semibold text-gray-200 transition hover:border-lime-primary hover:text-white"
        >
          Filter By Status
        </button>
        
      {filtersOpen && (
        <div className="border-b border-[#2A2A30] bg-[#141418] px-6 py-5">
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
                            ? "border-lime-primary bg-lime-primary/15 text-lime-primary"
                            : "border-[#2A2A30] bg-white/5 text-gray-200 hover:border-lime-primary"
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
                className="rounded-2xl border border-[#2A2A30] bg-white/5 px-4 py-3 text-sm font-semibold text-gray-200 transition hover:border-lime-primary hover:text-white"
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