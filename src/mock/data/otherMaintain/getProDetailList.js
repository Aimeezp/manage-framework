import Mock from 'mockjs';


// const record = [];
const demoList = [
  {
    proCompany: 'SMOKE',
    proCount: '烟感',
    DMPCount: 'http://127.0.0.1:8080/yg/1',
    DMP标签: 'aaa',
    status: '1',
    createTime: '2018-12:20',
  },
  {
    proCompany: 'SMOKE',
    proCount: '烟感',
    DMPCount: 'http://127.0.0.1:8080/yg/1',
    DMP标签: 'aaa',
    status: '1',
    createTime: '2018-12:20',
  },
  {
    proCompany: 'SMOKE',
    proCount: '烟感',
    DMPCount: 'http://127.0.0.1:8080/yg/1',
    DMP标签: 'aaa',
    status: '1',
    createTime: '2018-12:20',
  },
  {
    proCompany: 'SMOKE',
    proCount: '烟感',
    DMPCount: 'http://127.0.0.1:8080/yg/1',
    DMP标签: 'aaa',
    status: '1',
    createTime: '2018-12:20',
  },
];
const deviceList = [];
for (let n = 0; n < 100; n += 1) {
  deviceList.push(Mock.mock(demoList[parseInt(Math.random() * 4, 10)]));
}

for (let i = 0; i < deviceList.length; i += 1) {
  deviceList[i].id = parseInt(Math.random() * 5, 10);
}
// for (let i = 0; i < 300; i += 1) {
//   const param = {
//     proCompany: deviceList[i].proCompany,
//     proCount: deviceList[i].proCount,
//     DMPCount: deviceList[i].DMPCount,
//     DMPTag: deviceList[i].DMPTag,
//     status: deviceList[i].status,
//     createTime: deviceList[i].createTime,
//     id: deviceList[i].id,
//   };
//   record.push(Mock.mock(param));
// }
export default deviceList;

