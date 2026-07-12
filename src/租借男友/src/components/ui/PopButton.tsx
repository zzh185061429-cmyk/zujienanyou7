import React from "react";
import { cn } from "../../utils";
import { motion, HTMLMotionProps } from "motion/react";

interface PopButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const PopButton = React.forwardRef<HTMLButtonElement, PopButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    
    const baseStyles = "relative inline-flex items-center justify-center font-bold uppercase transition-all duration-100 pop-border clip-diagonal active:translate-x-[4px] active:translate-y-[4px] active:shadow-none focus:outline-none";
    
    const variants = {
      primary: "bg-pop-pink text-white hover:brightness-110 shadow-pop",
      secondary: "bg-pop-cyan text-pop-black hover:brightness-110 shadow-pop",
      danger: "bg-stripes text-white text-stroke-sm shadow-pop",
      ghost: "bg-white text-pop-black shadow-pop hover:bg-gray-100"
    };
    
    const sizes = {
      sm: "px-3 py-1 text-sm",
      md: "px-6 py-2 text-base",
      lg: "px-8 py-4 text-xl"
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.98 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

PopButton.displayName = "PopButton";
