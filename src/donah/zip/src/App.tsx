import React, { useState, useEffect } from 'react';
import { User, Smartphone, Settings, Gift } from 'lucide-react';
import { Character, ModalType } from './types';
import { Header } from './components/game/Header';
import { CharacterDisplay } from './components/game/CharacterDisplay';
import { DialogueBox } from './components/game/DialogueBox';
import { SideMenu } from './components/game/SideMenu';
import { Modal } from './components/ui/Modal';
import { ProfileModal } from './components/modals/ProfileModal';
import { PhoneModal } from './components/modals/PhoneModal';
import { SettingsModal } from './components/modals/SettingsModal';
import { InventoryModal } from './components/modals/InventoryModal';
import { NotificationProvider, useNotification } from './contexts/NotificationContext';
import { ToastContainer } from './components/ui/Toast';

const defaultCharacter: Character = {
  id: 'rin-01',
  name: '星野 凛',
  title: 'HOSHINO RIN',
  age: 19,
  affection: 65,
  mood: 80,
  energy: 45,
  tags: ['傲娇', '黑客', '赛博朋克'],
  description: '在地下网络中有着代号的天才少女。表面上性格冷淡，但实际上非常在意周围人的看法。最近似乎对你产生了某种特殊的兴趣。'
};

const Game: React.FC = () => {
  const [activeModal, setActiveModal] = useState<ModalType>('none');
  const [character] = useState<Character>(defaultCharacter);
  const { addNotification } = useNotification();

  // Initial greeting notification
  useEffect(() => {
    setTimeout(() => {
      addNotification('系统登录成功。已连接至星野 凛的终端。', 'success');
    }, 1000);
    setTimeout(() => {
      addNotification('检测到情绪波动，建议进行对话。', 'info');
    }, 4000);
  }, [addNotification]);

  const handleOpenModal = (type: ModalType) => {
    if (type === 'none') {
      addNotification('该功能尚未解锁。', 'warning');
      return;
    }
    setActiveModal(type);
  };

  const modalConfig = {
    profile: { title: 'PROFILE // 档案', icon: <User size={24} className="text-pop-cyan" />, content: <ProfileModal character={character} /> },
    phone: { title: 'TERMINAL // 终端通讯', icon: <Smartphone size={24} className="text-pop-pink" />, content: <PhoneModal /> },
    settings: { title: 'SYSTEM // 系统设置', icon: <Settings size={24} className="text-white" />, content: <SettingsModal /> },
    inventory: { title: 'INVENTORY // 物品库', icon: <Gift size={24} className="text-pop-cyan" />, content: <InventoryModal /> },
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-pop-dark font-sans selection:bg-pop-pink selection:text-white">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-halftone" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(10,10,18,1)_100%)] pointer-events-none z-0" />
      
      {/* Game UI */}
      <Header character={character} />
      <CharacterDisplay />
      <SideMenu onOpenModal={handleOpenModal} />
      <DialogueBox 
        name={character.name} 
        text="你还要盯着我看多久？如果要说话就快点，我可是很忙的……（虽然也没什么要紧事就是了）"
      />
      <ToastContainer />

      {/* Modals */}
      {activeModal !== 'none' && modalConfig[activeModal] && (
        <Modal
          isOpen={true}
          onClose={() => setActiveModal('none')}
          title={modalConfig[activeModal].title}
          headerIcon={modalConfig[activeModal].icon}
        >
          {modalConfig[activeModal].content}
        </Modal>
      )}
      
      {/* Global CRT overlay */}
      <div className="absolute inset-0 crt pointer-events-none" />
    </div>
  );
};

export default function App() {
  return (
    <NotificationProvider>
      <Game />
    </NotificationProvider>
  );
}
