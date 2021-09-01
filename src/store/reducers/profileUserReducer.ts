import {ActionType} from '../../types/types';
import actionTypes from '../actionTypes';

const initialState = {
  userInfo: null,
  otherUserInfo: null,
  userImage: '',
  upLoadingUserInfo: false,
  transferredImage: 0,
  userPosts: [],
  isLoadingUserPost: false,
  otherUserPosts: [],
};
type initialStateType = typeof initialState;

export const profileUserReducer = (
  state = initialState,
  action: ActionType,
) => {
  switch (action.type) {
    case actionTypes.profileUser.SET_USER_INFO:
      return <initialStateType>{...state, userInfo: action.payload};
    case actionTypes.profileUser.SET_OTHER_USER_INFO:
      return <initialStateType>{...state, otherUserInfo: action.payload};
    case actionTypes.profileUser.SET_UPLOADING_USER_IMAGE:
      return <initialStateType>{...state, upLoadingUserInfo: action.payload};
    case actionTypes.profileUser.SET_TRANSFERRED_IMAGE:
      return <initialStateType>{...state, transferredImage: action.payload};
    case actionTypes.profileUser.SET_USER_IMAGE:
      return <initialStateType>{...state, userImage: action.payload};
    case actionTypes.profileUser.SET_USER_POSTS:
      return <initialStateType>{...state, userPosts: action.payload};
    case actionTypes.profileUser.SET_OTHER_USER_POSTS:
      return <initialStateType>{...state, otherUserPosts: action.payload};
    case actionTypes.profileUser.SET_IS_LOADING_USER_POST:
      return <initialStateType>{...state, isLoadingUserPost: action.payload};
    default:
      return state;
  }
};
