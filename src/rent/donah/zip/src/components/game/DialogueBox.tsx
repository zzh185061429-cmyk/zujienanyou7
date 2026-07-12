import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, FastForward } from 'lucide-react';
import { Button } from '../ui/Button';

interface DialogueBoxProps {
  name: string;
  text: string;
  isTyping?: boolean;
}

export const DialogueBox: React.FC<DialogueBoxProps> = ({ name, text, isTyping }) => {
  const [inputText, setInputText] = useState('');

  return (
    <div className="absolute bottom-0 left-0 w-full p-8 z-30 pointer-events-none flex flex-col gap-4">
      {/* Dialogue Area */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-4xl mx-auto w-full pointer-events-auto relative"
      >
        {/* Name Tag */}
        <div className="absolute -top-6 left-8 bg-pop-cyan text-pop-dark font-display font-black text-xl px-6 py-1 tracking-widest uppercase clip-corner z-10 shadow-[0_0_15px_rgba(0,240,255,0.5)]">
          {name}
        </div>

        {/* Main Text Box */}
        <div className="bg-pop-panel/90 backdrop-blur-xl border-2 border-pop-cyan p-8 pt-10 min-h-[160px] clip-corner relative overflow-hidden group">
          <div className="absolute inset-0 bg-stripes opacity-10 pointer-events-none" />
          <div className="absolute inset-0 bg-halftone opacity-20 pointer-events-none" />
          
          <div className="relative z-10 text-white text-lg leading-relaxed font-sans min-h-[80px]">
            {text}
            {isTyping && (
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="inline-block ml-2 w-3 h-5 bg-pop-pink translate-y-1"
              />
            )}
          </div>
          
          {/* Controls */}
          <div className="absolute bottom-4 right-4 flex gap-2">
            <Button variant="ghost" size="icon" className="text-pop-cyan opacity-50 hover:opacity-100">
               <FastForward size={20} />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Input Area */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="max-w-4xl mx-auto w-full pointer-events-auto flex gap-4 items-end"
      >
        <div className="flex-1 bg-pop-dark/80 backdrop-blur border-b-2 border-pop-pink relative focus-within:border-pop-cyan transition-colors">
           <input
             type="text"
             value={inputText}
             onChange={(e) => setInputText(e.target.value)}
             placeholder="输入回复... (Type your response...)"
             className="w-full bg-transparent text-white px-6 py-4 outline-none placeholder:text-white/30 font-sans"
           />
           <div className="absolute left-0 bottom-0 w-full h-[1px] bg-pop-pink shadow-[0_0_10px_rgba(255,0,127,0.8)]" />
        </div>
        <Button variant="primary" size="lg" className="h-[58px] gap-2">
          <span>发送</span>
          <Send size={18} />
        </Button>
      </motion.div>
    </div>
  );
};
