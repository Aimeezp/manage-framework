import { backendIp } from '../../assets/js/baseIp';

const base = `http://${backendIp}/unicom-iot`;
// unicom-iot/uploadDeviceFile

export default {
  getDeviceList: `${base}/selectDevicePage`,
  getDeviceSelectors: `${base}/infoList`,
  getDmpList: `${base}/device_manage/getGroupTreeList`,
  getDmpUserList: `${base}/device_manage/getGroupAccountsList`,
  deleteDMPGroup: `${base}/deleteDMPGroup`,
  getDetails: `${base}/devDetails`,
  addDevice: `${base}/devDropList`,
  submitDeviceInfo: `${base}/addDevice`,
  // getPosition: `${base}/getPosition`,
  // getLog: `${base}/logDetails`,
  getAddGronp: `${base}/device_manage/getParentGroupList`,
  submitGronp: `${base}/device_manage/addGroup`,
  getAddUser: `${base}/device/getDeviceTypeList`,
  getModifyUser: `${base}/getModifyUser`,
  getProvinceList: `${base}/area/getProvinceList`,
  getCityList: `${base}/area/getCityList`,
  getCountryList: `${base}/area/getCountyList`,
  submitUser: `${base}/device_manage/addDmpAccount`,
  getDmpMakerAll: `${base}/device_manage/getDmpMakerAll`,
  getSubscribeList: `${base}/sub/list`,
  getDeviceTypeAndMakerAndModel: `${base}/device/getDeviceTypeAndDMPMakerAnddMPModel`,
  getDmpAllUser: `${base}/device_manage/getGroupAllAccountsList`,
  addSubscribe: `${base}/sub/add`,
  delSubscribe: `${base}/sub/remove`,
  getSubscribeInfo: '/getSubscribeInfo',
  modifySubscribe: '/modifySubscribe',
  batchExport: `${base}/exportDeviceInfo`,
  downloadTemplate: `${base}/downloadExcel`,
  // batchImport: '/batchImport',
  // uploadPreview: '/uploadPreview',
  uploadFile: `${base}/importDeviceList`,
};
