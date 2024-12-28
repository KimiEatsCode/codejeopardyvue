import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import store from "./store";
import router from "./router/index";

createApp(App).use(store).use(router).mount("#app");
