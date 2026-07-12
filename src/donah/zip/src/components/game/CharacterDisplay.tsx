import React from 'react';
import { motion } from 'framer-motion';

export const CharacterDisplay: React.FC = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-10">
      {/* Background ambient glow */}
      <div className="absolute w-[60vw] h-[60vw] rounded-full bg-pop-pink/10 blur-[100px] animate-pulse" />
      <div className="absolute w-[40vw] h-[40vw] rounded-full bg-pop-cyan/10 blur-[80px] mix-blend-screen" />
      
      {/* Character Silhouette / Placeholder */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative w-full h-full flex items-end justify-center pb-[10vh]"
      >
        {/* Abstract shapes behind character */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vh] h-[80vh] border border-pop-pink/20 rounded-full border-dashed pointer-events-none"
        />
        
        {/* Main Character Placeholder (using CSS shapes since no asset) */}
        <div className="relative w-[40vh] h-[75vh] flex flex-col items-center pointer-events-auto cursor-pointer group">
          {/* Head */}
          <div className="w-[18vh] h-[18vh] bg-pop-panel border-2 border-pop-cyan rounded-full shadow-[0_0_30px_rgba(0,240,255,0.2)] mb-[-2vh] z-20 relative overflow-hidden group-hover:border-pop-pink transition-colors duration-500">
             <div className="absolute inset-0 bg-halftone opacity-50" />
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display font-black text-4xl text-white/10 select-none">RIN</div>
          </div>
          {/* Body */}
          <div className="w-[25vh] flex-1 bg-pop-panel border-x-2 border-t-2 border-pop-cyan rounded-t-[40px] shadow-[0_0_40px_rgba(0,240,255,0.1)] relative overflow-hidden group-hover:border-pop-pink transition-colors duration-500">
             <div className="absolute inset-0 bg-stripes opacity-20" />
             {/* Tech lines */}
             <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[2px] h-[40%] bg-pop-cyan/30" />
             <div className="absolute top-1/2 left-0 w-full h-[2px] bg-pop-cyan/30" />
             <div className="absolute bottom-10 left-1/2 -translate-x-1/2 font-display font-black text-8xl text-white/5 rotate-90 select-none">01</div>
          </div>
          
          {/* Hover reaction text */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute top-[20%] right-[-40%] bg-pop-pink text-white px-4 py-2 font-bold text-sm clip-corner pointer-events-none"
          >
            "你在看哪里呢？"
          </motion.div>
        </div>
      </motion.div>
      
      {/* Scanline overlay */}
      <div className="absolute inset-0 scanlines" />
    </div>
  );
};
