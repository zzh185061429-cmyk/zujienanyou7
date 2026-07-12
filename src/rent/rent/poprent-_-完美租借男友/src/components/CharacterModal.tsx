import { motion, AnimatePresence } from 'motion/react';
import { Heroine } from '../types';
import { X, CalendarHeart, Heart, Briefcase, Star, Info } from 'lucide-react';

interface Props {
  heroine: Heroine;
  isOpen: boolean;
  onClose: () => void;
  onChat: (heroine: Heroine) => void;
}

export default function CharacterModal({ heroine, isOpen, onClose, onChat }: Props) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div id={`modal-${heroine.id}`} className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        {/* 背景遮罩 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* 模态框主体 */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-white pop-border pop-shadow flex flex-col max-h-[90vh] overflow-hidden"
        >
          {/* 关闭按钮 */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 bg-white pop-border pop-shadow-sm rounded-full text-black hover:bg-red-50 transition-colors"
          >
            <X className="w-5 h-5" />
          </motion.button>

          {/* 头部视觉区 */}
          <div className={`relative h-48 ${heroine.themeColor} border-b-4 border-black overflow-hidden flex items-end p-6`}>
            <div className="absolute inset-0 bg-halftone opacity-30 mix-blend-overlay"></div>
            
            {/* 巨大装饰文字 */}
            <div className="absolute -right-4 -bottom-4 text-[120px] font-display font-bold text-black/10 select-none leading-none pointer-events-none">
              #0{heroine.id.replace('h_00', '')}
            </div>

            <div className="relative z-10 w-full text-white">
              <h2 className="text-4xl font-display font-bold uppercase tracking-wider text-stroke">
                {heroine.name}
              </h2>
              <p className="text-lg font-bold mt-1 bg-black text-white inline-block px-2 border-2 border-white">
                {heroine.title}
              </p>
            </div>
          </div>

          {/* 内容区 */}
          <div className="flex-1 overflow-y-auto p-6 no-scrollbar bg-[#fdfdfd]">
            
            {/* 数据统计板 (波普风格网格) */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-[#FFD600] p-4 pop-border pop-shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <Heart className="w-5 h-5 text-black" fill="black" />
                  <span className="font-bold text-sm uppercase">当前好感</span>
                </div>
                <div className="text-3xl font-display font-bold">{heroine.stats.affection} <span className="text-sm">/ 100</span></div>
              </div>
              <div className="bg-[#00E5FF] p-4 pop-border pop-shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <Briefcase className="w-5 h-5 text-black" />
                  <span className="font-bold text-sm uppercase">时薪预算</span>
                </div>
                <div className="text-2xl font-display font-bold">¥{(heroine.stats.hourlyRate / 1000).toFixed(1)}k <span className="text-sm">/ h</span></div>
              </div>
            </div>

            {/* 个人档案 */}
            <div className="space-y-6">
              <div>
                <h3 className="flex items-center gap-2 font-display text-xl font-bold border-b-4 border-black pb-2 mb-3 uppercase">
                  <Info className="w-6 h-6" /> 档案资料
                </h3>
                <div className="space-y-2 text-sm font-medium">
                  <div className="flex justify-between py-2 border-b-2 border-black/10">
                    <span className="text-gray-500 font-bold">年龄</span>
                    <span className="text-black">{heroine.age} 岁</span>
                  </div>
                  <div className="flex justify-between py-2 border-b-2 border-black/10">
                    <span className="text-gray-500 font-bold">职业</span>
                    <span className="text-black">{heroine.job}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b-2 border-black/10">
                    <span className="text-gray-500 font-bold">压力值</span>
                    <div className="w-32 bg-gray-200 border-2 border-black h-5 overflow-hidden">
                      <div 
                        className={`h-full border-r-2 border-black ${heroine.stats.stress > 80 ? 'bg-[#FF007F]' : 'bg-[#FFD600]'}`} 
                        style={{ width: `${Math.min(heroine.stats.stress, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="flex items-center gap-2 font-display text-xl font-bold border-b-4 border-black pb-2 mb-3 uppercase">
                  <Star className="w-6 h-6" /> 客户备注
                </h3>
                <p className="text-sm font-medium leading-relaxed bg-gray-100 p-4 pop-border">
                  {heroine.description}
                </p>
              </div>
            </div>
          </div>

          {/* 底部操作区 */}
          <div className="p-4 bg-white border-t-4 border-black flex gap-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                onClose();
                onChat(heroine);
              }}
              className="flex-1 bg-[#FF007F] text-white py-4 font-bold font-display text-xl uppercase pop-border pop-shadow text-stroke-sm hover:bg-[#D9006C] transition-colors flex items-center justify-center gap-2"
            >
              <CalendarHeart className="w-6 h-6 text-white" />
              立即接单 (开始聊天)
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
