import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {authReducer} from './reducers/authReducer';
import {feedReducer} from './reducers/feedReducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import {artworksReducer} from './reducers/artworksReducer';
import {profileUserReducer} from "./reducers/profileUserReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  feed: feedReducer,
  data: artworksReducer,
  userInfo: profileUserReducer,
});
export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware)),
);
