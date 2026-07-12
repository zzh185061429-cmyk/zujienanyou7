import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ToastMessage } from '../../types';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';

interface ToastContextType {
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((toast: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed top-4 right-4 md:top-auto md:bottom-4 md:right-4 z-[100] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              className="pointer-events-auto flex items-start gap-3 bg-darker border-l-4 border-primary p-4 shadow-2xl min-w-[300px] max-w-sm text-light relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent pointer-events-none" />
              {toast.type === 'error' && <XCircle className="w-5 h-5 text-primary mt-0.5 relative z-10" />}
              {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 relative z-10" />}
              {toast.type === 'warning' && <AlertCircle className="w-5 h-5 text-gold mt-0.5 relative z-10" />}
              {(!toast.type || toast.type === 'info') && <Info className="w-5 h-5 text-light mt-0.5 relative z-10" />}
              
              <div className="flex-1 relative z-10">
                <h4 className="font-serif font-bold text-lg">{toast.title}</h4>
                {toast.description && <p className="text-sm opacity-80 mt-1 font-sans">{toast.description}</p>}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};
