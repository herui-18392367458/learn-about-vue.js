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
    path: '/home',
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
//实际项目中这里要调后端接口，验证客户的用户名和密码

router.beforeEach((to,from,next)=>{
  //逻辑，如何客户要去登陆页面，本地有用户名，跳home页，属于登陆状态
  if(to.path==="/login"){
    if(sessionStorage.getItem("username")){
      router.push('/home')
    }else{
      //本地没有用户名，去登陆页，会话超时
      next();
    }
    return;
  }
  //实际项目中这里要调后端接口+token，验证客户的用户名和密码

  //逻辑 如果客户直接输页面地址 验证本地是否有存username 有 放行，想去哪去哪  没有 跳转登陆
  if(sessionStorage.getItem("username")){
    next();
  }else{
    router.push("/login")
  }
})

export default router
