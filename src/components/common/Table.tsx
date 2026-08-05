import type { ReactNode } from "react";
import { useNavigate } from "react-router";
import { formatLabel } from "../../utils/validation";


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
      <div className="w-full overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0 text-left text-sm">
          <thead className="bg-[#141418] text-xs uppercase tracking-[0.24em] text-gray-500">
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column)}
                  className={`px-6 py-4`}
                >
                  {String(column)}
                </th>
              ))}
                <th>Show Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#2A2A30]">
            {data.length === 0 ? (
              <tr className="bg-[#111115]">
                <td
                  colSpan={columns.length}
                  className="px-6 py-8 text-center text-sm text-gray-400"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr key={rowIndex} className="bg-[#111115]">
                  {columns.map((column) => (
                    <td
                      key={String(column)}
                      className={`px-6 py-5`}
                    >
                      {typeof row[column] === "string" ? formatLabel(row[column]) : row[column]}
                    </td>
                  ))}
                    <td className="px-6 py-5">
    <button
      onClick={() => navigateTo(`/${pageName}/${row.id}`)}
      className="rounded-xl border border-[#2A2A30] bg-[#141418] px-4 py-2 text-sm text-gray-200 hover:border-lime-primary"
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

      <div className="flex flex-col gap-4 border-t border-[#2A2A30] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
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