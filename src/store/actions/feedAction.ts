import actionTypes from '../actionTypes';

export const setPostData = (postData: []) =>
  ({
    type: actionTypes.feed.SET_POST_DATA,
    payload: postData,
  } as const);
export const setComments = (comments: []) =>
  ({
    type: actionTypes.feed.SET_COMMENTS,
    payload: comments,
  } as const);

export const setImage = (image: string | undefined) =>
  ({
    type: actionTypes.feed.SET_IMAGE,
    payload: image,
  } as const);
export const viewCommentMenu = (commentMenu: boolean) =>
  ({
    type: actionTypes.feed.SET_COMMENTS_MENU,
    payload: commentMenu,
  } as const);
export const upLoadingForImage = (uploading: boolean) =>
  ({
    type: actionTypes.feed.SET_UPLOADING,
    payload: uploading,
  } as const);

export const isLoadingPosts = (isLoadingPost: boolean) =>
  ({
    type: actionTypes.feed.SET_IS_LOADING_POST,
    payload: isLoadingPost,
  } as const);
export const setTransferred = (transferred: number) =>
  ({
    type: actionTypes.feed.SET_TRANSFERRED,
    payload: transferred,
  } as const);
