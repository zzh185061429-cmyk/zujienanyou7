import { Heroine } from './types';

export const HEROINES_DATA: Heroine[] = [
  {
    id: 'h_001',
    name: '星野 绫',
    title: '傲娇财阀千金',
    age: 20,
    job: '大学生 / 集团继承人',
    themeColor: 'bg-[#FF007F]', // Pop Pink
    accentColor: 'text-[#FF007F]',
    quote: '"本小姐租你一天，不许拒绝！"',
    description: '表面上对一切都挑剔到了极点，实际上是个极度缺乏安全感、渴望被当作普通女孩对待的财阀千金。总是用金钱来掩饰自己的真心。',
    stats: {
      affection: 45,
      hourlyRate: 50000,
      stress: 80,
    },
    tags: ['傲娇', '富婆', '口是心非'],
    isUnlocked: true,
  },
  {
    id: 'h_002',
    name: '白石 冬马',
    title: '冰山电竞少女',
    age: 19,
    job: '职业电竞选手',
    themeColor: 'bg-[#00E5FF]', // Pop Cyan
    accentColor: 'text-[#00E5FF]',
    quote: '"别发呆，跟上我的节奏。"',
    description: '在赛场上冷酷无情的天才少女，生活中却是个生活九级残废。租借你的理由仅仅是需要一个人帮她按时做饭和打扫房间。',
    stats: {
      affection: 20,
      hourlyRate: 15000,
      stress: 95,
    },
    tags: ['三无', '网瘾少女', '生活白痴'],
    isUnlocked: true,
  },
  {
    id: 'h_003',
    name: '五十岚 樱',
    title: '病娇后辈',
    age: 18,
    job: '高中生',
    themeColor: 'bg-[#B200FF]', // Pop Purple
    accentColor: 'text-[#B200FF]',
    quote: '"学长的时间，我全包了哦。"',
    description: '看似乖巧可爱的学妹，其实暗中掌握了你所有的行程。为了能名正言顺地和你在一起，甚至去打了三份工来支付高额租金。',
    stats: {
      affection: 99,
      hourlyRate: 8000,
      stress: 40,
    },
    tags: ['病娇', '年下', '执着'],
    isUnlocked: true,
  },
  {
    id: 'h_004',
    name: '神宫寺 琴音',
    title: '温婉当红偶像',
    age: 21,
    job: '国民级偶像',
    themeColor: 'bg-[#FFD600]', // Pop Yellow
    accentColor: 'text-[#FFD600]',
    quote: '"嘘，这是只属于我们两人的秘密时间。"',
    description: '在镜头前永远保持完美笑容的国民偶像。只有在租借你的这段时间里，她才能卸下防备，展现出疲惫又真实的自我。',
    stats: {
      affection: 60,
      hourlyRate: 100000,
      stress: 120,
    },
    tags: ['大明星', '温柔', '秘密恋爱'],
    isUnlocked: false,
  }
];

// 模拟初始聊天数据
export const INITIAL_CHATS: Record<string, any[]> = {
  'h_001': [
    { id: 'c1', senderId: 'h_001', text: '喂，明天的行程安排好了吗？', timestamp: Date.now() - 3600000 },
    { id: 'c2', senderId: 'player', text: '已经安排妥当了，大小姐。明天上午去银座，下午喝下午茶。', timestamp: Date.now() - 3500000 },
    { id: 'c3', senderId: 'h_001', text: '哼，勉强算你合格。记得穿上次我给你买的那套西装！', timestamp: Date.now() - 3400000 },
  ]
};
