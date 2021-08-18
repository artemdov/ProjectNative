import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {authReducer} from './reducers/authReducer';
import {feedReducer} from './reducers/feedReducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import {ArtworksReducer} from './reducers/ArtworksReducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  feed: feedReducer,
  data: ArtworksReducer,
});
export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware)),
);
