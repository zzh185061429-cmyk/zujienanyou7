import { Modal } from '../ui/Modal';
import { FileText, Lock, Unlock } from 'lucide-react';
import { motion } from 'motion/react';

interface ArchiveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ArchiveModal({ isOpen, onClose }: ArchiveModalProps) {
  const archives = [
    { id: 1, title: '初次交锋', date: 'DAY 01', unlocked: true, summary: '在学生会室的第一次对峙，双方互探底细。' },
    { id: 2, title: '两张电影票', date: 'DAY 05', unlocked: true, summary: '围绕如何自然地送出电影票展开的攻防战。' },
    { id: 3, title: '雨伞的借口', date: 'DAY 12', unlocked: false, summary: '未知内容...' },
    { id: 4, title: '探病风波', date: 'DAY 20', unlocked: false, summary: '未知内容...' },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="战略档案记录" className="max-w-3xl">
      <div className="text-white/60 text-sm mb-6 font-serif">
        系统记录了你们之间的每一次交锋。回顾过去，方能制定更好的未来战略。
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {archives.map((item, index) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 border relative overflow-hidden group cursor-pointer transition-colors ${
              item.unlocked 
                ? 'border-white/20 bg-white/5 hover:border-primary/50' 
                : 'border-white/5 bg-black/40 opacity-50 grayscale cursor-not-allowed'
            }`}
          >
            {item.unlocked && (
              <div className="absolute inset-0 bg-primary/10 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 pointer-events-none" />
            )}
            
            <div className="flex justify-between items-start mb-2 relative z-10">
              <div className="flex items-center gap-2">
                {item.unlocked ? <Unlock className="w-4 h-4 text-primary" /> : <Lock className="w-4 h-4 text-white/30" />}
                <span className="text-xs font-mono tracking-widest text-white/40">{item.date}</span>
              </div>
              <span className="text-xs font-mono text-white/20">FILE {item.id.toString().padStart(2, '0')}</span>
            </div>
            
            <h4 className={`text-lg font-serif tracking-wide mb-2 relative z-10 ${item.unlocked ? 'text-light' : 'text-white/30'}`}>
              {item.title}
            </h4>
            
            <p className="text-sm text-white/50 font-sans relative z-10 line-clamp-2">
              {item.summary}
            </p>
          </motion.div>
        ))}
      </div>
    </Modal>
  );
}
