import Vue from 'vue';
import App from './views/TodoList';
import store from './store/index';
new Vue({
  el:"#app",
  store,
  render:(h)=>h(App)
})