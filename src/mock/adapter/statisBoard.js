import mock from './adapter';
import statisticsBoard from '../data/otherMaintain/statisticsBoard';

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
