import React from 'react';
import { cn } from '../../lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'icon';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    
    const baseStyles = "relative inline-flex items-center justify-center font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-pop-dark uppercase tracking-wider clip-corner";
    
    const variants = {
      primary: "bg-pop-pink text-white hover:bg-pop-pink-dark focus:ring-pop-pink",
      secondary: "bg-pop-cyan text-pop-dark hover:bg-[#00c0cc] focus:ring-pop-cyan",
      danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
      ghost: "bg-transparent text-white hover:bg-white/10 clip-none rounded-md",
      icon: "bg-pop-panel text-white hover:bg-pop-pink/20 hover:text-pop-pink border border-pop-panel-border clip-corner",
    };
    
    const sizes = {
      sm: "text-xs px-3 py-1.5",
      md: "text-sm px-6 py-2.5",
      lg: "text-base px-8 py-4",
      icon: "p-2",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {/* Subtle decorative accent */}
        {variant !== 'ghost' && variant !== 'icon' && (
          <span className="absolute left-0 top-0 w-1 h-full bg-white/30" />
        )}
        {children}
      </motion.button>
    );
  }
);
Button.displayName = 'Button';
