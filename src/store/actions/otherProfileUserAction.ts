import actionTypes from '../actionTypes';

export const setOtherUserInfo = (otherUserInfo: any) =>
  ({
    type: actionTypes.otherProfileUser.SET_OTHER_USER_INFO,
    payload: otherUserInfo,
  } as const);

export const setOtherUserPosts = (posts: any) =>
  ({
    type: actionTypes.otherProfileUser.SET_OTHER_USER_POSTS,
    payload: posts,
  } as const);
