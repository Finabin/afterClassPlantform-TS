import {
  Menu as IconMenu,
  Message,
  Setting,
  House,
  PieChart,
  Avatar,
  MessageBox,
} from "@element-plus/icons-vue";

const menu = [
  {
    id: 1,
    path: "/datasource",
    name: "数据看板",
    Ename: "DataSource",
    icon: PieChart,
    meta: {
      title: "数据看板",
    },
  },
  {
    id: 2,
    path: "/main",
    name: "首页",
    Ename: "Home",
    icon: House,
    meta: {
      title: "首页",
    },
  },
  {
    id: 3,
    name: "用户管理",
    Ename: "User",
    icon: IconMenu,
    meta: {
      title: "用户管理",
    },
    children: [
      {
        id: 31,
        path: "/student",
        name: "学生管理",
        Ename: "Student Management",
        icon: House,
        meta: {
          title: "学生管理",
        },
      },
      {
        id: 32,
        path: "/teacher",
        name: "教师管理",
        Ename: "Teacher Management",
        icon: House,
        meta: {
          title: "教师管理",
        },
      },
    ],
  },
  {
    id: 4,
    path: "/course",
    name: "课程管理",
    Ename: "Course",
    icon: MessageBox,
    meta: {
      title: "课程管理",
    },
  },
  {
    id: 5,
    path: "/order",
    name: "订单管理",
    Ename: "Order",
    icon: IconMenu,
    meta: {
      title: "订单管理",
    },
  },
  {
    id: 6,
    path: "/file",
    name: "文件管理",
    Ename: "File",
    icon: IconMenu,
    meta: {
      title: "文件管理",
    },
  },

  {
    id: 7,
    path: "/income",
    name: "收入管理",
    Ename: "Income",
    icon: IconMenu,
    meta: {
      title: "收入管理",
    },
  },
  {
    id: 8,
    path: "/info",
    name: "个人信息",
    Ename: "Info",
    icon: Avatar,
    meta: {
      title: "个人信息",
    },
  },
];

export default menu;
