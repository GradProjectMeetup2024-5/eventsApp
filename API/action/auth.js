import {AUTH} from '../actionTypes'
import * as api from '../api'

export const signin=(formData)=>async(dispatch)=>{
    try {
        const {data} =await api.signin(formData)
         dispatch({type:AUTH,data})
    } catch (error) {
        console.log(error)
    }
}
export const signup =(formData)=>async(dispatch)=>{
    try {
        const{data}=await api.signup (formData)
        dispatch({type:AUTH,data})
    } catch (error) {
        console.log(error)
    }
}
module.exports= {
    signin,
    signup
}