import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
  headerIcon?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className,
  headerIcon
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-pop-dark/80 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={cn(
              "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50",
              "w-full max-w-2xl max-h-[85vh] flex flex-col",
              "bg-pop-panel border-2 border-pop-pink clip-corner overflow-hidden shadow-2xl shadow-pop-pink/20",
              className
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-pop-pink text-white relative">
              <div className="absolute inset-0 bg-stripes-pink opacity-20" />
              <div className="flex items-center gap-2 relative z-10">
                {headerIcon}
                <h2 className="font-display font-black text-xl tracking-widest uppercase text-white drop-shadow-md">
                  {title}
                </h2>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onClose}
                className="relative z-10 hover:bg-white/20 text-white"
              >
                <X size={20} />
              </Button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto custom-scrollbar flex-1 relative">
              <div className="absolute inset-0 bg-halftone pointer-events-none" />
              <div className="relative z-10">
                {children}
              </div>
            </div>
            
            {/* Decorative bottom bar */}
            <div className="h-2 bg-pop-pink w-full" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
