import { Search } from "lucide-react";
import Select, { SelectOption } from "./Select";

type ListToolbarProps = {
  searchValue: string;
  onSearchChange: (value: string) => void;
  statusValue: string;
  onStatusChange: (value: string) => void;
  statusOptions: SelectOption[];
};

export default function ListToolbar({
  searchValue,
  onSearchChange,
  statusValue,
  onStatusChange,
  statusOptions,
}: ListToolbarProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-[minmax(240px,1fr)_220px] lg:w-[660px]">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <input
          type="search"
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search leads"
          className="w-full rounded-2xl border border-[#2A2A30] bg-[#121214] py-3 pl-10 pr-4 text-sm text-gray-200 placeholder:text-gray-500 focus:border-lime-primary focus:outline-none"
        />
      </div>

      <Select
        value={statusValue}
        onChange={(event) => onStatusChange(event.target.value)}
        options={statusOptions}
        placeholder="Filter by status"
      />
    </div>
  );
}
