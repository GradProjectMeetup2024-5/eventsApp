import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import rootReducer from './API/reducers/index';

const middleware = [thunk];
console.log('Applying middleware:', middleware); 

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
