import Mock from 'mockjs';

const record = [];
// const statusArr = [0, 1];
// const equipType = ['井盖监测器', '烟感报警器'];
// const dmpGrounp = ['烟感', '井盖'];
// const phone = [135, 136, 137, 138, 139, 147, 150, 151, 152, 157, 158, 159, 187, 188,
//   130, 131, 132, 155, 156, 185, 186, 133, 153, 180, 189];
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
