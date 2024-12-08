import {jwtDecode} from 'jwt-decode';
import * as SecureStore from 'expo-secure-store';
import * as actionType from '../actionTypes'; // Assuming you have action types defined here


const authReducer = (state = { authData: null, loading: true, errors: null }, action) => {
  switch (action.type) {
    case actionType.AUTH:
      const user = jwtDecode(action.data.access_token);
    
      const authData = {
        ...action.data,
        token: action.data.access_token,
        user: user,
      };
      return { ...state, authData: authData, loading: false, errors: null };

    case actionType.LOGOUT:
      return { ...state, authData: null, loading: false, errors: null };

    default:
      return state;
  }
};

export default authReducer;

