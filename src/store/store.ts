import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {authReducer} from "./reducers/authReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
