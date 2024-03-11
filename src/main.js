import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";
import vuetify from "@/plugins/vuetify.js";

createApp(App).use(createPinia()).use(vuetify).use(router).mount("#app");
