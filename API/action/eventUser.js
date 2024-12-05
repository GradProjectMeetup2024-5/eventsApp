import {FETCH_ALL,CREATE_EVENT,MY_JOINED_EVENTS} from '../actionTypes'
import * as api from './API'

const myJoinedEvents = ()=>async(dispatch)=>{
    try {
        const {data} =await api.myJoinedEvents();
        console.log("data",{data})
         dispatch({type:MY_JOINED_EVENTS,payload:data});
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    myJoinedEvents
}