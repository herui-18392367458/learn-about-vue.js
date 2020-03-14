import {get} from "./http"
export const movieList=(params)=>{
    // let url="/api/ajax/comingList";
    let url="/mock/index.json"
    return get(url,params)
}
export const moreList=(params)=>{
    let url="/mock/moreList.json";
    return get(url,params)
}
export const mostExpact=(params)=>{
    let url="/mock/mostExpact.json";
    return get(url,params)
}
//rap2中不用做前端跨域
export const cityList=(params)=>{
    let url="http://rap2.taobao.org:38080/app/mock/238565/maoyan/city";
    return get(url,params)
}