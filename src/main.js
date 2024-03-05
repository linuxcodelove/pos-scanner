import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "@/plugins/vuetify.js";
import store from "./store";

createApp(App).use(store).use(vuetify).use(router).mount("#app");
