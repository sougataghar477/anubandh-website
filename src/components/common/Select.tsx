import type React from "react";
import { ChevronDown } from "lucide-react";

export type SelectOption = {
  label: string;
  value: string | number;
};

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  icon?: React.ReactNode;
  placeholder?: string;
  className?: string;
}

export default function Select({
  options,
  icon,
  placeholder,
  className = "",
  ...props
}: SelectProps) {
  return (
    <div className="relative w-full">
      {/* Optional Left Icon */}
      {icon && (
        <span className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none flex items-center justify-center">
          {icon}
        </span>
      )}

      {/* Select Input */}
      <select
        {...props}
        className={`
          w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-lg py-3 pr-10 text-sm 
          appearance-none focus:outline-none focus:border-blue-500 focus:bg-white transition-all cursor-pointer
          ${icon ? "pl-10" : "pl-4"}
          ${className}
        `.trim()}
      >
        {placeholder && (
          <option value="" disabled className="bg-white text-slate-400">
            {placeholder}
          </option>
        )}
        
        {options.length > 0 ? (
          options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="bg-white text-slate-800"
            >
              {option.label}
            </option>
          ))
        ) : (
          <option value="" disabled selected className="bg-white text-slate-400">
            No Available Option
          </option>
        )}
      </select>

      {/* Custom Chevron Indicator */}
      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
    </div>
  );
}