export const CALENDAR_EVENTS = [
  { month: 1, day: 1, title: "元旦假期", type: "holiday", chars: [] },
  { month: 1, day: 9, title: "沈千金 生日", type: "birthday", chars: ["沈千金"] },
  { month: 2, day: 14, title: "情人节", type: "holiday", chars: [] },
  { month: 2, day: 26, title: "裴今歌 被找回日", type: "memory", chars: ["裴今歌"] },
  { month: 3, day: 12, title: "温知晚 生日", type: "birthday", chars: ["温知晚"] },
  { month: 3, day: 14, title: "白色情人节", type: "holiday", chars: [] },
  { month: 3, day: 15, title: "步玲燕 开摊日", type: "memory", chars: ["步玲燕"] },
  { month: 3, day: 29, title: "霍千黎 首次店赛冠军日", type: "memory", chars: ["霍千黎"] },
  { month: 4, day: 1, title: "步玲燕 生日", type: "birthday", chars: ["步玲燕"] },
  { month: 4, day: 3, title: "周念安 父亲忌日", type: "memory", chars: ["周念安"] },
  { month: 4, day: 9, title: "裴今歌 杀青日", type: "memory", chars: ["裴今歌"] },
  { month: 4, day: 15, title: "罗兰 生日", type: "birthday", chars: ["罗兰"] },
  { month: 5, day: 4, title: "周念安 分手日", type: "memory", chars: ["周念安"] },
  { month: 5, day: 17, title: "沈千金 小发卡日", type: "memory", chars: ["沈千金"] },
  { month: 6, day: 8, title: "罗兰 全法优胜日", type: "memory", chars: ["罗兰"] },
  { month: 6, day: 21, title: "裴今歌 生日", type: "birthday", chars: ["裴今歌"] },
  { month: 7, day: 1, title: "姜朝渔 正式接任董事长", type: "memory", chars: ["姜朝渔"] },
  { month: 7, day: 14, title: "椎名律 生日", type: "birthday", chars: ["椎名律"] },
  { month: 7, day: 22, title: "季明舒 生日", type: "birthday", chars: ["季明舒"] },
  { month: 8, day: 2, title: "傅霁 生日", type: "birthday", chars: ["傅霁"] },
  { month: 8, day: 14, title: "裴今歌 走失日", type: "memory", chars: ["裴今歌"] },
  { month: 8, day: 20, title: "罗兰 杜兰达尔三世命名日", type: "memory", chars: ["罗兰"] },
  { month: 9, day: 1, title: "罗兰 回国日", type: "memory", chars: ["罗兰"] },
  { month: 9, day: 3, title: "姜朝渔 生日", type: "birthday", chars: ["姜朝渔"] },
  { month: 9, day: 7, title: "椎名律 第一碗麻辣烫", type: "memory", chars: ["椎名律"] },
  { month: 9, day: 12, title: "季明舒 咖啡馆初遇日", type: "memory", chars: ["季明舒"] },
  { month: 9, day: 19, title: "温知晚 手机归还日", type: "memory", chars: ["温知晚"] },
  { month: 9, day: 26, title: "周念安 交往纪念日", type: "memory", chars: ["周念安"] },
  { month: 10, day: 7, title: "温知晚 深夜消息日", type: "memory", chars: ["温知晚"] },
  { month: 10, day: 8, title: "破产日", type: "memory", chars: ["沈千金"] },
  { month: 10, day: 20, title: "姜朝渔 初遇裴今歌", type: "memory", chars: ["姜朝渔", "裴今歌"] },
  { month: 10, day: 23, title: "傅霁 白兔先生诞生日", type: "memory", chars: ["傅霁"] },
  { month: 10, day: 31, title: "万圣节", type: "holiday", chars: [] },
  { month: 11, day: 11, title: "双十一", type: "holiday", chars: [] },
  { month: 11, day: 18, title: "周念安 生日", type: "birthday", chars: ["周念安"] },
  { month: 11, day: 22, title: "椎名律 禁赛日", type: "memory", chars: ["椎名律"] },
  { month: 12, day: 5, title: "霍千黎 生日/婚约日", type: "birthday", chars: ["霍千黎"] },
  { month: 12, day: 11, title: "姜朝渔 母亲忌日", type: "memory", chars: ["姜朝渔"] },
  { month: 12, day: 24, title: "平安夜", type: "holiday", chars: [] },
  { month: 12, day: 25, title: "圣诞节", type: "holiday", chars: [] },
  { month: 12, day: 31, title: "跨年夜", type: "holiday", chars: [] },
];

export const MAP_LOCATIONS = [
  {
    category: "校内",
    name: "教学楼A区",
    desc: "北侧五层，窄走廊，阶梯大教室。上午人多。",
    chars: ["周念安", "步玲燕"]
  },
  {
    category: "校内",
    name: "教学楼B区",
    desc: "中部偏南，六层，中庭天井，一楼自动贩卖机。",
    chars: ["千金", "季明舒", "霍千黎"]
  },
  {
    category: "校内",
    name: "教学楼C区",
    desc: "南侧，四层，顶楼开放画室，走廊作品展。",
    chars: ["傅霁", "季明舒"]
  },
  {
    category: "校内",
    name: "艺术楼",
    desc: "东侧，五层。二楼排练厅，三楼练功房，五楼琴房。",
    chars: ["温知晚", "椎名律"]
  },
  {
    category: "校内",
    name: "自习室C204",
    desc: "教学楼C区二楼，靠窗，可见银杏树。",
    chars: ["温知晚"]
  },
  {
    category: "校内",
    name: "食堂一楼",
    desc: "中部，大众菜，价格低，嘈杂。",
    chars: ["周念安", "步玲燕"]
  },
  {
    category: "校内",
    name: "食堂二楼",
    desc: "中部，小炒和特色窗口，有靠窗座位。",
    chars: ["千金", "椎名律", "季明舒"]
  },
  {
    category: "校内",
    name: "图书馆",
    desc: "中心四层。二楼文史哲，三楼经管法学，四楼自习。",
    chars: ["千金", "周念安"]
  },
  {
    category: "校内",
    name: "校门口便利店",
    desc: "西门外右转20米，24小时，有休息区。",
    chars: ["椎名律"]
  },
  {
    category: "校内",
    name: "东区路灯步道",
    desc: "宿舍区至艺术楼，银杏夹道，暖黄路灯。",
    chars: ["温知晚"]
  },
  {
    category: "校内",
    name: "校内操场",
    desc: "西侧，400米跑道，内圈足球场，看台可坐人。",
    chars: []
  },
  {
    category: "校内",
    name: "西区宿舍楼",
    desc: "西北侧，标准四人间。",
    chars: ["步玲燕"]
  },
  {
    category: "周边",
    name: "沈家别墅",
    desc: "西门外高档住宅区，三层独栋，带前后院。",
    chars: ["千金", "裴今歌", "姜朝渔"]
  },
  {
    category: "周边",
    name: "鹿角奶茶店",
    desc: "西门外商业街。二楼落地窗，暖色调装修。",
    chars: []
  },
  {
    category: "周边",
    name: "二十四帧电影院",
    desc: "西门商业街尽头，四厅小型影院。",
    chars: []
  },
  {
    category: "周边",
    name: "辣当家麻辣烫",
    desc: "西门外小巷，十几平米，老板话少。",
    chars: ["椎名律"]
  },
  {
    category: "周边",
    name: "大学城公园",
    desc: "北门外，人工湖，环湖步道，长椅。",
    chars: []
  },
  {
    category: "周边",
    name: "傅霁公寓",
    desc: "西门外普通公寓6楼，30平密码锁，窗帘常拉。",
    chars: ["傅霁"]
  },
  {
    category: "周边",
    name: "落日居酒屋",
    desc: "大学城商业街，日式装修，木质隔间带布帘。",
    chars: []
  },
  {
    category: "周边",
    name: "霍罗同居公寓",
    desc: "东门外高档公寓区18层，有开放式厨房。",
    chars: ["霍千黎", "罗兰"]
  },
  {
    category: "周边",
    name: "龙与骰子桌游卡牌店",
    desc: "大学城商业街地下二层，门面隐蔽。",
    chars: ["霍千黎"]
  },
  {
    category: "周边",
    name: "南门小吃街",
    desc: "南门外步行3分钟，露天摊贩，油烟常驻。",
    chars: ["步玲燕"]
  },
  {
    category: "市内",
    name: "回头草咖啡",
    desc: "城东商业区，街角二十平米，老板娘拉花很好。",
    chars: ["周念安"]
  },
  {
    category: "市内",
    name: "云顶商场",
    desc: "市中心六层，美食、服装、电影、溜冰、顶楼露台。",
    chars: []
  },
  {
    category: "市内",
    name: "姜朝渔住所",
    desc: "市中心高层32楼，150平三室两厅，指纹锁。",
    chars: ["姜朝渔"]
  },
  {
    category: "市内",
    name: "姜氏集团总部",
    desc: "CBD核心区独栋写字楼，45层。",
    chars: ["姜朝渔"]
  },
  {
    category: "市内",
    name: "利刃击剑会所",
    desc: "市中心，会员制私密性强。",
    chars: ["姜朝渔"]
  },
  {
    category: "市内",
    name: "铁砧HEMA兵击俱乐部",
    desc: "城郊旧厂房改造区，铺设专业防滑垫。",
    chars: ["罗兰"]
  },
  {
    category: "市内",
    name: "市立音乐厅",
    desc: "城北文化区，1200座。",
    chars: ["椎名律"]
  },
  {
    category: "市内",
    name: "星河乐园",
    desc: "城南，过山车、摩天轮、晚间花车巡游。",
    chars: []
  },
  {
    category: "市内",
    name: "裴今歌住所",
    desc: "市中心高档小区，两层复式，一楼有投影仪。",
    chars: ["裴今歌"]
  },
  {
    category: "市内",
    name: "季明舒公寓",
    desc: "市中心高档住宅区，120平两室一厅，卧室常乱。",
    chars: ["季明舒"]
  },
  {
    category: "市内",
    name: "市立福利院",
    desc: "城西民政区，收容孤儿及困境儿童。",
    chars: ["季明舒"]
  }
];
