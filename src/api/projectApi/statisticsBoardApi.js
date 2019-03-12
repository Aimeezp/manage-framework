import { post, postJson } from '../apiFun';

export const getBoardChart = params => post('getBoardChart', params);
export const getBoardProjectList = params => post('getBoardProjectList', params);
export const getBoardDeviceTypeList = params => postJson('getBoardDeviceTypeList', params);
