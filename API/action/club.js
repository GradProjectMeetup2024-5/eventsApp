import {FETCH_ALL_CLUBS} from '../actionTypes'
import * as api from './API'

export const allClubs = (formData)=>async(dispatch)=>{
    try {
        const {data} =await api.allClubs(formData)
         dispatch({type:FETCH_ALL_CLUBS,payload:data})
         return data;
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    allClubs

}