import {AppRootStateType} from '../types/types';

export const isLoggedInSelector = (state: AppRootStateType) =>
  state.auth.isLoggedIn;
export const isLoadingSelector = (state: AppRootStateType) =>
  state.auth.loading;
export const getUserSelector = (state: AppRootStateType) => state.auth.user;
export const setImageSelector = (state: AppRootStateType) => state.feed.image;
export const changeValueSelector = (state: AppRootStateType) => state.feed.value;
