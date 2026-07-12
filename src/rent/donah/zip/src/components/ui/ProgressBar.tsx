import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number;
  max?: number;
  label: string;
  color?: 'pink' | 'cyan' | 'yellow';
  className?: string;
  showValue?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  color = 'pink',
  className,
  showValue = true,
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const colors = {
    pink: 'bg-pop-pink shadow-[0_0_10px_rgba(255,0,127,0.5)]',
    cyan: 'bg-pop-cyan shadow-[0_0_10px_rgba(0,240,255,0.5)]',
    yellow: 'bg-pop-yellow shadow-[0_0_10px_rgba(255,230,0,0.5)]',
  };

  const textColors = {
    pink: 'text-pop-pink',
    cyan: 'text-pop-cyan',
    yellow: 'text-pop-yellow',
  };

  return (
    <div className={cn("w-full flex flex-col gap-1", className)}>
      <div className="flex justify-between items-end">
        <span className="text-xs font-bold uppercase tracking-widest text-white/80 font-display">
          {label}
        </span>
        {showValue && (
          <span className={cn("text-xs font-black font-display", textColors[color])}>
            {value}/{max}
          </span>
        )}
      </div>
      <div className="h-3 w-full bg-pop-dark border border-white/10 p-[2px] clip-corner relative">
        <div className="absolute inset-0 bg-stripes opacity-30 pointer-events-none" />
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={cn("h-full clip-corner relative overflow-hidden", colors[color])}
        >
          <div className="absolute inset-0 bg-white/20 w-[200%] -left-[100%] animate-[slide_2s_linear_infinite] transform skew-x-12" />
        </motion.div>
      </div>
    </div>
  );
};
