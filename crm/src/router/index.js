import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/login/Login"
import User from "../views/user/User"
import Statics from "../views/statics/Statics"

Vue.use(VueRouter)

const routes = [
  {
    path:"",
    redirect:"/login"
  },
  {
    path: '/',
    component: Home,
    children:[
      {
        path:"user",
        component:User
      },
      {
        path:"roles"
      }
    ]
  },{
    path:"/login",
    component:Login
  }
] 

const router = new VueRouter({
  routes
})

export default router
