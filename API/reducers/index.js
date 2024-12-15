import { combineReducers } from 'redux';
import authReducer from './authReducer';
import event from './eventReducer'
import eventUser from './eventUserReducer';
import clubReducer from './clubReducer';
import clubEventsReducer from './clubEventsReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  event,
  eventUser,
  clubReducer,
  clubEventsReducer
});

export default rootReducer;