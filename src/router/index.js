import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/layout/Layout'
Vue.use(Router)

export const constantRouterMap = [
  {
    path: '',
    component: Layout,
    hidden: true,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('../views/dashboard/index'),
        name: 'dashboard',
        hidden: true,
        meta: { title: '首页', icon: 'dashboard', noCache: true, roles: ['无'] }
      }
    ]
  },
  {
    path: '/password',
    component: Layout,
    meta: {roles: ['无']},
    hidden:true,
    children: [
      {
        path: '/password',
        component: () => import('../views/password/password'),
        name: 'password',
        meta: {roles: ['无']}
      }
    ]
  },
  {
    path: '/login',
    meta: {roles: ['无']},
    component: () => import('../views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    meta: {roles: ['无']},
    component: () => import('../views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    meta: {roles: ['无']},
    component: () => import('../views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    meta: {roles: ['无']},
    component: () => import('../views/errorPage/401'),
    hidden: true
  }
]
export const asyncRouterMap = [
  {
    path: '/sys',
    component: Layout,
    redirect: 'noredirect',
    name: 'sysManage',
    meta: {
      roles: ['系统管理人员','综合部部长'],
      title: '用户管理',
      icon: 'chart'
    },
    children: [
      {
        path: 'admin',
        component: () => import('../views/sys/admin'),
        name: 'admin',
        meta: {roles: ['系统管理人员','综合部部长'], title: '用户', noCache: true}
      },
      {
        path: 'role',
        component: () => import('../views/sys/role'),
        name: 'role',
        meta: {roles: ['系统管理人员','综合部部长'], title: '角色管理', noCache: true}
      }
    ]
  },
  {
    path: '/operation',
    component: Layout,
    redirect: 'noredirect',
    name: 'operation',
    meta: {
      roles: ['运营人员','运营部部长'],
      title: '运营班',
      icon: 'chart'
    },
    children: [
      {
        path: 'handoverRecord',
        component: () => import('../views/operation/handoverRecord'),
        name: 'handoverRecord',
        meta: {roles: ['运营人员','运营部部长'], title: '交接班记录', noCache: true}
      },
      {
        path: 'routeRecord',
        component: () => import('../views/operation/routeRecord'),
        name: 'routeRecord',
        meta: {roles: ['运营人员','运营部部长'], title: '设备巡检记录', noCache: true}
      }
    ]
  },
  {
    path: '/maintain',
    component: Layout,
    redirect: 'noredirect',
    name: 'maintain',
    meta: {
      roles: ['维修人员','运营部部长'],
      title: '维修班',
      icon: 'chart'
    },
    children: [
      {
        path: 'examinationRecord',
        component: () => import('../views/maintain/examinationRecord'),
        name: 'examinationRecord',
        meta: {roles: ['维修人员','运营部部长'], title: '设备检查记录', noCache: true}
      },
      {
        path: 'maintainRecord',
        component: () => import('../views/maintain/maintainRecord'),
        name: 'maintainRecord',
        meta: {roles: ['维修人员','运营部部长'], title: '设备保养记录', noCache: true}
      }
    ]
  },
  {
    path: '/laboratory',
    component: Layout,
    redirect: 'noredirect',
    name: 'laboratory',
    meta: {
      roles: ['化验人员','运营部部长'],
      title: '化验室',
      icon: 'chart'
    },
    children: [
      {
        path: 'originRecord',
        component: () => import('../views/laboratory/originRecord'),
        name: 'originRecord',
        meta: {roles: ['化验人员','运营部部长'], title: '水质分析原始记录', noCache: true}
      },
      {
        path: 'dailyReport',
        component: () => import('../views/laboratory/dailyReport'),
        name: 'dailyReport',
        meta: {roles: ['化验人员','运营部部长'], title: '水质分析日报表', noCache: true}
      },
      {
        path: 'monthReport',
        component: () => import('../views/laboratory/monthReport'),
        name: 'monthReport',
        meta: {roles: ['化验人员','运营部部长'], title: '水质分析月报表', noCache: true}
      }
    ]
  },
  {
    path: '/general',
    component: Layout,
    redirect: 'noredirect',
    name: 'general',
    meta: {
      roles: ['综合部部长','系统管理人员'],
      title: '综合部',
      icon: 'chart'
    },
    children: [
      {
        path: 'costDetail',
        component: () => import('../views/general/costDetail'),
        name: 'costDetail',
        meta: {roles: ['综合部部长','系统管理人员'], title: '人员后勤成本明细', noCache: true}
      },
      {
        path: 'costAccount',
        component: () => import('../views/general/costAccount'),
        name: 'costAccount',
        meta: {roles: ['综合部部长','系统管理人员'], title: '物品材料成本明细', noCache: true}
      }
    ]
  },
  {
    path: '/device',
    component: Layout,
    redirect: 'noredirect',
    name: 'device',
    meta: {
      roles: ['运营部部长'],
      title: '设备管理',
      icon: 'chart'
    },
    children: [
      {
        path: 'deviceClass',
        component: () => import('../views/device/deviceClass'),
        name: 'deviceClass',
        meta: {roles: ['运营部部长'], title: '设备类别', noCache: true}
      },
      {
        path: 'deviceName',
        component: () => import('../views/device/deviceName'),
        name: 'deviceName',
        meta: {roles: ['运营部部长'], title: '设备名称', noCache: true}
      }
    ]
  },
  {
    path: '/statistics',
    component: Layout,
    redirect: 'noredirect',
    name: 'statistics',
    meta: {
      roles: [,'系统管理人员','综合部部长','运营部部长'],
      title: '数据统计',
      icon: 'chart'
    },
    children: [
      {
        path: 'dailyRecord',
        component: () => import('../views/statistics/dailyRecord'),
        name: 'dailyRecord',
        meta: {roles: ['系统管理人员','综合部部长','运营部部长'], title: '运行日报表', noCache: true}
      },
      {
        path: 'monthRecord',
        component: () => import('../views/statistics/monthRecord'),
        name: 'monthRecord',
        meta: {roles: ['系统管理人员','综合部部长','运营部部长'], title: '运行月报表', noCache: true}
      },
      {
        path: 'yearRecord',
        component: () => import('../views/statistics/yearRecord'),
        name: 'yearRecord',
        meta: {roles: ['系统管理人员','综合部部长','运营部部长'], title: '运行年报表', noCache: true}
      }
    ]
  },
  {
    path: '/approval',
    component: Layout,
    redirect: 'noredirect',
    name: 'approval',
    meta: {
      roles: ['无'],
      title: '申请审批',
      icon: 'chart'
    },
    children: [
      {
        path: 'myApply',
        component: () => import('../views/approval/myApply'),
        name: 'myApply',
        meta: {roles: ['无'], title: '我的申请', noCache: true}
      },
      {
        path: 'myApproval',
        component: () => import('../views/approval/myApproval'),
        name: 'myApproval',
        meta: {roles: ['综合部部长'], title: '我的审批', noCache: true}
      }
    ]
  },
  {
    path: '/backup',
    component: Layout,
    redirect: 'noredirect',
    name: 'backup',
    meta: {
      roles: ['系统管理人员'],
      title: '数据备份',
      icon: 'chart'
    },
    children: [
      {
        path: 'index',
        component: () => import('../views/backup/index'),
        name: 'index',
        meta: {roles: ['系统管理人员'], title: '数据备份', noCache: true}
      },
      {
        path: 'restore',
        component: () => import('../views/backup/restore'),
        name: 'restore',
        meta: {roles: ['系统管理人员'], title: '数据恢复', noCache: true}
      }
    ]
  }
]
export default new Router({
  // mode: 'history',
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})
