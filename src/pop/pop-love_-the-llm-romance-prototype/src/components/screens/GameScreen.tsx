import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useGame } from '../../context/GameContext';
import { PopButton } from '../ui/PopButton';
import { Settings, UserCircle2, MessageSquare, Send, Heart } from 'lucide-react';
import { CharacterProfileModal } from '../modals/CharacterProfileModal';
import { SystemMenuModal } from '../modals/SystemMenuModal';

export const GameScreen: React.FC = () => {
  const { 
    dialogueHistory, 
    addDialogue, 
    currentCharacter, 
    setProfileOpen, 
    isProfileOpen,
    setSystemMenuOpen,
    isSystemMenuOpen,
    addToast
  } = useGame();
  
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const logEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [dialogueHistory]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    
    // Add player message
    addDialogue({
      speaker: 'YOU',
      text: inputText,
      type: 'player'
    });
    
    setInputText('');
    setIsTyping(true);

    // Mock LLM Response delay
    setTimeout(() => {
      setIsTyping(false);
      addDialogue({
        speaker: currentCharacter.name,
        text: '哦？这就是你的回答吗？虽然有些出乎意料，但不算太无聊。',
        type: 'character'
      });
      // Randomly trigger a system event
      if (Math.random() > 0.5) {
        setTimeout(() => {
          addToast('绫小路葵的兴趣度上升了。', 'success');
        }, 1000);
      }
    }, 2000);
  };

  return (
    <motion.div 
      className="relative h-screen w-full overflow-hidden bg-pop-white"
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      id="game-screen"
    >
      {/* Environment Layer */}
      <div className="absolute inset-0 bg-stripes pointer-events-none" />
      <div className="absolute inset-0 bg-noise pointer-events-none" />
      
      {/* Decorative large Japanese text in background */}
      <div className="absolute top-0 right-0 p-8 flex flex-col items-end pointer-events-none opacity-[0.03]">
        <h1 className="text-[12rem] font-sans font-black leading-none writing-vertical-rl">生徒会室</h1>
      </div>

      {/* Top HUD */}
      <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-start z-40 pointer-events-none">
        {/* Date/Time/Location indicator */}
        <motion.div 
          className="bg-pop-black text-pop-white px-6 py-3 pop-shadow clip-slanted pointer-events-auto"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="font-display font-bold tracking-widest text-sm text-pop-yellow">LOCATION</div>
          <div className="font-sans font-black text-xl">私立神秀学园 - 学生会室</div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          className="flex gap-4 pointer-events-auto"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <PopButton size="icon" onClick={() => setProfileOpen(true)} title="角色档案" id="btn-open-profile">
            <UserCircle2 className="w-6 h-6" />
          </PopButton>
          <PopButton size="icon" onClick={() => setSystemMenuOpen(true)} title="系统菜单" id="btn-open-system">
            <Settings className="w-6 h-6" />
          </PopButton>
        </motion.div>
      </div>

      {/* Character Layer (Stylized Silhouette since we lack image assets) */}
      <motion.div 
        className="absolute bottom-0 right-10 lg:right-32 w-[600px] h-[800px] pointer-events-none z-10 flex items-end justify-center"
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      >
        {/* Highly stylized typographic/CSS character representation */}
        <div className="relative w-full h-[90%] bg-pop-black clip-slanted pop-shadow-solid overflow-hidden flex flex-col items-center justify-start pt-20">
          <div className="absolute inset-0 bg-halftone-white opacity-20" />
          
          <Heart className="w-32 h-32 text-pop-red fill-pop-red animate-pulse mt-10" />
          <h2 className="font-sans font-black text-6xl text-pop-white mt-8 tracking-widest" style={{ writingMode: 'vertical-rl'}}>
            {currentCharacter.name}
          </h2>
          <div className="absolute bottom-10 left-10 text-pop-yellow font-display font-black text-4xl -rotate-90 origin-bottom-left">
            TARGET
          </div>
        </div>
      </motion.div>

      {/* Main Dialogue UI Layer */}
      <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none z-30 flex flex-col justify-end p-6 lg:p-12">
        
        {/* History Log Overlay (Hidden by default, shows past messages visually integrated) */}
        <div className="w-full max-w-3xl mb-8 flex flex-col gap-4 max-h-[40vh] overflow-y-auto pointer-events-auto pr-4 scrollbar-thin">
          <AnimatePresence initial={false}>
            {dialogueHistory.slice(0, -1).map((line) => (
              <motion.div 
                key={line.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex flex-col ${line.type === 'player' ? 'items-end' : 'items-start'}`}
              >
                <div className={`px-4 py-2 text-sm font-bold pop-border ${
                  line.type === 'system' ? 'bg-pop-yellow text-pop-black clip-tag' :
                  line.type === 'player' ? 'bg-pop-black text-pop-white rounded-t-xl rounded-bl-xl' :
                  'bg-pop-white text-pop-black rounded-t-xl rounded-br-xl'
                }`}>
                  <span className="opacity-50 text-xs mr-2">{line.speaker}</span>
                  {line.text}
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-pop-black font-bold flex items-center gap-2 bg-pop-white/80 w-max px-4 py-2 rounded-xl pop-border">
                <div className="w-2 h-2 bg-pop-black rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-pop-black rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-pop-black rounded-full animate-bounce delay-200" />
              </motion.div>
            )}
            <div ref={logEndRef} />
          </AnimatePresence>
        </div>

        {/* Active Dialogue Box */}
        {dialogueHistory.length > 0 && dialogueHistory[dialogueHistory.length - 1].type !== 'player' && (
          <motion.div 
            className="w-full max-w-5xl bg-pop-black text-pop-white p-8 lg:p-12 pop-shadow-solid pop-border clip-dialogue pointer-events-auto relative mb-6"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            key={dialogueHistory[dialogueHistory.length - 1].id}
          >
            {/* Speaker Name Tag */}
            <div className="absolute -top-6 left-12 bg-pop-yellow text-pop-black font-sans font-black text-2xl px-8 py-2 pop-border pop-shadow clip-tag transform -rotate-2">
              {dialogueHistory[dialogueHistory.length - 1].speaker}
            </div>
            
            <p className="font-sans font-bold text-2xl md:text-3xl leading-relaxed tracking-wide">
              {dialogueHistory[dialogueHistory.length - 1].text}
            </p>
          </motion.div>
        )}

        {/* Player Input Box */}
        <motion.div 
          className="w-full max-w-5xl bg-pop-white p-4 pop-border pop-shadow clip-slanted flex items-center gap-4 pointer-events-auto transition-transform focus-within:-translate-y-2"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <MessageSquare className="w-8 h-8 text-pop-red ml-4 shrink-0" />
          <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="输入你的回应... (按 Enter 发送)"
            className="flex-1 bg-transparent text-pop-black font-sans font-bold text-xl outline-none placeholder:text-pop-black/30"
            id="player-input"
            autoComplete="off"
            disabled={isTyping}
          />
          <PopButton size="md" onClick={handleSend} disabled={isTyping || !inputText.trim()} id="btn-send-message">
            发送 <Send className="w-5 h-5 ml-2" />
          </PopButton>
        </motion.div>

      </div>
      
      {/* Modals */}
      <AnimatePresence>
        {isProfileOpen && <CharacterProfileModal />}
        {isSystemMenuOpen && <SystemMenuModal />}
      </AnimatePresence>

    </motion.div>
  );
};
