import type { ReactNode } from "react";

type Column<T> = {
  header: string;
  accessor?: keyof T;
  render?: (item: T) => ReactNode;
  headerClassName?: string;
  cellClassName?: string;
};

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  rowKey: (item: T) => string;
  className?: string;
  emptyMessage?: string;
}

export default function Table<T>({
  columns,
  data,
  rowKey,
  className = "",
  emptyMessage = "No rows available.",
}: TableProps<T>) {
  return (
    <div className={`overflow-hidden rounded-3xl border border-[#2A2A30] bg-[#101014] ${className}`}>
      <table className="min-w-full text-left text-sm">
        <thead className="border-b border-[#2A2A30] bg-[#15151A]">
          <tr>
            {columns.map((column) => (
              <th
                key={column.header}
                className={`px-6 py-4 text-xs uppercase tracking-[0.2em] text-gray-500 ${column.headerClassName ?? ""}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-12 text-center text-sm text-gray-400">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr
                key={rowKey(item)}
                className="border-b border-[#2A2A30] last:border-none hover:bg-[#1B1B20] transition-colors"
              >
                {columns.map((column) => (
                  <td
                    key={column.header}
                    className={`px-6 py-5 align-top text-gray-300 ${column.cellClassName ?? ""}`}
                  >
                    {column.render ? column.render(item) : String(item[column.accessor as keyof T] ?? "")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
