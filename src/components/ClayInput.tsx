import React from 'react';

interface ClayInputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  isTextArea?: boolean;
  rows?: number;
  hint?: string;
  required?: boolean;
  icon?: React.ReactNode;
  id?: string;
  className?: string;
}

export const ClayInput: React.FC<ClayInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  isTextArea = false,
  rows = 3,
  hint,
  required = false,
  icon,
  id,
  className = ''
}) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-xs font-semibold text-zinc-300 tracking-wide uppercase flex items-center justify-between">
          <span>
            {label} {required && <span className="text-white">*</span>}
          </span>
        </label>
      )}
      
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-3.5 text-zinc-400 pointer-events-none flex items-center">
            {icon}
          </div>
        )}
        
        {isTextArea ? (
          <textarea
            id={id}
            value={value}
            onChange={onChange}
            rows={rows}
            placeholder={placeholder}
            required={required}
            className={`clay-input w-full p-3.5 text-sm placeholder:text-zinc-600 resize-none ${icon ? 'pl-10' : ''}`}
          />
        ) : (
          <input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className={`clay-input w-full p-3.5 text-sm placeholder:text-zinc-600 ${icon ? 'pl-10' : ''}`}
          />
        )}
      </div>

      {hint && <span className="text-[11px] text-zinc-400 font-normal pl-1">{hint}</span>}
    </div>
  );
};
