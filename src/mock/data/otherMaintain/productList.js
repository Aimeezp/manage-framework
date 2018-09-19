import Mock from 'mockjs';


const record = [];
const deviceList = [
  {
    type: 'SMOKE',
    name: '烟感',
    callback: 'http://127.0.0.1:8080/yg/1',
  },
  {
    type: 'JG',
    name: '井盖',
    callback: 'http://127.0.0.1:8080/jg/1',
  },
  {
    type: 'MC',
    name: '门磁',
    callback: 'http://127.0.0.1:8080/yg/1',
  },
  {
    type: 'WG',
    name: '温感',
    callback: 'http://127.0.0.1:8080/jg/1',
  },
];
for (let i = 0; i < 300; i += 1) {
  const param = {
    deviceType: deviceList[parseInt(Math.random() * 4, 10)].type,
    typeName: deviceList[parseInt(Math.random() * 4, 10)].name,
    passCount: deviceList[parseInt(Math.random() * 4, 10)].callback,
  };
  record.push(Mock.mock(param));
}
for (let i = 0; i < record.length; i += 1) {
  record[i].id = i;
}
export default record;

