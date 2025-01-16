import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router/router";
import i18n from "./i18n/locale";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import pinia from "./stores";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);

app.use(createPinia());
app.use(ElementPlus);
app.use(pinia);
app.use(router);
app.use(i18n);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.mount("#app");
