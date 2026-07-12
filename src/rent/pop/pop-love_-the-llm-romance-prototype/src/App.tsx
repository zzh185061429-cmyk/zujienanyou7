import React from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { MainMenu } from './components/screens/MainMenu';
import { GameScreen } from './components/screens/GameScreen';
import { ToastContainer } from './components/ui/ToastContainer';
import { AnimatePresence } from 'motion/react';

const GameOrchestrator: React.FC = () => {
  const { currentScreen } = useGame();

  return (
    <>
      <ToastContainer />
      <AnimatePresence mode="wait">
        {currentScreen === 'menu' && <MainMenu key="menu" />}
        {currentScreen === 'game' && <GameScreen key="game" />}
      </AnimatePresence>
    </>
  );
};

export default function App() {
  return (
    <GameProvider>
      <GameOrchestrator />
    </GameProvider>
  );
}
