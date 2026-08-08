import React from 'react';

interface ClayButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  id?: string;
}

export const ClayButton: React.FC<ClayButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  onClick,
  disabled = false,
  fullWidth = false,
  className = '',
  id
}) => {
  let variantClass = 'clay-btn-white';
  if (variant === 'secondary') {
    variantClass = 'clay-btn-dark';
  } else if (variant === 'outline') {
    variantClass = 'bg-black text-white border border-white/30 rounded-full hover:bg-zinc-900 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.1)] active:scale-95 transition-all';
  }

  let sizeClass = 'px-5 py-2.5 text-sm';
  if (size === 'sm') {
    sizeClass = 'px-3.5 py-1.5 text-xs';
  } else if (size === 'lg') {
    sizeClass = 'px-6 py-3.5 text-base font-bold';
  }

  const widthClass = fullWidth ? 'w-full flex justify-center items-center' : 'inline-flex items-center justify-center';
  const disabledClass = disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : 'cursor-pointer';

  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${variantClass} ${sizeClass} ${widthClass} ${disabledClass} gap-2 whitespace-nowrap select-none ${className}`}
    >
      {children}
    </button>
  );
};
