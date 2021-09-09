import {ActionType, UserInfoType} from '../../types/types';
import actionTypes from '../actionTypes';

const initialState = {
  otherUserInfo: null as UserInfoType | null,
  otherUserPosts: [],
};
type initialStateType = typeof initialState;

export const otherUserProfileReducer = (
  state = initialState,
  action: ActionType,
) => {
  switch (action.type) {
    case actionTypes.otherUserProfile.SET_OTHER_USER_INFO:
      return <initialStateType>{...state, otherUserInfo: action.payload};
    case actionTypes.otherUserProfile.SET_OTHER_USER_POSTS:
      return <initialStateType>{...state, otherUserPosts: action.payload};
    default:
      return state;
  }
};
