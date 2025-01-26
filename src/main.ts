import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router/router";
import i18n from "./i18n/locale";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import pinia from "./stores";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import Echarts from "vue-echarts";
import * as echarts from "echarts";

const app = createApp(App);

// 使用组件
app.component("e-charts", Echarts);
// 全局挂载 echarts
app.config.globalProperties.$echarts = echarts;

app.use(createPinia());
app.use(ElementPlus);
app.use(pinia);
app.use(router);
app.use(i18n);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.mount("#app");
