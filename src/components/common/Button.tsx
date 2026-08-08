// import React from 'react';

// interface SaveButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//   label?: string;
//   icon?:React.ReactNode
// }

// export default function Button({icon, label = 'Save Changes', className = '', ...props }: SaveButtonProps) {
//   return (
//     <button
//       {...props}
//       className={`
//         w-full py-3.5 px-6 
//         rounded-2xl 
//         bg-lime-primary hover:bg-lime-hover active:bg-lime-active
//         text-white font-semibold text-base 
//         shadow-lg shadow-emerald-900/20 
//         active:scale-[0.99] 
//         transition-all duration-150 ease-in-out
//         focus:outline-none
//         flex
//         justify-center
//         items-center
//         gap-2
//         ${className}
//       `}
//     >
//       {icon}
//       {label}
//     </button>
//   );
// }
import React from 'react';

interface SaveButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  icon?: React.ReactNode;
  bgColor?: string;
  textColor?: string;
}

export default function Button({
  icon,
  label = 'Save Changes',
  bgColor = 'bg-lime-primary hover:bg-lime-hover active:bg-lime-active',
  textColor = 'text-white',
  className = '',
  style,
  ...props
}: SaveButtonProps) {
  // Supports hex values (#111115) or RGB in addition to Tailwind class strings
  const isHexOrRgbBg = bgColor.startsWith('#') || bgColor.startsWith('rgb');
  const isHexOrRgbText = textColor.startsWith('#') || textColor.startsWith('rgb');

  return (
    <button
      {...props}
      style={{
        ...(isHexOrRgbBg ? { backgroundColor: bgColor } : {}),
        ...(isHexOrRgbText ? { color: textColor } : {}),
        ...style,
      }}
      className={`
        w-full py-3.5 px-6 cursor-pointer
        rounded-2xl 
        ${!isHexOrRgbBg ? bgColor : ''}
        ${!isHexOrRgbText ? textColor : ''}
        font-semibold text-base 
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