import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react';
import { useNotification } from '../../contexts/NotificationContext';
import { cn } from '../../lib/utils';

export const ToastContainer: React.FC = () => {
  const { notifications, removeNotification } = useNotification();

  const icons = {
    info: <Info className="text-pop-cyan" size={20} />,
    success: <CheckCircle className="text-green-400" size={20} />,
    warning: <AlertTriangle className="text-pop-yellow" size={20} />,
    error: <AlertCircle className="text-red-500" size={20} />,
  };

  const borderColors = {
    info: 'border-pop-cyan',
    success: 'border-green-400',
    warning: 'border-pop-yellow',
    error: 'border-red-500',
  };

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={cn(
              "pointer-events-auto flex items-center gap-3 p-4 min-w-[300px] bg-pop-panel/95 backdrop-blur shadow-lg clip-corner border-l-4",
              borderColors[notification.type]
            )}
          >
            {icons[notification.type]}
            <p className="flex-1 text-sm font-medium text-white">{notification.message}</p>
            <button
              onClick={() => removeNotification(notification.id)}
              className="text-white/50 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
