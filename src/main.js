import Vue from "vue";
import App from "./App.vue";
import axios from "axios";

// base url for api
Vue.prototype.$axios = axios.create({
  baseURL: "http://laravel-vue-paginator.test/api/v1.0/"
});

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
