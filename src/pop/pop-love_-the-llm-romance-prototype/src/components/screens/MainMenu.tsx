import React from 'react';
import { motion } from 'motion/react';
import { useGame } from '../../context/GameContext';
import { PopButton } from '../ui/PopButton';
import { Play, FolderOpen, Settings, Images } from 'lucide-react';

export const MainMenu: React.FC = () => {
  const { setCurrentScreen, addToast, setSystemMenuOpen } = useGame();

  return (
    <motion.div 
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-pop-yellow"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      id="main-menu"
    >
      {/* Aesthetic Background Elements */}
      <div className="absolute inset-0 bg-halftone pointer-events-none" />
      <div className="absolute inset-0 bg-noise pointer-events-none" />
      
      {/* Huge Background Text */}
      <motion.div 
        className="absolute -left-10 top-10 text-[20vw] font-display font-black text-pop-black opacity-5 pointer-events-none leading-none -rotate-6"
        animate={{ x: [-20, 20, -20], y: [-10, 10, -10] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >
        LOVE
      </motion.div>
      <motion.div 
        className="absolute -right-20 bottom-10 text-[20vw] font-display font-black text-pop-black opacity-5 pointer-events-none leading-none rotate-12 text-stroke"
        animate={{ x: [20, -20, 20], y: [10, -10, 10] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      >
        WAR
      </motion.div>

      {/* Diagonal Slash Background */}
      <motion.div 
        className="absolute w-[200%] h-64 bg-pop-black -rotate-12 top-1/2 -translate-y-1/2 flex items-center overflow-hidden"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.2, duration: 0.6, ease: "circOut" }}
      >
        {/* Marquee text inside slash */}
        <motion.div 
          className="flex whitespace-nowrap text-pop-yellow font-display font-black text-6xl tracking-widest opacity-20"
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {Array(10).fill("POP LOVE PROTOCOL /// ").join("")}
        </motion.div>
      </motion.div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left: Title Area */}
        <div className="flex flex-col gap-4">
          <motion.div
            initial={{ x: -100, opacity: 0, skewX: 20 }}
            animate={{ x: 0, opacity: 1, skewX: 0 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
            className="bg-pop-white p-8 pop-border pop-shadow clip-slanted inline-block"
          >
            <h2 className="font-display text-pop-red font-black tracking-widest text-xl mb-2">
              LLM INTERACTIVE ROMANCE
            </h2>
            <h1 className="font-sans font-black text-6xl md:text-8xl text-pop-black leading-tight">
              心跳<br />
              <span className="text-stroke text-transparent">协议</span>
              <span className="text-pop-yellow text-stroke-sm ml-2">POP-LOVE</span>
            </h1>
          </motion.div>
        </div>

        {/* Right: Menu Actions */}
        <motion.div 
          className="flex flex-col gap-6 items-start lg:items-end"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.6 } }
          }}
        >
          <motion.div variants={{ hidden: { x: 100, opacity: 0 }, visible: { x: 0, opacity: 1 } }}>
            <PopButton size="lg" onClick={() => setCurrentScreen('game')} id="btn-start-game">
              <Play className="w-8 h-8 fill-current" />
              开始游戏 <span className="text-sm opacity-60 ml-2 font-display">START</span>
            </PopButton>
          </motion.div>

          <motion.div variants={{ hidden: { x: 100, opacity: 0 }, visible: { x: 0, opacity: 1 } }}>
            <PopButton size="lg" variant="secondary" onClick={() => addToast('未检测到存档数据。', 'warning')} id="btn-load-game">
              <FolderOpen className="w-8 h-8" />
              读取存档 <span className="text-sm opacity-60 ml-2 font-display">LOAD</span>
            </PopButton>
          </motion.div>

          <motion.div variants={{ hidden: { x: 100, opacity: 0 }, visible: { x: 0, opacity: 1 } }}>
            <PopButton size="lg" variant="secondary" onClick={() => addToast('画廊功能尚未解锁。', 'info')} id="btn-gallery">
              <Images className="w-8 h-8" />
              附加内容 <span className="text-sm opacity-60 ml-2 font-display">EXTRA</span>
            </PopButton>
          </motion.div>

          <motion.div variants={{ hidden: { x: 100, opacity: 0 }, visible: { x: 0, opacity: 1 } }}>
            <PopButton size="lg" variant="ghost" className="bg-pop-black text-pop-white hover:bg-gray-800" onClick={() => setSystemMenuOpen(true)} id="btn-settings">
              <Settings className="w-8 h-8" />
              系统设置 <span className="text-sm opacity-60 ml-2 font-display">SYSTEM</span>
            </PopButton>
          </motion.div>
        </motion.div>
        
      </div>
    </motion.div>
  );
};
