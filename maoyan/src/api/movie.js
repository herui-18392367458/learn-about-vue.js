import {get} from "./http"
export const movieList=(params)=>{
    let url="/api/ajax/comingList";
    return get(url,params)
}
export const moreList=(params)=>{
    let url="/api/ajax/moreComingList";
    return get(url,params)
}