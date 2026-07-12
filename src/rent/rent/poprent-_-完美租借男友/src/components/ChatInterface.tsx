import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heroine } from '../types';
import { ArrowLeft, Phone, MoreVertical, Send, Heart, Settings, CalendarHeart } from 'lucide-react';
import { INITIAL_CHATS } from '../data';
import { useNotification } from './NotificationSystem';

interface Props {
  heroine: Heroine;
  onBack: () => void;
}

export default function ChatInterface({ heroine, onBack }: Props) {
  const [messages, setMessages] = useState(INITIAL_CHATS[heroine.id] || []);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { notify } = useNotification();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMsg = {
      id: Date.now().toString(),
      senderId: 'player',
      text: input,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, newMsg]);
    setInput('');
    setIsTyping(true);

    // Mock LLM Response
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        senderId: heroine.id,
        text: `（此为前端演示框架，尚未连接大模型后端。你刚刚发送了：${newMsg.text}）`,
        timestamp: Date.now(),
      }]);
      
      // 随机触发好感度提升通知
      if (Math.random() > 0.5) {
        notify({
          title: '好感度上升！',
          message: `${heroine.name} 对你的回复很满意。`,
          type: 'success'
        });
      }
    }, 1500);
  };

  return (
    <motion.div
      id="chat-interface"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-50 flex flex-col bg-white overflow-hidden md:relative md:inset-auto md:w-full md:h-full md:border-l-4 md:border-black"
    >
      {/* 聊天头部 */}
      <header className={`shrink-0 flex items-center justify-between p-4 border-b-4 border-black ${heroine.themeColor} text-black`}>
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="p-2 bg-white pop-border pop-shadow-sm rounded-full md:hidden"
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
          
          <div className="w-12 h-12 rounded-full bg-white pop-border flex items-center justify-center font-display text-xl font-bold overflow-hidden relative">
            <span className="relative z-10">{heroine.name[0]}</span>
            <div className="absolute inset-0 bg-halftone opacity-50"></div>
          </div>
          
          <div>
            <h2 className="font-bold text-lg leading-tight uppercase font-display">{heroine.name}</h2>
            <div className="flex items-center gap-1 text-xs font-bold bg-white/50 px-2 py-0.5 rounded pop-border border-2">
              <Heart className="w-3 h-3 text-[#FF007F]" fill="currentColor" />
              <span>{heroine.stats.affection}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <motion.button whileTap={{ scale: 0.9 }} className="p-2 bg-white pop-border pop-shadow-sm rounded-full" onClick={() => notify({ title: '语音通话', message: '服务暂未开通', type: 'warning' })}>
            <Phone className="w-5 h-5" />
          </motion.button>
          <motion.button whileTap={{ scale: 0.9 }} className="p-2 bg-white pop-border pop-shadow-sm rounded-full">
            <CalendarHeart className="w-5 h-5" />
          </motion.button>
        </div>
      </header>

      {/* 聊天记录区域 */}
      <div className="flex-1 overflow-y-auto p-4 bg-halftone space-y-6">
        {messages.map((msg, index) => {
          const isPlayer = msg.senderId === 'player';
          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className={`flex flex-col ${isPlayer ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-end gap-2 max-w-[85%] md:max-w-[70%]">
                {!isPlayer && (
                   <div className="w-8 h-8 rounded-full bg-white pop-border shrink-0 mb-1 flex items-center justify-center font-bold text-xs">
                     {heroine.name[0]}
                   </div>
                )}
                
                <div
                  className={`
                    p-3 text-sm font-medium leading-relaxed
                    pop-border pop-shadow-sm
                    ${isPlayer ? 'bg-[#FFD600] text-black rounded-tl-xl rounded-tr-xl rounded-bl-xl' : 'bg-white text-black rounded-tl-xl rounded-tr-xl rounded-br-xl'}
                  `}
                >
                  {msg.text}
                </div>
              </div>
              <span className="text-[10px] text-gray-500 font-bold mt-1 px-10">
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </motion.div>
          );
        })}

        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 max-w-[80%]">
             <div className="w-8 h-8 rounded-full bg-white pop-border shrink-0 flex items-center justify-center">
               <MoreVertical className="w-4 h-4 animate-pulse" />
             </div>
             <div className="p-3 bg-white pop-border rounded-tl-xl rounded-tr-xl rounded-br-xl flex gap-1">
               <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
               <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
               <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
             </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* 输入区域 */}
      <div className="shrink-0 p-4 bg-white border-t-4 border-black">
        <div className="flex items-center gap-2">
          <button className="p-3 bg-gray-100 pop-border rounded-full hover:bg-gray-200 transition-colors">
            <Settings className="w-5 h-5" />
          </button>
          
          <input
            id="chat-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="输入回复内容..."
            className="flex-1 bg-white pop-border px-4 py-3 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-[#00E5FF]/30 transition-all rounded-full"
          />
          
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleSend}
            disabled={!input.trim()}
            className={`
              p-3 pop-border rounded-full pop-shadow-sm flex items-center justify-center
              ${input.trim() ? 'bg-[#FF007F] text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
            `}
          >
            <Send className="w-5 h-5 -ml-0.5 mt-0.5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
