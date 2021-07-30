import actionTypes from '../actionTypes';

export const setPostData = (postData: []) =>
  ({
    type: actionTypes.feed.SET_POST_DATA,
    payload: postData,
  } as const);
export const setCommentsData = (commentsData: []) =>
  ({
    type: actionTypes.feed.SET_COMMENTS_DATA,
    payload: commentsData,
  } as const);

export const setImage = (image: string | undefined) =>
  ({
    type: actionTypes.feed.SET_IMAGE,
    payload: image,
  } as const);
export const viewCommentMenu = (commentMenu: boolean) =>
    ({
        type: actionTypes.feed.COMMENT_MENU,
        payload: commentMenu,
    } as const);
export const upLoadingForImage = (uploading: boolean) =>
  ({
    type: actionTypes.feed.UPLOAD,
    payload: uploading,
  } as const);

export const isLoadingPostValue = (isLoadingPost: boolean) =>
  ({
    type: actionTypes.feed.IS_LOAD_POST,
    payload: isLoadingPost,
  } as const);
export const setTransferred = (transferred: number) =>
  ({
    type: actionTypes.feed.SET_TRANSFERRED,
    payload: transferred,
  } as const);
