import {AppRootStateType} from '../types/types';

export const isLoggedInSelector = (state: AppRootStateType) =>
  state.auth.isLoggedIn;
export const isLoadingSelector = (state: AppRootStateType) =>
  state.auth.loading;
export const isCommentVisibleSelector = (state: AppRootStateType) =>
  state.feed.isCommentsMenuVisible;
export const getUserSelector = (state: AppRootStateType) => state.auth.user;
export const getImageSelector = (state: AppRootStateType) => state.feed.image;
export const isLoadingImageSelector = (state: AppRootStateType) =>
  state.feed.upLoading;
export const isLoadingPostSelector = (state: AppRootStateType) =>
  state.feed.isLoadingPost;
export const isTransferredSelector = (state: AppRootStateType) =>
  state.feed.transferred;
export const getPostsSelector = (state: AppRootStateType) => state.feed.posts;
export const getCommentsSelector = (state: AppRootStateType) =>
  state.feed.comments;
