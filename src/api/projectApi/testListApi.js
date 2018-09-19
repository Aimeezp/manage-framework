import { postJson, post } from '../apiFun';

export const getTestList = params => postJson('testList', params);// 测试列表
export const getNewTest = params => postJson('newTest', params);// 新建测试提交
export const getProjectData = params => postJson('projectData', params);// 新建测试获取数据
export const getDetailsList = params => postJson('detailsList', params);// 测试详情列表
export const getWorkDetail = params => postJson('workDetail', params);// 工单详情
export const getDeviceInfo = params => postJson('deviceInfo', params);// 设备类型和厂商
export const msgReply = params => postJson('msgReply', params);// 消息回复
export const getLogDetail = params => post('logDetail', params);// 日志详情
