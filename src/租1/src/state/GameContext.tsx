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

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [currentOrder, setCurrentOrder] = useState<CurrentOrder>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [mapFocusLocation, setMapFocusLocation] = useState<string | null>(null);
  const [isEyeCareMode, setIsEyeCareMode] = useState(false);
  
  // Start at 2026-10-08 08:00:00
  const [gameTime, setGameTime] = useState<Date>(new Date(2026, 9, 8, 8, 0, 0));

  React.useEffect(() => {
    // 1 real second = 10 in-game minutes
    const interval = setInterval(() => {
      setGameTime(prev => new Date(prev.getTime() + 10 * 60 * 1000));
    }, 1000);
    return () => clearInterval(interval);
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
