import React from 'react';
import { Character } from '../../types';
import { ProgressBar } from '../ui/ProgressBar';
import { motion } from 'framer-motion';
import { Heart, Zap, Sparkles } from 'lucide-react';

interface HeaderProps {
  character: Character;
}

export const Header: React.FC<HeaderProps> = ({ character }) => {
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="absolute top-0 left-0 w-full p-6 flex justify-between items-start z-20 pointer-events-none"
    >
      {/* Left side: Character Info */}
      <div className="flex flex-col gap-2 max-w-sm w-full pointer-events-auto">
        <div className="bg-pop-panel/80 backdrop-blur-md border border-pop-panel-border p-4 clip-corner flex items-center gap-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-stripes opacity-20 pointer-events-none" />
          <div className="relative z-10 flex-1">
            <h1 className="text-3xl font-display font-black tracking-widest text-white text-glow-pink uppercase">
              {character.name}
            </h1>
            <p className="text-pop-cyan text-xs font-bold uppercase tracking-[0.2em] mb-3">
              {character.title}
            </p>
            
            <div className="flex flex-col gap-3 mt-2">
              <div className="flex items-center gap-2">
                <Heart className="text-pop-pink" size={16} />
                <ProgressBar value={character.affection} max={100} label="好感度 (Affection)" color="pink" />
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="text-pop-cyan" size={16} />
                <ProgressBar value={character.mood} max={100} label="心情 (Mood)" color="cyan" />
              </div>
              <div className="flex items-center gap-2">
                <Zap className="text-pop-yellow" size={16} />
                <ProgressBar value={character.energy} max={100} label="精力 (Energy)" color="yellow" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side: System Info / Clock */}
      <div className="flex flex-col items-end pointer-events-auto">
        <div className="bg-pop-pink text-white px-4 py-2 font-display font-black text-xl tracking-widest clip-corner shadow-[0_0_15px_rgba(255,0,127,0.5)]">
          DAY 14
        </div>
        <div className="bg-pop-dark/80 backdrop-blur border border-white/10 px-4 py-1 mt-2 font-mono text-pop-cyan text-sm clip-corner">
          14:30 PM
        </div>
      </div>
    </motion.header>
  );
};
