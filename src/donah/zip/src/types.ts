export interface Character {
  id: string;
  name: string;
  title: string;
  age: number;
  affection: number;
  mood: number;
  energy: number;
  tags: string[];
  description: string;
}

export interface Message {
  id: string;
  sender: 'user' | 'character' | 'system';
  text: string;
  timestamp: string;
}

export interface NotificationState {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
}

export type ModalType = 'none' | 'profile' | 'phone' | 'settings' | 'inventory';
