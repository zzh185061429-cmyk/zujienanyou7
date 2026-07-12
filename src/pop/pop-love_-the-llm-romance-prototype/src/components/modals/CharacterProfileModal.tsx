import React from 'react';
import { motion } from 'motion/react';
import { useGame } from '../../context/GameContext';
import { X, Heart, Brain, Flame, Users, TrendingUp } from 'lucide-react';

export const CharacterProfileModal: React.FC = () => {
  const { currentCharacter, setProfileOpen } = useGame();

  const StatBar = ({ label, value, icon, colorClass }: { label: string, value: number, icon: React.ReactNode, colorClass: string }) => (
    <div className="flex flex-col gap-2 mb-6">
      <div className="flex justify-between items-center font-sans font-bold">
        <span className="flex items-center gap-2">
          {icon}
          {label}
        </span>
        <span className="font-display text-xl">{value}/100</span>
      </div>
      <div className="h-6 w-full bg-pop-black pop-border overflow-hidden relative skew-x-[-10deg]">
        <motion.div 
          className={`h-full ${colorClass}`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
          <div className="w-full h-full bg-stripes opacity-30" />
        </motion.div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-8" id="character-modal">
      {/* Dark overlay with noise */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-pop-black/60 backdrop-blur-sm"
        onClick={() => setProfileOpen(false)}
      />

      <motion.div 
        className="relative w-full max-w-5xl h-[80vh] bg-pop-yellow pop-border pop-shadow-solid flex flex-col md:flex-row overflow-hidden clip-slanted"
        initial={{ opacity: 0, scale: 0.9, rotate: -2, y: 50 }}
        animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, rotate: 2, y: 50 }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
      >
        <div className="absolute inset-0 bg-halftone pointer-events-none" />

        {/* Close Button */}
        <button 
          onClick={() => setProfileOpen(false)}
          className="absolute top-6 right-6 z-20 bg-pop-black text-pop-white p-2 hover:bg-pop-red transition-colors pop-shadow"
          id="btn-close-profile"
        >
          <X className="w-8 h-8" />
        </button>

        {/* Left Side: Visual / Title */}
        <div className="w-full md:w-2/5 bg-pop-red text-pop-white p-8 flex flex-col justify-end relative overflow-hidden clip-slanted-reverse z-10">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <h2 className="font-display text-8xl font-black rotate-90 origin-top-right">PROFILE</h2>
          </div>
          
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="font-display font-bold tracking-widest mb-2 opacity-80 uppercase">
              {currentCharacter.title}
            </div>
            <h2 className="font-sans font-black text-5xl mb-6">
              {currentCharacter.name}
            </h2>
            <div className="bg-pop-black p-4 pop-border text-sm font-bold font-sans">
              {currentCharacter.quote}
            </div>
          </motion.div>
        </div>

        {/* Right Side: Stats */}
        <div className="w-full md:w-3/5 bg-pop-white p-8 md:p-12 overflow-y-auto relative z-10">
          <h3 className="font-display font-black text-4xl mb-8 flex items-center gap-4 text-pop-black">
            <TrendingUp className="w-10 h-10" />
            STATUS
          </h3>

          <div className="space-y-2">
            <StatBar 
              label="羁绊等级 (Affection)" 
              value={currentCharacter.stats.affection} 
              icon={<Heart className="w-6 h-6 text-pop-pink" />}
              colorClass="bg-pop-pink"
            />
            <StatBar 
              label="智力 (Intellect)" 
              value={currentCharacter.stats.intellect} 
              icon={<Brain className="w-6 h-6 text-blue-500" />}
              colorClass="bg-blue-500"
            />
            <StatBar 
              label="魅力 (Charm)" 
              value={currentCharacter.stats.charm} 
              icon={<Heart className="w-6 h-6 text-pop-red" />}
              colorClass="bg-pop-red"
            />
            <StatBar 
              label="勇气 (Guts)" 
              value={currentCharacter.stats.guts} 
              icon={<Flame className="w-6 h-6 text-orange-500" />}
              colorClass="bg-orange-500"
            />
            <StatBar 
              label="包容 (Empathy)" 
              value={currentCharacter.stats.empathy} 
              icon={<Users className="w-6 h-6 text-green-500" />}
              colorClass="bg-green-500"
            />
          </div>
        </div>

      </motion.div>
    </div>
  );
};
