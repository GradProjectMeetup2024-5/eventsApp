import {FETCH_ALL,CREATE_EVENT} from '../actionTypes'
import * as api from './API'

const showEvents = ()=>async(dispatch)=>{
    try {
        const {data} =await api.showEvents();
         dispatch({type:FETCH_ALL,payload:data});
    } catch (error) {
        console.log(error);
    }
}

const createEvent = (formData)=>async(dispatch)=>{
    try{
        const {data} = await api.createEvent(formData);
        dispatch({type:CREATE_EVENT,payload:data});
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    showEvents,
    createEvent
}