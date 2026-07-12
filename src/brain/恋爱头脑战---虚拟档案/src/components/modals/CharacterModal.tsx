import { Modal } from '../ui/Modal';
import { motion } from 'motion/react';
import { Heart, Brain, Star, Coins } from 'lucide-react';
import { Character } from '../../types';

interface CharacterModalProps {
  isOpen: boolean;
  onClose: () => void;
  character?: Character;
}

export function CharacterModal({ isOpen, onClose, character }: CharacterModalProps) {
  // Mock data if none provided
  const target = character || {
    id: '1',
    name: '四宫辉夜',
    title: '秀知院学园学生会副会长',
    avatar: '',
    affection: 45,
    intelligence: 98,
    charm: 92,
    wealth: 100,
    status: '高度警惕状态'
  };

  const StatBar = ({ label, value, icon: Icon, colorClass }: { label: string, value: number, icon: any, colorClass: string }) => (
    <div className="mb-6 group">
      <div className="flex justify-between items-end mb-2">
        <span className="text-sm text-white/60 font-serif flex items-center gap-2">
          <Icon className="w-4 h-4" />
          {label}
        </span>
        <span className="font-mono text-xl text-light group-hover:text-primary transition-colors">{value}%</span>
      </div>
      <div className="w-full h-2 bg-white/10 overflow-hidden relative">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className={`h-full ${colorClass} relative`}
        >
          <div className="absolute inset-0 bg-white/20 transform -skew-x-12 animate-[shine_2s_infinite]" />
        </motion.div>
      </div>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="目标情报档案">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Left Column: Portrait & Basics */}
        <div className="w-full md:w-1/3 flex flex-col items-center">
          <div className="w-48 h-64 border-2 border-primary/50 relative overflow-hidden mb-4 group cursor-pointer">
             <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
             {/* Abstract Avatar Placeholder */}
             <div className="w-full h-full bg-dark flex items-center justify-center relative">
               <div className="absolute inset-0 halftone-bg opacity-30" />
               <UserPlaceholder />
             </div>
             <div className="absolute bottom-2 left-2 z-20 font-serif text-sm tracking-widest text-primary group-hover:scale-110 transition-transform">
               CLASSIFIED
             </div>
          </div>
          
          <h3 className="text-3xl font-serif font-black text-light tracking-widest mb-1">{target.name}</h3>
          <p className="text-sm text-white/50 font-sans tracking-widest text-center mb-4">{target.title}</p>
          
          <div className="w-full py-2 px-4 border border-white/10 bg-white/5 text-center">
            <div className="text-xs text-white/40 mb-1">当前状态</div>
            <div className="text-primary font-bold tracking-widest">{target.status}</div>
          </div>
        </div>

        {/* Right Column: Stats */}
        <div className="w-full md:w-2/3 flex flex-col justify-center">
          <div className="bg-black/50 p-6 border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-primary/30" />
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-primary/30" />
            
            <h4 className="text-lg font-serif tracking-widest text-white/80 border-b border-white/10 pb-2 mb-6 flex items-center">
              <span className="w-2 h-2 bg-primary inline-block mr-2" />
              数值分析面板
            </h4>
            
            <StatBar label="好感度 (Affection)" value={target.affection} icon={Heart} colorClass="bg-red-500" />
            <StatBar label="智力 (Intelligence)" value={target.intelligence} icon={Brain} colorClass="bg-blue-500" />
            <StatBar label="魅力 (Charm)" value={target.charm} icon={Star} colorClass="bg-purple-500" />
            <StatBar label="财力 (Wealth)" value={target.wealth} icon={Coins} colorClass="bg-yellow-500" />
          </div>
          
          <div className="mt-6 flex gap-4">
             <button className="flex-1 py-3 border border-primary/50 text-primary hover:bg-primary hover:text-white transition-colors font-serif tracking-widest text-sm relative overflow-hidden group">
               <span className="relative z-10">查看详细分析</span>
               <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full opacity-0 group-hover:animate-[shine_0.5s_ease-in-out]" />
             </button>
          </div>
        </div>

      </div>
    </Modal>
  );
}

function UserPlaceholder() {
  return (
    <svg viewBox="0 0 100 100" className="w-24 h-24 text-white/10" fill="currentColor">
      <path d="M50 50C61.0457 50 70 41.0457 70 30C70 18.9543 61.0457 10 50 10C38.9543 10 30 18.9543 30 30C30 41.0457 38.9543 50 50 50Z" />
      <path d="M18.8953 82.2045C22.6587 72.0435 34.0531 63 50 63C65.9469 63 77.3413 72.0435 81.1047 82.2045C83.2173 87.9103 78.9667 93 72.8427 93H27.1573C21.0333 93 16.7827 87.9103 18.8953 82.2045Z" />
    </svg>
  );
}
