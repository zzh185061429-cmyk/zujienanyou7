import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Map as MapIcon, MapPin, Building, Trees, Coffee } from "lucide-react";
import { useGameContext } from "../../state/GameContext";
import { MAP_LOCATIONS } from "../../data/gameData";

const CATEGORIES = [
  { id: "校内", icon: Building, color: "bg-pop-cyan text-pop-black" },
  { id: "周边", icon: Trees, color: "bg-pop-yellow text-pop-black" },
  { id: "市内", icon: Coffee, color: "bg-pop-pink text-white" }
];

const ALL_CHARS = ["温知晚", "周念安", "傅霁", "椎名律", "姜朝渔", "裴今歌", "罗兰", "霍千黎", "季明舒", "步玲燕", "沈千金"];

export function MapModal() {
  const { isMapOpen, setIsMapOpen, mapFocusLocation, currentOrder } = useGameContext();
  const [activeTab, setActiveTab] = useState("校内");

  // Dynamically place characters so they don't appear in random places while serving
  const dynamicLocations = useMemo(() => {
    const locations = JSON.parse(JSON.stringify(MAP_LOCATIONS)) as typeof MAP_LOCATIONS;
    locations.forEach(l => l.chars = []);

    const seed = new Date().getHours() + new Date().getDate();

    ALL_CHARS.forEach((char, index) => {
      if (currentOrder && currentOrder.charName.includes(char)) {
        const orderLoc = currentOrder.location || "";
        const targetLoc = locations.find(l => orderLoc.includes(l.name) || l.name.includes(orderLoc));
        if (targetLoc) {
          targetLoc.chars.push(`${char} (正在服务)`);
        } else {
           locations[0].chars.push(`${char} (正在服务)`);
        }
      } else if (char === "沈千金") {
        // Lock Shen Qianjin to Shen Family Villa or Protagonist's side
        const villa = locations.find(l => l.name === "沈家别墅");
        if (villa) {
          villa.chars.push(char);
        } else {
          locations[0].chars.push(char);
        }
      } else {
        const randomLocIndex = (seed * 17 + index * 31) % locations.length;
        locations[randomLocIndex].chars.push(char);
      }
    });

    return locations;
  }, [currentOrder]);

  useEffect(() => {
    if (isMapOpen && mapFocusLocation) {
      const loc = dynamicLocations.find(l => l.name.includes(mapFocusLocation) || mapFocusLocation.includes(l.name));
      if (loc) {
        setActiveTab(loc.category);
      }
    }
  }, [isMapOpen, mapFocusLocation, dynamicLocations]);

  if (!isMapOpen) return null;

  const filteredLocations = dynamicLocations.filter(l => l.category === activeTab);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-pop-black/80 backdrop-blur-sm"
        onClick={() => setIsMapOpen(false)}
      />
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="relative w-full max-w-4xl bg-white pop-border shadow-[8px_8px_0_#ffcc00] z-10 flex flex-col overflow-hidden clip-diagonal max-h-[90vh]"
      >
        <div className="bg-pop-yellow text-pop-black p-4 flex justify-between items-center border-b-4 border-pop-black">
          <div className="flex items-center gap-2">
            <MapIcon className="w-6 h-6 shrink-0" />
            <h3 className="text-2xl font-black italic uppercase">City Map / 地点索引</h3>
          </div>
          <button 
            onClick={() => setIsMapOpen(false)}
            className="bg-pop-black text-white p-2 hover:scale-110 active:scale-90 transition-transform clip-diagonal shadow-[2px_2px_0_#ff3366]"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col md:flex-row h-full overflow-hidden bg-stripes-cyan-pink">
          {/* Sidebar Tabs */}
          <div className="flex md:flex-col bg-pop-black p-4 gap-2 overflow-x-auto shrink-0 border-b-4 md:border-b-0 md:border-r-4 border-pop-black z-20 shadow-pop-lg">
            {CATEGORIES.map(cat => {
              const Icon = cat.icon;
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`px-4 py-3 font-black text-lg flex items-center gap-2 clip-diagonal transition-all whitespace-nowrap md:whitespace-normal
                    ${isActive ? `${cat.color} shadow-[4px_4px_0_#fff] scale-105 ml-0 md:ml-2` : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}
                  `}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  {cat.id}
                </button>
              );
            })}
          </div>

          {/* Location List */}
          <div className="flex-1 p-4 md:p-6 overflow-y-auto hide-scrollbar relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredLocations.map((loc, idx) => {
                const isFocused = mapFocusLocation && (loc.name.includes(mapFocusLocation) || mapFocusLocation.includes(loc.name));
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`bg-white border-4 border-pop-black p-4 shadow-[4px_4px_0_#1a1a1a] clip-diagonal flex flex-col
                      ${isFocused ? 'ring-4 ring-pop-pink ring-offset-4 animate-pulse-slow' : ''}
                    `}
                  >
                    <div className="flex items-start gap-2 mb-2">
                      <MapPin className={`w-5 h-5 shrink-0 mt-0.5 ${isFocused ? 'text-pop-pink' : 'text-pop-cyan'}`} />
                      <h4 className="text-xl font-black">{loc.name}</h4>
                    </div>
                    <p className="text-sm font-bold text-gray-600 mb-4 flex-grow">
                      {loc.desc}
                    </p>
                    {loc.chars.length > 0 && (
                      <div className="mt-auto pt-3 border-t-2 border-dashed border-gray-200 flex flex-wrap gap-1">
                        {loc.chars.map(char => (
                          <span key={char} className="text-xs font-bold bg-pop-black text-pop-yellow px-2 py-0.5 -skew-x-6 inline-block">
                            {char}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
