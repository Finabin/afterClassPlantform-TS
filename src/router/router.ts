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
  {
    path: '/error',
    name: 'Error',
    component: () => import('@/pages/Error.vue'),
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('@/pages/Test.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

//全局路由守卫
router.beforeEach((to, from, next) => {
  // const acpToken = localStorage.getItem('acpToken')
  // if (to.name !== 'Login' && !acpToken) {
  //   next({ name: 'Login' })
  // }
  next()
})

export default router