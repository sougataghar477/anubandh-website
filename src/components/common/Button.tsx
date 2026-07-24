import React from 'react';

interface SaveButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

export default function Button({ label = 'Save Changes', className = '', ...props }: SaveButtonProps) {
  return (
    <button
      {...props}
      className={`
        w-full py-3.5 px-6 
        rounded-2xl 
        bg-lime-primary hover:bg-lime-hover active:bg-lime-active
        text-white font-semibold text-base 
        shadow-lg shadow-emerald-900/20 
        hover:opacity-95 active:scale-[0.99] 
        transition-all duration-150 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-emerald-400/50
        ${className}
      `}
    >
      {label}
    </button>
  );
}