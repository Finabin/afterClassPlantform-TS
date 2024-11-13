import {
  createRouter,
  createWebHashHistory,
} from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: "/login"
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/Login.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/pages/Home.vue'),
    redirect: '/main',
    children: [
      {
        path: '/datasource',
        name: '数据看板',
        component: () => import('@/views/DataPage.vue')
      },
      {
        path: '/main',
        name: 'Main',
        component: () => import('@/views/MainPage.vue')
      },
      {
        path: '/application',
        name: '申请管理',
        component: () => import('@/views/ApplicationPage.vue')
      },
      {
        path: '/order',
        name: '订单管理',
        component: () => import('@/views/OrderPage.vue')
      },
      {
        path: '/teach',
        name: '授教管理',
        component: () => import('@/views/TeachPage.vue')
      },
      {
        path: '/info',
        name: '个人信息',
        component: () => import('@/views/PersonInfo.vue')
      },
      {
        path: '/user',
        name: '人员管理',
        component: () => import('@/views/UserPage.vue')
      },
      {
        path: '/eaxm',
        name: '师资审核',
        component: () => import('@/views/ExamPage.vue')
      },
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router