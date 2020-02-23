import Vue from "vue";
import App from "./App.vue";

import {store} from "./store";

// bootstrap
require("bootstrap/dist/css/bootstrap.min.css");

// laravel vue paginator
require("advanced-laravel-vue-paginate/dist/advanced-laravel-vue-paginate.css");
Vue.use(require("advanced-laravel-vue-paginate"));

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
