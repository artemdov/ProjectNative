import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {authReducer} from './reducers/authReducer';
import {feedReducer} from './reducers/feedReducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import {artworksReducer} from './reducers/artworksReducer';
import {userProfileReducer} from './reducers/userProfileReducer';
import {otherUserProfileReducer} from './reducers/otherUserProfileReducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  feed: feedReducer,
  artworks: artworksReducer,
  user: userProfileReducer,
  otherUser: otherUserProfileReducer,
});
export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware)),
);
