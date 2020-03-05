import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showDownLoad:true
  },
  mutations: {
    UPDATE_DOWN_LOAD(state,opation){
       state.showDownLoad=opation
    }
  },
  actions: {
  },
  modules: {
  }
})
