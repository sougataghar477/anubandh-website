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
        <span className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none flex items-center justify-center">
          {icon}
        </span>
      )}

      {/* Select Input */}
      <select
        {...props}
        className={`
          w-full bg-[#121214] border border-[#2A2A30] text-gray-200 rounded-lg py-3 pr-10 text-sm 
          appearance-none focus:outline-none focus:border-[#84CC16] transition-colors cursor-pointer
          ${icon ? "pl-10" : "pl-4"}
          ${className}
        `.trim()}
      >
        {placeholder && (
          <option value="" disabled className="bg-[#121214] text-gray-500">
            {placeholder}
          </option>
        )}
        
        {options.length > 0 ? options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="bg-[#121214] text-gray-200"
          >
            {option.label}
          </option>
        )):<option value="" disabled selected className="bg-[#121214] text-gray-500">No Available Option</option>}
      </select>

      {/* Custom Chevron Indicator */}
      <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
    </div>
  );
}