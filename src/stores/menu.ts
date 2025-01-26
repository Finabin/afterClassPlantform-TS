import { defineStore } from "pinia";

const useMenuIndexStore = defineStore("menuIndex", {
  state: () => ({
    curMenuIndex: "",
  }),
  persist: {
    key: "menuIndexStore",
    storage: sessionStorage,
    paths: null,
  },
});

export default useMenuIndexStore;
