import React from 'react';

interface ClayCardProps {
  children: React.ReactNode;
  inflated?: boolean;
  className?: string;
  onClick?: () => void;
  id?: string;
}

export const ClayCard: React.FC<ClayCardProps> = ({
  children,
  inflated = false,
  className = '',
  onClick,
  id
}) => {
  const baseClass = inflated ? 'clay-card-inflated' : 'clay-card';
  const interactiveClass = onClick ? 'cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-transform duration-150' : '';

  return (
    <div
      id={id}
      onClick={onClick}
      className={`${baseClass} p-5 text-white ${interactiveClass} ${className}`}
    >
      {children}
    </div>
  );
};
