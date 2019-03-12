import Mock from 'mockjs';

const record = [];
const equipType = ['smoke-sensor', 'env-monitor', 'well-cover'];
const nameArr = ['丁丁', '亮亮', '盼盼'];
for (let i = 0; i < 100; i += 1) {
  const list = {
    deviceNum: parseInt((Math.random() * (10 * 3)), 10),
    onlineNum: parseInt((Math.random() * 10), 10),
    deviceType: equipType[parseInt((Math.random() * 3), 10)],
    category: nameArr[parseInt((Math.random() * 3), 10)],
  };
  record.push(Mock.mock(list));
}
export default record;
