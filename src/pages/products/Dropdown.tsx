import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Check,
  Package,
} from "lucide-react";

export interface DropdownOption {
  id: number | string;
  name: string;
}

interface DropdownProps {
  label: string;
  options: DropdownOption[];
  value?: DropdownOption | null;
  onSelect: (option: DropdownOption) => void;
}

export default function Dropdown({
  label,
  options,
  value,
  onSelect,
}: DropdownProps) {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="mb-4 relative">
      <label className="mb-2 block font-medium text-gray-300">
        {label}
      </label>

      {/* Selected Value */}
      <button
        type="button"
        onClick={() => setShowOptions(!showOptions)}
        className="flex w-full items-center justify-between rounded-2xl border border-[#2B2B2B] bg-[#181818] px-4 py-3 text-white"
      >
        <div className="flex items-center gap-3">
          <Package size={18} className="text-gray-400" />

          <span>
            {value?.name || "Select an option"}
          </span>
        </div>

        {showOptions ? (
          <ChevronUp size={18} className="text-gray-400" />
        ) : (
          <ChevronDown size={18} className="text-gray-400" />
        )}
      </button>

      {/* Dropdown Options */}
      {showOptions && (
        <div className="absolute left-0 right-0 z-50 mt-2 overflow-hidden rounded-2xl border border-[#2B2B2B] bg-[#181818] shadow-lg">
          {options.length === 0 ? (
            <div className="px-4 py-3 text-gray-400">
              No options found
            </div>
          ) : (
            options.map((option, index) => (
              <button
                key={option.id}
                type="button"
                onClick={() => {
                  onSelect(option);
                  setShowOptions(false);
                }}
                className={`flex w-full items-center justify-between px-4 py-3 text-left text-white transition hover:bg-lime-500/10 ${
                  index !== options.length - 1
                    ? "border-b border-[#2B2B2B]"
                    : ""
                }`}
              >
                <span>{option.name}</span>

                {value?.id === option.id && (
                  <Check
                    size={18}
                    className="text-lime-400"
                  />
                )}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}