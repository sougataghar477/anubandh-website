import type { HTMLAttributes, ReactElement } from "react";

interface TooltipProps extends HTMLAttributes<HTMLSpanElement> {
  text:string;
  children:ReactElement<HTMLAttributes<HTMLElement>>;
}

export default function TooltipWrapper({
  text,
  children,
}: TooltipProps) {
  return (
    <div className="relative anchor">
      {children}

      <span className="tooltip">
        {text}
      </span>
    </div>
  );
}