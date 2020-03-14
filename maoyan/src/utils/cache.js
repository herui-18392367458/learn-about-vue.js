//vue中插件的定义
import Vue from 'vue'
const KEY="keywords";//定义缓存的key
const CITY="historyCities"
var cache={
    //给缓存添加数据
    add(keyword){
        if(!keyword){
            return;
        }
        let list=[]
        if(localStorage.getItem(KEY)){
            list=JSON.parse(localStorage.getItem(KEY))
        }
        list.push(keyword)
        localStorage.setItem(KEY,JSON.stringify(list))  //转换json字符串存
    },
    //取缓存中的数据
    get(){
        return JSON.parse(localStorage.getItem(KEY))//转换正常字符串，数组，取
    },
    //删除缓存中的数据
    del(key){
        let list=JSON.parse(localStorage.getItem(KEY))
        list.splice(list.indexOf(key),1)
        localStorage.setItem(KEY,JSON.stringify(list))
    },
    addCity(keyword){
        if(!keyword){
            return;
        }
        let list=[]
        if(localStorage.getItem(CITY)){
            list=JSON.parse(localStorage.getItem(CITY))
        }
        list.push(keyword)
        localStorage.setItem(CITY,JSON.stringify(list))  //转换json字符串存
    },
    getCity(){
        return JSON.parse(localStorage.getItem(CITY))//转换正常字符串，数组，取
    },
}
var maoyanPlugin={
    install(vue){
        vue.prototype.$cache=cache
    }
}
Vue.use(maoyanPlugin)