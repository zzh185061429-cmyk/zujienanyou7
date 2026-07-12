import { ReactNode, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
  id?: string;
}

export function Modal({ isOpen, onClose, title, children, className, id }: ModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" id={id}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0, rotateX: 10 }}
            animate={{ scale: 1, y: 0, opacity: 1, rotateX: 0 }}
            exit={{ scale: 0.95, y: 20, opacity: 0, rotateX: -10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={cn(
              "relative w-full max-w-4xl bg-darker border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]",
              "before:absolute before:top-0 before:left-0 before:w-full before:h-1 before:bg-gradient-to-r before:from-primary before:to-primary-dark before:z-20",
              className
            )}
          >
            {/* Modal Header */}
            <div className="flex-none flex items-center justify-between p-6 border-b border-white/5 bg-darker relative z-10">
              <h2 className="text-2xl font-serif font-black tracking-widest text-light flex items-center gap-3">
                <span className="w-1.5 h-6 bg-primary inline-block transform -skew-x-12" />
                {title}
              </h2>
              <button
                onClick={onClose}
                className="text-white/40 hover:text-primary transition-colors p-2 hover:bg-white/5"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Modal Body - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6 relative">
              {/* Subtle background motif */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-5">
                <div className="w-64 h-64 border-4 border-current transform rotate-45" />
              </div>
              <div className="relative z-10">
                {children}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
