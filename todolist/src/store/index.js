import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)
export default new Vuex.Store({
    state:{
        list:[]
    },
    mutations:{
        Update_List(state,list){
            state.list=list
        },
        Del(state,id){
            state.list.forEach((item,index)=> {
                if(item.id===id){
                    state.list.splice(index,1)
                }
            });
        }
    },
    actions:{
        getList(context){
           fetch('./userinfo.json').then(res=>res.json()).then(result=>{
               context.commit('Update_List',result.user)
           })
        }
    }
})