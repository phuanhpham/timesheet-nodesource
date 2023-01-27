import { createApp } from "vue";
import "@/assets/styles/style.css";
import vue3GoogleLogin from "vue3-google-login";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";

createApp(App).use(store).use(router).use(vue3GoogleLogin, {
    clientId: "727067276936-mb3odqmefp71j1q2fmkvpe27m6p88ifm.apps.googleusercontent.com"
}).mount("#app");
