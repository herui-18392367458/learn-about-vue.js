import Vue from 'vue'
import App from './App.vue'
import axios from "axios"
import './mock/index'

Vue.prototype.$http=axios
Vue.config.productionTip = false

new Vue({
  render: function (h) { return h(App) },
}).$mount('#app')
