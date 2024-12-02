import {FETCH_ALL} from '../actionTypes'
import * as api from './API'

export const showEvents = ()=>async(dispatch)=>{
    try {
        const {data} =await api.showEvents();
         dispatch({type:FETCH_ALL,payload:data});
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    showEvents,
    
}