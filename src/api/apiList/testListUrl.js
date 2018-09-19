import { backendIp } from '../../assets/js/baseIp';

const base = `http://${backendIp}/install`;

export default {
  testList: `${base}/getTestSheet`, // 测试列表
  newTest: `${base}/addTestSheet`, // 新建测试提交
  projectData: `${base}/getInfo`, // 新建测试获取数据
  detailsList: `${base}/getTestSheetDetailById`, // 测试详情列表
  workDetail: `${base}/getTestSheetById`, // 工单详情
  deviceInfo: `${base}/getDeviceInfo`, // 设备类型和厂商
  msgReply: `${base}/msg/msgReplay`, // 消息回复
  logDetail: `${base}/log/testSheetLog`, // 日志详情
};
