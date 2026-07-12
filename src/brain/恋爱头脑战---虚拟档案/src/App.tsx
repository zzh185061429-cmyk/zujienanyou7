import { useState } from 'react';
import { Screen, ModalType } from './types';
import { TitleScreen } from './components/screens/TitleScreen';
import { GameScreen } from './components/screens/GameScreen';
import { CharacterModal } from './components/modals/CharacterModal';
import { ArchiveModal } from './components/modals/ArchiveModal';
import { SettingsModal } from './components/modals/SettingsModal';
import { ToastProvider, useToast } from './components/ui/ToastContext';

function GameApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('title');
  const [activeModal, setActiveModal] = useState<ModalType>('none');
  const { addToast } = useToast();

  const handleStartGame = () => {
    addToast({
      title: '系统启动',
      description: '正在进入虚拟实境... 祝您好运。',
      type: 'info'
    });
    // Slight delay for dramatic effect
    setTimeout(() => {
      setCurrentScreen('game');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-darker text-light overflow-hidden font-sans">
      {currentScreen === 'title' ? (
        <TitleScreen 
          onStart={handleStartGame} 
          onOpenArchive={() => setActiveModal('archive')}
          onOpenSettings={() => setActiveModal('settings')}
        />
      ) : (
        <GameScreen 
          onOpenCharacter={() => setActiveModal('character')}
          onOpenArchive={() => setActiveModal('archive')}
          onOpenSettings={() => setActiveModal('settings')}
        />
      )}

      {/* Modals */}
      <CharacterModal 
        isOpen={activeModal === 'character'} 
        onClose={() => setActiveModal('none')} 
      />
      <ArchiveModal 
        isOpen={activeModal === 'archive'} 
        onClose={() => setActiveModal('none')} 
      />
      <SettingsModal 
        isOpen={activeModal === 'settings'} 
        onClose={() => setActiveModal('none')} 
      />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <GameApp />
    </ToastProvider>
  );
}
