import type { HTMLAttributes } from "react";

interface TooltipProps extends HTMLAttributes<HTMLSpanElement> {
  text: string;
}

export default function Tooltip({
  text,
  className = "",
  ...props
}: TooltipProps) {
  return (
    <span
      {...props}
      className={`pointer-events-none absolute left-1/2 -top-9 hidden w-max whitespace-nowrap -translate-x-1/2 rounded-4xl bg-[#111111] font-medium border border-[#333]  px-3 py-1.5 text-center text-sm shadow-xl group-hover:block ${className}`}
    >
      {text}
    </span>
  );
}