import Mock from 'mockjs';

const record = [];
// const statusArr = [0, 1];
// const equipType = ['井盖监测器', '烟感报警器'];
const nameArr = ['丁丁', '亮亮', '盼盼'];
// const phone = [135, 136, 137, 138, 139, 147, 150, 151, 152, 157, 158, 159, 187, 188,
//   130, 131, 132, 155, 156, 185, 186, 133, 153, 180, 189];
for (let i = 0; i < 100; i += 1) {
  const list = {
    deviceNum: parseInt((Math.random() * (10 * 3)), 10),
    onlineNum: parseInt((Math.random() * 10), 10),
    projectId: parseInt((Math.random() * 10), 10),
    projectName: nameArr[parseInt((Math.random() * 3), 10)],
  };
  record.push(Mock.mock(list));
}
export default record;
