import { combineReducers } from 'redux';
import authReducer from './authReducer';
import event from './eventReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  event
});

export default rootReducer;