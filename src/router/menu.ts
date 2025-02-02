import {
  Menu as IconMenu,
  User,
  UserFilled,
  House,
  PieChart,
  Avatar,
  MessageBox,
  FolderOpened,
  WalletFilled,
  List,
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
    auth: ["0", "2"],
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
    auth: ["0", "1", "2"],
  },
  {
    id: 3,
    name: "用户管理",
    Ename: "User",
    icon: User,
    meta: {
      title: "用户管理",
    },
    auth: ["0", "2"],
    children: [
      {
        id: 31,
        path: "/student",
        name: "学生管理",
        Ename: "Student Management",
        icon: UserFilled,
        meta: {
          title: "学生管理",
        },
        auth: ["0", "2"],
      },
      {
        id: 32,
        path: "/teacher",
        name: "教师管理",
        Ename: "Teacher Management",
        icon: Avatar,
        meta: {
          title: "教师管理",
        },
        auth: ["0"],
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
    auth: ["0", "2"],
  },
  {
    id: 5,
    path: "/order",
    name: "订单管理",
    Ename: "Order",
    icon: List,
    meta: {
      title: "订单管理",
    },
    auth: ["0", "1", "2"],
  },
  {
    id: 6,
    path: "/file",
    name: "文件管理",
    Ename: "File",
    icon: FolderOpened,
    meta: {
      title: "文件管理",
    },
    auth: ["0", "1", "2"],
  },

  {
    id: 7,
    path: "/income",
    name: "收入管理",
    Ename: "Income",
    icon: WalletFilled,
    meta: {
      title: "收入管理",
    },
    auth: ["0", "2"],
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
    auth: ["0", "1", "2"],
  },
];

export default menu;
