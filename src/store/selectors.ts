import {AppRootStateType} from '../types/types';

export const isLoggedInSelector = (state: AppRootStateType) =>
  state.auth.isLoggedIn;
export const isLoadingSelector = (state: AppRootStateType) =>
  state.auth.loading;
export const viewCommentMenuSelector = (state: AppRootStateType) =>
    state.feed.commentMenu;
export const getUserSelector = (state: AppRootStateType) => state.auth.user;
export const setImageSelector = (state: AppRootStateType) => state.feed.image;
export const isLoadingImageSelector = (state: AppRootStateType) =>
  state.feed.upLoading;
export const isLoadingPostSelector = (state: AppRootStateType) =>
  state.feed.isLoadingPost;
export const isTransferredSelector = (state: AppRootStateType) =>
  state.feed.transferred;
export const setPostDataSelector = (state: AppRootStateType) =>
  state.feed.postData;
export const setCommentDataSelector = (state: AppRootStateType) =>
  state.feed.commentsData;
