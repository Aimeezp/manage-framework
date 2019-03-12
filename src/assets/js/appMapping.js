// 前后台设备类型对应关系
export const appMapping = {
  smoke: 'smoke-sensor', // 烟感
  environment: 'env-monitor', // 环境
  cover: 'well-cover', // 井盖
  doorlock: 'door-monitor', // 门磁
  dust: 'area-dust-monitor', // 扬尘
  dustbin: 'dustbin', // 垃圾箱
  infraRed: 'infra-red', // 红外
  lift: 'lift', // 电梯
  alarmBtn: 'alarm-btn', // 一键告警
  geoMonitor: 'geo-mnt', // 地磁
  hydrant: 'fire-hydrant', // 栓帽 无
  firePressure: 'fire-pressure', // 水压
  airQuality: 'air-quality',
  gasMonitor: 'gas-monitor',
  light: 'light',
  temperature: 'temperature',
  h2s: 'h2s',
  nh3: 'nh3',
  noise: 'noise',
  ultrasonic: 'ultrasonic',
  water: 'water-monitor',
};
export const deviceTypeTxtMapping = {
  smoke: 'panpan',
  environment: 'dingding',
  cover: 'liangliang',
  doorlock: '门磁',
  dust: '扬尘',
  dustbin: '垃圾箱',
  infraRed: '红外',
  lift: '电梯',
  alarmBtn: '一键告警',
  geoMonitor: '地磁',
  hydrant: '栓帽',
  firePressure: '水压',
  airQuality: '空气监测',
  gasMonitor: '燃气',
  light: '灯杆',
  temperature: '温感',
  h2s: '硫化氢监测',
  nh3: '氨气监测',
  noise: '噪声',
  ultrasonic: '超声波',
  water: '水质监测',
};
export const valueArr = Object.values(appMapping);
export const keyArr = Object.keys(appMapping);
export const deviceTypeTxt = Object.values(deviceTypeTxtMapping);

