import mock from './adapter';
import productList from '../data/otherMaintain/productList';
import getProDetailList from '../data/otherMaintain/getProDetailList';

mock.onPost('/getProductList').reply((config) => {
  const pageNumC = JSON.parse(config.data).pageNum;
  const pageSizeC = JSON.parse(config.data).pageSize;
  const total = productList.length;
  const sendData = productList.filter((u, index) => index < pageSizeC * pageNumC
  && index >= pageSizeC * (pageNumC - 1));
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([200, {
        status: 1,
        data: {
          list: sendData,
          total,
        },
      }]);
    }, 1000);
  });
});
mock.onPost('/getProDetailList').reply((config) => {
  const pageNumC = JSON.parse(config.data).pageNum;
  const pageSizeC = JSON.parse(config.data).pageSize;
  const id = JSON.parse(config.data).rowId;
  const total = getProDetailList.length;
  const sendData = getProDetailList.filter((u, index) => index < pageSizeC * pageNumC
      && index >= pageSizeC * (pageNumC - 1) && u.id === id);
  //   const sendData = getProDetailList.filter(u => u.id === id);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([200, {
        status: 1,
        data: {
          list: sendData,
          total,
        },
      }]);
    }, 1000);
  });
});

