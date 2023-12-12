import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./store";
// import firebase from "@/helpers/firebase";
// import firebaseConfig from "@/config/firebase";

// Initialize Firebase
// firebase.initializeApp(firebaseConfig);

createApp(App).use(store).mount("#app");
