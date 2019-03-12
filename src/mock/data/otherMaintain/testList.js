import Mock from 'mockjs';

const record = [];
const statusArr = [0, 1];
const equipType = ['井盖监测器', '烟感报警器'];
const dmpGrounp = ['烟感', '井盖'];
const phone = [135, 136, 137, 138, 139, 147, 150, 151, 152, 157, 158, 159, 187, 188,
  130, 131, 132, 155, 156, 185, 186, 133, 153, 180, 189];
for (let i = 0; i < 300; i += 1) {
  const line = {
    id: parseInt((Math.random() * (10 ** 3)), 10),
    projectName: '演示项目',
    address: Mock.Random.county(true),
    unit: '上海联通',
    name: '青浦看守所',
    deviceCount: equipType[parseInt((Math.random() * 2), 10)],
    managerName: '用户雷佳音',
    dmpGrounp: dmpGrounp[parseInt((Math.random() * 2), 10)],
    unusual: statusArr[parseInt((Math.random() * 3), 10)],
    isDone: statusArr[parseInt((Math.random() * 2), 10)],
    hasDevice: parseInt((Math.random() * 2), 10),
    startTime: '2019-3-12',
    passCount: '100%',
    managerMobile: `${phone[parseInt((Math.random() * 24), 10)]}${parseInt((Math.random() * (10 ** 8)), 10)}`,
  };
  record.push(Mock.mock(line));
}

export default record;
