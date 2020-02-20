import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Buefy from "buefy";
import {
  store
} from './store';
import "@mdi/font/css/materialdesignicons.css";
import "buefy/dist/buefy.css";

Vue.use(Buefy);

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");