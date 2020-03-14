import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showDownLoad:true,
    city:{
      id:0,
      name:"上海"
    },
    // historyCity:[],
  },
  mutations: {
    UPDATE_DOWN_LOAD(state,opation){
       state.showDownLoad=opation
    },
    UPDATE_CITY(state,city){
        state.city=city;
        // let isHistory=false;
        // state.historyCity.forEach((item)=>{
        //   if(item.id===city.id){
        //     isHistory=true
        //   }
        // })
        // if(!isHistory){
        //   state.historyCity.push(city)
        // }
    }
  },
  getters:{
       getCities(state){
         return state.city.name
       }
  },
  actions: {
  },
  modules: {
  }
})
