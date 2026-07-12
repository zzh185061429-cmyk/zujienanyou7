import { useState, createContext, useContext, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NotificationMsg } from '../types';
import { AlertCircle, CheckCircle2, Info, XCircle } from 'lucide-react';

interface NotificationContextType {
  notify: (msg: Omit<NotificationMsg, 'id'>) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<NotificationMsg[]>([]);

  const notify = (msg: Omit<NotificationMsg, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications((prev) => [...prev, { ...msg, id }]);
    
    // 自动移除
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 4000);
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <div 
        id="notification-container"
        className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-3 w-full max-w-sm px-4 pointer-events-none"
      >
        <AnimatePresence>
          {notifications.map((note) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className={`
                pointer-events-auto flex items-start gap-3 p-4 w-full bg-white pop-border pop-shadow-sm
                ${note.type === 'error' ? 'border-[#FF007F]' : ''}
                ${note.type === 'warning' ? 'border-[#FFD600]' : ''}
                ${note.type === 'success' ? 'border-[#00E5FF]' : ''}
              `}
            >
              <div className="shrink-0 mt-0.5">
                {note.type === 'info' && <Info className="w-5 h-5 text-gray-900" />}
                {note.type === 'success' && <CheckCircle2 className="w-5 h-5 text-[#00E5FF]" />}
                {note.type === 'warning' && <AlertCircle className="w-5 h-5 text-[#FFD600]" />}
                {note.type === 'error' && <XCircle className="w-5 h-5 text-[#FF007F]" />}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sm uppercase font-display tracking-wider mb-1">{note.title}</h4>
                <p className="text-xs text-gray-700 font-medium">{note.message}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
}

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotification must be used within NotificationProvider');
  return context;
};
