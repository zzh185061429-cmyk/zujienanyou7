export interface Heroine {
  id: string;
  name: string;
  title: string;
  age: number;
  job: string;
  themeColor: string; // Tailwind color class string or hex
  accentColor: string;
  quote: string;
  description: string;
  stats: {
    affection: number;
    hourlyRate: number; // Her budget to rent you
    stress: number;
  };
  tags: string[];
  avatarUrl?: string;
  isUnlocked: boolean;
}

export interface NotificationMsg {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

export interface ChatMessage {
  id: string;
  senderId: 'player' | string; // 'player' or heroine id
  text: string;
  timestamp: number;
}
