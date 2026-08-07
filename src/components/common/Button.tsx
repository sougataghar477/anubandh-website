import React from 'react';

interface SaveButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  icon?:React.ReactNode
}

export default function Button({icon, label = 'Save Changes', className = '', ...props }: SaveButtonProps) {
  return (
    <button
      {...props}
      className={`
        w-full py-3.5 px-6 
        rounded-2xl 
        bg-lime-primary hover:bg-lime-hover active:bg-lime-active
        text-white font-semibold text-base 
        shadow-lg shadow-emerald-900/20 
        active:scale-[0.99] 
        transition-all duration-150 ease-in-out
        focus:outline-none
        flex
        justify-center
        items-center
        gap-2
        ${className}
      `}
    >
      {icon}
      {label}
    </button>
  );
}