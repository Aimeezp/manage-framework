import { postJson, getExcel } from '../apiFun';

export const getDeviceTypeList = params => postJson('deviceTypeList', params);// 设备类型列表
export const PrintReport = params => getExcel('PrintReport', params);// 打印报告

