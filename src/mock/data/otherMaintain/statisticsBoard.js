import Mock from 'mockjs';

const record = [];
for (let i = 0; i < 30; i += 1) {
  const line = {
    deviceNum: parseInt((Math.random() * (10 * 3)), 10),
    onlineNum: parseInt((Math.random() * 10), 10),
    onlineRate: Math.random(),
    online_rate_data_day: parseInt((Math.random() * 10), 10),
    online_rate_data_month: 2,
    online_rate_data_year: 2019,
  };
  record.push(Mock.mock(line));
}
export default record;
