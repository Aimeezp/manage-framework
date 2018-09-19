import { postJson } from '../../apiFun';

export const createRole = params => postJson('createRole', params);
export const updataRole = params => postJson('updataRole', params);
export const getRoleList = params => postJson('getRoleList', params);
