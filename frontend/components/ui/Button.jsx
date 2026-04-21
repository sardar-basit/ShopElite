import { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

const Button = forwardRef(({ children, loading, variant = 'primary', className = '', ...props }, ref) => {
  const base = 'w-full font-semibold rounded-xl px-4 py-2.5 transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-blue-800 text-white hover:bg-blue-900',
    accent: 'bg-orange-500 text-white hover:bg-orange-600',
    outline: 'border-2 border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  };

  return (
    <button ref={ref} className={`${base} ${variants[variant]} ${className}`} disabled={loading || props.disabled} {...props}>
      {loading && <Loader2 size={16} className="animate-spin" />}
      {children}
    </button>
  );
});

Button.displayName = 'Button';
export default Button;
