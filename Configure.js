import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';

import taskReducer from './API/reducers/index';

const store = createStore(
  taskReducer,
  (applyMiddleware(thunk))
);

export default store;