import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "../src/assets/style/comm.scss"
import "../src/assets/style/reset.scss"
import axios from 'axios'
import './mock/index'
//挂载element-ui
Vue.use(ElementUI)
//全局挂载一个http的实例 使用axios
Vue.prototype.$http=axios

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
