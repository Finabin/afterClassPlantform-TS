import { defineStore } from "pinia";

const useUserInfoStore = defineStore("userInfo", {
  state: () => ({
    nickName: "赫赫",
    role: "admin",
    avatar:
      "https://img2.baidu.com/it/u=3179478726,4228316298&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
    token: "123456789",
  }),
});

export default useUserInfoStore;
