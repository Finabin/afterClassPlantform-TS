import { defineStore } from "pinia";

const useUserInfoStore = defineStore("userInfo", {
  state: () => ({
    id: "",
    nickName: "",
    role: "",
    avatar: "",
    token: "",
  }),
  persist: {
    key: "userInfoStore",
    storage: sessionStorage,
    paths: null,
  },
});

export default useUserInfoStore;
