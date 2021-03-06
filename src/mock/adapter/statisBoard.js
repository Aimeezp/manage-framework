import qs from 'qs';
import mock from './adapter';
import statisticsBoard from '../data/otherMaintain/statisticsBoard';
import statisticsBoardProject from '../data/otherMaintain/statisticsBoardProject';
import statisticsBoardType from '../data/otherMaintain/statisticsBoardType';

mock.onPost('/history').reply(() => new Promise((resolve) => {
  setTimeout(() => {
    resolve([200, {
      status: 1,
      data: {
        NumMap: {
          deviceNum: 114,
          onlineNum: 1,
        },
        list: statisticsBoard,
      },
    }]);
  }, 1000);
}));

mock.onPost('/project').reply((config) => {
  const { currentPage } = qs.parse(config.data);
  const pageSize = 20;
  const total = statisticsBoardProject.length;
  const sendData = statisticsBoardProject.filter((u, index) => index < pageSize * currentPage
    && index >= pageSize * (currentPage - 1));
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

mock.onPost('/device').reply((config) => {
  const pageNumC = JSON.parse(config.data).currentPage;
  const pageSizeC = JSON.parse(config.data).pageSize;
  const total = statisticsBoardType.length;
  const sendData = statisticsBoardType.filter((u, index) => index < pageSizeC * pageNumC
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
