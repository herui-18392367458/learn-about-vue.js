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
    let url="/api/ajax/mostExpected";
    return get(url,params)
}