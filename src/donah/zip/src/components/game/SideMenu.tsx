import React from 'react';
import { motion } from 'framer-motion';
import { User, Smartphone, Settings, Gift, Map } from 'lucide-react';
import { Button } from '../ui/Button';
import { ModalType } from '../../types';

interface SideMenuProps {
  onOpenModal: (type: ModalType) => void;
}

export const SideMenu: React.FC<SideMenuProps> = ({ onOpenModal }) => {
  const menuItems = [
    { id: 'profile', icon: <User size={24} />, label: '档案', type: 'profile' as ModalType, color: 'hover:text-pop-cyan hover:border-pop-cyan' },
    { id: 'phone', icon: <Smartphone size={24} />, label: '终端', type: 'phone' as ModalType, color: 'hover:text-pop-pink hover:border-pop-pink' },
    { id: 'map', icon: <Map size={24} />, label: '地图', type: 'none' as ModalType, color: 'hover:text-pop-yellow hover:border-pop-yellow' },
    { id: 'inventory', icon: <Gift size={24} />, label: '物品', type: 'inventory' as ModalType, color: 'hover:text-pop-cyan hover:border-pop-cyan' },
    { id: 'settings', icon: <Settings size={24} />, label: '系统', type: 'settings' as ModalType, color: 'hover:text-white hover:border-white' },
  ];

  return (
    <motion.div 
      initial={{ x: 100 }}
      animate={{ x: 0 }}
      className="absolute right-6 top-1/2 -translate-y-1/2 z-20 pointer-events-none flex flex-col gap-4"
    >
      {menuItems.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="pointer-events-auto relative group"
        >
          {/* Label tooltip */}
          <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1 bg-pop-panel border border-white/10 clip-corner opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-sm font-bold tracking-widest">
            {item.label}
          </div>
          
          <button
            onClick={() => onOpenModal(item.type)}
            className={`w-14 h-14 bg-pop-panel/80 backdrop-blur flex items-center justify-center text-white/50 border border-white/10 clip-corner transition-all duration-300 ${item.color} hover:bg-pop-dark hover:scale-110 hover:shadow-[0_0_20px_currentColor]`}
          >
            {item.icon}
          </button>
        </motion.div>
      ))}
    </motion.div>
  );
};
