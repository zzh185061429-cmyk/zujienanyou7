import React, { createContext, useContext, useState } from 'react';

export type CurrentOrder = {
  charName: string;
  task: string;
  location?: string;
  durationString?: string;
  price?: number;
  startTime?: number; // In gameTime milliseconds
  durationHours?: number; // Total hours for the order
} | null;

type GameContextType = {
  currentOrder: CurrentOrder;
  setCurrentOrder: (order: CurrentOrder) => void;
  isCalendarOpen: boolean;
  setIsCalendarOpen: (v: boolean) => void;
  isMapOpen: boolean;
  setIsMapOpen: (v: boolean) => void;
  mapFocusLocation: string | null;
  openMapWithLocation: (loc: string) => void;
  totalDebt: number;
  currentPaid: number;
  addPayment: (amount: number) => void;
  isEyeCareMode: boolean;
  setIsEyeCareMode: (v: boolean) => void;
  gameTime: Date;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

// 时间解析的辅助函数：从 MVU 变量 stat_data 中提取「时间.当前日期时间」字符串并解析为 Date
function parseMvuTime(variables: Mvu.MvuData): Date | null {
  const timeStr = _.get(variables, 'stat_data.时间.当前日期时间');
  if (!timeStr || typeof timeStr !== 'string') return null;
  const parsed = new Date(timeStr);
  return isNaN(parsed.getTime()) ? null : parsed;
}

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [currentOrder, setCurrentOrder] = useState<CurrentOrder>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [mapFocusLocation, setMapFocusLocation] = useState<string | null>(null);
  const [isEyeCareMode, setIsEyeCareMode] = useState(false);
  
  // 默认起始时间（MVU 不可用时的后备值）
  const [gameTime, setGameTime] = useState<Date>(new Date(2026, 9, 8, 8, 0, 0));

  // 时间源：优先使用 MVU 变量「时间.当前日期时间」，不可用时回退到本地时钟模拟
  React.useEffect(() => {
    let cancelled = false;
    let pollInterval: ReturnType<typeof setInterval> | null = null;
    let eventStop: EventOnReturn | null = null;

    // 从 MVU 读取当前时间并更新 state
    const syncTimeFromMvu = () => {
      if (cancelled) return;
      try {
        const msgId = getCurrentMessageId();
        if (msgId == null) return;
        const variables = Mvu.getMvuData({ type: 'message', message_id: msgId });
        const parsed = parseMvuTime(variables);
        if (parsed) setGameTime(parsed);
      } catch {
        // MVU 尚未就绪，静默略过
      }
    };

    // 本地时间模拟（后备方案：1 现实秒 = 10 游戏分钟）
    const startLocalSimulation = () => {
      pollInterval = setInterval(() => {
        setGameTime(prev => new Date(prev.getTime() + 10 * 60 * 1000));
      }, 1000);
    };

    async function initTimeSource() {
      try {
        await waitGlobalInitialized('Mvu');
        if (cancelled) return;

        // 初始同步
        syncTimeFromMvu();

        // 每 2 秒轮询一次 MVU 时间
        pollInterval = setInterval(syncTimeFromMvu, 2000);

        // 监听 MVU 变量更新事件，立即同步
        eventStop = eventOn(Mvu.events.VARIABLE_UPDATE_ENDED, () => {
          syncTimeFromMvu();
        });
      } catch {
        // MVU 不可用，使用本地时钟模拟
        startLocalSimulation();
      }
    }

    initTimeSource();

    return () => {
      cancelled = true;
      if (pollInterval) clearInterval(pollInterval);
      if (eventStop) eventStop.stop();
    };
  }, []);

  // 3亿
  const [totalDebt] = useState(300000000);
  const [currentPaid, setCurrentPaid] = useState(0);

  const openMapWithLocation = (loc: string) => {
    setMapFocusLocation(loc);
    setIsMapOpen(true);
  };

  const addPayment = (amount: number) => {
    setCurrentPaid(prev => prev + amount);
  };
  
  return (
    <GameContext.Provider value={{ 
      currentOrder, setCurrentOrder,
      isCalendarOpen, setIsCalendarOpen,
      isMapOpen, setIsMapOpen,
      mapFocusLocation, openMapWithLocation,
      totalDebt, currentPaid, addPayment,
      isEyeCareMode, setIsEyeCareMode,
      gameTime
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGameContext must be used within GameProvider');
  return ctx;
}
