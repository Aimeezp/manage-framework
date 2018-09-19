import axios from 'axios';
import qs from 'qs';
import store from '../store';

export const postRequest = (url, params) => axios({ // application/vnd.ms-excel;charset=utf-8
  method: 'post',
  url,
  data: qs.stringify(params),
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: store.getters.token ? `Bearer ${store.getters.token}` : '',
  },
});
export const postJsonRequest = (url, params) => axios({
  method: 'post',
  url,
  data: params,
  headers: {
    'Content-Type': 'application/json',
    Authorization: store.getters.token ? `Bearer ${store.getters.token}` : '',
  },
});
export const uploadFileRequest = (url, params) => axios({
  method: 'post',
  url,
  data: params,
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: store.getters.token ? `Bearer ${store.getters.token}` : '',
  },
});
export const putRequest = (url, params) => axios({
  method: 'put',
  url,
  data: qs.stringify(params),
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: store.getters.token ? `Bearer ${store.getters.token}` : '',
  },
});
export const deleteRequest = url => axios({
  method: 'delete',
  url,
});
export const getRequest = (url, params) => axios.get(url, {
  params,
  headers: {
    'Content-Type': 'multipart/form-data;charset=UTF-8',
    Authorization: store.getters.token ? `Bearer ${store.getters.token}` : '',
  },
});

export const getRequestExcel = (url, param) => axios.get(url, {
  params: param,
  responseType: 'arraybuffer',
  headers: {
    'Content-Type': 'multipart/form-data;charset=UTF-8',
    Authorization: store.getters.token ? `Bearer ${store.getters.token}` : '',
  },
});
export const postRequestExcel = (url, params) => axios({
  method: 'post',
  url,
  responseType: 'arraybuffer',
  data: qs.stringify(params),
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: store.getters.token ? `Bearer ${store.getters.token}` : '',
  },
});
export const postParamsConcat = (url, params) => axios({
  method: 'post',
  url: `${url}/${params.id}`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: store.getters.token ? `Bearer ${store.getters.token}` : '',
  },
});
