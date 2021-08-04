import actionTypes from '../actionTypes';
import {CommentType, PostType} from '../../types/types';

export const setPosts = (posts: PostType[]) =>
  ({
    type: actionTypes.feed.SET_POSTS,
    payload: posts,
  } as const);
export const setComments = (comments: CommentType[]) =>
  ({
    type: actionTypes.feed.SET_COMMENTS,
    payload: comments,
  } as const);

export const setImage = (image?: string) =>
  ({
    type: actionTypes.feed.SET_IMAGE,
    payload: image,
  } as const);
export const setCommentMenuVisible = (isCommentMenuVisible: boolean) =>
  ({
    type: actionTypes.feed.SET_IS_COMMENT_MENU_VISIBLE,
    payload: isCommentMenuVisible,
  } as const);
export const upLoadingImage = (uploading: boolean) =>
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
