import { combineReducers } from 'redux';
import authReducer from './authReducer';
import event from './eventReducer'
import eventUser from './eventUserReducer';
import clubReducer from './clubReducer';
import clubEventsReducer from './clubEventsReducer';
import commentReducer from './commentReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  event,
  eventUser,
  clubReducer,
  clubEventsReducer,
  commentReducer
});

export default rootReducer;