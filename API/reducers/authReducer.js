import * as actionType from '../actionTypes';
import { jwtDecode } from "jwt-decode";

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case actionType.AUTH:
      const user= jwtDecode(action.data.access_token)
      const authData = {
        ...action.data,
        token: action.data.access_token,
        user:user 
      };

      localStorage.setItem('profile', JSON.stringify(authData));

      return { ...state, authData: action.data, loading: false, errors: null };
      
    case actionType.LOGOUT:
      localStorage.clear();
      return { ...state, authData: null, loading: false, errors: null };
      case actionType.FETCH_ALL:
        return [action.payload]
    default:
      return state;
  }
 
};

export default authReducer;