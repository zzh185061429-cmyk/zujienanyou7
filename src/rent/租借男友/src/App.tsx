/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HUD } from './components/HUD';
import { ToastProvider } from './components/ToastProvider';
import { GameProvider, useGameContext } from './state/GameContext';
import { StoryView } from './views/StoryView';
import { DispatchView } from './views/DispatchView';
import { ArchiveView } from './views/ArchiveView';
import { MessageSquare, Calendar, Users, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './utils';

type Tab = 'story' | 'dispatch' | 'archive';

function AppContent() {
  const [activeTab, setActiveTab] = useState<Tab>('story');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isEyeCareMode } = useGameContext();

  const navItems = [
    { id: 'story', label: '剧情推进', icon: MessageSquare },
    { id: 'dispatch', label: '债务调度', icon: Calendar },
    { id: 'archive', label: '角色图鉴', icon: Users },
  ] as const;

  return (
    <div 
      className="flex flex-col md:flex-row w-full aspect-[3/4] bg-pop-black overflow-hidden font-sans relative transition-all duration-300"
      style={{ filter: isEyeCareMode ? 'sepia(0.2) brightness(0.9) contrast(0.95)' : 'none' }}
    >
        
        {/* Global HUD */}
        <HUD />

        {/* Sidebar Toggle Button (Desktop) */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="hidden md:flex fixed top-[88px] left-4 z-50 bg-pop-yellow text-pop-black p-2 pop-border shadow-[4px_4px_0_#ff3366] hover:scale-110 active:scale-95 transition-transform clip-diagonal"
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Desktop Sidebar / Mobile TabBar */}
        <nav className={cn(
          "z-40 flex md:flex-col justify-around md:justify-start items-center md:items-stretch bg-pop-black border-t-4 md:border-t-0 md:border-r-4 border-white h-20 md:h-full w-full md:w-64 fixed bottom-0 md:top-0 md:left-0 transition-transform duration-300 pt-0 md:pt-32",
          isSidebarOpen ? "md:translate-x-0" : "md:-translate-x-full"
        )}>
          {/* Logo (Desktop only) */}
          <div className="hidden md:flex flex-col items-center justify-center p-6 mb-8 bg-stripes-cyan-pink clip-diagonal mx-4 shadow-pop-pink pop-border">
            <h1 className="text-3xl font-black italic text-white text-stroke-sm -skew-x-12">DEBT</h1>
            <h1 className="text-4xl font-black italic text-pop-yellow text-stroke -skew-x-12 mt-1 drop-shadow-[4px_4px_0_#ff3366]">CLUB</h1>
          </div>

          <div className="flex md:flex-col w-full px-2 md:px-4 gap-2 md:gap-4 h-full md:h-auto items-center md:items-stretch">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsSidebarOpen(false); // Auto-close on mobile/desktop after selection
                  }}
                  className={cn(
                    "relative flex-1 md:flex-none flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-4 p-2 md:p-4 transition-all duration-200 group pop-border overflow-hidden",
                    isActive ? "bg-pop-yellow text-pop-black clip-diagonal shadow-[4px_4px_0_#ff3366]" : "bg-white text-gray-500 hover:bg-gray-100"
                  )}
                >
                  {/* Background Halftone on Active */}
                  {isActive && <div className="absolute inset-0 bg-halftone opacity-30"></div>}
                  
                  <div className="relative z-10 flex items-center justify-center">
                    <Icon className={cn("w-6 h-6 md:w-8 md:h-8", isActive ? "text-pop-pink" : "group-hover:text-pop-black")} />
                  </div>
                  <span className={cn("relative z-10 text-[10px] md:text-xl font-black tracking-wider whitespace-nowrap", isActive ? "text-pop-black" : "group-hover:text-pop-black")}>
                    {item.label}
                  </span>
                  
                  {/* Active Indicator (Mobile) */}
                  {isActive && <motion.div layoutId="nav-indicator-mobile" className="md:hidden absolute top-0 left-0 right-0 h-1 bg-pop-pink" />}
                  {/* Active Indicator (Desktop) */}
                  {isActive && <motion.div layoutId="nav-indicator-desktop" className="hidden md:block absolute top-0 bottom-0 left-0 w-2 bg-pop-pink" />}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 relative w-full min-h-0 overflow-hidden bg-white">
          {activeTab === 'story' && <StoryView />}
          {activeTab === 'dispatch' && <DispatchView />}
          {activeTab === 'archive' && <ArchiveView />}
        </main>

      </div>
  );
}

export default function App() {
  return (
    <GameProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </GameProvider>
  );
}
