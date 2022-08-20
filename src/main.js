import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "jquery";
import "bootstrap";
import "normalize.css";
import VueTelInput from "vue-tel-input";
import "vue-tel-input/dist/vue-tel-input.css";

const globalOptions = {
  mode: "international",
  autoFormat: true,
  validCharactersOnly: true,
  finishMounted: true,
  autoPlaceholder: true,
  invalidMsg: "Invalid phone number",
};

createApp(App)
  .use(store)
  .use(router)
  .use(VueTelInput, globalOptions)
  .mount("#app");
