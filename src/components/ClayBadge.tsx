import React from 'react';

interface ClayBadgeProps {
  children: React.ReactNode;
  variant?: 'dark' | 'white' | 'accent';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  className?: string;
  id?: string;
}

export const ClayBadge: React.FC<ClayBadgeProps> = ({
  children,
  variant = 'dark',
  size = 'md',
  icon,
  className = '',
  id
}) => {
  const pillClass = variant === 'white' ? 'clay-pill-white font-bold' : 'clay-pill text-zinc-200 font-medium';
  const sizeClass = size === 'sm' ? 'px-2.5 py-1 text-[11px]' : 'px-3.5 py-1.5 text-xs';

  return (
    <span
      id={id}
      className={`inline-flex items-center gap-1.5 whitespace-nowrap select-none ${pillClass} ${sizeClass} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
