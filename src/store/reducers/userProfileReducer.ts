import {ActionType, UserInfoType} from '../../types/types';
import actionTypes from '../actionTypes';

const initialState = {
  userInfo: null as UserInfoType | null,
  userImage: '',
  upLoadingUserInfo: false,
  progressLoadingImage: 0,
  userPosts: [],
  isLoadingUserPost: false,
};
type initialStateType = typeof initialState;

export const UserProfileReducer = (
  state = initialState,
  action: ActionType,
) => {
  switch (action.type) {
    case actionTypes.userProfile.SET_USER_INFO:
      return <initialStateType>{...state, userInfo: action.payload};
    case actionTypes.userProfile.SET_UPLOADING_USER_IMAGE:
      return <initialStateType>{...state, upLoadingUserInfo: action.payload};
    case actionTypes.userProfile.SET_PROGRESS_LOADING_IMAGE:
      return <initialStateType>{...state, progressLoadingImage: action.payload};
    case actionTypes.userProfile.SET_USER_IMAGE:
      return <initialStateType>{...state, userImage: action.payload};
    case actionTypes.userProfile.SET_USER_POSTS:
      return <initialStateType>{...state, userPosts: action.payload};
    case actionTypes.userProfile.SET_IS_LOADING_USER_POST:
      return <initialStateType>{...state, isLoadingUserPost: action.payload};
    default:
      return state;
  }
};
