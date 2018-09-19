import { backendIp } from '../../assets/js/baseIp';

const base = `http://${backendIp}/unicom-iot/device`;

export default {
  getDeviceTypeAndMakerAndStatus: `${base}/getDeviceTypeAndMakerAndStatus`, // get allType && allStatus
  getAllMarker: `${base}/getDeviceTypeAndMakerAndUrl`, // get allType && allStatus
  queryProductTypeList: `${base}/queryProductTypeList`, // product list
  queryProductList: `${base}/queryProductList`, // someone product details
  addProduct: `${base}/addOrUpdateProduct`, // add product
  deleteProduct: `${base}/deleteProduct`, // 删除产品
  addProductType: `${base}/addOrUpdateType`, // add product type
  deleteProductType: `${base}/deleteTypeById`, // 删除产品类型
};
