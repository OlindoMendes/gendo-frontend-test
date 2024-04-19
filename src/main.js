import { createApp } from "vue";
import store from "./store";
// import { createStore } from "vuex";
import "./style.scss";
import App from "./App.vue";

// const store = createStore()

createApp(App).use(store).mount("#app");
