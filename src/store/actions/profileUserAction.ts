import actionTypes from '../actionTypes';
import {Dispatch} from 'redux';
import storage from '@react-native-firebase/storage';
import {Alert} from 'react-native';
import {PostType, UserInfoType} from '../../types/types';

export const setUserInfo = (userInfo: UserInfoType | null) =>
  ({
    type: actionTypes.profileUser.SET_USER_INFO,
    payload: userInfo,
  } as const);

export const upLoadingUserImage = (uploading: boolean) =>
  ({
    type: actionTypes.profileUser.SET_UPLOADING_USER_IMAGE,
    payload: uploading,
  } as const);

export const setTransferredUserImage = (transferred: number) =>
  ({
    type: actionTypes.profileUser.SET_TRANSFERRED_IMAGE,
    payload: transferred,
  } as const);

export const setUserImage = (image?: string) =>
  ({
    type: actionTypes.profileUser.SET_USER_IMAGE,
    payload: image,
  } as const);

export const setUserPosts = (posts: PostType[]) =>
  ({
    type: actionTypes.profileUser.SET_USER_POSTS,
    payload: posts,
  } as const);

export const setIsLoadingUserPost = (isLoadingPost: boolean) =>
  ({
    type: actionTypes.profileUser.SET_IS_LOADING_USER_POST,
    payload: isLoadingPost,
  } as const);

export const uploadImage = (image: string) => async (dispatch: Dispatch) => {
  if (!image) {
    return null;
  }
  const uploadUri = image;
  let fileName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
  const extension = fileName.split('.').pop();
  const name = fileName.split('.').slice(0, -1).join('.');
  fileName = name + Date.now() + '.' + extension;
  const storageRef = storage().ref(`photos/${fileName}`);
  const task = storageRef.putFile(uploadUri);
  task.on('state_changed', taskSnapshot => {
    dispatch(
      setTransferredUserImage(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      ),
    );
  });
  try {
    dispatch(upLoadingUserImage(true));
    dispatch(setTransferredUserImage(0));
    await task;
    const url = await storageRef.getDownloadURL();
    dispatch(upLoadingUserImage(false));
    return url;
  } catch (err) {
    Alert.alert(err);
    return '';
  }
};
