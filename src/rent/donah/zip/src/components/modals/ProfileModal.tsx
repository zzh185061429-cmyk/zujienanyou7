import React from 'react';
import { User, Activity, Star } from 'lucide-react';
import { Character } from '../../types';
import { ProgressBar } from '../ui/ProgressBar';

interface ProfileModalProps {
  character: Character;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ character }) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 text-white h-full">
      {/* Left Col: Visual/Basic Info */}
      <div className="w-full md:w-1/3 flex flex-col gap-4">
        <div className="aspect-[3/4] bg-pop-dark border-2 border-pop-cyan clip-corner relative group overflow-hidden">
          <div className="absolute inset-0 bg-halftone opacity-50" />
          <div className="absolute inset-0 flex items-center justify-center">
             <User size={64} className="text-pop-cyan/20 group-hover:text-pop-cyan/50 transition-colors" />
          </div>
          <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-pop-dark to-transparent">
             <h3 className="font-display font-black text-2xl tracking-widest text-pop-cyan">{character.name}</h3>
             <p className="text-sm text-white/70">{character.title}</p>
          </div>
        </div>
        
        <div className="bg-pop-dark p-4 clip-corner border border-white/10">
           <div className="flex justify-between items-center mb-2">
             <span className="text-white/50 text-xs">AGE</span>
             <span className="font-mono text-pop-yellow">{character.age}</span>
           </div>
           <div className="flex justify-between items-center mb-2">
             <span className="text-white/50 text-xs">STATUS</span>
             <span className="font-mono text-pop-pink">ACTIVE</span>
           </div>
        </div>
      </div>

      {/* Right Col: Stats & Details */}
      <div className="w-full md:w-2/3 flex flex-col gap-6">
        <div className="bg-pop-dark/50 p-6 clip-corner border border-white/5 relative">
          <h4 className="font-display font-black text-pop-pink mb-4 flex items-center gap-2 tracking-widest">
            <Activity size={18} />
            PARAMETERS
          </h4>
          <div className="flex flex-col gap-4">
            <ProgressBar value={character.affection} max={100} label="好感度 (Affection)" color="pink" />
            <ProgressBar value={character.mood} max={100} label="心情 (Mood)" color="cyan" />
            <ProgressBar value={character.energy} max={100} label="精力 (Energy)" color="yellow" />
          </div>
        </div>

        <div className="flex-1 bg-pop-dark/50 p-6 clip-corner border border-white/5 relative flex flex-col">
          <h4 className="font-display font-black text-pop-cyan mb-4 flex items-center gap-2 tracking-widest">
            <Star size={18} />
            DATABASE ENTRY
          </h4>
          <p className="text-sm text-white/80 leading-relaxed flex-1 font-sans">
            {character.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {character.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-pop-panel border border-pop-yellow/30 text-pop-yellow text-xs font-mono clip-corner">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
