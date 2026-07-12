export type Screen = 'menu' | 'game';

export interface ToastNotification {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
}

export interface CharacterStats {
  charm: number;
  intellect: number;
  guts: number;
  empathy: number;
  affection: number;
}

export interface Character {
  id: string;
  name: string;
  title: string;
  quote: string;
  stats: CharacterStats;
}

export interface DialogueLine {
  id: string;
  speaker: string;
  text: string;
  type: 'system' | 'character' | 'player';
  timestamp: number;
}
