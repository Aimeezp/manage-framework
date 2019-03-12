import mock from './adapter';
import testList from '../data/otherMaintain/testList';

mock.onPost('/getTestSheet').reply((config) => {
  const pageNumC = JSON.parse(config.data).pageNum;
  const pageSizeC = JSON.parse(config.data).pageSize;
  const total = testList.length;
  const sendData = testList.filter((u, index) => index < pageSizeC * pageNumC
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
