import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/pages/Login.vue"),
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("@/pages/Home.vue"),
    redirect: "/main",
    children: [
      {
        path: "/datasource",
        name: "数据看板",
        component: () => import("@/views/DataPage.vue"),
      },
      {
        path: "/main",
        name: "Main",
        component: () => import("@/views/MainPage.vue"),
      },
      {
        path: "/user",
        name: "用户管理",
        component: () => import("@/views/UserPage.vue"),
      },
      {
        path: "/course",
        name: "课程管理",
        // component: () => import("@/views/CoursePage.vue"),
        redirect: "/courseList",
        children: [
          {
            path: "/courseList",
            name: "课程列表",
            component: () => import("@/views/CoursePage.vue"),
          },
          {
            path: "/course/add",
            name: "添加课程",
            component: () => import("@/views/AddCoursePage.vue"),
          },
          {
            path: "/course/edit",
            name: "编辑课程",
            component: () => import("@/views/EditCoursePage.vue"),
          },
        ],
      },
      {
        path: "/order",
        name: "订单管理",
        component: () => import("@/views/OrderPage.vue"),
      },
      {
        path: "/file",
        name: "授教管理",
        component: () => import("@/views/FilePage.vue"),
      },

      {
        path: "/income",
        name: "收入管理",
        component: () => import("@/views/IncomePage.vue"),
      },
      {
        path: "/info",
        name: "个人信息",
        component: () => import("@/views/PersonInfo.vue"),
      },
    ],
  },
  {
    path: "/error",
    name: "Error",
    component: () => import("@/pages/Error.vue"),
  },
  {
    path: "/test",
    name: "Test",
    component: () => import("@/pages/Test.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

//全局路由守卫
router.beforeEach((to, from, next) => {
  // const acpToken = localStorage.getItem('acpToken')
  // if (to.name !== 'Login' && !acpToken) {
  //   next({ name: 'Login' })
  // }
  next();
});

export default router;
