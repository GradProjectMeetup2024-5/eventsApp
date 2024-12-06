import { combineReducers } from 'redux';
import authReducer from './authReducer';
import event from './eventReducer'
import eventUser from './eventUserReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  event,
  eventUser
});

export default rootReducer;