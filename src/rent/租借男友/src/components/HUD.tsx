import React, { useEffect, useState } from "react";
import { PopCard } from "./ui/PopCard";
import { Clock, MapPin, User, Briefcase, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useGameContext } from "../state/GameContext";
import { CalendarModal } from "./modals/CalendarModal";
import { MapModal } from "./modals/MapModal";

export function HUD() {
  const { currentOrder, setIsCalendarOpen, setIsMapOpen, totalDebt, currentPaid, isEyeCareMode, setIsEyeCareMode, gameTime } = useGameContext();
  
  const progress = Math.min(100, Math.max(0, (currentPaid / totalDebt) * 100));

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-40 p-2 md:p-4 pointer-events-none">
        <div className="flex flex-col md:flex-row gap-2 max-w-7xl mx-auto">
          
          {/* Left: Time & Location */}
          <div className="flex flex-row md:flex-col gap-2 shrink-0 pointer-events-auto">
            <PopCard 
              onClick={() => setIsCalendarOpen(true)}
              className="py-1 px-3 flex items-center gap-2 bg-pop-cyan clip-diagonal shadow-pop-cyan cursor-pointer hover:scale-105 transition-transform"
            >
              <Clock className="w-4 h-4 shrink-0" />
              <span className="font-bold text-sm">
                {gameTime.getMonth() + 1}月{String(gameTime.getDate()).padStart(2, '0')}日 {gameTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </PopCard>
            <div className="flex gap-2">
              <PopCard 
                onClick={() => setIsMapOpen(true)}
                className="py-1 px-3 flex items-center gap-2 bg-pop-yellow clip-diagonal shadow-pop-cyan cursor-pointer hover:scale-105 transition-transform flex-1"
              >
                <MapPin className="w-4 h-4 shrink-0" />
                <span className="font-bold text-sm">沈家别墅</span>
              </PopCard>
              <PopCard 
                onClick={() => setIsEyeCareMode(!isEyeCareMode)}
                className={`py-1 px-3 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform clip-diagonal ${isEyeCareMode ? 'bg-[#cce3de] text-[#2c3e50]' : 'bg-gray-200 text-gray-700'}`}
                title="护眼模式"
              >
                {isEyeCareMode ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </PopCard>
            </div>
          </div>

          {/* Center: Debt Progress */}
          <PopCard skew className="flex-grow flex flex-col justify-center bg-pop-black text-white p-2 pointer-events-auto border-pop-pink shadow-pop-pink relative overflow-hidden">
            <div className="absolute inset-0 bg-halftone opacity-50"></div>
            <div className="relative z-10 flex justify-between items-end mb-1">
              <span className="text-pop-pink font-black text-xl text-stroke-sm italic">REMAINING DEBT</span>
              <span className="text-2xl md:text-3xl font-black text-pop-yellow drop-shadow-[2px_2px_0_#ff3366]">
                ¥{(totalDebt - currentPaid).toLocaleString()}
              </span>
            </div>
            <div className="h-4 w-full bg-white pop-border clip-diagonal relative overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-stripes-cyan-pink"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, type: "spring" }}
              />
            </div>
          </PopCard>

          {/* Right / Bottom: Current Service */}
          <div className="flex flex-row md:flex-col gap-2 shrink-0 pointer-events-auto relative overflow-hidden min-w-[200px]">
            <AnimatePresence mode="wait">
              {!currentOrder ? (
                <motion.div
                  key="none"
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 50, opacity: 0 }}
                  className="h-full flex flex-col gap-2"
                >
                  <PopCard className="py-2 px-3 flex items-center justify-center gap-2 bg-pop-black text-gray-400 clip-diagonal border-2 border-gray-600 shadow-none h-full">
                     <span className="font-bold text-sm">当前任务: 无</span>
                  </PopCard>
                </motion.div>
              ) : (
                <motion.div
                  key="active"
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 50, opacity: 0 }}
                  className="h-full flex flex-col gap-2"
                >
                  <PopCard className="py-1 px-3 flex items-center gap-2 bg-pop-pink clip-diagonal border-2 border-pop-black shadow-[2px_2px_0_#1a1a1a]">
                    <User className="w-4 h-4 shrink-0 text-white" />
                    <span className="font-bold text-sm text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] whitespace-nowrap overflow-hidden text-ellipsis">当前: {currentOrder.charName}</span>
                  </PopCard>
                  <PopCard className="py-1 px-3 flex items-center gap-2 bg-white clip-diagonal border-2 border-pop-black shadow-[2px_2px_0_#1a1a1a] text-pop-pink">
                    <Briefcase className="w-4 h-4 shrink-0 text-pop-black" />
                    <span className="font-bold text-sm text-pop-black whitespace-nowrap overflow-hidden text-ellipsis">{currentOrder.task}</span>
                  </PopCard>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>

      <AnimatePresence>
        <CalendarModal key="calendar" />
        <MapModal key="map" />
      </AnimatePresence>
    </>
  );
}