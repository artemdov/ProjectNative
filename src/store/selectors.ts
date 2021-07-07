import {AppRootStateType} from '../types/types';

export const isLoggedInSelector = (state: AppRootStateType) =>
  state.auth.isLoggedIn;
export const isLoadingSelector = (state: AppRootStateType) =>
    state.auth.loading
export const setUserSelector = (state: AppRootStateType) =>
    state.auth.user
