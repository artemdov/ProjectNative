import {AppRootStateType} from '../types/types';

export const isLoggedInSelector = (state: AppRootStateType) =>
  state.auth.isLoggedIn;
export const isLoadingSelector = (state: AppRootStateType) =>
  state.auth.loading;
export const getUserSelector = (state: AppRootStateType) => state.auth.user;
export const setImageSelector = (state: AppRootStateType) => state.feed.image;
export const changeValuePostSelector = (state: AppRootStateType) => state.feed.valuePost;
export const isLoadingImageSelector = (state: AppRootStateType) =>
    state.feed.upLoading;
export const isLoadingPostSelector = (state: AppRootStateType) =>
    state.feed.isLoadingPost;
export const isTransferredSelector = (state: AppRootStateType) =>
    state.feed.transferred;
export const setPostDataSelector = (state: AppRootStateType) =>
    state.feed.postData;
export const setKeySelector = (state: AppRootStateType) => state.feed.key
export const isDeletedPostSelector = (state: AppRootStateType) => state.feed.isDeleted


