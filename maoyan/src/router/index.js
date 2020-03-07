import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index'
import Movie from '../views/movie/Movie'
import Hotshow from '../views/movie/components/Hotshow'
import Commingsoon from '../views/movie/components/Commingsoon'
import Theator from '../views/theator/Theator'
import Profile from '../views/profile/Profile'
import City from '../components/City'
import Search from '../components/Search'
import Detail from '../views/detail/Detail'
Vue.use(VueRouter)
const routes = [
  {
    path:"",redirect:"/index/movie/hotshow"
  },{
    path:"/index",component:Index,
    children:[
      {
        path:"movie",component:Movie,
        children:[
          {
            path:"hotshow",component:Hotshow
          },{
            path:"commingsoon",component:Commingsoon
          }
        ]
      },{
        path:"theator",component:Theator
      },{
        path:"profile",component:Profile
      }
    ]
  },{
    path:"/city",component:City
  },{
    path:"/search",
    component:Search
  },
  {
    path:"/detail",
    name:"detail",
    component:Detail
  }
]

const router = new VueRouter({
  routes
})

export default router
