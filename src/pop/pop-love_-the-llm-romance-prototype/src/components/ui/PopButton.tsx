import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

interface PopButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  children: React.ReactNode;
}

export const PopButton: React.FC<PopButtonProps> = ({ 
  className, 
  variant = 'primary', 
  size = 'md',
  children, 
  ...props 
}) => {
  const baseStyles = "relative inline-flex items-center justify-center font-bold font-display uppercase tracking-wider transition-all duration-200 overflow-hidden";
  
  const variants = {
    primary: "bg-pop-yellow text-pop-black pop-border pop-shadow hover:bg-white",
    secondary: "bg-pop-white text-pop-black pop-border pop-shadow hover:bg-gray-100",
    danger: "bg-pop-red text-pop-white pop-border pop-shadow hover:bg-rose-600",
    ghost: "bg-transparent text-pop-black hover:bg-black/5 hover:-translate-y-1"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-8 py-3 text-lg clip-tag",
    lg: "px-12 py-4 text-2xl clip-tag",
    icon: "p-3 rounded-full pop-border pop-shadow hover:bg-white bg-pop-yellow"
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {/* Dynamic diagonal shine effect */}
      <div className="absolute inset-0 -translate-x-full hover:animate-[shimmer_0.5s_forwards] bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
};
