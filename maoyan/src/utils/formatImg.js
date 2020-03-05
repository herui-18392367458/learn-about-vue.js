import Vue from "vue"
//全局定义一个过滤器的方法
Vue.filter('formatImg',(url,wh)=>{
    return url.replace(/w.h/,wh)
})