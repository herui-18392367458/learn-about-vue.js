import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        // list:[]
        list: [{
            id:"001",
            name:"xiaohong",
            isedit:false
        },{
            id:"002",
            name:"xiaoming",
            isedit:false
        },{
            id:"003",
            name:"xiaozhang",
            isedit:false
        }]
    },
    mutations: {
        //给list添加内容 来自输入框输入，提交
        PUSH_LIST(state,obj){
             console.log(obj)
             state.list.push(obj)
        },
        // Update_List(state, arrlist) {
        //     state.list = arrlist
        // },
        
        //删除功能
        Del(state, id){
            state.list.forEach((item, index) => {
                if (item.id === id) {
                    state.list.splice(index, 1)
                }
            })
        },
        //编辑打开
        UPDARE_NAME(state,obj){
            state.list.forEach((item)=>{
                if(item.id===obj.id){
                    item.isedit=obj.isedit
                   }
            })
        },
        //实现编辑
        SUBMIT_NAME(state,obj){
            state.list.forEach((item)=>{
                if(item.id===obj.id){
                    item.name=obj.name;
                    item.isedit=obj.isedit
                   }
            })
        }
    },
    actions: {
        // getList(context) {
        //     fetch('./userinfo.json').then(res =>{
        //             res.json()
        //         }).then(result => {
        //             console.log(result)
        //             context.commit('Update_List',result.data)
        //         })
        // }
    }
})