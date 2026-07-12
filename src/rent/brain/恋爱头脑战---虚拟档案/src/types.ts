export type Screen = 'title' | 'game';
export type ModalType = 'none' | 'character' | 'archive' | 'settings';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'info' | 'success' | 'warning' | 'error';
}

export interface Character {
  id: string;
  name: string;
  title: string;
  avatar: string; // URL or placeholder
  affection: number; // 0-100
  intelligence: number; // 0-100
  charm: number; // 0-100
  wealth: number; // 0-100
  status: string;
}

export interface Message {
  id: string;
  senderId: 'player' | 'system' | string;
  text: string;
  timestamp: Date;
}
