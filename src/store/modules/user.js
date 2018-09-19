import { userName, token, author } from '@/storage/cookie';
import { Cookie } from '../../utils/storage';

const user = {
  state: {
    name: Cookie.get(userName),
    token: Cookie.get(token),
    online: false, // websocket是否在线
    author: Cookie.get(author), // 登录用户的权限
  },
  mutations: {
    SET_USERINFO(state, info) {
      state.name = info.userName;
      state.token = info.token;
      state.author = info.author;
      const obj = {};
      obj[userName] = info.userName;
      obj[token] = info.token;
      obj[author] = info.author;
      Cookie.set(obj);
    },
    CLEARINFO(state) {
      state.name = '';
      state.token = '';
      state.author = '';
      Cookie.remove([userName, token, author]);
    },
    SET_STATUS(state, status) {
      state.online = status;
    },
  },
  getters: {
    userName: state => state.name,
    token: state => state.token,
    author: state => (state.author ? state.author.split(',') : []),
    online: state => ({ name: state.online ? '在线' : '离线', icon: state.online ? 'online' : 'offline' }),
  },
};

export default user;
