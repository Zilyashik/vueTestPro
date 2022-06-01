import Vue from 'vue';
import App from './App.vue';
import router from "@/router";
import Router from "vue-router";

Vue.config.productionTip = false
Vue.use(Router)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
