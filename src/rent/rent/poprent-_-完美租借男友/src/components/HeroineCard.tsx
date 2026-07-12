import { motion } from 'motion/react';
import { Heroine } from '../types';
import { Heart, Lock, TrendingUp, Wallet } from 'lucide-react';

interface Props {
  heroine: Heroine;
  onClick: (heroine: Heroine) => void;
}

export default function HeroineCard({ heroine, onClick }: Props) {
  return (
    <motion.button
      id={`heroine-card-${heroine.id}`}
      whileHover={heroine.isUnlocked ? { y: -8, rotate: -2 } : {}}
      whileTap={heroine.isUnlocked ? { scale: 0.95 } : {}}
      onClick={() => heroine.isUnlocked && onClick(heroine)}
      className={`
        relative w-full text-left bg-white pop-border pop-shadow group overflow-hidden
        ${!heroine.isUnlocked ? 'opacity-70 grayscale' : 'cursor-pointer'}
      `}
      style={{
        height: '320px',
      }}
    >
      {/* 背景波点/颜色 */}
      <div className={`absolute inset-0 opacity-20 bg-halftone`} />
      <div className={`absolute -right-16 -top-16 w-48 h-48 rounded-full blur-3xl opacity-30 ${heroine.themeColor}`} />
      
      {/* 状态角标 */}
      {!heroine.isUnlocked && (
        <div className="absolute top-4 right-4 bg-gray-900 text-white p-2 rounded-full z-10 pop-border">
          <Lock className="w-5 h-5" />
        </div>
      )}

      <div className="relative z-10 h-full flex flex-col p-5">
        <div className="flex-1">
          <h2 className="font-display text-4xl font-bold uppercase tracking-wide text-gray-900 mb-1">
            {heroine.name}
          </h2>
          <div className={`inline-block px-2 py-1 text-xs font-bold text-white uppercase pop-border ${heroine.themeColor}`}>
            {heroine.title}
          </div>
          
          <p className="mt-4 text-sm font-medium text-gray-600 line-clamp-2">
            {heroine.quote}
          </p>
        </div>

        <div className="mt-auto space-y-3">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {heroine.tags.map(tag => (
              <span key={tag} className="text-[10px] font-bold px-2 py-1 bg-gray-100 pop-border uppercase">
                #{tag}
              </span>
            ))}
          </div>

          {/* Stats Bar */}
          <div className="flex items-center justify-between pt-3 border-t-2 border-black">
            <div className="flex items-center gap-1.5 text-gray-900">
              <Heart className={`w-4 h-4 ${heroine.accentColor}`} fill="currentColor" />
              <span className="font-bold font-display text-lg leading-none">{heroine.stats.affection}</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-900">
              <Wallet className="w-4 h-4 text-gray-900" />
              <span className="font-bold font-display text-lg leading-none">¥{heroine.stats.hourlyRate.toLocaleString()}/h</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* 悬停时的特殊装饰 (Pop Art Style) */}
      <div className="absolute -bottom-10 -right-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="relative">
          <svg width="120" height="120" viewBox="0 0 100 100" className="animate-[spin_10s_linear_infinite]">
            <path d="M50 0 L55 45 L100 50 L55 55 L50 100 L45 55 L0 50 L45 45 Z" fill={heroine.themeColor.replace('bg-[', '').replace(']', '')} stroke="black" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </motion.button>
  );
}
