import actionTypes from '../actionTypes';
import firebase from "firebase";
import {Dispatch} from "redux";



export const setPostData = (postData: []) =>
    ({
        type: actionTypes.feed.SET_POST_DATA,
        payload: postData,
    } as const);

export const setLikesData = (likesData: []) =>
    ({
        type: actionTypes.feed.SET_LIKE_DATA,
        payload: likesData,
    } as const);

export const setImage = (image: string | undefined) =>
  ({
    type: actionTypes.feed.SET_IMAGE,
    payload: image,
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

