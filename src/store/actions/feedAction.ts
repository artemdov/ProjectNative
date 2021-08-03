import actionTypes from '../actionTypes';

export const setPosts = (posts: []) =>
  ({
    type: actionTypes.feed.SET_POSTS,
    payload: posts,
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
export const setCommentViewVisible = (isCommentVisible: boolean) =>
  ({
    type: actionTypes.feed.SET_IS_COMMENT_VISIBLE,
    payload: isCommentVisible,
  } as const);
export const upLoadingForImage = (uploading: boolean) =>
  ({
    type: actionTypes.feed.SET_UPLOADING,
    payload: uploading,
  } as const);
export const setIsLoadingPost = (isLoadingPost: boolean) =>
  ({
    type: actionTypes.feed.SET_IS_LOADING_POST,
    payload: isLoadingPost,
  } as const);
export const setTransferred = (transferred: number) =>
  ({
    type: actionTypes.feed.SET_TRANSFERRED,
    payload: transferred,
  } as const);
