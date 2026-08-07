import React from "react";
interface LabelProps {
  text?: string;
  children?: React.ReactNode;
  className?: string;
}

export default function Label({
  text,
  children,
  className = "",
}: LabelProps) {
  return (
    <label
      className={`block text-xs font-bold tracking-wider uppercase text-gray-400 mb-2 ${className}`}
    >
      {text}
    { children && <div className={text?"mt-4":""}>
      {children}
      </div>}
    </label>
  );
}