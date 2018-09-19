import commonUrl from './commonUrl';
import testListUrl from './testListUrl';
import deviceTypeUrl from './deviceTypeUrl';
import accountManageUrl from './systemManage/accountManageUrl';
import roleManageUrl from './systemManage/roleManageUrl';
import otherMaintainUrl from './otherMaintainUrl';
import backendManageUrl from './backendManageUrl';

export default Object.assign(...[{}, commonUrl, testListUrl, accountManageUrl, deviceTypeUrl, roleManageUrl, otherMaintainUrl, backendManageUrl]);
