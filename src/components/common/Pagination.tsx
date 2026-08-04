import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-[#2A2A30] bg-[#18181C] p-4 md:flex-row md:items-center md:justify-between">
      <div className="text-sm text-gray-400">
        Showing page <span className="font-semibold text-white">{currentPage}</span> of <span className="font-semibold text-white">{totalPages}</span>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#2A2A30] bg-[#101014] text-gray-300 transition hover:border-lime-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {pages.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={`h-11 min-w-[44px] rounded-full border px-4 text-sm font-semibold transition ${
              page === currentPage
                ? "border-lime-primary bg-lime-primary text-[#121214]"
                : "border-[#2A2A30] bg-[#101014] text-gray-300 hover:border-lime-primary hover:text-white"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#2A2A30] bg-[#101014] text-gray-300 transition hover:border-lime-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
