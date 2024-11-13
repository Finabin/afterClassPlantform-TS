import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'

const menu = [
  {
    id: 1,
    path: '/datasource',
    name: '数据看板',
    component: () => import('@/views/DataPage.vue'),
    icon: IconMenu,
    meta: {
      title: '数据看板',
    },
  },
  {
    id: 2,
    path: '/main',
    name: '首页',
    component: () => import('@/views/MainPage.vue'),
    icon: IconMenu,
    meta: {
      title: '首页',
    },
  },
  {
    id: 3,
    path: '/application',
    name: '申请管理',
    component: () => import('@/views/ApplicationPage.vue'),
    icon: IconMenu,
    meta: {
      title: '申请管理',
    },
  },
  {
    id: 4,
    path: '/order',
    name: '订单管理',
    component: () => import('@/views/OrderPage.vue'),
    icon: IconMenu,
    meta: {
      title: '订单管理',
    },
  },
  {
    id: 5,
    path: '/teach',
    name: '授教管理',
    component: () => import('@/views/TeachPage.vue'),
    icon: IconMenu,
    meta: {
      title: '授教管理',
    },
  },
  {
    id: 6,
    path: '/info',
    name: '个人信息',
    component: () => import('@/views/PersonInfo.vue'),
    icon: IconMenu,
    meta: {
      title: '个人信息',
    },
  },
  {
    id: 7,
    path: '/user',
    name: '人员管理',
    component: () => import('@/views/UserPage.vue'),
    icon: IconMenu,
    meta: {
      title: '人员管理',
    },
  },
  {
    id: 8,
    path: '/eaxm',
    name: '师资审核',
    component: () => import('@/views/ExamPage.vue'),
    icon: IconMenu,
    meta: {
      title: '师资审核',
    },
  },
]

export default menu