import {FETCH_ALL,CREATE_EVENT,MY_JOINED_EVENTS,MY_CREATED_EVENT} from '../actionTypes'
import * as api from './API'

const myJoinedEvents = ()=>async(dispatch)=>{
    try {
        const {data} =await api.myJoinedEvents();
         dispatch({type:MY_JOINED_EVENTS,payload:data});
    } catch (error) {
        console.log(error);
    }
}

const showMyCreatedEvents = ()=>async(dispatch)=>{
    try {
        const {data} =await api.showMyCreatedEvents();
         dispatch({type:MY_CREATED_EVENT,payload:data});
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    myJoinedEvents,
    showMyCreatedEvents
}