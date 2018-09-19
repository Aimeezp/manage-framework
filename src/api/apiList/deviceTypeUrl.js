import { backendIp } from '../../assets/js/baseIp';

const base = `http://${backendIp}/install`;

export default {
  deviceTypeList: `${base}/deviceList`, // 设备类型列表
  PrintReport: `${base}/exports`, // 打印报告`${base}/exports`
};
