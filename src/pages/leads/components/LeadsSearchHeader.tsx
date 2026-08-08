import { Link } from "react-router";

type LeadsSearchHeaderProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
};

export default function LeadsSearchHeader({
  searchTerm,
  onSearchChange,
}: LeadsSearchHeaderProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center md:w-80">
      <div className="flex items-center gap-2 rounded-2xl border border-[#2A2A30] bg-[#141418] px-4 py-3 shadow-sm shadow-black/10 w-full">
        <input
          type="search"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search leads..."
          className="w-full bg-transparent text-sm text-gray-100 placeholder:text-gray-500 outline-none"
        />
      </div>

    </div>
  );
}