import React from 'react';
import { Gift, Coffee, Heart } from 'lucide-react';

export const InventoryModal: React.FC = () => {
  const items = [
    { id: 1, name: '热咖啡', desc: '恢复少许精力。', icon: <Coffee size={32} />, qty: 3, rarity: 'common' },
    { id: 2, name: '精致的点心', desc: '小幅提升心情。', icon: <Gift size={32} />, qty: 1, rarity: 'rare' },
    { id: 3, name: '约定之戒', desc: '???', icon: <Heart size={32} />, qty: 0, rarity: 'legendary' },
    // Empty slots
    ...Array(9).fill(null).map((_, i) => ({ id: `empty-${i}`, empty: true }))
  ];

  return (
    <div className="h-full">
      <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
        {items.map((item) => {
          if (item.empty) {
            return (
              <div key={item.id} className="aspect-square bg-pop-dark/50 border border-white/5 clip-corner flex items-center justify-center relative">
                 <div className="w-8 h-8 rounded-full border-2 border-dashed border-white/10" />
              </div>
            );
          }

          return (
            <div key={item.id} className="aspect-square bg-pop-dark border-2 border-pop-cyan/30 hover:border-pop-cyan clip-corner relative group cursor-pointer overflow-hidden transition-colors">
               <div className="absolute inset-0 bg-halftone opacity-20 group-hover:opacity-50 transition-opacity" />
               <div className="absolute top-1 right-2 font-mono text-xs text-white/50 group-hover:text-white">x{item.qty}</div>
               <div className="w-full h-full flex flex-col items-center justify-center text-white/70 group-hover:text-pop-cyan relative z-10 transition-colors">
                 {item.icon}
               </div>
               
               {/* Tooltip */}
               <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 bg-pop-panel border border-pop-cyan p-2 text-xs w-max max-w-[150px] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 clip-corner text-center text-white shadow-xl shadow-pop-dark">
                  <div className="font-bold text-pop-cyan mb-1">{item.name}</div>
                  <div className="text-white/70">{item.desc}</div>
               </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
