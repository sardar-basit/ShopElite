import { forwardRef } from 'react';

const Input = forwardRef(({ label, error, className = '', ...props }, ref) => {
  return (
    <div className="w-full flex flex-col gap-2">
      {label && (
        <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8B6B4A]">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`w-full border-b border-[#e8e1d5] bg-transparent px-0 py-3 text-sm text-[#3E2C23] transition-all focus:outline-none focus:border-[#D4A373] placeholder:text-[#3E2C23]/20 ${
          error ? 'border-red-500 focus:border-red-500' : ''
        } ${className}`}
        {...props}
      />
      {error && <span className="text-[10px] text-red-500 font-bold uppercase tracking-wider">{error}</span>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
