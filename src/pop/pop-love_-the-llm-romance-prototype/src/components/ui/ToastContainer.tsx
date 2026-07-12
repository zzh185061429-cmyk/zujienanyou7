import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';
import { useGame } from '../../context/GameContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useGame();

  const icons = {
    info: <Info className="w-6 h-6" />,
    success: <CheckCircle2 className="w-6 h-6" />,
    warning: <AlertTriangle className="w-6 h-6 text-pop-black" />,
    error: <AlertCircle className="w-6 h-6" />
  };

  const bgColors = {
    info: 'bg-pop-white text-pop-black',
    success: 'bg-green-400 text-pop-black',
    warning: 'bg-pop-yellow text-pop-black',
    error: 'bg-pop-red text-pop-white'
  };

  return (
    <div className="fixed top-6 right-6 z-[100] flex flex-col gap-4 w-[380px] max-w-[90vw] pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 100, scale: 0.9, skewX: -10 }}
            animate={{ opacity: 1, x: 0, scale: 1, skewX: 0 }}
            exit={{ opacity: 0, x: 100, scale: 0.9, transition: { duration: 0.2 } }}
            className={`pointer-events-auto flex items-start gap-4 p-4 pop-border pop-shadow ${bgColors[toast.type]} clip-slanted relative overflow-hidden`}
            id={`toast-${toast.id}`}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 bg-halftone opacity-10 pointer-events-none mix-blend-overlay" />
            
            <div className="shrink-0 relative z-10 mt-1">
              {icons[toast.type]}
            </div>
            
            <div className="flex-1 relative z-10 pt-1">
              <h4 className="font-display font-bold uppercase tracking-widest text-xs opacity-70 mb-1">
                SYSTEM NOTIFICATION
              </h4>
              <p className="font-sans font-bold leading-tight">
                {toast.message}
              </p>
            </div>

            <button 
              onClick={() => removeToast(toast.id)}
              className="relative z-10 shrink-0 p-1 hover:bg-black/10 rounded transition-colors"
              aria-label="Close notification"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
