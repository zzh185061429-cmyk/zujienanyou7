import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PopCard } from "../components/ui/PopCard";
import { PopButton } from "../components/ui/PopButton";
import { History, ChevronRight, ChevronLeft } from "lucide-react";
import { useToast } from "../components/ToastProvider";

type LineType = "narrator" | "dialog" | "thought";

interface ScriptLine {
  type: LineType;
  speaker?: string;
  text: string;
  color?: string;
  avatar?: string;
}

const DUMMY_SCRIPT: ScriptLine[] = [
  { type: "narrator", text: "晚上七点，我与妹妹沈千金回到了别墅里。" },
  { type: "dialog", speaker: "沈千金", text: "累死了累死了，王老头讲那个案例分析从六点一直拖到六点半，他是不是觉得我不需要吃晚饭和上厕所啊？", color: "bg-pop-cyan", avatar: "https://i.postimg.cc/qMd7QGKF/1000213232.png" },
  { type: "narrator", text: "就在沈千金嘀咕着揉小腿的同时，我伸手去验证指纹锁，随着家里智能家居灯光亮起，沈千金揉腿的动作停了下来，她的眼睛慢慢睁大。" },
  { type: "dialog", speaker: "沈千金", text: "什么情况？家里进贼了？不是，我的超大液晶电视呢？走之前我的PS5还在上边插着呢？我PS5呢？", color: "bg-pop-cyan", avatar: "https://i.postimg.cc/qMd7QGKF/1000213232.png" },
  { type: "narrator", text: "她穿着一只鞋就冲进了家里，然后在玄关、客厅、餐厅，甚至连厕所都转了个遍。原本摆在玄关处的青花瓷花瓶没了，客厅墙上的电视没了。真皮沙发、大理石茶几全部都消失不见。" },
  { type: "dialog", speaker: "我", text: "给老爹老妈打电话好了...", color: "bg-white", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=User&backgroundColor=ffcc00" },
  { type: "narrator", text: "电话对面只传来几声“您拨打的用户已关机”。" },
  { type: "dialog", speaker: "沈千金", text: "公司资金链断了，我和你爸先出国避避风头。这套房子已经抵押出去了，剩下三个亿的烂摊子，你们兄妹俩自己看着办吧。爱你们的爸爸妈妈(｡•̀ᴗ-)✧", color: "bg-pop-cyan", avatar: "https://i.postimg.cc/qMd7QGKF/1000213232.png" },
  { type: "dialog", speaker: "沈千金", text: "啊？哥，咱俩好像从大富翁变成大负翁了...", color: "bg-pop-cyan", avatar: "https://i.postimg.cc/qMd7QGKF/1000213232.png" },
  { type: "narrator", text: "她慢慢蹲下身，双手捂住了脸。过了好一会儿，她突然站起身，紧绷着脸，开始整理自己的发型和衣服，仰着脸将双手搭在了我肩上。" },
  { type: "dialog", speaker: "沈千金", text: "仔细看看，你也是人模狗样。哦不是，人五人六的嘛。最近那些大小姐圈子里，都在传那个什么‘租借男友’，长的帅、性格好、还能提供情绪价值，我这儿有个能让你免费找对象还有钱赚的活。", color: "bg-pop-pink", avatar: "https://i.postimg.cc/qMd7QGKF/1000213232.png" },
  { type: "thought", speaker: "我", text: "这丫头脑子里又在想什么鬼点子...", color: "bg-white", avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=User&backgroundColor=ffcc00" }
];

export function StoryView() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showBacklog, setShowBacklog] = useState(false);
  const { showToast } = useToast();

  const currentLine = DUMMY_SCRIPT[currentIndex];

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (currentIndex < DUMMY_SCRIPT.length) {
      setIsTyping(true);
      setDisplayedText("");
      
      const fullText = DUMMY_SCRIPT[currentIndex].text;
      let i = 0;
      
      const typeChar = () => {
        if (i < fullText.length) {
          setDisplayedText(fullText.substring(0, i + 1));
          i++;
          timeout = setTimeout(typeChar, 30); // Typewriter speed
        } else {
          setIsTyping(false);
        }
      };
      
      typeChar();
    }
    return () => clearTimeout(timeout);
  }, [currentIndex]);

  const handleNext = () => {
    if (isTyping) {
      // Skip typing
      setDisplayedText(currentLine.text);
      setIsTyping(false);
    } else {
      if (currentIndex < DUMMY_SCRIPT.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        showToast("剧本演示结束", "normal");
      }
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-pop-black overflow-hidden pt-24 md:pt-20 font-sans">
      
      {/* Background Area (Interactive full screen click) */}
      <div className="flex-1 relative bg-pop-black cursor-pointer overflow-hidden" onClick={handleNext}>
        
        {/* Scene Background Halftone & Shapes */}
        <div className="absolute inset-0 bg-halftone opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-pop-black via-transparent to-transparent z-10"></div>
        
      </div>

      {/* Galgame Text Box Area */}
      <div className="relative h-[280px] md:h-[320px] w-full p-4 md:p-8 flex-shrink-0 cursor-pointer z-20" onClick={handleNext}>
        
        {/* Name Tag + Avatar */}
        <AnimatePresence mode="wait">
          {currentLine.type !== 'narrator' && (
            <motion.div
              key={currentLine.speaker}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className={`absolute -top-12 md:-top-16 left-6 md:left-12 z-30 flex items-end gap-3 drop-shadow-[4px_4px_0_rgba(0,0,0,0.5)]`}
            >
              {/* Small Portrait / Avatar */}
              {currentLine.avatar && (
                <div className={`w-16 h-16 md:w-20 md:h-20 bg-white pop-border border-4 flex items-center justify-center overflow-hidden clip-diagonal relative transform -skew-x-6 ${currentLine.color === 'bg-white' ? 'border-pop-yellow' : 'border-pop-black'}`}>
                   <img src={currentLine.avatar} alt="avatar" className="w-full h-full object-cover object-top scale-110" />
                </div>
              )}
              
              {/* Name Plate */}
              <div className={`px-4 md:px-6 py-1 md:py-2 pop-border border-4 text-xl md:text-2xl font-black italic -skew-x-6 text-pop-black mb-1 shadow-[2px_2px_0_#fff] ${currentLine.color === 'bg-white' ? 'bg-pop-yellow' : currentLine.color}`}>
                {currentLine.speaker}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Text Box */}
        <PopCard className={`h-full w-full relative clip-diagonal flex flex-col border-4 transition-colors duration-300 ${currentLine.type === 'narrator' ? 'bg-pop-black border-white shadow-[8px_8px_0_#fff] text-white' : 'bg-white border-pop-black shadow-[8px_8px_0_#00e5ff]'}`} style={{ paddingTop: currentLine.type === 'narrator' ? '1.5rem' : '3.5rem' }}>
          
          {/* Halftone subtle background for text box */}
          <div className="absolute inset-0 bg-halftone opacity-[0.03] pointer-events-none"></div>

          <div className={`flex-1 overflow-y-auto hide-scrollbar text-xl md:text-[26px] font-bold leading-relaxed tracking-wide z-10 ${currentLine.type === 'narrator' ? 'text-gray-200 italic' : currentLine.type === 'thought' ? 'text-blue-500 italic' : 'text-pop-black'}`}>
            {currentLine.type === 'dialog' ? `“${displayedText}”` : currentLine.type === 'thought' ? `*${displayedText}*` : displayedText}
            {isTyping && <span className={`inline-block w-3 h-6 animate-pulse ml-1 align-middle ${currentLine.type === 'narrator' ? 'bg-white' : 'bg-pop-pink'}`}></span>}
          </div>
          
          <div className="flex justify-between items-end mt-4 z-10">
            <div className="flex gap-4">
              <PopButton variant="ghost" size="sm" className={`gap-2 ${currentLine.type === 'narrator' ? 'bg-white/10 text-white hover:bg-white/20 pop-border border-white shadow-none' : ''}`} onClick={(e) => { e.stopPropagation(); setShowBacklog(true); }}>
                <History className="w-4 h-4" /> 历史记录
              </PopButton>
              <PopButton variant="ghost" size="sm" className={`gap-2 ${currentLine.type === 'narrator' ? 'bg-white/10 text-white hover:bg-white/20 pop-border border-white shadow-none' : ''}`} onClick={handlePrev} disabled={currentIndex === 0}>
                <ChevronLeft className="w-4 h-4" /> 上一句
              </PopButton>
            </div>
            {!isTyping && (
              <motion.div
                animate={{ x: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                <ChevronRight className={`w-10 h-10 ${currentLine.type === 'narrator' ? 'text-pop-yellow' : 'text-pop-pink'}`} />
              </motion.div>
            )}
          </div>
        </PopCard>
      </div>

      {/* Backlog Sidebar */}
      <AnimatePresence>
        {showBacklog && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute inset-y-0 left-0 w-full md:w-[400px] bg-pop-black/95 backdrop-blur-md z-50 pop-border border-l-0 flex flex-col border-r-4 border-pop-cyan shadow-[10px_0_0_rgba(0,229,255,0.2)]"
          >
            <div className="p-4 bg-pop-cyan text-pop-black font-black text-2xl flex justify-between items-center clip-diagonal mx-2 mt-2 border-2 border-pop-black">
              <span className="italic">HISTORY LOG</span>
              <button onClick={() => setShowBacklog(false)} className="text-3xl hover:scale-110 active:scale-90 transition-transform">&times;</button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {DUMMY_SCRIPT.slice(0, currentIndex).map((log, idx) => (
                <div key={idx} className="space-y-2 border-b-2 border-pop-black pb-4 relative">
                  {log.type === 'narrator' ? (
                    <div className="text-gray-400 text-lg italic bg-white/5 p-3 clip-diagonal border border-white/10">{log.text}</div>
                  ) : (
                    <>
                      <div className="flex items-center gap-2">
                        {log.avatar && <img src={log.avatar} alt="avatar" className="w-8 h-8 pop-border rounded-full object-cover object-top" />}
                        <div className={`font-black text-sm px-2 py-0.5 pop-border -skew-x-6 ${log.color === 'bg-white' ? 'bg-pop-yellow text-pop-black' : `${log.color} text-pop-black`}`}>{log.speaker}</div>
                      </div>
                      <div className={`text-lg font-bold pl-10 ${log.type === 'thought' ? 'text-blue-300 italic' : 'text-white'}`}>
                        {log.type === 'dialog' ? `“${log.text}”` : log.type === 'thought' ? `*${log.text}*` : log.text}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
