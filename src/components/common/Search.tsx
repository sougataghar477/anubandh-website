type SearchInputProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
};

export default function SearchInput({
  searchTerm,
  onSearchChange,
  placeholder = "Search...",
}: SearchInputProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center md:w-80 items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm text-slate-800 transition-all focus-within:border-blue-500 focus-within:bg-white focus-within:ring-1 focus-within:ring-blue-500 w-full">
      <input
        type="search"
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm text-slate-800 placeholder:text-slate-400 outline-none"
      />
    </div>
  );
}