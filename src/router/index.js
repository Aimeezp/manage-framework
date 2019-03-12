import Vue from 'vue';
import Router from 'vue-router';
import { MessageBox } from 'element-ui';

import store from '../store';

const Login = () =>
  import('../views/Login');
const NotFound = () =>
  import('../views/404');
const Home = () =>
  import('../components/Home');
const DetailsList = () =>
  import('../views/TestManagement/DetailsList');
const TestList = () =>
  import('../views/TestManagement/TestList');
const RoleManage = () =>
  import('../views/SystemManagement/RoleManage');
const AccountManage = () =>
  import('../views/SystemManagement/AccountManage');
const DeviceTypeList = () =>
  import('../views/DeviceType/DeviceTypeList');
const StatisticsBoard = () =>
  import('../views/StatisticsBoard');
const ProjectManage = () =>
  import('../views/ProjectManage');
const DmpMaintain = () =>
  import('../views/DeviceManage/DmpMaintain');
const DeviceMaintain = () =>
  import('../views/DeviceManage/DeviceMaintain');
const BatchImport = () =>
  import('../components/DeviceManagement/Device/BatchImport/BatchImport');
const OtherMaintain = () =>
  import('../views/DeviceManage/OtherMaintain');

Vue.use(Router);


const routes = [{
  path: '/login',
  component: Login,
},
// 测试管理
{
  path: '/',
  component: Home,
  redirect: '/list',
  show: true, // 是否在菜单显示
  children: [
    {
      path: '/list',
      component: TestList,
      title: '测试管理',
    },
  ],
},
{
  path: '/',
  component: Home,
  children: [
    {
      path: '/details',
      component: DetailsList,
      title: '测试详情',
    },
  ],
},
{
  path: '/',
  component: Home,
  show: true,
  children: [
    {
      path: '/device-type-list',
      component: DeviceTypeList,
      title: '设备类型管理',
    },
  ],
},
{
  path: '/',
  component: Home,
  show: true,
  children: [
    {
      path: '/statisticsBoard',
      component: StatisticsBoard,
      title: '看板管理',
    },
  ],
},
{
  path: '/',
  component: Home,
  show: true,
  children: [
    {
      path: '/project-manage',
      component: ProjectManage,
      title: '项目管理',
    },
  ],
},
{
  path: '/',
  component: Home,
  show: true,
  hasSub: true, // 是否有二级菜单
  title: '系统管理',
  children: [
    {
      path: '/role-manage',
      component: RoleManage,
      title: '角色管理',
    },
    {
      path: '/account-manage',
      component: AccountManage,
      title: '账号管理',
    },
  ],
},
{
  path: '/',
  component: Home,
  show: true,
  hasSub: true, // 是否有二级菜单
  title: '设备管理',
  children: [
    {
      path: '/dmp-maintain',
      component: DmpMaintain,
      title: 'DMP维护',
    },
    {
      path: '/device-maintain',
      component: DeviceMaintain,
      title: '设备维护',
    },
    {
      path: '/other-maintain',
      component: OtherMaintain,
      title: '其他维护',
    },
  ],
},
{
  path: '/',
  component: Home,
  children: [
    {
      path: '/device-maintain/batch-import',
      component: BatchImport,
      title: '批量导入',
    },
  ],
},
{
  path: '/404',
  component: NotFound,
},
{
  path: '*',
  redirect: {
    path: '/404',
  },
},
];
// 页面跳转后滚动到页面顶部
const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition;
  }
  const position = {};
  if (to.hash) {
    position.selector = to.hash;
  } else {
    position.x = 0;
    position.y = 0;
  }
  return position;
};

const router = new Router({
  routes,
  scrollBehavior,
});

const whiteList = ['/login']; // 白名单
router.beforeEach((to, from, next) => {
  const {
    token,
    author,
  } = store.getters;
  if (!token) {
    if (whiteList.indexOf(to.path) >= 0) { // 是否在白名单内,不在的话直接跳转登录页
      next();
    } else {
      next({
        path: '/login',
      });
    }
  } else {
    let authorFlag = false;
    if (to.name) {
      // 判断是否有权限
      for (let i = 0; i < author.length; i += 1) {
        if (author[i] === to.name) {
          authorFlag = true;
          break;
        }
      }
    } else {
      authorFlag = true;
    }
    if (authorFlag) {
      next();
    } else {
      MessageBox.alert('对不起，您没有权限访问此页面！', '提示', {
        type: 'warning',
      });
      next(false);
    }
  }
});

export default router;
