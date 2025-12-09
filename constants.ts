import { Spot, HeatmapDataPoint } from './types';

// The 19 major spots on the Beijing Central Axis (North to South roughly)
export const LOCATIONS: Spot[] = [
  { id: 1, name: "钟楼", x: 500, y: 100, description: "北京中轴线的最北端，报时中心。", recommendedTimes: ["09:00-10:00", "15:00-16:00"], crowdLevel: 'low' },
  { id: 2, name: "鼓楼", x: 500, y: 150, description: "与钟楼纵横呼应，古代报时建筑。", recommendedTimes: ["09:30-10:30"], crowdLevel: 'moderate' },
  { id: 3, name: "万宁桥", x: 500, y: 220, description: "元代古桥，扼守什刹海咽喉。", recommendedTimes: ["All Day"], crowdLevel: 'low' },
  { id: 4, name: "景山公园", x: 500, y: 300, description: "曾为北京城最高点，俯瞰紫禁城。", recommendedTimes: ["06:30-08:30", "16:30-18:00"], crowdLevel: 'high' },
  { id: 5, name: "故宫北门(神武门)", x: 500, y: 380, description: "紫禁城北门。", recommendedTimes: ["14:00-16:00"], crowdLevel: 'high' },
  { id: 6, name: "故宫博物院", x: 500, y: 450, description: "明清两代皇宫，世界文化遗产。", recommendedTimes: ["08:30-09:30"], crowdLevel: 'high' },
  { id: 7, name: "故宫南门(午门)", x: 500, y: 520, description: "紫禁城正门，颁发诏书之处。", recommendedTimes: ["08:30-10:00"], crowdLevel: 'high' },
  { id: 8, name: "端门", x: 500, y: 560, description: "存放皇帝仪仗之处。", recommendedTimes: ["09:00-16:00"], crowdLevel: 'moderate' },
  { id: 9, name: "天安门", x: 500, y: 600, description: "中华人民共和国的象征。", recommendedTimes: ["Early Morning"], crowdLevel: 'high' },
  { id: 10, name: "外金水桥", x: 500, y: 630, description: "天安门前的汉白玉石桥。", recommendedTimes: ["All Day"], crowdLevel: 'high' },
  { id: 11, name: "天安门广场", x: 500, y: 680, description: "世界上最大的城市中心广场。", recommendedTimes: ["All Day"], crowdLevel: 'high' },
  { id: 12, name: "正阳门", x: 500, y: 750, description: "老北京内城九门之首。", recommendedTimes: ["10:00-15:00"], crowdLevel: 'moderate' },
  { id: 13, name: "正阳门箭楼", x: 500, y: 790, description: "防御性建筑，雄伟壮观。", recommendedTimes: ["10:00-15:00"], crowdLevel: 'moderate' },
  { id: 14, name: "珠市口", x: 500, y: 880, description: "中轴线南段的重要路口。", recommendedTimes: ["All Day"], crowdLevel: 'low' },
  { id: 15, name: "天桥南大街", x: 500, y: 950, description: "老北京民俗文化聚集地。", recommendedTimes: ["Evening"], crowdLevel: 'moderate' },
  { id: 16, name: "天坛公园", x: 300, y: 1000, description: "明清皇帝祭天祈谷之所。", recommendedTimes: ["08:00-10:00"], crowdLevel: 'high' },
  { id: 17, name: "先农坛", x: 700, y: 1000, description: "祭祀先农诸神之所。", recommendedTimes: ["09:00-11:00"], crowdLevel: 'low' },
  { id: 18, name: "永定门御道", x: 500, y: 1080, description: "复建的南中轴御道。", recommendedTimes: ["All Day"], crowdLevel: 'low' },
  { id: 19, name: "永定门", x: 500, y: 1150, description: "中轴线南端起点。", recommendedTimes: ["Evening"], crowdLevel: 'low' },
];

export const MOCK_HEATMAP_DATA: HeatmapDataPoint[] = [
  { time: '06:00', density: 10, predicted: 12 },
  { time: '08:00', density: 35, predicted: 40 },
  { time: '10:00', density: 85, predicted: 80 },
  { time: '12:00', density: 95, predicted: 90 },
  { time: '14:00', density: 80, predicted: 85 },
  { time: '16:00', density: 65, predicted: 60 },
  { time: '18:00', density: 45, predicted: 50 },
  { time: '20:00', density: 20, predicted: 25 },
];

// Palette constants for logic usage
export const COLORS = {
  bg: '#F6DCCE',
  sub: '#FBECDE',
  detailBg: '#B0D5DF',
  detailSub: '#D3EBF2',
  accentRed: '#862617',
  accentBlue: '#191D6B',
};