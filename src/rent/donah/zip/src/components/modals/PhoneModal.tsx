import React, { useState } from 'react';
import { Send, User } from 'lucide-react';
import { Message } from '../../types';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';

export const PhoneModal: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'character', text: '今天有什么安排吗？', timestamp: '10:00 AM' },
    { id: '2', sender: 'user', text: '还在想，你有什么想去的地方吗？', timestamp: '10:05 AM' },
    { id: '3', sender: 'character', text: '去哪里都可以啦，只要不是一直在家发呆就行...', timestamp: '10:06 AM' },
    { id: '4', sender: 'system', text: '好感度提升了。', timestamp: '10:06 AM' }
  ]);

  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setInput('');
  };

  return (
    <div className="flex flex-col h-[60vh] text-white">
      {/* Chat History */}
      <div className="flex-1 overflow-y-auto pr-4 flex flex-col gap-4 custom-scrollbar mb-4">
        {messages.map((msg) => {
          if (msg.sender === 'system') {
            return (
              <div key={msg.id} className="text-center w-full my-2">
                <span className="bg-pop-dark/50 text-white/50 text-xs px-3 py-1 rounded-full border border-white/10">
                  {msg.text}
                </span>
              </div>
            );
          }

          const isUser = msg.sender === 'user';
          
          return (
            <div key={msg.id} className={cn("flex gap-3 max-w-[80%]", isUser ? "self-end flex-row-reverse" : "self-start")}>
              <div className="w-8 h-8 rounded-full bg-pop-dark border border-white/20 flex items-center justify-center shrink-0">
                {isUser ? <User size={16} /> : <div className="text-pop-cyan font-bold text-xs">R</div>}
              </div>
              <div className={cn("flex flex-col", isUser ? "items-end" : "items-start")}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-white/40">{msg.timestamp}</span>
                </div>
                <div className={cn(
                  "p-3 text-sm clip-corner relative",
                  isUser 
                    ? "bg-pop-pink/20 border border-pop-pink text-white" 
                    : "bg-pop-cyan/20 border border-pop-cyan text-white"
                )}>
                  {msg.text}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input Box */}
      <div className="flex gap-2 bg-pop-dark p-2 clip-corner border border-white/10 mt-auto">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="输入消息..."
          className="flex-1 bg-transparent border-none outline-none text-sm px-3 font-sans text-white placeholder:text-white/30"
        />
        <Button variant="primary" size="icon" onClick={handleSend}>
          <Send size={16} />
        </Button>
      </div>
    </div>
  );
};
