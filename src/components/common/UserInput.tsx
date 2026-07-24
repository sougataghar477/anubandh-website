import type React from "react";

type BaseProps = {
  icon?: React.ReactNode;
  className?: string;
};

type InputProps = BaseProps & {
  element?: "input";
} & React.InputHTMLAttributes<HTMLInputElement>;

type TextareaProps = BaseProps & {
  element: "textarea";
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export type UserInputProps = InputProps | TextareaProps;

export default function UserInput(props: UserInputProps) {
  const { icon, element = "input", className = "", ...restProps } = props;

  const isTextarea = element === "textarea";
  const inputClassName = `
    w-full bg-[#121214] border border-[#2A2A30] text-gray-200 placeholder-gray-600 rounded-lg py-3 pr-4 text-sm focus:outline-none focus:border-[#F5A986] transition-colors
    ${icon ? "pl-10" : "pl-4"}
    ${className}
  `.trim();

  const iconElement = icon && (
    <span
      className={`
        w-4 h-4 absolute left-3.5 text-gray-500 pointer-events-none flex items-center justify-center
        ${isTextarea ? "top-3.5" : "top-1/2 -translate-y-1/2"}
      `}
    >
      {icon}
    </span>
  );

  if (isTextarea) {
    return (
      <div className="relative w-full">
        {iconElement}
        <textarea
          className={inputClassName}
          {...(restProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      </div>
    );
  }

  return (
    <div className="relative w-full">
      {iconElement}
      <input
        className={inputClassName}
        {...(restProps as React.InputHTMLAttributes<HTMLInputElement>)}
      />
    </div>
  );
}