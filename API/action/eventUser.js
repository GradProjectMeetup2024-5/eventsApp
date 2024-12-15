import {MY_JOINED_EVENTS,MY_CREATED_EVENT,JOIN_EVENT,CHECK_IF_USER_JOINED_EVENT,LEAVE_EVENT} from '../actionTypes'
import * as api from './API'

const joinEvent = (id)=>async(dispatch)=>{
    try{
        const {data} = await api.joinEvent(id);
        dispatch({type:JOIN_EVENT,payload:data});    
    } catch (error) {
        console.log(error);
    }

}

const leaveEvent = (eventId)=>async(dispatch)=>{
    try{
        const {data} = await api.leaveEvent(eventId);
        dispatch({type:LEAVE_EVENT,payload:data});    
    } catch (error) {
        console.log(error);
    }

}

const myJoinedEvents = ()=>async(dispatch)=>{
    try {
        const {data} =await api.myJoinedEvents();
         dispatch({type:MY_JOINED_EVENTS,payload:data});
    } catch (error) {
        console.log(error);
    }
}

const checkIfUserJoinedEvent = (eventId)=>async(dispatch)=>{
    try {
        const {data} =await api.checkIfUserJoinedEvent(eventId);
         dispatch({type:CHECK_IF_USER_JOINED_EVENT,payload:data});
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
    showMyCreatedEvents,
    joinEvent,
    checkIfUserJoinedEvent,
    leaveEvent
}