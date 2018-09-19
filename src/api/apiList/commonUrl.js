import { commonIp } from '../../assets/js/baseIp';

const base = `http://${commonIp}/unicom-iot`;

export default {
  login: `${base}/auth/token/user`, // online
  changePassword: `${base}/auth/password`, // change pwd
};
