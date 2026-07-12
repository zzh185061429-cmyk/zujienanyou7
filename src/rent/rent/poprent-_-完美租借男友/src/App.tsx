import { useState } from 'react';
import { motion } from 'motion/react';
import { HEROINES_DATA } from './data';
import { Heroine } from './types';
import HeroineCard from './components/HeroineCard';
import ChatInterface from './components/ChatInterface';
import CharacterModal from './components/CharacterModal';
import { NotificationProvider, useNotification } from './components/NotificationSystem';
import { UserCircle, Wallet, LayoutGrid, MessageSquare, Bell } from 'lucide-react';

function AppContent() {
  const [activeTab, setActiveTab] = useState<'roster' | 'messages' | 'profile'>('roster');
  const [activeChat, setActiveChat] = useState<Heroine | null>(null);
  const [selectedHeroine, setSelectedHeroine] = useState<Heroine | null>(null);
  const { notify } = useNotification();

  // Mock player stats
  const playerStats = {
    money: 1250000,
    charm: 85,
    stamina: 100,
  };

  const handleOpenChat = (heroine: Heroine) => {
    setActiveChat(heroine);
  };

  return (
    <div className="flex h-screen w-full bg-halftone font-sans text-gray-900 overflow-hidden">
      
      {/* PC Side Navigation / Mobile Bottom Bar (Hidden when chatting on mobile) */}
      <nav className={`
        ${activeChat ? 'hidden md:flex' : 'flex'}
        flex-col justify-between fixed bottom-0 w-full h-16 bg-white border-t-4 border-black z-40
        md:relative md:w-64 md:h-full md:border-t-0 md:border-r-4
      `}>
        {/* Logo Area (PC only) */}
        <div className="hidden md:flex flex-col items-center justify-center py-8 border-b-4 border-black bg-[#FFD600]">
          <h1 className="font-display text-4xl font-black uppercase text-stroke pop-shadow-sm rotate-[-2deg]">
            PopRent
          </h1>
          <p className="font-bold text-xs mt-2 bg-black text-white px-2 uppercase">男友派遣系统</p>
        </div>

        {/* Nav Links */}
        <div className="flex flex-row justify-around items-center h-full md:flex-col md:justify-start md:p-4 md:gap-4 md:flex-1">
          <NavBtn icon={<LayoutGrid />} label="接单大厅" active={activeTab === 'roster'} onClick={() => setActiveTab('roster')} />
          <NavBtn icon={<MessageSquare />} label="私信联络" active={activeTab === 'messages'} onClick={() => setActiveTab('messages')} />
          <NavBtn icon={<UserCircle />} label="我的属性" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
        </div>

        {/* Player Mini Stats (PC only) */}
        <div className="hidden md:block p-4 border-t-4 border-black bg-white">
           <div className="flex items-center gap-2 mb-2">
             <Wallet className="w-5 h-5 text-black" />
             <span className="font-bold font-display text-xl text-black">¥{playerStats.money.toLocaleString()}</span>
           </div>
           <motion.button 
             whileTap={{ scale: 0.95 }}
             onClick={() => notify({ title: '提现失败', message: '系统维护中，资金暂时冻结！', type: 'error' })}
             className="w-full py-2 bg-[#00E5FF] pop-border pop-shadow-sm font-bold uppercase text-sm"
           >
             提取收益
           </motion.button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full relative overflow-hidden pb-16 md:pb-0">
        
        {/* Mobile Header (Hidden when chatting) */}
        {!activeChat && (
          <header className="md:hidden flex items-center justify-between p-4 bg-white border-b-4 border-black z-30 shrink-0">
             <h1 className="font-display text-2xl font-black uppercase text-stroke-sm bg-[#FFD600] px-2 pop-border transform -rotate-2 inline-block">
               PopRent
             </h1>
             <div className="flex gap-3">
               <div className="flex items-center gap-1 font-bold">
                 <Wallet className="w-4 h-4" /> ¥{(playerStats.money/1000).toFixed(1)}k
               </div>
               <button onClick={() => notify({ title: '系统通知', message: '有新的客户指名了你！', type: 'info' })}>
                 <Bell className="w-5 h-5" />
               </button>
             </div>
          </header>
        )}

        {/* Content Views */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-4 md:p-8 relative">
          
          {/* Default Roster View */}
          {activeTab === 'roster' && !activeChat && (
            <div className="max-w-5xl mx-auto">
              <div className="flex justify-between items-end mb-6 md:mb-10">
                <div>
                  <h2 className="font-display text-3xl md:text-5xl font-black uppercase tracking-tight">客户名录 (Roster)</h2>
                  <p className="font-bold text-sm text-gray-600 uppercase mt-1">选择目标客户进行服务</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {HEROINES_DATA.map((heroine, i) => (
                  <motion.div
                    key={heroine.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, type: 'spring' }}
                  >
                    <HeroineCard 
                      heroine={heroine} 
                      onClick={setSelectedHeroine}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Placeholder for other tabs */}
          {(activeTab === 'messages' || activeTab === 'profile') && !activeChat && (
             <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-24 h-24 bg-white pop-border pop-shadow flex items-center justify-center mb-6 transform rotate-6">
                   <div className="w-16 h-16 border-4 border-dashed border-gray-300 animate-spin-slow"></div>
                </div>
                <h2 className="font-display text-3xl font-bold uppercase mb-2">模块开发中</h2>
                <p className="font-bold text-gray-500">UI/UX Pro Max 正在全力以赴构建此页面...</p>
             </div>
          )}
          
        </div>

        {/* Chat Overlay Modal - Handles its own mobile/desktop responsive layout */}
        <AnimatePresence>
          {activeChat && (
            <div className="absolute inset-0 z-40 md:static md:inset-auto md:w-2/3 lg:w-1/2 md:absolute md:right-0 md:h-full">
              <ChatInterface 
                heroine={activeChat} 
                onBack={() => setActiveChat(null)} 
              />
            </div>
          )}
        </AnimatePresence>

      </main>

      {/* Character Detail Modal */}
      <CharacterModal 
        heroine={selectedHeroine!} 
        isOpen={!!selectedHeroine} 
        onClose={() => setSelectedHeroine(null)}
        onChat={(h) => {
          setActiveTab('messages');
          handleOpenChat(h);
        }}
      />
    </div>
  );
}

// Nav Button Component
function NavBtn({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={`
        flex flex-col md:flex-row items-center gap-1 md:gap-3 p-2 md:p-3 w-full rounded md:rounded-none
        transition-colors relative overflow-hidden group
        ${active ? 'text-black md:bg-[#FFD600] md:pop-border md:pop-shadow-sm' : 'text-gray-500 hover:text-black'}
      `}
    >
      <div className={`relative z-10 ${active ? 'scale-110 md:scale-100' : ''} transition-transform`}>
        {icon}
      </div>
      <span className={`text-[10px] md:text-sm font-bold uppercase z-10 ${active ? 'opacity-100' : 'opacity-70'}`}>
        {label}
      </span>
      {/* Mobile Active Indicator */}
      {active && <div className="md:hidden absolute top-0 w-8 h-1 bg-[#FF007F] rounded-b-md" />}
    </motion.button>
  );
}

export default function App() {
  return (
    <NotificationProvider>
      <AppContent />
    </NotificationProvider>
  );
}
