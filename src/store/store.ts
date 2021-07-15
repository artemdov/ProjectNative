import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {authReducer} from './reducers/authReducer';
import {feedReducer} from './reducers/feedReducer';


export const rootReducer = combineReducers({
  auth: authReducer,
  feed: feedReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
