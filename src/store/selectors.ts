import {AppRootStateType} from '../types/types';

export const isLoggedInSelector = (state: AppRootStateType) =>
  state.auth.isLoggedIn;
export const isProfileSetupFinishedSelector = (state: AppRootStateType) =>
  state.auth.profileSetupFinished;
export const isLoadingSelector = (state: AppRootStateType) =>
  state.auth.loading;
export const isCommentVisibleSelector = (state: AppRootStateType) =>
  state.feed.isCommentsMenuVisible;
export const getUserSelector = (state: AppRootStateType) => state.auth.user;
export const getImageSelector = (state: AppRootStateType) => state.feed.image;
export const isLoadingPostSelector = (state: AppRootStateType) =>
  state.feed.isLoadingPost;
export const getPostsSelector = (state: AppRootStateType) => state.feed.posts;
export const getCommentsSelector = (state: AppRootStateType) =>
  state.feed.comments;
export const getArtworksSelector = (state: AppRootStateType) =>
  state.artworks.artworksInfo;
export const isLoadingArtworksSelector = (state: AppRootStateType) =>
  state.artworks.isLoadingArtworks;
export const isLoadingEditUserSelector = (state: AppRootStateType) =>
  state.user.upLoadingUserInfo;
export const progressLoadingImageSelector = (state: AppRootStateType) =>
  state.user.progressLoadingImage;
export const getUserInfoSelector = (state: AppRootStateType) =>
  state.user.userInfo;
export const getUserPostsSelector = (state: AppRootStateType) =>
  state.user.userPosts;
export const getOtherUserPostsSelector = (state: AppRootStateType) =>
  state.otherUser.otherUserPosts;
export const getOtherUserInfoSelector = (state: AppRootStateType) =>
  state.otherUser.otherUserInfo;
export const isLoadingUserPostSelector = (state: AppRootStateType) =>
  state.user.isLoadingUserPost;
