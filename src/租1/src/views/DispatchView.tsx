import React, { useState } from "react";
import { PopCard } from "../components/ui/PopCard";
import { PopButton } from "../components/ui/PopButton";
import { Zap, AlertTriangle, Briefcase, Skull, MapPin, Clock, Dices, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useToast } from "../components/ToastProvider";
import { useGameContext } from "../state/GameContext";

const CHAR_DATA = {
  '温知晚': { avatar: 'https://i.postimg.cc/25BpPsRQ/1000213271.png', rate: 5000, color: 'border-pop-cyan', textColor: 'text-pop-cyan', location: '艺术楼练功房', weights: { '室内陪伴': 40, '外出约会': 30, '专项任务': 20, '活动出席': 10 } },
  '周念安': { avatar: 'https://i.postimg.cc/bN8z1wX5/1000213237.png', rate: 2000, color: 'border-white', textColor: 'text-white', location: '城东回头草咖啡馆', weights: { '外出约会': 40, '室内陪伴': 30, '活动出席': 20, '专项任务': 10 } },
  '傅霁': { avatar: 'https://i.postimg.cc/zfRm9sZ7/1000213236.png', rate: 8000, color: 'border-pop-pink', textColor: 'text-pop-pink', location: '单人公寓', weights: { '专项任务': 50, '室内陪伴': 30, '外出约会': 15, '活动出席': 5 } },
  '椎名律': { avatar: 'https://i.postimg.cc/0Np69H75/nai-4055558051.png', rate: 3000, color: 'border-pop-yellow', textColor: 'text-pop-yellow', location: '音乐学院演奏厅', weights: { '专项任务': 35, '外出约会': 35, '室内陪伴': 20, '活动出席': 10 } },
  '姜朝渔': { avatar: 'https://i.postimg.cc/k5trk03S/1000213361.png', rate: 500000, color: 'border-pop-cyan', textColor: 'text-pop-cyan', location: '姜氏财团顶层', weights: { '室内陪伴': 40, '外出约会': 25, '活动出席': 25, '专项任务': 10 } },
  '裴今歌': { avatar: 'https://i.postimg.cc/yNSqwM4h/1000213352.png', rate: 500000, color: 'border-pop-pink', textColor: 'text-pop-pink', location: '燕影片场', weights: { '外出约会': 40, '活动出席': 25, '室内陪伴': 25, '专项任务': 10 } },
  '罗兰': { avatar: 'https://i.postimg.cc/HnZVHWtB/1000213897.png', rate: 10000, color: 'border-white', textColor: 'text-white', location: '燕大击剑馆', weights: { '外出约会': 25, '室内陪伴': 25, '活动出席': 25, '专项任务': 25 } },
  '霍千黎': { avatar: 'https://i.postimg.cc/RhsN9CTD/1000213899.png', rate: 10000, color: 'border-pop-black', textColor: 'text-gray-900', location: '金融系自习室', weights: { '外出约会': 25, '室内陪伴': 25, '活动出席': 25, '专项任务': 25 } },
  '季明舒': { avatar: 'https://i.postimg.cc/kgpwtzwq/nai-3587295711.png', rate: 500000, color: 'border-white', textColor: 'text-white', location: '季氏公馆', weights: { '外出约会': 40, '活动出席': 30, '室内陪伴': 20, '专项任务': 10 } },
  '步玲燕': { avatar: 'https://i.postimg.cc/ht5M76MK/2729c1ef-df54-4b2e-85fe-d65322e28c65.png', rate: 200, color: 'border-pop-yellow', textColor: 'text-pop-yellow', location: '南门天桥下', weights: { '外出约会': 40, '专项任务': 30, '室内陪伴': 20, '活动出席': 10 } }
};

const ROSTER = Object.entries(CHAR_DATA).map(([name, data], idx) => ({
  id: String(idx + 1),
  name,
  status: "idle",
  rate: `¥${data.rate >= 10000 ? (data.rate / 10000) + 'w' : data.rate}`,
  avatar: data.avatar
}));

type DispatchState = {
  mode: "single" | "crash" | "idle";
  char1: string | null;
  task1: string | null;
  char2: string | null;
  task2: string | null;
  duration1?: { label: string, hours: number, price: number };
  duration2?: { label: string, hours: number, price: number };
};

const DURATIONS = [
  { label: "1 小时", type: "short", hours: 1 },
  { label: "2 小时", type: "short", hours: 2 },
  { label: "4 小时", type: "short", hours: 4 },
  { label: "8 小时", type: "short", hours: 8 },
  { label: "包日", type: "day", hours: 24 },
  { label: "连续2天", type: "multi", hours: 48 },
  { label: "连续3天", type: "multi", hours: 72 },
  { label: "连续7天", type: "multi", hours: 168 },
];

export function DispatchView() {
  const { showToast } = useToast();
  const { currentOrder, setCurrentOrder, openMapWithLocation, addPayment, gameTime } = useGameContext();
  
  const [dispatchResult, setDispatchResult] = useState<DispatchState>({
    mode: "idle",
    char1: null,
    task1: null,
    char2: null,
    task2: null
  });

  const rollDurationAndPrice = (charName: string) => {
    const rand = Math.random();
    let dur;
    if (rand < 0.6) dur = DURATIONS[Math.floor(Math.random() * 4)];
    else if (rand < 0.9) dur = DURATIONS[4];
    else dur = DURATIONS[5 + Math.floor(Math.random() * 3)];

    const dailyRate = CHAR_DATA[charName as keyof typeof CHAR_DATA].rate;
    let price = 0;
    if (dur.hours < 12) {
      price = Math.ceil(dailyRate * (dur.hours / 12));
    } else {
      price = dailyRate * (dur.hours / 24);
    }
    return { ...dur, price };
  };

  const handleRoll = () => {
    const chars = Object.keys(CHAR_DATA);
    const shuffled = [...chars].sort(() => 0.5 - Math.random());
    const isCrash = Math.random() < 0.3;
    const char1 = shuffled[0];
    const char2 = isCrash ? shuffled[1] : null;

    const rollTask = (charName: string) => {
      const w = CHAR_DATA[charName as keyof typeof CHAR_DATA].weights;
      let total = Object.values(w).reduce((sum, val) => sum + val, 0);
      let rand = Math.random() * total;
      for (let task in w) {
        if (rand < w[task as keyof typeof w]) return task;
        rand -= w[task as keyof typeof w];
      }
      return '待定';
    };

    const task1 = rollTask(char1);
    const task2 = isCrash ? rollTask(char2!) : null;

    const dur1 = rollDurationAndPrice(char1);
    const dur2 = isCrash ? rollDurationAndPrice(char2!) : undefined;

    setDispatchResult({ mode: isCrash ? "crash" : "single", char1, task1, char2, task2, duration1: dur1, duration2: dur2 });
    
    showToast(
      isCrash ? "💥 警报：检测到撞单时间冲突！" : "👤 收到新指名派单", 
      isCrash ? "alert" : "normal"
    );
  };

  const getCharData = (name: string | null) => name ? CHAR_DATA[name as keyof typeof CHAR_DATA] : null;

  const handleAcceptSingle = () => {
    if (dispatchResult.char1 && dispatchResult.task1 && dispatchResult.duration1) {
      setCurrentOrder({ 
        charName: dispatchResult.char1, 
        task: dispatchResult.task1,
        location: getCharData(dispatchResult.char1)?.location,
        durationString: dispatchResult.duration1.label,
        price: dispatchResult.duration1.price,
        startTime: gameTime.getTime(),
        durationHours: dispatchResult.duration1.hours
      });
      showToast(`已接受 ${dispatchResult.char1} 的委托`);
      setDispatchResult({ mode: 'idle', char1: null, task1: null, char2: null, task2: null });
    }
  };

  const handleAcceptCrash = () => {
    if (dispatchResult.char1 && dispatchResult.char2 && dispatchResult.duration1 && dispatchResult.duration2) {
      const maxHours = Math.max(dispatchResult.duration1.hours, dispatchResult.duration2.hours);
      setCurrentOrder({ 
        charName: `${dispatchResult.char1} & ${dispatchResult.char2}`, 
        task: "修罗场并行",
        location: `${getCharData(dispatchResult.char1)?.location} (和 ${dispatchResult.char2})`,
        durationString: `${dispatchResult.duration1.label} (同时)`,
        price: dispatchResult.duration1.price + dispatchResult.duration2.price,
        startTime: gameTime.getTime(),
        durationHours: maxHours
      });
      showToast(`已开启时间管理大师模式！`);
      setDispatchResult({ mode: 'idle', char1: null, task1: null, char2: null, task2: null });
    }
  };

  const handleCompleteOrder = () => {
    if (currentOrder && currentOrder.price) {
      addPayment(currentOrder.price);
      showToast(`订单完成！已结算 ¥${currentOrder.price.toLocaleString()}`);
      setCurrentOrder(null);
    }
  };

  return (
    <div className="w-full h-full bg-halftone pt-24 md:pt-20 p-4 md:p-8 overflow-y-auto hide-scrollbar relative">
      
      {/* Simulation Toggle */}
      <div className="max-w-7xl mx-auto space-y-8 pb-32 md:pb-12">
        
        {/* Top Dashboard: Today's Dispatch */}
        <div className="space-y-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
             <div className="flex flex-col items-start">
                <h2 className="text-4xl md:text-5xl font-black italic uppercase text-white bg-pop-black px-4 py-2 -skew-x-6 border-2 border-pop-pink shadow-[4px_4px_0_#ff3366]">TODAY'S DISPATCH</h2>
                <span className="font-bold text-pop-black bg-pop-yellow inline-block w-max px-2 py-1 transform -skew-x-6 border-2 border-pop-black mt-2">今日派单与时间调度</span>
             </div>
             <PopButton 
               onClick={handleRoll} 
               disabled={!!currentOrder}
               variant={currentOrder ? "ghost" : "cyan"} 
               size="lg" 
               className={`shadow-[8px_8px_0_#ff3366] flex items-center gap-2 border-4 border-pop-black clip-diagonal transition-all ${
                 currentOrder ? 'opacity-50 cursor-not-allowed bg-gray-400 border-gray-600 shadow-none' : 'hover:scale-110 active:scale-95 animate-pulse'
               }`}
             >
               <Dices className="w-8 h-8" />
               <span className="text-2xl font-black italic">ROLL DISPATCH</span>
             </PopButton>
          </div>
          
          <AnimatePresence mode="wait">
            {currentOrder ? (
               <motion.div 
                 key="active-order" 
                 initial={{ opacity: 0, scale: 0.9 }} 
                 animate={{ opacity: 1, scale: 1 }} 
                 exit={{ opacity: 0, scale: 0.9 }}
               >
                 <PopCard className="bg-pop-pink text-white border-4 border-white shadow-[8px_8px_0_#00e5ff] p-8 clip-diagonal overflow-hidden relative">
                   <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none">
                     <Clock className="w-32 h-32 animate-spin-slow" />
                   </div>
                   <div className="relative z-10">
                     <div className="inline-block bg-pop-black px-4 py-2 -skew-x-6 border-2 border-white mb-4">
                       <h3 className="text-3xl font-black italic text-white">ACTIVE DISPATCH / 任务进行中</h3>
                     </div>
                     <p className="font-bold text-xl mb-6 bg-white text-pop-black inline-block px-3 py-1 -skew-x-6">当前服务对象: <span className="text-pop-pink">{currentOrder.charName}</span></p>
                     
                     <div className="space-y-2">
                       <div className="flex justify-between font-bold text-sm">
                         <span>任务进度 ({currentOrder.task} · {currentOrder.durationString})</span>
                         <span className="text-pop-yellow animate-pulse">
                           {currentOrder.startTime && currentOrder.durationHours ? 
                             `${Math.min(100, Math.floor(((gameTime.getTime() - currentOrder.startTime) / (currentOrder.durationHours * 60 * 60 * 1000)) * 100))}%` 
                             : 'TIME PASSING...'}
                         </span>
                       </div>
                       <div className="h-4 w-full bg-pop-black border-2 border-white clip-diagonal relative overflow-hidden">
                         <div 
                           className="absolute top-0 left-0 h-full bg-pop-cyan transition-all duration-1000 ease-linear"
                           style={{ width: `${currentOrder.startTime && currentOrder.durationHours ? Math.min(100, Math.max(0, ((gameTime.getTime() - currentOrder.startTime) / (currentOrder.durationHours * 60 * 60 * 1000)) * 100)) : 100}%` }}
                         />
                       </div>
                     </div>
                     <div className="flex gap-4 mt-6">
                       <PopButton 
                         onClick={handleCompleteOrder}
                         disabled={!(currentOrder.startTime && currentOrder.durationHours && (gameTime.getTime() - currentOrder.startTime) >= currentOrder.durationHours * 60 * 60 * 1000)}
                         variant={currentOrder.startTime && currentOrder.durationHours && (gameTime.getTime() - currentOrder.startTime) >= currentOrder.durationHours * 60 * 60 * 1000 ? "cyan" : "ghost"} 
                         size="sm" 
                         className={currentOrder.startTime && currentOrder.durationHours && (gameTime.getTime() - currentOrder.startTime) >= currentOrder.durationHours * 60 * 60 * 1000 ? "bg-pop-cyan text-pop-black hover:bg-pop-black hover:text-pop-cyan animate-pulse" : "bg-pop-yellow text-pop-black opacity-50 cursor-not-allowed"}
                       >
                         {currentOrder.startTime && currentOrder.durationHours && (gameTime.getTime() - currentOrder.startTime) >= currentOrder.durationHours * 60 * 60 * 1000 ? '完成服务并结算' : '服务进行中...'}
                       </PopButton>
                       <PopButton 
                         onClick={() => { setCurrentOrder(null); showToast("服务强制结束，无收入", "alert"); }}
                         variant="ghost" size="sm" className="bg-white text-pop-pink hover:bg-pop-black hover:text-white"
                       >
                         中止服务
                       </PopButton>
                     </div>
                   </div>
                 </PopCard>
               </motion.div>
            ) : dispatchResult.mode === "idle" ? (
               <motion.div 
                 key="idle" 
                 initial={{ opacity: 0 }} 
                 animate={{ opacity: 1 }} 
                 exit={{ opacity: 0 }}
               >
                 <PopCard className="bg-pop-black text-white border-4 border-white shadow-pop p-12 text-center clip-diagonal">
                   <h3 className="text-2xl font-black italic text-gray-400">NO DISPATCH YET / 暂无派单</h3>
                   <p className="font-bold mt-2 text-gray-400">点击左下角的 ROLL DISPATCH 开始抽取今日委托</p>
                 </PopCard>
               </motion.div>
            ) : dispatchResult.mode === "single" && dispatchResult.char1 ? (
              <motion.div 
                key="single" 
                initial={{ opacity: 0, x: -50 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: 50 }}
                transition={{ type: "spring" }}
              >
                <PopCard variant="cyan" className="flex flex-col md:flex-row items-stretch md:items-center gap-6 p-6 md:p-8 clip-diagonal border-4">
                  <div className="bg-pop-black text-white clip-diagonal w-32 h-32 md:w-40 md:h-40 flex items-center justify-center shrink-0 shadow-[4px_4px_0_#ff3366] border-4 border-pop-pink overflow-hidden">
                    <img src={getCharData(dispatchResult.char1)?.avatar} alt={dispatchResult.char1} className="w-full h-full object-cover object-top scale-110" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="bg-pop-pink text-white px-3 py-1 font-black text-sm pop-border -skew-x-6 shadow-[2px_2px_0_#1a1a1a]">单人指名</span>
                      <h3 className="text-4xl font-black italic drop-shadow-sm">{dispatchResult.char1}</h3>
                    </div>
                    <div className="flex items-center gap-2 font-bold text-lg mt-4">
                      <Briefcase className="w-5 h-5" />
                      <span>任务类型: {dispatchResult.task1}</span>
                    </div>
                    <div 
                      className="flex items-center gap-2 font-bold text-gray-700 cursor-pointer hover:text-pop-pink transition-colors"
                      onClick={() => openMapWithLocation(getCharData(dispatchResult.char1)?.location || '')}
                    >
                      <MapPin className="w-5 h-5" />
                      <span className="border-b-2 border-dotted border-gray-400 hover:border-pop-pink">地点: {getCharData(dispatchResult.char1)?.location} (点击查看地图)</span>
                    </div>
                    <div className="flex items-center gap-2 font-bold text-gray-700 mt-2">
                      <Clock className="w-5 h-5 text-pop-cyan" />
                      <span>时长: {dispatchResult.duration1?.label}</span>
                    </div>
                  </div>
                  <div className="md:text-right bg-white p-4 pop-border shadow-[4px_4px_0_#ff3366] self-center">
                    <span className="block text-sm font-bold text-gray-500 mb-1">预期总收入</span>
                    <span className="text-3xl md:text-4xl font-black font-mono text-pop-pink">
                      ¥{dispatchResult.duration1?.price?.toLocaleString() || 0}
                    </span>
                    <PopButton onClick={handleAcceptSingle} size="sm" className="w-full mt-4 bg-pop-black text-white hover:bg-pop-pink">开始服务</PopButton>
                  </div>
                </PopCard>
              </motion.div>
            ) : dispatchResult.mode === "crash" && dispatchResult.char1 && dispatchResult.char2 ? (
              <motion.div 
                key="crash" 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", bounce: 0.5 }}
              >
                <PopCard className="bg-stripes text-white border-4 border-pop-yellow shadow-[8px_8px_0_#ffcc00] p-6 md:p-8 relative overflow-hidden clip-diagonal">
                  <div className="absolute -top-10 -right-10 text-pop-pink opacity-80 mix-blend-screen pointer-events-none"><Skull className="w-64 h-64" /></div>
                  <div className="relative z-10">
                    <div className="inline-block bg-pop-yellow text-pop-black px-6 py-2 font-black text-2xl mb-6 -skew-x-12 uppercase animate-pulse border-4 border-pop-black shadow-[4px_4px_0_#ff3366]">
                      💥 撞单修罗场警报 (CRASH DETECTED)
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      
                      {/* Conflict 1 */}
                      <div className={`bg-pop-black border-4 ${getCharData(dispatchResult.char1)?.color} shadow-pop-lg p-5 clip-diagonal relative flex flex-col xl:flex-row items-stretch xl:items-center gap-4`}>
                        <div className={`absolute top-0 right-0 bg-white text-pop-black font-black px-3 py-1 text-sm border-l-4 border-b-4 ${getCharData(dispatchResult.char1)?.color} z-10`}>客户 A</div>
                        <div className={`w-24 h-24 xl:w-28 xl:h-28 shrink-0 border-4 ${getCharData(dispatchResult.char1)?.color} clip-diagonal overflow-hidden mt-4 xl:mt-0`}>
                           <img src={getCharData(dispatchResult.char1)?.avatar} alt={dispatchResult.char1} className="w-full h-full object-cover object-top scale-110" />
                        </div>
                        <div className="flex-1 space-y-2 relative z-10">
                          <h3 className={`text-3xl font-black italic ${getCharData(dispatchResult.char1)?.textColor}`}>{dispatchResult.char1}</h3>
                          <div className="space-y-1 font-bold text-sm">
                             <p 
                               className="flex items-center gap-2 text-white cursor-pointer hover:text-pop-yellow transition-colors w-max"
                               onClick={() => openMapWithLocation(getCharData(dispatchResult.char1)?.location || '')}
                             >
                               <Briefcase className="w-4 h-4 shrink-0"/> {dispatchResult.task1} (<span className="border-b border-dotted hover:border-solid">📍 {getCharData(dispatchResult.char1)?.location}</span>)
                             </p>
                             <p className="flex items-center gap-2 text-white"><Clock className="w-4 h-4 shrink-0"/> 时长: {dispatchResult.duration1?.label}</p>
                             <p className="text-pop-yellow mt-2 text-base">预计收入: ¥{dispatchResult.duration1?.price?.toLocaleString() || 0}</p>
                          </div>
                        </div>
                      </div>

                      {/* Conflict 2 */}
                      <div className={`bg-pop-black border-4 ${getCharData(dispatchResult.char2)?.color} shadow-pop-lg p-5 clip-diagonal relative flex flex-col xl:flex-row items-stretch xl:items-center gap-4`}>
                        <div className={`absolute top-0 right-0 bg-white text-pop-black font-black px-3 py-1 text-sm border-l-4 border-b-4 ${getCharData(dispatchResult.char2)?.color} z-10`}>客户 B</div>
                        <div className={`w-24 h-24 xl:w-28 xl:h-28 shrink-0 border-4 ${getCharData(dispatchResult.char2)?.color} clip-diagonal overflow-hidden mt-4 xl:mt-0`}>
                           <img src={getCharData(dispatchResult.char2)?.avatar} alt={dispatchResult.char2} className="w-full h-full object-cover object-top scale-110" />
                        </div>
                        <div className="flex-1 space-y-2 relative z-10">
                          <h3 className={`text-3xl font-black italic ${getCharData(dispatchResult.char2)?.textColor}`}>{dispatchResult.char2}</h3>
                          <div className="space-y-1 font-bold text-sm">
                             <p 
                               className="flex items-center gap-2 text-white cursor-pointer hover:text-pop-yellow transition-colors w-max"
                               onClick={() => openMapWithLocation(getCharData(dispatchResult.char2)?.location || '')}
                             >
                               <Briefcase className="w-4 h-4 shrink-0"/> {dispatchResult.task2} (<span className="border-b border-dotted hover:border-solid">📍 {getCharData(dispatchResult.char2)?.location}</span>)
                             </p>
                             <p className="flex items-center gap-2 text-pop-pink animate-pulse"><Clock className="w-4 h-4 shrink-0"/> 时长: {dispatchResult.duration2?.label} (时间冲突!)</p>
                             <p className="text-pop-yellow mt-2 text-base">预计收入: ¥{dispatchResult.duration2?.price?.toLocaleString() || 0}</p>
                          </div>
                        </div>
                      </div>

                    </div>
                    <div className="mt-6 flex flex-col items-center">
                      <p className="text-xl font-bold mb-4 font-mono">总预期收入: ¥{((dispatchResult.duration1?.price || 0) + (dispatchResult.duration2?.price || 0)).toLocaleString()}</p>
                      <PopButton onClick={handleAcceptCrash} variant="danger" size="lg" className="shadow-[4px_4px_0_#1a1a1a] hover:scale-105 active:scale-95 bg-white text-pop-black border-white hover:bg-pop-pink hover:text-white hover:border-pop-black">
                        强行时间管理 (极度危险)
                      </PopButton>
                    </div>
                  </div>
                </PopCard>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        {/* Full Roster Grid (Standby) */}
        <div className="space-y-4">
            <div className="inline-block bg-pop-black px-4 py-2 -skew-x-6 border-2 border-pop-yellow shadow-[4px_4px_0_#ffcc00] mb-2"><h2 className="text-2xl font-black italic uppercase text-white">STANDBY ROSTER / 待命名单</h2></div>
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
             {ROSTER.map((char) => (
               <PopCard key={char.id} className="p-0 overflow-hidden group hover:scale-105 transition-transform duration-200 cursor-pointer clip-diagonal border-2">
                 <div className="p-3 bg-gray-200 text-gray-500 font-black text-lg flex justify-between items-center group-hover:bg-pop-yellow group-hover:text-pop-black transition-colors">
                   <span>{char.name}</span>
                 </div>
                 <div className="p-3 bg-white">
                   <div className="text-xs font-bold text-gray-400 mb-1">日薪 (Base Rate)</div>
                   <div className="font-mono font-black text-lg text-pop-black">{char.rate}</div>
                 </div>
               </PopCard>
             ))}
           </div>
        </div>

      </div>

    </div>
  );
}

