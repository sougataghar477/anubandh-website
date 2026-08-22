import type { ReactNode } from "react";
import { useNavigate } from "react-router";
import { formatLabel } from "../../utils/helper";

type GenericTableProps<T> = {
  data: T[];
  emptyMessage?: string;
  columns: string[];
  filteredCount: number;
  startIndex: number;
  endIndex: number;
  pageName: string;
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
    return "bg-amber-50 text-amber-700 border border-amber-200";
  }

  if (
    normalized === "successful" ||
    normalized === "successfull" ||
    normalized === "success" ||
    normalized === "completed" ||
    normalized === "complete"
  ) {
    return "bg-emerald-50 text-emerald-700 border border-emerald-200";
  }

  if (
    normalized === "failed" ||
    normalized === "failure" ||
    normalized === "unsuccessful"
  ) {
    return "bg-rose-50 text-rose-700 border border-rose-200";
  }

  return "bg-slate-100 text-slate-700 border border-slate-200";
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
    <div className="w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="w-full overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0 text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-[0.2em] text-slate-500">
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column)}
                  className="px-6 py-4 font-semibold text-slate-600 border-b border-slate-200"
                >
                  {String(column)}
                </th>
              ))}
              <th className="px-6 py-4 font-semibold text-slate-600 border-b border-slate-200">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-6 py-8 text-center text-sm text-slate-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="bg-white transition-colors duration-150 hover:bg-slate-50/80"
                >
                  {columns.map((column) => {
                    const cellValue = row[column];
                    const isStatusColumn =
                      String(column).toLowerCase() === "status";
                    const statusClasses = isStatusColumn
                      ? getStatusClasses(cellValue)
                      : "";
                    const content =
                      typeof cellValue === "string"
                        ? isStatusColumn
                          ? (
                              <span
                                className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${statusClasses}`}
                              >
                                {formatLabel(cellValue)}
                              </span>
                            )
                          : formatLabel(cellValue)
                        : cellValue;

                    return (
                      <td
                        key={String(column)}
                        className="px-6 py-4 text-sm text-slate-700"
                      >
                        {content}
                      </td>
                    );
                  })}
                  <td className="px-6 py-4">
                    <button
                      onClick={() => navigateTo(`/${pageName}/${row.id}`)}
                      className="rounded-full border border-blue-200 bg-blue-50/50 px-4 py-1.5 text-xs font-semibold text-blue-600 transition hover:bg-blue-100 hover:border-blue-300"
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

      <div className="flex flex-col gap-4 border-t border-slate-200 bg-slate-50/50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500">
          Showing {startIndex}-{endIndex} of {filteredCount}
        </p>

        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            className={`rounded-xl border px-3.5 py-1.5 text-sm transition ${
              currentPage === 1
                ? "border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed"
                : "border-slate-200 bg-white text-slate-700 hover:border-blue-500 hover:text-blue-600"
            }`}
          >
            Prev
          </button>

          {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition ${
                page === currentPage
                  ? "bg-blue-600 text-white"
                  : "border border-slate-200 bg-white text-slate-700 hover:border-blue-500 hover:text-blue-600"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            disabled={currentPage === pageCount}
            onClick={() => onPageChange(currentPage + 1)}
            className={`rounded-xl border px-3.5 py-1.5 text-sm transition ${
              currentPage === pageCount
                ? "border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed"
                : "border-slate-200 bg-white text-slate-700 hover:border-blue-500 hover:text-blue-600"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}