import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, User, BookOpen, Settings, Send, Swords, MessageSquare, Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';
import { useToast } from '../ui/ToastContext';

interface GameScreenProps {
  onOpenCharacter: () => void;
  onOpenArchive: () => void;
  onOpenSettings: () => void;
}

export function GameScreen({ onOpenCharacter, onOpenArchive, onOpenSettings }: GameScreenProps) {
  const { addToast } = useToast();
  const [inputText, setInputText] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mock messages
  const [messages] = useState([
    { id: 1, sender: 'system', text: '「天才们的恋爱头脑战」虚拟实境系统已启动。' },
    { id: 2, sender: 'character', text: '哦？你今天看起来似乎很有自信。是准备好向我低头承认你的心意了吗？' },
    { id: 3, sender: 'player', text: '别开玩笑了，明明是你昨晚一直盯着我看吧。' },
    { id: 4, sender: 'character', text: '哈...哈哈！那只是因为你领带歪了，我觉得太滑稽了而已！真是的，别自作多情了！' }
  ]);

  const handleSend = () => {
    if (!inputText.trim()) {
      addToast({
        title: '指令无效',
        description: '你不能用沉默来应对这种局面。',
        type: 'warning'
      });
      return;
    }
    addToast({
      title: '策略已部署',
      description: '等待对方的回应...',
      type: 'info'
    });
    setInputText('');
  };

  const NavButtons = () => (
    <>
      <Button variant="ghost" onClick={onOpenCharacter} className="w-full justify-start md:justify-center">
        <User className="w-4 h-4 text-primary" />
        <span className="md:hidden lg:inline">目标状态</span>
      </Button>
      <Button variant="ghost" onClick={onOpenArchive} className="w-full justify-start md:justify-center">
        <BookOpen className="w-4 h-4 text-primary" />
        <span className="md:hidden lg:inline">战略档案</span>
      </Button>
      <Button variant="ghost" onClick={onOpenSettings} className="w-full justify-start md:justify-center">
        <Settings className="w-4 h-4 text-primary" />
        <span className="md:hidden lg:inline">系统设置</span>
      </Button>
    </>
  );

  return (
    <div className="w-full h-screen flex flex-col md:flex-row overflow-hidden bg-darker halftone-bg">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-white/10 bg-black z-20 relative">
        <h1 className="font-serif font-black tracking-widest text-primary text-xl">恋爱头脑战</h1>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-light">
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden absolute top-[60px] left-0 w-full bg-black border-b border-primary/30 z-20 flex flex-col p-2"
          >
            <NavButtons />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Left Sidebar (Desktop) */}
      <div className="hidden md:flex flex-col w-20 lg:w-48 border-r-2 border-primary/30 bg-black/80 backdrop-blur-md relative z-10">
        <div className="p-4 lg:p-6 mb-8 mt-4 border-b border-white/10">
          <Heart className="w-8 h-8 text-primary mx-auto lg:mx-0 animate-pulse" />
          <h2 className="hidden lg:block font-serif font-black tracking-widest mt-4 text-sm text-white/50">SYSTEM<br/>ONLINE</h2>
        </div>
        <div className="flex flex-col gap-2 px-2 lg:px-4">
          <NavButtons />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-[calc(100vh-60px)] md:h-screen relative z-0">
        {/* Visual Novel Display Area (Top half on mobile, right side on desktop) */}
        <div className="flex-1 md:absolute md:inset-0 flex flex-col items-center justify-center p-4">
           <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 pointer-events-none z-10" />
           {/* Placeholder for Character Portrait */}
           <motion.div 
             initial={{ opacity: 0, y: 50 }}
             animate={{ opacity: 1, y: 0 }}
             className="relative z-0 h-[60vh] md:h-[85vh] w-full max-w-lg flex items-end justify-center opacity-80"
           >
             {/* Abstract Silhouette replacing actual image */}
             <div className="w-full h-full bg-gradient-to-t from-darker via-white/5 to-transparent relative clip-character">
               <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-96 bg-primary/20 blur-3xl rounded-full" />
               <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-primary/30 rounded-full rotate-45 border-dashed animate-[spin_20s_linear_infinite]" />
             </div>
             
             {/* Character Name Plate */}
             <div className="absolute bottom-10 left-0 bg-primary px-6 py-2 transform -skew-x-12 shadow-2xl z-20">
               <span className="font-serif font-black text-xl md:text-3xl tracking-widest inline-block transform skew-x-12">
                 四宫辉夜 (Placeholder)
               </span>
             </div>
           </motion.div>
        </div>

        {/* Dialogue / Chat Overlay */}
        <div className="absolute bottom-0 left-0 w-full h-[50vh] md:h-[45vh] bg-gradient-to-t from-black via-black/90 to-transparent z-20 flex flex-col justify-end">
          
          <div className="flex-1 overflow-y-auto px-4 md:px-12 pt-12 pb-4 flex flex-col gap-4 max-w-5xl mx-auto w-full custom-scrollbar mask-image-fade">
            <AnimatePresence>
              {messages.map((msg, index) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: msg.sender === 'player' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    "max-w-[85%] p-4 relative backdrop-blur-md",
                    msg.sender === 'system' ? "self-center text-center text-primary font-mono text-sm border-y border-primary/30 py-2 w-full max-w-md bg-black/50" :
                    msg.sender === 'player' ? "self-end bg-primary/20 border-l-4 border-primary text-light rounded-r-lg" :
                    "self-start bg-white/5 border-l-4 border-white text-light/90 rounded-r-lg"
                  )}
                >
                  {msg.sender !== 'system' && (
                     <div className="text-xs text-white/40 mb-1 font-serif">
                       {msg.sender === 'player' ? 'YOU' : 'TARGET'}
                     </div>
                  )}
                  <p className="font-serif leading-relaxed md:text-lg">
                    {msg.text}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Input Area */}
          <div className="p-4 md:p-8 w-full max-w-5xl mx-auto border-t border-white/10 bg-black/80 backdrop-blur-xl">
             <div className="flex gap-2 md:gap-4 relative">
               <div className="absolute -top-3 left-4 bg-black px-2 text-xs text-primary font-mono tracking-widest">
                 STRATEGIC INPUT
               </div>
               <div className="flex-1 flex gap-2 overflow-hidden border border-white/20 focus-within:border-primary transition-colors bg-white/5">
                 <input 
                   type="text" 
                   value={inputText}
                   onChange={(e) => setInputText(e.target.value)}
                   onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                   placeholder="输入你的策略话语..." 
                   className="w-full bg-transparent outline-none px-4 py-3 text-light font-serif placeholder:text-white/20"
                 />
                 <button className="px-4 text-white/50 hover:text-primary transition-colors">
                   <MessageSquare className="w-5 h-5" />
                 </button>
               </div>
               
               <Button onClick={handleSend} className="px-6 md:px-8 group shrink-0">
                 <span className="hidden md:inline">展开攻势</span>
                 <Send className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
               </Button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
