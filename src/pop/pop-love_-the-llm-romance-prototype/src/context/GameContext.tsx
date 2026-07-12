import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Screen, ToastNotification, DialogueLine, Character } from '../types';

interface GameContextType {
  currentScreen: Screen;
  setCurrentScreen: (screen: Screen) => void;
  toasts: ToastNotification[];
  addToast: (message: string, type?: ToastNotification['type']) => void;
  removeToast: (id: string) => void;
  dialogueHistory: DialogueLine[];
  addDialogue: (line: Omit<DialogueLine, 'id' | 'timestamp'>) => void;
  currentCharacter: Character;
  isProfileOpen: boolean;
  setProfileOpen: (open: boolean) => void;
  isSystemMenuOpen: boolean;
  setSystemMenuOpen: (open: boolean) => void;
}

// Mock Character Data (No placeholders, fully fleshed out for prototype)
const MOCK_CHARACTER: Character = {
  id: 'c_01',
  name: '绫小路 葵',
  title: '学生会副会长 / 财阀千金',
  quote: '「你以为这种程度的糖衣炮弹就能让我动摇吗？真是愚蠢至极...（脸红）」',
  stats: {
    charm: 85,
    intellect: 95,
    guts: 40,
    empathy: 20,
    affection: 35,
  }
};

const INITIAL_DIALOGUE: DialogueLine[] = [
  {
    id: 'd_1',
    speaker: 'SYSTEM',
    text: '系统已连接。意识同步率：98%。',
    type: 'system',
    timestamp: Date.now() - 10000,
  },
  {
    id: 'd_2',
    speaker: '绫小路 葵',
    text: '喂，你这家伙，发什么呆呢？我手上的这份学园祭预算案可是明天就要交的。',
    type: 'character',
    timestamp: Date.now() - 5000,
  }
];

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('menu');
  const [toasts, setToasts] = useState<ToastNotification[]>([]);
  const [dialogueHistory, setDialogueHistory] = useState<DialogueLine[]>(INITIAL_DIALOGUE);
  const [currentCharacter] = useState<Character>(MOCK_CHARACTER);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [isSystemMenuOpen, setSystemMenuOpen] = useState(false);

  const addToast = useCallback((message: string, type: ToastNotification['type'] = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      removeToast(id);
    }, 3000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const addDialogue = useCallback((line: Omit<DialogueLine, 'id' | 'timestamp'>) => {
    const newLine: DialogueLine = {
      ...line,
      id: Math.random().toString(36).substring(2, 9),
      timestamp: Date.now(),
    };
    setDialogueHistory(prev => [...prev, newLine]);
  }, []);

  return (
    <GameContext.Provider value={{
      currentScreen, setCurrentScreen,
      toasts, addToast, removeToast,
      dialogueHistory, addDialogue,
      currentCharacter,
      isProfileOpen, setProfileOpen,
      isSystemMenuOpen, setSystemMenuOpen
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within GameProvider');
  return context;
};
