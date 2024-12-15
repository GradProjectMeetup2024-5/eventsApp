import { combineReducers } from 'redux';
import authReducer from './authReducer';
import event from './eventReducer'
import eventUser from './eventUserReducer';
import clubReducer from './clubReducer';
import clubEventsreducer from './clubEventsreducer';

const rootReducer = combineReducers({
  auth: authReducer,
  event,
  eventUser,
  clubReducer,
  clubEventsreducer
});

export default rootReducer;