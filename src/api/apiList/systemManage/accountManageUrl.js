// import { backendIp } from '../../assets/js/baseIp';
//
// const base = `http://       {backendIp}/unicom-iot`;
const base = '';
export default {
  getAccountManage: `${base}/getAccountManage/list `,
  getAccountArr: `${base}/getAccountManage/account `,
  getAccountState: `${base}/getAccountManage/state `,
  addAccount: `${base}/getAccountManage/addAccount `,
  getAccountInfo: `${base}/getAccountManage/getAccountInfo `,
  changeAccount: `${base}/getAccountManage/changeAccount `,
  changeState: `${base}/getAccountManage/changeState `,
};
