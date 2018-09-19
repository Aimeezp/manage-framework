import { postJson, post } from '../apiFun';

export const getDeviceTypeAndMakerAndStatus = params => post('getDeviceTypeAndMakerAndStatus', params);// get allType && allStatus
export const getAllMarker = params => post('getAllMarker', params);// get allType && allStatus
export const queryProductTypeList = params => postJson('queryProductTypeList', params);// product list
export const queryProductList = params => postJson('queryProductList', params);// someone product details
export const addProduct = params => postJson('addProduct', params);// add product
export const deleteProduct = params => postJson('deleteProduct', params);// delete product
export const addProductType = params => postJson('addProductType', params);// add product type
export const deleteProductType = params => postJson('deleteProductType', params);// delete productType
