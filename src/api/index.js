import * as commonApi from './projectApi/commonApi';
import * as testListApi from './projectApi/testListApi';
import * as deviceTypeApi from './projectApi/deviceTypeApi';
import * as accountManageApi from './projectApi/systemManage/accountManageApi';
import * as roleManageApi from './projectApi/systemManage/roleManageApi';
import * as otherMaintainApi from './projectApi/otherMaintainApi';
import * as backendManageApi from './projectApi/backendManageApi';

window.vaApi = Object.assign(...[{}, commonApi, testListApi, accountManageApi, deviceTypeApi, roleManageApi, otherMaintainApi, backendManageApi]);
