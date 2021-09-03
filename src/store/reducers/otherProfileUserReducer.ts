import {ActionType} from '../../types/types';
import actionTypes from '../actionTypes';

const initialState = {
  otherUserInfo: null,
  otherUserPosts: [],
};
type initialStateType = typeof initialState;

export const otherProfileUserReducer = (
  state = initialState,
  action: ActionType,
) => {
  switch (action.type) {
    case actionTypes.otherProfileUser.SET_OTHER_USER_INFO:
      return <initialStateType>{...state, otherUserInfo: action.payload};
    case actionTypes.otherProfileUser.SET_OTHER_USER_POSTS:
      return <initialStateType>{...state, otherUserPosts: action.payload};
    default:
      return state;
  }
};
