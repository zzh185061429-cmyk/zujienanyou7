import React from 'react';
import { motion } from 'motion/react';
import { useGame } from '../../context/GameContext';
import { PopButton } from '../ui/PopButton';
import { X, LogOut, Save, RotateCcw } from 'lucide-react';

export const SystemMenuModal: React.FC = () => {
  const { setSystemMenuOpen, setCurrentScreen, addToast } = useGame();

  const handleReturnToTitle = () => {
    setSystemMenuOpen(false);
    setCurrentScreen('menu');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-8" id="system-modal">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-pop-black/60 backdrop-blur-sm"
        onClick={() => setSystemMenuOpen(false)}
      />

      <motion.div 
        className="relative w-full max-w-2xl bg-pop-white pop-border pop-shadow-solid p-8 clip-slanted"
        initial={{ opacity: 0, y: -100, rotateX: 45 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        exit={{ opacity: 0, y: -100, rotateX: -45 }}
        transition={{ type: "spring", damping: 20 }}
      >
        <div className="absolute inset-0 bg-halftone pointer-events-none" />

        <div className="flex justify-between items-center mb-10 relative z-10 border-b-4 border-pop-black pb-4">
          <h2 className="font-display font-black text-4xl tracking-widest uppercase">
            System Menu
          </h2>
          <button 
            onClick={() => setSystemMenuOpen(false)}
            className="bg-pop-yellow text-pop-black p-2 hover:bg-pop-red hover:text-white transition-colors pop-border pop-shadow"
            id="btn-close-system"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col gap-6 relative z-10">
          <PopButton 
            size="lg" 
            className="w-full justify-start"
            onClick={() => addToast('存档已保存。（演示）', 'success')}
            id="btn-sys-save"
          >
            <Save className="w-6 h-6 mr-4" /> 记录保存 (SAVE)
          </PopButton>
          
          <PopButton 
            size="lg" 
            variant="secondary" 
            className="w-full justify-start"
            onClick={() => addToast('已重置对话历史。（演示）', 'info')}
            id="btn-sys-reset"
          >
            <RotateCcw className="w-6 h-6 mr-4" /> 重置状态 (RESET)
          </PopButton>

          <PopButton 
            size="lg" 
            variant="danger" 
            className="w-full justify-start mt-8"
            onClick={handleReturnToTitle}
            id="btn-sys-title"
          >
            <LogOut className="w-6 h-6 mr-4" /> 返回标题 (TITLE)
          </PopButton>
        </div>
      </motion.div>
    </div>
  );
};
