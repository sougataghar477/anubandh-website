import React from "react";
interface LabelProps {
  text?: string;
  children?: React.ReactNode;
  className?: string;
  marginBottomZero?:boolean;
}

export default function Label({
  text,
  children,
  marginBottomZero=false,
  className = "",
}: LabelProps) {
  return (
    <label
      className={`block text-xs font-bold tracking-wider uppercase text-gray-400 ${!marginBottomZero? "mb-2": ""} ${className}`}
    >
      {text}
    { children && <div className={text?"mt-4":""}>
      {children}
      </div>}
    </label>
  );
}