import { post } from '../apiFun';

export const requestLogin = params => post('login', params);// online
export const changePassword = params => post('changePassword', params);// change pwd
