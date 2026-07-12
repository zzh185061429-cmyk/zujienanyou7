import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyle = "relative overflow-hidden font-serif font-bold inline-flex items-center justify-center transition-all duration-300 active:scale-95 group";
    
    const variants = {
      primary: "bg-primary text-white hover:bg-primary-dark border border-primary",
      secondary: "bg-light text-darker hover:bg-gray-200 border border-light",
      outline: "bg-transparent text-light border border-white/20 hover:bg-white/5 hover:border-primary/50",
      ghost: "bg-transparent text-light/70 hover:text-primary hover:bg-white/5",
      danger: "bg-transparent text-primary border border-primary/50 hover:bg-primary hover:text-white"
    };
    
    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-6 py-2.5 text-base shadow-[4px_4px_0px_rgba(220,38,38,0.4)] hover:shadow-[2px_2px_0px_rgba(220,38,38,0.4)] hover:translate-x-[2px] hover:translate-y-[2px]",
      lg: "px-8 py-4 text-xl shadow-[6px_6px_0px_rgba(220,38,38,0.5)] hover:shadow-[3px_3px_0px_rgba(220,38,38,0.5)] hover:translate-x-[3px] hover:translate-y-[3px]",
      icon: "p-2 rounded-none",
    };

    // Remove box shadow transformation for ghost and icon to keep them clean
    const sizeStyle = (variant === 'ghost' || size === 'icon') 
      ? sizes[size].split('shadow')[0] // hacky strip of shadow
      : sizes[size];

    return (
      <button
        ref={ref}
        className={cn(baseStyle, variants[variant], sizeStyle, className)}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
        {variant !== 'ghost' && (
           <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full opacity-0 group-hover:animate-shine pointer-events-none" />
        )}
      </button>
    );
  }
);
Button.displayName = 'Button';
