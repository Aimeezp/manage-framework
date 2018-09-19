import { postJson } from '../../apiFun';

export const resGetAccountManage = params => postJson('getAccountManage', params);
export const resGetAccountArr = params => postJson('getAccountArr', params);
export const resGetAccountState = params => postJson('getAccountState', params);
export const resAddAccount = params => postJson('addAccount', params);
export const resGetAccountInfo = params => postJson('getAccountInfo', params);
export const resChangeAccount = params => postJson('changeAccount', params);
export const changeAccountState = params => postJson('changeState', params);
