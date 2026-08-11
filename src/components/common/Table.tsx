import type { ReactNode } from "react";
import { useNavigate } from "react-router";
import { formatLabel } from "../../utils/helper";


type GenericTableProps<T> = {
  data: T[];
  emptyMessage?: string;
  columns:string[],
  filteredCount: number;
  startIndex: number;
  endIndex: number;
  pageName:string;
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
};

const getStatusClasses = (value: string | ReactNode | undefined) => {
  const normalized = String(value ?? "").trim().toLowerCase();

  if (
    normalized === "in progress" ||
    normalized === "in_progress" ||
    normalized === "inprogress"
  ) {
    return "bg-amber-500/20 text-amber-400 border border-amber-500/30";
  }

  if (
    normalized === "successful" ||
    normalized === "successfull" ||
    normalized === "success" ||
    normalized === "completed" ||
    normalized === "complete"
  ) {
    return "bg-green-500/20 text-green-400 border border-green-500/30";
  }

  if (
    normalized === "failed" ||
    normalized === "failure" ||
    normalized === "unsuccessful"
  ) {
    return "bg-red-500/20 text-red-400 border border-red-500/30";
  }

  return "";
};

export default function Table<T extends Record<string, ReactNode>>({
  data,
  emptyMessage = "No data found.",
  columns,
  filteredCount,
  startIndex,
  endIndex,
  pageName,
  currentPage,
  pageCount,
  onPageChange,
}: GenericTableProps<T>) {
  const navigateTo = useNavigate();
  return (
    <>
      <div className="w-full overflow-x-auto rounded-3xl border border-[#2B2B2B] bg-[#181818] shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
        <table className="min-w-full border-separate border-spacing-0 text-left text-sm">
          <thead className="bg-[#101116] text-xs uppercase tracking-[0.28em] text-gray-400">
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column)}
                  className="px-6 py-4 font-semibold text-gray-300"
                >
                  {String(column)}
                </th>
              ))}
                <th className="px-6 py-4 font-semibold text-gray-300">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#2A2A30]">
            {data.length === 0 ? (
              <tr className="bg-[#111115]">
                <td
                  colSpan={columns.length + 1}
                  className="px-6 py-8 text-center text-sm text-gray-400"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr key={rowIndex} className="bg-[#12131a] transition-colors duration-200 hover:bg-[#1c1e27]">
                  {columns.map((column) => {
                    const cellValue = row[column];
                    const isStatusColumn = String(column).toLowerCase() === "status";
                    const statusClasses = isStatusColumn ? getStatusClasses(cellValue) : "";
                    const content =
                      typeof cellValue === "string"
                        ? isStatusColumn
                          ? (
                              <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusClasses}`}>
                                {formatLabel(cellValue)}
                              </span>
                            )
                          : formatLabel(cellValue)
                        : cellValue;

                    return (
                      <td key={String(column)} className="px-6 py-5 text-sm text-gray-200">
                        {content}
                      </td>
                    );
                  })}
                    <td className="px-6 py-5">
    <button
      onClick={() => navigateTo(`/${pageName}/${row.id}`)}
      className="rounded-full border border-[#2A2B2B] bg-gradient-to-r from-lime-500/10 via-transparent to-lime-500/10 px-4 py-2 text-sm font-semibold text-lime-100 transition hover:border-lime-300 hover:bg-[#1a1c1f]"
    >
      View Record
    </button>
  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-4 border-t border-[#2B2B2B] bg-[#111116] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray-400">
          Showing {startIndex}-{endIndex} of {filteredCount}
        </p>

        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            className={`rounded-2xl border px-4 py-2 text-sm ${
              currentPage === 1
                ? "border-[#2A2A30] bg-[#0d0d10] text-gray-600 cursor-not-allowed"
                : "border-[#2A2A30] bg-[#141418] text-gray-200 hover:border-lime-primary"
            }`}
          >
            Prev
          </button>

          {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                page === currentPage
                  ? "bg-lime-primary text-[#121214]"
                  : "border border-[#2A2A30] bg-[#141418] text-gray-200 hover:border-lime-primary"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            disabled={currentPage === pageCount}
            onClick={() => onPageChange(currentPage + 1)}
            className={`rounded-2xl border px-4 py-2 text-sm ${
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