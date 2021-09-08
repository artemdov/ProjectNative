import actionTypes from '../actionTypes';
import {PostType, UserInfoType} from '../../types/types';

export const setOtherUserInfo = (otherUserInfo: UserInfoType | null) =>
  ({
    type: actionTypes.otherProfileUser.SET_OTHER_USER_INFO,
    payload: otherUserInfo,
  } as const);

export const setOtherUserPosts = (posts: PostType[]) =>
  ({
    type: actionTypes.otherProfileUser.SET_OTHER_USER_POSTS,
    payload: posts,
  } as const);
